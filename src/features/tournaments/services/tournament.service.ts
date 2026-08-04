import { tournamentRepository } from "../repositories/tournament.repository";
import { notificationRepository } from "@/features/notifications/repositories/notification.repository";
import { NotFoundError, ConflictError } from "@/lib/errors";
import { generateSlug } from "@/lib/utils";
import { sendEmail, emailTemplates } from "@/lib/email";
import { logger } from "@/lib/logger";

export const tournamentService = {
  async getTournaments(params: {
    page: number;
    pageSize: number;
    search?: string;
    sport?: string;
    status?: string;
    city?: string;
  }) {
    const { tournaments, total } = await tournamentRepository.findMany({ ...params, sortOrder: "desc" });
    return { tournaments, total };
  },

  async getTournamentById(id: string) {
    const tournament = await tournamentRepository.findById(id);
    if (!tournament) throw new NotFoundError("Tournament");
    return tournament;
  },

  async getUpcomingTournaments(limit: number = 6) {
    return tournamentRepository.findUpcoming(limit);
  },

  async createTournament(data: {
    title: string;
    description?: string;
    sportId: string;
    organizerId: string;
    organizerType: string;
    startDate: string;
    endDate: string;
    registrationDeadline: string;
    location: string;
    address?: string;
    city: string;
    state: string;
    latitude?: number;
    longitude?: number;
    format: string;
    maxParticipants: number;
    entryFee: number;
    prizePool: number;
    imageUrl?: string;
  }) {
    const slug = generateSlug(data.title);

    const tournament = await tournamentRepository.create({
      ...data,
      slug,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      registrationDeadline: new Date(data.registrationDeadline),
    });

    logger.info("Tournament created", { tournamentId: tournament.id, title: tournament.title });
    return tournament;
  },

  async registerForTournament(tournamentId: string, participantId: string, participantType: string) {
    const tournament = await tournamentRepository.findById(tournamentId);
    if (!tournament) throw new NotFoundError("Tournament");

    const existing = await tournamentRepository.findRegistration(tournamentId, participantId);
    if (existing) throw new ConflictError("Already registered for this tournament");

    const registration = await tournamentRepository.register(tournamentId, participantId, participantType);

    // Create notification
    await notificationRepository.create({
      userId: participantId,
      title: "Tournament Registration",
      message: `You have been registered for ${tournament.title}`,
      type: "SUCCESS",
      link: `/tournaments/${tournamentId}`,
    });

    logger.info("Tournament registration", { tournamentId, participantId });
    return registration;
  },

  async getStats() {
    const [total, statusCounts] = await Promise.all([
      tournamentRepository.count(),
      tournamentRepository.countByStatus(),
    ]);

    return {
      totalTournaments: total,
      upcoming: statusCounts["UPCOMING"] || 0,
      ongoing: statusCounts["ONGOING"] || 0,
      completed: statusCounts["COMPLETED"] || 0,
      registrationOpen: statusCounts["REGISTRATION_OPEN"] || 0,
    };
  },
};
