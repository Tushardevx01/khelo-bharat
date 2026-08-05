"use server";

import { auth } from "@clerk/nextjs/server";
import { notificationService } from "@/services/notification.service";

export async function getNotifications(limit?: number) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return notificationService.getUserNotifications(user.id, limit);
}

export async function markNotificationAsRead(id: string) {
  return notificationService.markAsRead(id);
}

export async function markAllNotificationsAsRead() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return notificationService.markAllAsRead(user.id);
}

export async function getUnreadNotificationCount() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return notificationService.getUnreadCount(user.id);
}
