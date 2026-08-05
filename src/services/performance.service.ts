import { performanceRepository } from "@/repositories/performance.repository";
import { SportCategory } from "@prisma/client";

export class PerformanceService {
  async addPerformance(data: {
    athleteId: string;
    tournamentId?: string;
    matchId?: string;
    sport: string;
    score?: string;
    rank?: number;
    stats?: Record<string, unknown>;
    notes?: string;
  }) {
    return performanceRepository.create({
      athlete: { connect: { id: data.athleteId } },
      tournament: data.tournamentId ? { connect: { id: data.tournamentId } } : undefined,
      match: data.matchId ? { connect: { id: data.matchId } } : undefined,
      sport: data.sport as SportCategory,
      score: data.score ? parseFloat(data.score) : undefined,
      rank: data.rank,
      stats: data.stats as never,
      notes: data.notes,
      date: new Date(),
    });
  }

  async getAthletePerformances(athleteId: string, limit?: number) {
    return performanceRepository.findByAthlete(athleteId, limit);
  }

  async getTournamentPerformances(tournamentId: string) {
    return performanceRepository.findByTournament(tournamentId);
  }

  async getAthleteStats(athleteId: string) {
    return performanceRepository.getStats(athleteId);
  }
}

export const performanceService = new PerformanceService();
