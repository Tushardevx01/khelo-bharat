import { prisma } from "@/lib/prisma";
import { Prisma, SportCategory } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class AthleteRepository {
  async findById(id: string) {
    const athlete = await prisma.athlete.findUnique({
      where: { id },
      include: {
        user: true,
        school: { select: { id: true, schoolName: true } },
        coach: { include: { user: { select: { name: true } } } },
        achievements: { orderBy: { date: "desc" } },
        performances: { orderBy: { date: "desc" }, take: 10 },
      },
    });
    return athlete;
  }

  async findByUserId(userId: string) {
    const athlete = await prisma.athlete.findUnique({
      where: { userId },
      include: {
        user: true,
        school: { select: { id: true, schoolName: true } },
        coach: { include: { user: { select: { name: true } } } },
        achievements: { orderBy: { date: "desc" } },
        sports: { include: { sport: true } },
        coachRelationships: { include: { coach: { include: { user: true } } } },
        sponsorshipRequests: { include: { sponsor: true } },
        registrations: { include: { tournament: true } },
      },
    });
    return athlete;
  }

  async create(data: Prisma.AthleteCreateInput) {
    return prisma.athlete.create({ data });
  }

  async update(id: string, data: Prisma.AthleteUpdateInput) {
    const athlete = await prisma.athlete.findUnique({ where: { id } });
    if (!athlete) throw new NotFoundError("Athlete");
    return prisma.athlete.update({ where: { id }, data });
  }

  async findAll(pagination: PaginationInput, sportCategory?: SportCategory) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.AthleteWhereInput = {
      ...(sportCategory && { sportCategory }),
      ...(search && {
        user: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    };

    const [athletes, total] = await Promise.all([
      prisma.athlete.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true, avatar: true, location: true } },
          school: { select: { id: true, schoolName: true } },
        },
        skip,
        take: limit,
        orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" },
      }),
      prisma.athlete.count({ where }),
    ]);

    return createPaginatedResponse(athletes, total, page, limit);
  }

  async getFeatured(limit: number = 10) {
    return prisma.athlete.findMany({
      where: { isFeatured: true },
      include: {
        user: { select: { id: true, name: true, avatar: true, location: true } },
        school: { select: { id: true, schoolName: true } },
      },
      take: limit,
      orderBy: { ranking: "asc" },
    });
  }

  async updateRanking(id: string, ranking: number) {
    return prisma.athlete.update({ where: { id }, data: { ranking } });
  }
}

export const athleteRepository = new AthleteRepository();
