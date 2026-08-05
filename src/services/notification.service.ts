import { notificationRepository } from "@/repositories/notification.repository";
import { NotificationType } from "@prisma/client";

export class NotificationService {
  async createNotification(userId: string, type: NotificationType, title: string, message: string, data?: Record<string, unknown>) {
    return notificationRepository.create({
      user: { connect: { id: userId } },
      type,
      title,
      message,
      data: data as never,
    });
  }

  async getUserNotifications(userId: string, limit?: number) {
    return notificationRepository.findByUser(userId, limit);
  }

  async markAsRead(id: string) {
    return notificationRepository.markAsRead(id);
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(userId);
  }

  async getUnreadCount(userId: string) {
    return notificationRepository.getUnreadCount(userId);
  }
}

export const notificationService = new NotificationService();
