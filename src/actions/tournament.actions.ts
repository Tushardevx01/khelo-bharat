"use server";

import { auth } from "@clerk/nextjs/server";
import { tournamentService } from "@/services/tournament.service";
import { TournamentStatus, SportCategory } from "@prisma/client";

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
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return tournamentService.createTournament({
    ...data,
    organizerId: user.id,
  });
}

export async function getTournamentById(id: string) {
  return tournamentService.getTournamentById(id);
}

async function verifyTournamentOwnership(tournamentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);
  
  if (user.role === "SUPER_ADMIN") return;

  const tournament = await tournamentService.getTournamentById(tournamentId);
  if (tournament.organizerId !== user.id) {
    throw new Error("Forbidden: You do not have permission to modify this tournament");
  }
}

export async function updateTournament(id: string, data: Record<string, unknown>) {
  await verifyTournamentOwnership(id);
  return tournamentService.updateTournament(id, data);
}

export async function updateTournamentStatus(id: string, status: TournamentStatus) {
  await verifyTournamentOwnership(id);
  return tournamentService.updateStatus(id, status);
}

export async function deleteTournament(id: string) {
  await verifyTournamentOwnership(id);
  return tournamentService.deleteTournament(id);
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
  }
) {
  return tournamentService.getAllTournaments({ page, limit }, filters);
}

export async function registerForTournament(tournamentId: string, teamName?: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return { error: "Unauthorized" };

  try {
    const { userService } = await import("@/services/user.service");
    const user = await userService.getUserByClerkId(clerkId);

    const { athleteService } = await import("@/services/athlete.service");
    
    let athlete;
    try {
      athlete = await athleteService.getAthleteByUserId(user.id);
    } catch (e: any) {
      if (e.name === "NotFoundError" || e.message?.includes("Athlete profile")) {
        if (user.role === "ATHLETE") {
          // Auto-create default profile to break the onboarding loop
          athlete = await athleteService.createAthleteProfile(user.id, { sportCategory: "OTHER" });
        } else {
          return { error: "ATHLETE_NOT_FOUND" };
        }
      } else {
        throw e;
      }
    }

    const result = await tournamentService.registerForTournament(tournamentId, athlete.id, { teamName });
    return { success: true, data: result };
  } catch (error: any) {
    if (error.name === "NotFoundError" || error.message?.includes("Athlete profile")) {
      return { error: "ATHLETE_NOT_FOUND" };
    }
    return { error: error.message || "Failed to register for tournament" };
  }
}

export async function getUpcomingTournaments(limit?: number) {
  return tournamentService.getUpcomingTournaments(limit);
}

export async function getFeaturedTournaments(limit?: number) {
  return tournamentService.getFeaturedTournaments(limit);
}
