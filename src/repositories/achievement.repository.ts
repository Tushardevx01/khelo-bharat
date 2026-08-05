import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class AchievementRepository {
  async create(data: Prisma.AchievementCreateInput) {
    return prisma.achievement.create({ data });
  }

  async findByAthlete(athleteId: string) {
    return prisma.achievement.findMany({
      where: { athleteId },
      orderBy: { date: "desc" },
    });
  }

  async verify(id: string, verifiedBy: string) {
    return prisma.achievement.update({
      where: { id },
      data: { isVerified: true, verifiedBy },
    });
  }

  async delete(id: string) {
    return prisma.achievement.delete({ where: { id } });
  }
}

export const achievementRepository = new AchievementRepository();
