import { achievementRepository } from "@/repositories/achievement.repository";

export class AchievementService {
  async addAchievement(data: {
    athleteId: string;
    title: string;
    description?: string;
    sport: string;
    date: Date;
    image?: string;
  }) {
    return achievementRepository.create(data);
  }

  async getAthleteAchievements(athleteId: string) {
    return achievementRepository.findByAthlete(athleteId);
  }

  async verifyAchievement(id: string, verifiedBy: string) {
    return achievementRepository.verify(id, verifiedBy);
  }

  async deleteAchievement(id: string) {
    return achievementRepository.delete(id);
  }
}

export const achievementService = new AchievementService();
