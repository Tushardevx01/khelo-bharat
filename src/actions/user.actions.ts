"use server";

import { userService } from "@/services/user.service";
import { auth } from "@clerk/nextjs/server";
import { requireCurrentUser, requireRole, resolveCurrentUser } from "@/lib/auth";
import { updateProfileSchema, userRoleSchema } from "@/schemas/user.schema";
import { UserRole } from "@prisma/client";

export async function getOrCreateCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;
  return resolveCurrentUser();
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  return requireCurrentUser();
}

export async function updateUserProfile(data: {
  name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}) {
  const user = await requireCurrentUser();
  const input = updateProfileSchema.parse(data);
  return userService.updateUser(user.id, input);
}

export async function updateAvatar(avatar: string) {
  const user = await requireCurrentUser();
  return userService.updateAvatar(user.id, avatar);
}

export async function getAllUsers(page: number = 1, limit: number = 10, role?: string) {
  await requireRole("SUPER_ADMIN");
  return userService.getAllUsers(
    { page, limit },
    role ? userRoleSchema.parse(role) : undefined,
  );
}

export async function updateUserRole(id: string, role: string) {
  await requireRole("SUPER_ADMIN");
  return userService.updateRole(id, userRoleSchema.parse(role));
}

export async function completeOnboarding(role: string) {
  const user = await resolveCurrentUser();
  const selectedRole = userRoleSchema.parse(role);
  if (selectedRole === "SUPER_ADMIN") {
    throw new Error("Administrator access cannot be selected during onboarding");
  }
  return userService.updateRole(user.id, selectedRole as UserRole);
}

export async function getDashboardStats() {
  await requireRole("SUPER_ADMIN");
  return userService.getDashboardStats();
}
