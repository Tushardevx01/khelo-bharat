"use server";

import { auth } from "@clerk/nextjs/server";
import { coachService } from "@/services/coach.service";
import { SportCategory } from "@prisma/client";

export async function getCoachProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return coachService.getCoachByUserId(userId);
}

export async function getCoachById(id: string) {
  return coachService.getCoachById(id);
}

export async function createCoachProfile(data: {
  sportCategory: SportCategory;
  specialization?: string;
  certifications?: string[];
  experience?: number;
  hourlyRate?: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return coachService.createCoachProfile(userId, data);
}

export async function updateCoachProfile(id: string, data: Record<string, unknown>) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return coachService.updateCoachProfile(id, data);
}

export async function getAllCoaches(page: number = 1, limit: number = 10, sportCategory?: string) {
  return coachService.getAllCoaches({ page, limit }, sportCategory as SportCategory | undefined);
}

export async function getAvailableCoaches(sportCategory?: string) {
  return coachService.getAvailableCoaches(sportCategory as SportCategory | undefined);
}
