import { prisma } from "@/lib/prisma";

export class PlatformRepository {
  async getPublicStats() {
    const [athletes, schools, tournaments, schoolStates, tournamentStates] = await Promise.all([
      prisma.athlete.count(),
      prisma.school.count({ where: { deletedAt: null } }),
      prisma.tournament.count({ where: { deletedAt: null } }),
      prisma.school.findMany({ where: { deletedAt: null, state: { not: null } }, select: { state: true }, distinct: ["state"] }),
      prisma.tournament.findMany({ where: { deletedAt: null, state: { not: null } }, select: { state: true }, distinct: ["state"] }),
    ]);

    return {
      athletes,
      schools,
      tournaments,
      states: new Set([...schoolStates.map(({ state }) => state), ...tournamentStates.map(({ state }) => state)]).size,
    };
  }
}

export const platformRepository = new PlatformRepository();
