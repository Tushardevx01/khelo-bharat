import { AthleteRepository } from "../repositories/athlete.repository";
import { AthleteProfileInput } from "../validators";
import { ValidationError, NotFoundError } from "@/core/errors/AppError";

const athleteRepository = new AthleteRepository();

export class AthleteService {
  static async getProfileByUserId(userId: string) {
    const profile = await athleteRepository.findByUserId(userId);
    return profile;
  }

  static async getDashboardData(userId: string) {
    const stats = await athleteRepository.getDashboardStats(userId);
    if (!stats) {
      throw new NotFoundError("Athlete profile not found");
    }
    return stats;
  }

  static async setupProfile(userId: string, input: AthleteProfileInput) {
    const existing = await athleteRepository.findByUserId(userId);
    if (existing) {
      throw new ValidationError("Profile already exists for this user.");
    }

    const profile = await athleteRepository.create({
      userId,
      city: input.city,
      state: input.state,
      bio: input.bio,
      sports: input.sports,
      position: input.position,
      dateOfBirth: input.dateOfBirth ? new Date(input.dateOfBirth) : null,
      gender: input.gender,
    });

    return profile;
  }
}
