import { athleteRepository } from "../repositories/athlete.repository";
import { AthleteProfileInput } from "../validators";
import { ValidationError, NotFoundError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";

export class AthleteService {
  static async getProfileByUserId(userId: string) {
    const profile = await athleteRepository.findByUserId(userId);
    return profile;
  }

  static async getDashboardData(userId: string) {
    const profile = await athleteRepository.findByUserId(userId);
    if (!profile) return null;

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

    return { profile, upcomingEvents };
  }

  static async setupProfile(userId: string, input: AthleteProfileInput) {
    const existing = await athleteRepository.findByUserId(userId);
    if (existing) {
      throw new ValidationError({ error: ["Profile already exists for this user."] });
    }

    const profile = await prisma.athleteProfile.create({
      data: {
        userId,
        city: input.city,
        state: input.state,
        bio: input.bio,
        sports: input.sports,
        position: input.position,
        dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
        gender: input.gender,
      }
    });

    return profile;
  }
}
