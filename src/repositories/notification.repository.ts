import { prisma } from "@/lib/prisma";
import { Prisma, NotificationType } from "@prisma/client";

export class NotificationRepository {
  async create(data: Prisma.NotificationCreateInput) {
    return prisma.notification.create({ data });
  }

  async findByUser(userId: string, limit: number = 20) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  async createMany(userId: string, type: NotificationType, title: string, message: string, data?: Prisma.InputJsonValue) {
    return prisma.notification.create({
      data: { userId, type, title, message, data },
    });
  }
}

export const notificationRepository = new NotificationRepository();
