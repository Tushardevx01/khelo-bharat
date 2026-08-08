"use server";

import { athleteService } from "@/services/athlete.service";
import { SportCategory } from "@prisma/client";
import { ForbiddenError } from "@/lib/errors";
import { requireCurrentUser, requireRole } from "@/lib/auth";
import { createAthleteSchema, updateAthleteSchema } from "@/schemas/athlete.schema";
import { auditService } from "@/services/audit.service";

export async function getAthleteProfile() {
  const user = await requireCurrentUser();

  return athleteService.getAthleteByUserId(user.id);
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
  await requireRole("ATHLETE");
  const user = await requireCurrentUser();
  const profile = await athleteService.createAthleteProfile(user.id, createAthleteSchema.parse(data));
  await auditService.record({ userId: user.id, action: "ATHLETE_PROFILE_CREATED", entity: "Athlete", entityId: profile.id });
  return profile;
}

async function verifyAthleteOwnership(athleteId: string) {
  const user = await requireCurrentUser();
  
  if (user.role === "SUPER_ADMIN") return user;

  const athlete = await athleteService.getAthleteById(athleteId);
  if (athlete.userId !== user.id) {
    throw new ForbiddenError("You do not have permission to modify this athlete profile");
  }
  return user;
}

export async function updateAthleteProfile(id: string, data: {
  sportCategory?: SportCategory;
  height?: number;
  weight?: number;
  experience?: number;
}) {
  const user = await verifyAthleteOwnership(id);
  const profile = await athleteService.updateAthleteProfile(id, updateAthleteSchema.parse(data));
  await auditService.record({ userId: user.id, action: "ATHLETE_PROFILE_UPDATED", entity: "Athlete", entityId: id });
  return profile;
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
