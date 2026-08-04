import { TournamentRepository } from "../repositories/tournament.repository";

const tournamentRepository = new TournamentRepository();

export class TournamentService {
  static async getActiveTournaments() {
    const tournaments = await tournamentRepository.findActiveTournaments();
    return tournaments.map((t: any) => ({
      ...t,
      participantsCount: t._count.registrations,
    }));
  }
}
