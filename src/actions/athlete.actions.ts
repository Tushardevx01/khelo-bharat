"use server";

import { auth } from "@clerk/nextjs/server";
import { athleteService } from "@/services/athlete.service";
import { SportCategory } from "@prisma/client";

export async function getAthleteProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return athleteService.getAthleteByUserId(userId);
}

export async function getAthleteById(id: string) {
  return athleteService.getAthleteById(id);
}

export async function createAthleteProfile(data: {
  sportCategory: SportCategory;
  schoolId?: string;
  coachId?: string;
  height?: number;
  weight?: number;
  experience?: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return athleteService.createAthleteProfile(userId, data);
}

async function verifyAthleteOwnership(athleteId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);
  
  if (user.role === "SUPER_ADMIN") return;

  const athlete = await athleteService.getAthleteById(athleteId);
  if (athlete.userId !== user.id) {
    throw new Error("Forbidden: You do not have permission to modify this athlete profile");
  }
}

export async function updateAthleteProfile(id: string, data: {
  sportCategory?: SportCategory;
  height?: number;
  weight?: number;
  experience?: number;
}) {
  await verifyAthleteOwnership(id);
  return athleteService.updateAthleteProfile(id, data);
}

export async function getAllAthletes(page: number = 1, limit: number = 10, sportCategory?: string, search?: string) {
  return athleteService.getAllAthletes(
    { page, limit, search },
    sportCategory as SportCategory | undefined
  );
}

export async function getFeaturedAthletes(limit?: number) {
  return athleteService.getFeaturedAthletes(limit);
}
