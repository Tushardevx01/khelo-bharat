import { BaseRepository } from "@/core/database/BaseRepository";
import { AthleteProfile, Prisma } from "@prisma/client";
import { prisma } from "@/core/database/prisma";

export class AthleteRepository extends BaseRepository<
  AthleteProfile,
  Prisma.AthleteProfileUncheckedCreateInput,
  Prisma.AthleteProfileUpdateInput
> {
  constructor() {
    super("athleteProfile");
  }

  async findByUserId(userId: string): Promise<AthleteProfile | null> {
    return this.model.findUnique({
      where: { userId },
      include: {
        user: {
          select: { name: true, email: true, avatar: true },
        },
        achievements: true,
        performanceRecords: true,
      },
    });
  }

  async getDashboardStats(userId: string) {
    const profile = await this.findByUserId(userId);
    if (!profile) return null;

    // Fetch upcoming events from TournamentRegistration where status is APPROVED
    const upcomingEvents = await prisma.tournamentRegistration.findMany({
      where: {
        participantId: profile.id,
        status: "APPROVED",
        tournament: {
          startDate: { gte: new Date() },
        },
      },
      include: { tournament: true },
      take: 4,
      orderBy: { tournament: { startDate: "asc" } },
    });

    return {
      profile,
      upcomingEvents,
    };
  }
}
