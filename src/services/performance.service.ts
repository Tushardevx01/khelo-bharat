import { performanceRepository } from "@/repositories/performance.repository";

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
      ...data,
      date: new Date(),
      stats: data.stats as never,
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
