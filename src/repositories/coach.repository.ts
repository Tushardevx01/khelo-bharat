import { prisma } from "@/lib/prisma";
import { Prisma, SportCategory } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class CoachRepository {
  async findById(id: string) {
    return prisma.coach.findUnique({
      where: { id },
      include: {
        user: true,
        athletes: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.coach.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async findDashboardByUserId(userId: string) {
    return prisma.coach.findUnique({
      where: { userId },
      select: {
        id: true,
        rating: true,
        athletes: {
          select: { id: true, sportCategory: true, user: { select: { name: true, avatar: true } } },
          take: 5,
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { athletes: true, coachRelationships: { where: { status: "ACTIVE" } } } },
        trainingSessions: {
          where: { startsAt: { gte: new Date() } },
          select: { id: true, title: true, startsAt: true, endsAt: true, _count: { select: { records: true } } },
          take: 5,
          orderBy: { startsAt: "asc" },
        },
      },
    });
  }

  async create(data: Prisma.CoachCreateInput) {
    return prisma.coach.create({ data });
  }

  async update(id: string, data: Prisma.CoachUpdateInput) {
    const coach = await prisma.coach.findUnique({ where: { id } });
    if (!coach) throw new NotFoundError("Coach");
    return prisma.coach.update({ where: { id }, data });
  }

  async findAll(pagination: PaginationInput, sportCategory?: SportCategory) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.CoachWhereInput = {
      ...(sportCategory && { sportCategory }),
      ...(search && {
        user: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    };

    const [coaches, total] = await Promise.all([
      prisma.coach.findMany({
        where,
        include: { user: { select: { id: true, name: true, avatar: true, location: true } } },
        skip,
        take: limit,
        orderBy: { [sortBy || "rating"]: sortOrder || "desc" },
      }),
      prisma.coach.count({ where }),
    ]);

    return createPaginatedResponse(coaches, total, page, limit);
  }

  async getAvailable(sportCategory?: SportCategory) {
    return prisma.coach.findMany({
      where: {
        isAvailable: true,
        ...(sportCategory && { sportCategory }),
      },
      include: { user: { select: { id: true, name: true, avatar: true, location: true } } },
      orderBy: { rating: "desc" },
    });
  }
}

export const coachRepository = new CoachRepository();
