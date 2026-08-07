import { prisma } from "@/lib/prisma";
import { Prisma, TournamentStatus, SportCategory } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
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
    const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
    if (!tournament) throw new NotFoundError("Tournament");

    const existing = await prisma.tournamentRegistration.findUnique({
      where: { tournamentId_athleteId: { tournamentId, athleteId } },
    });

    if (existing) throw new Error("Already registered for this tournament");

    const [registration] = await prisma.$transaction([
      prisma.tournamentRegistration.create({
        data: {
          tournamentId,
          athleteId,
          teamName: data?.teamName,
        },
      }),
      prisma.tournament.update({
        where: { id: tournamentId },
        data: { totalParticipants: { increment: 1 } },
      }),
    ]);

    return registration;
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
