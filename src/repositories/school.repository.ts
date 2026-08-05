import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class SchoolRepository {
  async findById(id: string) {
    return prisma.school.findUnique({
      where: { id },
      include: {
        user: true,
        athletes: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.school.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async create(data: Prisma.SchoolCreateInput) {
    return prisma.school.create({ data });
  }

  async update(id: string, data: Prisma.SchoolUpdateInput) {
    const school = await prisma.school.findUnique({ where: { id } });
    if (!school) throw new NotFoundError("School");
    return prisma.school.update({ where: { id }, data });
  }

  async findAll(pagination: PaginationInput, filters?: { city?: string; state?: string; isVerified?: boolean }) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.SchoolWhereInput = {
      ...(filters?.city && { city: filters.city }),
      ...(filters?.state && { state: filters.state }),
      ...(filters?.isVerified !== undefined && { isVerified: filters.isVerified }),
      ...(search && {
        OR: [
          { schoolName: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [schools, total] = await Promise.all([
      prisma.school.findMany({
        where,
        include: { user: { select: { id: true, name: true, avatar: true } } },
        skip,
        take: limit,
        orderBy: { [sortBy || "rating"]: sortOrder || "desc" },
      }),
      prisma.school.count({ where }),
    ]);

    return createPaginatedResponse(schools, total, page, limit);
  }

  async getVerified(limit: number = 10) {
    return prisma.school.findMany({
      where: { isVerified: true },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      take: limit,
      orderBy: { rating: "desc" },
    });
  }
}

export const schoolRepository = new SchoolRepository();
