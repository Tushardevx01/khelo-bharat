import { prisma } from "@/lib/prisma";
import type { PaginationInput } from "@/types";

export const athleteRepository = {
  async findMany(
    params: PaginationInput & { sport?: string; city?: string }
  ): Promise<{ athletes: Array<{ id: string; userId: string; sports: string | null; city: string | null; ranking: number | null; user: { name: string; email: string; avatar: string | null } }>; total: number }> {
    const { page, pageSize, search, sport, city } = params;
    const where: Record<string, unknown> = {};

    if (sport) where.sports = { contains: sport, mode: "insensitive" };
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (search) {
      where.user = { name: { contains: search, mode: "insensitive" } };
    }

    const [athletes, total] = await Promise.all([
      prisma.athleteProfile.findMany({
        where,
        include: { user: { select: { name: true, email: true, avatar: true } } },
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
      include: { user: { select: { name: true, email: true, avatar: true } } },
    });
  },
};
