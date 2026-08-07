"use server";

import { currentUser } from "@clerk/nextjs/server";
import { userService } from "@/services/user.service";
import { auth } from "@clerk/nextjs/server";

export async function getOrCreateCurrentUser() {
  const user = await currentUser();
  if (!user) return null;

  const email = user.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;

  return userService.getOrCreateUser({
    clerkId: user.id,
    email,
    name: user.fullName || user.firstName || "User",
    avatar: user.imageUrl,
  });
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  return userService.getUserByClerkId(userId);
}

export async function updateUserProfile(data: {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await userService.getUserByClerkId(userId);
  return userService.updateUser(user.id, data);
}

export async function updateAvatar(avatar: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await userService.getUserByClerkId(userId);
  return userService.updateAvatar(user.id, avatar);
}

export async function getAllUsers(page: number = 1, limit: number = 10, role?: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return userService.getAllUsers({ page, limit }, role as never);
}

export async function updateUserRole(id: string, role: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await userService.getUserByClerkId(userId);
  if (user.role !== "SUPER_ADMIN") {
    throw new Error("Forbidden: Only administrators can update roles");
  }

  return userService.updateRole(id, role as never);
}

export async function completeOnboarding(role: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Create the user in the database (this fetches from Clerk)
  const user = await getOrCreateCurrentUser();
  if (!user) throw new Error("Failed to create user");

  // Update their role
  const updatedUser = await userService.updateRole(user.id, role as never);

  // Auto-create default profiles to prevent NOT_FOUND errors
  try {
    if (role === "ATHLETE") {
      const { athleteService } = await import("@/services/athlete.service");
      await athleteService.createAthleteProfile(user.id, { sportCategory: "OTHER" }).catch(() => {});
    } else if (role === "COACH") {
      const { coachService } = await import("@/services/coach.service");
      await coachService.createCoachProfile(user.id, { sportCategory: "OTHER" }).catch(() => {});
    } else if (role === "SCHOOL_ADMIN") {
      const { schoolService } = await import("@/services/school.service");
      await schoolService.createSchoolProfile(user.id, { 
        schoolName: "My School",
        schoolType: "OTHER",
        address: "Unknown",
        city: "Unknown",
        state: "Unknown",
        pincode: "000000"
      }).catch(() => {});
    } else if (role === "SPONSOR") {
      const { sponsorService } = await import("@/services/sponsor.service");
      await sponsorService.createSponsorProfile(user.id, { companyName: "My Company" }).catch(() => {});
    }
  } catch (error) {
    console.error("Failed to auto-create profile:", error);
  }

  return updatedUser;
}

export async function getDashboardStats() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return userService.getDashboardStats();
}
