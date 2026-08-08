import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PerformanceRepository {
  async create(data: Prisma.PerformanceCreateInput) {
    return prisma.performance.create({ data });
  }

  async findByAthlete(athleteId: string, limit?: number) {
    return prisma.performance.findMany({
      where: { athleteId },
      include: {
        tournament: { select: { id: true, title: true } },
      },
      orderBy: { date: "desc" },
      ...(limit && { take: limit }),
    });
  }

  async findByTournament(tournamentId: string) {
    return prisma.performance.findMany({
      where: { tournamentId },
      include: {
        athlete: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
        },
      },
      orderBy: { rank: "asc" },
    });
  }

  async getStats(athleteId: string) {
    const where = { athleteId };
    const [totalCompetitions, wins, podiumFinishes, averages, performances] = await Promise.all([
      prisma.performance.count({ where }),
      prisma.performance.count({ where: { ...where, rank: 1 } }),
      prisma.performance.count({ where: { ...where, rank: { lte: 3 } } }),
      prisma.performance.aggregate({ where, _avg: { rank: true, score: true } }),
      prisma.performance.findMany({
        where,
        include: { tournament: { select: { id: true, title: true } } },
        orderBy: { date: "desc" },
        take: 10,
      }),
    ]);

    return {
      totalCompetitions,
      wins,
      podiumFinishes,
      averageRank: averages._avg.rank,
      averageScore: averages._avg.score,
      recentForm: performances.map((p) => ({
        date: p.date,
        rank: p.rank,
        score: p.score,
        tournament: p.tournament?.title,
      })),
    };
  }
}

export const performanceRepository = new PerformanceRepository();
