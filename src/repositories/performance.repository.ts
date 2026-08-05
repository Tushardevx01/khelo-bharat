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
    const performances = await prisma.performance.findMany({
      where: { athleteId },
      include: {
        tournament: { select: { id: true, title: true } },
      },
      orderBy: { date: "desc" },
    });

    const totalCompetitions = performances.length;
    const wins = performances.filter((p) => p.rank === 1).length;
    const podiumFinishes = performances.filter((p) => p.rank && p.rank <= 3).length;
    const averageRank = performances.reduce((sum, p) => sum + (p.rank || 0), 0) / totalCompetitions || 0;

    return {
      totalCompetitions,
      wins,
      podiumFinishes,
      averageRank: Math.round(averageRank * 10) / 10,
      recentForm: performances.slice(0, 5).map((p) => ({
        date: p.date,
        rank: p.rank,
        score: p.score,
        tournament: p.tournament?.title,
      })),
    };
  }
}

export const performanceRepository = new PerformanceRepository();
