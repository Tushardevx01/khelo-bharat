import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NotFoundError } from "@/lib/errors";
import { PaginationInput, createPaginatedResponse } from "@/lib/validators";

export class SponsorRepository {
  async findById(id: string) {
    return prisma.sponsor.findUnique({
      where: { id },
      include: {
        user: true,
        sponsorships: {
          include: {
            athlete: { include: { user: { select: { name: true, avatar: true } } } },
            school: { select: { id: true, schoolName: true } },
            tournament: { select: { id: true, title: true } },
          },
        },
      },
    });
  }

  async findByUserId(userId: string) {
    return prisma.sponsor.findUnique({
      where: { userId },
      include: { user: true },
    });
  }

  async create(data: Prisma.SponsorCreateInput) {
    return prisma.sponsor.create({ data });
  }

  async update(id: string, data: Prisma.SponsorUpdateInput) {
    const sponsor = await prisma.sponsor.findUnique({ where: { id } });
    if (!sponsor) throw new NotFoundError("Sponsor");
    return prisma.sponsor.update({ where: { id }, data });
  }

  async findAll(pagination: PaginationInput) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: Prisma.SponsorWhereInput = {
      ...(search && {
        OR: [
          { companyName: { contains: search, mode: "insensitive" } },
          { industry: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [sponsors, total] = await Promise.all([
      prisma.sponsor.findMany({
        where,
        include: { user: { select: { id: true, name: true, avatar: true } } },
        skip,
        take: limit,
        orderBy: { [sortBy || "totalSponsored"]: sortOrder || "desc" },
      }),
      prisma.sponsor.count({ where }),
    ]);

    return createPaginatedResponse(sponsors, total, page, limit);
  }

  async getVerified(limit: number = 10) {
    return prisma.sponsor.findMany({
      where: { isVerified: true },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      take: limit,
      orderBy: { totalSponsored: "desc" },
    });
  }
}

export const sponsorRepository = new SponsorRepository();
