"use server";

import { coachService } from "@/services/coach.service";
import { SportCategory } from "@prisma/client";
import { ForbiddenError } from "@/lib/errors";
import { requireCurrentUser, requireRole } from "@/lib/auth";
import { createCoachSchema } from "@/schemas/profile.schema";

export async function getCoachProfile() {
  const user = await requireCurrentUser();
  return coachService.getCoachByUserId(user.id);
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
  const user = await requireRole("COACH");
  return coachService.createCoachProfile(user.id, createCoachSchema.parse(data));
}

async function verifyCoachOwnership(coachId: string) {
  const user = await requireCurrentUser();
  
  if (user.role === "SUPER_ADMIN") return user;

  const coach = await coachService.getCoachById(coachId);
  if (coach.userId !== user.id) {
    throw new ForbiddenError("You do not have permission to modify this coach profile");
  }
  return user;
}

export async function updateCoachProfile(id: string, data: Record<string, unknown>) {
  await verifyCoachOwnership(id);
  return coachService.updateCoachProfile(id, data);
}

export async function getAllCoaches(page: number = 1, limit: number = 10, sportCategory?: string) {
  return coachService.getAllCoaches({ page, limit }, sportCategory as SportCategory | undefined);
}

export async function getAvailableCoaches(sportCategory?: string) {
  return coachService.getAvailableCoaches(sportCategory as SportCategory | undefined);
}
