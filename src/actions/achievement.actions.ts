"use server";

import { auth } from "@clerk/nextjs/server";
import { achievementService } from "@/services/achievement.service";

export async function addAchievement(data: {
  athleteId: string;
  title: string;
  description?: string;
  sport: string;
  date: Date;
  image?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return achievementService.addAchievement(data);
}

export async function getAthleteAchievements(athleteId: string) {
  return achievementService.getAthleteAchievements(athleteId);
}

export async function verifyAchievement(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return achievementService.verifyAchievement(id, userId);
}
