"use server";

import { auth } from "@clerk/nextjs/server";
import { schoolService } from "@/services/school.service";

export async function getSchoolProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return schoolService.getSchoolByUserId(userId);
}

export async function getSchoolById(id: string) {
  return schoolService.getSchoolById(id);
}

export async function createSchoolProfile(data: {
  schoolName: string;
  schoolType: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  website?: string;
  principalName?: string;
  establishedYear?: number;
  totalStudents?: number;
  sportsFacilities?: string[];
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return schoolService.createSchoolProfile(userId, data);
}

async function verifySchoolOwnership(schoolId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);
  
  if (user.role === "SUPER_ADMIN") return;

  const school = await schoolService.getSchoolById(schoolId);
  if (school.userId !== user.id) {
    throw new Error("Forbidden: You do not have permission to modify this school profile");
  }
}

export async function updateSchoolProfile(id: string, data: Record<string, unknown>) {
  await verifySchoolOwnership(id);
  return schoolService.updateSchoolProfile(id, data);
}

export async function getAllSchools(page: number = 1, limit: number = 10, search?: string, filters?: { city?: string; state?: string }) {
  return schoolService.getAllSchools({ page, limit, search }, filters);
}

export async function getVerifiedSchools(limit?: number) {
  return schoolService.getVerifiedSchools(limit);
}
