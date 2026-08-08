import { prisma } from "@/lib/prisma";
import { Prisma, TournamentStatus, SportCategory } from "@prisma/client";
import { ConflictError, NotFoundError, ValidationError } from "@/lib/errors";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class TournamentRepository {
  async findById(id: string) {
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      include: {
        organizer: { select: { id: true, name: true, avatar: true } },
        registrations: {
          include: {
            athlete: { include: { user: { select: { name: true, avatar: true } } } },
          },
          orderBy: { registeredAt: "desc" },
        },
        matches: { orderBy: { scheduledAt: "asc" } },
      },
    });
    return tournament;
  }

  async create(data: Prisma.TournamentCreateInput) {
    return prisma.tournament.create({ data });
  }

  async update(id: string, data: Prisma.TournamentUpdateInput) {
    const tournament = await prisma.tournament.findUnique({ where: { id } });
    if (!tournament) throw new NotFoundError("Tournament");
    return prisma.tournament.update({ where: { id }, data });
  }

  async delete(id: string) {
    const tournament = await prisma.tournament.findUnique({ where: { id } });
    if (!tournament) throw new NotFoundError("Tournament");
    return prisma.tournament.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async findAll(pagination: PaginationInput, filters?: {
    status?: TournamentStatus;
    sportCategory?: SportCategory;
    organizerId?: string;
    city?: string;
    state?: string;
    isFeatured?: boolean;
  }) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.TournamentWhereInput = {
      deletedAt: null,
      ...(filters?.status && { status: filters.status }),
      ...(filters?.sportCategory && { sportCategory: filters.sportCategory }),
      ...(filters?.organizerId && { organizerId: filters.organizerId }),
      ...(filters?.city && { city: filters.city }),
      ...(filters?.state && { state: filters.state }),
      ...(filters?.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [tournaments, total] = await Promise.all([
      prisma.tournament.findMany({
        where,
        include: {
          organizer: { select: { id: true, name: true, avatar: true } },
          _count: { select: { registrations: true } },
        },
        skip,
        take: limit,
        orderBy: { [sortBy || "startDate"]: sortOrder || "desc" },
      }),
      prisma.tournament.count({ where }),
    ]);

    return createPaginatedResponse(tournaments, total, page, limit);
  }

  async register(tournamentId: string, athleteId: string, data?: { teamName?: string }) {
    try {
      return await prisma.$transaction(async (tx) => {
        const [tournament, athlete] = await Promise.all([
          tx.tournament.findUnique({
            where: { id: tournamentId },
            select: {
              id: true,
              title: true,
              organizerId: true,
              status: true,
              registrationDeadline: true,
              maxParticipants: true,
              totalParticipants: true,
              deletedAt: true,
            },
          }),
          tx.athlete.findUnique({
            where: { id: athleteId },
            select: { id: true, userId: true },
          }),
        ]);

        if (!tournament || tournament.deletedAt) throw new NotFoundError("Tournament");
        if (!athlete) throw new NotFoundError("Athlete");
        if (tournament.status !== "REGISTRATION_OPEN") {
          throw new ValidationError("Registration is not open for this tournament");
        }
        if (tournament.registrationDeadline && tournament.registrationDeadline <= new Date()) {
          throw new ValidationError("Registration deadline has passed");
        }

        const registration = await tx.tournamentRegistration.create({
          data: { tournamentId, athleteId, teamName: data?.teamName },
        });

        const participantUpdate = tournament.maxParticipants === null
          ? await tx.tournament.updateMany({
              where: { id: tournamentId, status: "REGISTRATION_OPEN", deletedAt: null },
              data: { totalParticipants: { increment: 1 } },
            })
          : await tx.tournament.updateMany({
              where: {
                id: tournamentId,
                status: "REGISTRATION_OPEN",
                deletedAt: null,
                totalParticipants: { lt: tournament.maxParticipants },
              },
              data: { totalParticipants: { increment: 1 } },
            });

        if (participantUpdate.count !== 1) {
          throw new ValidationError("Tournament is full or registration is closed");
        }

        await Promise.all([
          tx.notification.create({
            data: {
              userId: athlete.userId,
              type: "TOURNAMENT",
              title: "Tournament registration confirmed",
              message: `You are registered for ${tournament.title}.`,
              data: { tournamentId, registrationId: registration.id },
            },
          }),
          tx.auditLog.create({
            data: {
              userId: athlete.userId,
              action: "TOURNAMENT_REGISTERED",
              entity: "TournamentRegistration",
              entityId: registration.id,
              newData: { tournamentId, athleteId },
            },
          }),
        ]);

        return registration;
      }, { isolationLevel: "Serializable" });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("You are already registered for this tournament");
      }
      throw error;
    }
  }

  async getUpcoming(limit: number = 10) {
    return prisma.tournament.findMany({
      where: {
        deletedAt: null,
        status: { in: ["UPCOMING", "REGISTRATION_OPEN"] },
        startDate: { gte: new Date() },
      },
      include: {
        organizer: { select: { id: true, name: true, avatar: true } },
        _count: { select: { registrations: true } },
      },
      take: limit,
      orderBy: { startDate: "asc" },
    });
  }

  async getFeatured(limit: number = 6) {
    return prisma.tournament.findMany({
      where: { isFeatured: true, deletedAt: null },
      include: {
        organizer: { select: { id: true, name: true, avatar: true } },
        _count: { select: { registrations: true } },
      },
      take: limit,
      orderBy: { startDate: "asc" },
    });
  }
}

export const tournamentRepository = new TournamentRepository();
