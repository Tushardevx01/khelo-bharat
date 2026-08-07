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

  return userService.updateRole(id, role as never);
}

export async function completeOnboarding(role: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Create the user in the database (this fetches from Clerk)
  const user = await getOrCreateCurrentUser();
  if (!user) throw new Error("Failed to create user");

  // Update their role
  return userService.updateRole(user.id, role as never);
}

export async function getDashboardStats() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return userService.getDashboardStats();
}
