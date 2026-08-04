import { prisma } from "@/lib/prisma";
import type { Tournament, TournamentRegistration } from "@prisma/client";
import type { PaginationInput } from "@/types";

type TournamentWithDetails = Tournament & {
  sport: { name: string; icon: string | null };
  organizer: { name: string; avatar: string | null };
  _count: { registrations: number };
};

export const tournamentRepository = {
  async findById(id: string): Promise<TournamentWithDetails | null> {
    return prisma.tournament.findUnique({
      where: { id },
      include: {
        sport: { select: { name: true, icon: true } },
        organizer: { select: { name: true, avatar: true } },
        _count: { select: { registrations: true } },
      },
    });
  },

  async findBySlug(slug: string): Promise<TournamentWithDetails | null> {
    return prisma.tournament.findUnique({
      where: { slug },
      include: {
        sport: { select: { name: true, icon: true } },
        organizer: { select: { name: true, avatar: true } },
        _count: { select: { registrations: true } },
      },
    });
  },

  async findMany(
    params: PaginationInput & { sport?: string; status?: string; city?: string }
  ): Promise<{ tournaments: TournamentWithDetails[]; total: number }> {
    const { page, pageSize, search, sport, status, city } = params;
    const where: Record<string, unknown> = {};

    if (sport) where.sport = { name: sport };
    if (status) where.status = status;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
      ];
    }

    const [tournaments, total] = await Promise.all([
      prisma.tournament.findMany({
        where,
        include: {
          sport: { select: { name: true, icon: true } },
          organizer: { select: { name: true, avatar: true } },
          _count: { select: { registrations: true } },
        },
        orderBy: { startDate: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.tournament.count({ where }),
    ]);

    return { tournaments, total };
  },

  async create(data: {
    title: string;
    slug: string;
    description?: string;
    sportId: string;
    organizerId: string;
    organizerType: string;
    startDate: Date;
    endDate: Date;
    registrationDeadline: Date;
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
  }): Promise<Tournament> {
    return prisma.tournament.create({ data: data as any });
  },

  async update(id: string, data: Partial<Tournament>): Promise<Tournament> {
    return prisma.tournament.update({ where: { id }, data });
  },

  async delete(id: string): Promise<void> {
    await prisma.tournament.delete({ where: { id } });
  },

  async register(tournamentId: string, participantId: string, participantType: string): Promise<TournamentRegistration> {
    return prisma.tournamentRegistration.create({
      data: { tournamentId, participantId, participantType: participantType as any },
    });
  },

  async findRegistration(tournamentId: string, participantId: string): Promise<TournamentRegistration | null> {
    return prisma.tournamentRegistration.findFirst({
      where: { tournamentId, participantId },
    });
  },

  async count(): Promise<number> {
    return prisma.tournament.count();
  },

  async countByStatus(): Promise<Record<string, number>> {
    const counts = await prisma.tournament.groupBy({
      by: ["status"],
      _count: true,
    });
    return counts.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>);
  },

  async findUpcoming(limit: number = 6): Promise<TournamentWithDetails[]> {
    return prisma.tournament.findMany({
      where: {
        status: { in: ["REGISTRATION_OPEN", "UPCOMING"] },
        startDate: { gte: new Date() },
      },
      include: {
        sport: { select: { name: true, icon: true } },
        organizer: { select: { name: true, avatar: true } },
        _count: { select: { registrations: true } },
      },
      orderBy: { startDate: "asc" },
      take: limit,
    });
  },
};
