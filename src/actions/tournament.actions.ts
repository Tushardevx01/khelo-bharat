"use server";

import { auth } from "@clerk/nextjs/server";
import { tournamentService } from "@/services/tournament.service";
import { TournamentStatus, SportCategory } from "@prisma/client";
import { ForbiddenError, UnauthorizedError, ValidationError } from "@/lib/errors";
import { requireCurrentUser, requireRole } from "@/lib/auth";
import { createTournamentSchema, tournamentRegistrationSchema, updateTournamentSchema } from "@/schemas/tournament.schema";
import { revalidatePath } from "next/cache";

export async function createTournament(data: {
  title: string;
  description?: string;
  sportCategory: SportCategory;
  startDate: Date;
  endDate: Date;
  registrationDeadline?: Date;
  location: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  maxParticipants?: number;
  entryFee?: number;
  prizePool?: number;
  rules?: string;
  poster?: string;
}) {
  const user = await requireRole("SCHOOL_ADMIN", "SUPER_ADMIN");
  const input = createTournamentSchema.parse(data);

  const tournament = await tournamentService.createTournament({
    ...input,
    organizerId: user.id,
  });
  revalidatePath("/tournaments");
  return tournament;
}

export async function getTournamentById(id: string) {
  return tournamentService.getTournamentById(id);
}

async function verifyTournamentOwnership(tournamentId: string) {
  const user = await requireCurrentUser();
  
  if (user.role === "SUPER_ADMIN") return;

  const tournament = await tournamentService.getTournamentById(tournamentId);
  if (tournament.organizerId !== user.id) {
    throw new ForbiddenError("You do not have permission to modify this tournament");
  }
  return user;
}

export async function updateTournament(id: string, data: Record<string, unknown>) {
  await verifyTournamentOwnership(id);
  const tournament = await tournamentService.updateTournament(id, updateTournamentSchema.parse(data));
  revalidatePath(`/tournaments/${id}`);
  revalidatePath("/tournaments");
  return tournament;
}

export async function updateTournamentStatus(id: string, status: TournamentStatus) {
  await verifyTournamentOwnership(id);
  if (!Object.values(TournamentStatus).includes(status)) {
    throw new ValidationError("Invalid tournament status");
  }
  const tournament = await tournamentService.updateStatus(id, status);
  revalidatePath(`/tournaments/${id}`);
  revalidatePath("/tournaments");
  return tournament;
}

export async function deleteTournament(id: string) {
  await verifyTournamentOwnership(id);
  const tournament = await tournamentService.deleteTournament(id);
  revalidatePath("/tournaments");
  return tournament;
}

export async function getAllTournaments(
  page: number = 1,
  limit: number = 10,
  filters?: {
    status?: TournamentStatus;
    sportCategory?: SportCategory;
    organizerId?: string;
    city?: string;
    state?: string;
    search?: string;
  }
) {
  return tournamentService.getAllTournaments({ page, limit, search: filters?.search }, filters);
}

export async function registerForTournament(tournamentId: string, teamName?: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new UnauthorizedError();

  const input = tournamentRegistrationSchema.parse({ tournamentId, teamName });
  const user = await requireCurrentUser();

  if (user.role !== "ATHLETE") {
    throw new ForbiddenError("Only athletes can register for tournaments");
  }

  const { athleteService } = await import("@/services/athlete.service");
  const athlete = await athleteService.getAthleteByUserId(user.id);
  const result = await tournamentService.registerForTournament(input.tournamentId, athlete.id, { teamName: input.teamName });
  revalidatePath(`/tournaments/${input.tournamentId}`);
  revalidatePath("/tournaments");
  return { success: true, data: result };
}

export async function getUpcomingTournaments(limit?: number) {
  return tournamentService.getUpcomingTournaments(limit);
}

export async function getFeaturedTournaments(limit?: number) {
  return tournamentService.getFeaturedTournaments(limit);
}
