import { prisma } from "@/lib/prisma";
import type { PaginationInput } from "@/types";

export const athleteRepository = {
  async findMany(
    params: PaginationInput & { sport?: string; city?: string }
  ): Promise<{ athletes: Array<{ id: string; userId: string; sports: string | null; city: string | null; ranking: number | null; user: { firstName: string; lastName: string; email: string; imageUrl: string | null } }>; total: number }> {
    const { page, pageSize, search, sport, city } = params;
    const where: Record<string, unknown> = {};

    if (sport) where.sports = { contains: sport, mode: "insensitive" };
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (search) {
      where.user = {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } }
        ]
      };
    }

    const [athletes, total] = await Promise.all([
      prisma.athleteProfile.findMany({
        where,
        include: { user: { select: { firstName: true, lastName: true, email: true, imageUrl: true } } },
        orderBy: { ranking: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.athleteProfile.count({ where }),
    ]);

    return { athletes, total };
  },

  async findByUserId(userId: string) {
    return prisma.athleteProfile.findUnique({
      where: { userId },
      include: { user: { select: { firstName: true, lastName: true, email: true, imageUrl: true } } },
    });
  },
};
