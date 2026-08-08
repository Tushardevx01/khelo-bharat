import { tournamentRepository } from "@/repositories/tournament.repository";
import { TournamentStatus, SportCategory } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput } from "@/lib/validators";

export class TournamentService {
  async getTournamentById(id: string) {
    const tournament = await tournamentRepository.findById(id);
    if (!tournament) throw new NotFoundError("Tournament");
    return tournament;
  }

  async createTournament(data: {
    organizerId: string;
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
    return tournamentRepository.create({
      organizer: { connect: { id: data.organizerId } },
      title: data.title,
      description: data.description,
      sportCategory: data.sportCategory,
      startDate: data.startDate,
      endDate: data.endDate,
      registrationDeadline: data.registrationDeadline,
      location: data.location,
      city: data.city,
      state: data.state,
      latitude: data.latitude,
      longitude: data.longitude,
      maxParticipants: data.maxParticipants,
      entryFee: data.entryFee,
      prizePool: data.prizePool,
      rules: data.rules,
      poster: data.poster,
      status: "DRAFT",
      totalParticipants: 0,
    });
  }

  async updateTournament(id: string, data: Record<string, unknown>) {
    return tournamentRepository.update(id, data);
  }

  async updateStatus(id: string, status: TournamentStatus) {
    return tournamentRepository.update(id, { status });
  }

  async deleteTournament(id: string) {
    return tournamentRepository.delete(id);
  }

  async getAllTournaments(pagination: PaginationInput, filters?: {
    status?: TournamentStatus;
    sportCategory?: SportCategory;
    organizerId?: string;
    city?: string;
    state?: string;
    search?: string;
  }) {
    return tournamentRepository.findAll(pagination, filters);
  }

  async registerForTournament(tournamentId: string, athleteId: string, data?: { teamName?: string }) {
    return tournamentRepository.register(tournamentId, athleteId, data);
  }

  async getUpcomingTournaments(limit?: number) {
    return tournamentRepository.getUpcoming(limit);
  }

  async getFeaturedTournaments(limit?: number) {
    return tournamentRepository.getFeatured(limit);
  }
}

export const tournamentService = new TournamentService();
