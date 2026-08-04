import { prisma } from "./prisma";

interface CreateNotificationParams {
  userId: string;
  title: string;
  message: string;
  type?: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  link?: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type = "INFO",
  link,
}: CreateNotificationParams) {
  return prisma.notification.create({
    data: { userId, title, message, type, link },
  });
}

export async function getUnreadCount(userId: string) {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

export async function markAsRead(notificationId: string) {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

export async function markAllAsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}
