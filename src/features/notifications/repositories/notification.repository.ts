/* eslint-disable */
import { prisma } from "@/lib/prisma";
import type { Notification } from "@prisma/client";

export const notificationRepository = {
  async findMany(userId: string, limit: number = 20): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  async countUnread(userId: string): Promise<number> {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  },

  async create(data: {
    userId: string;
    title: string;
    message: string;
    type?: string;
    link?: string;
  }): Promise<Notification> {
    return prisma.notification.create({ data: data as any });
  },

  async markAsRead(id: string): Promise<Notification> {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  },

  async markAllAsRead(userId: string): Promise<void> {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  },
};
