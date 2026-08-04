import { notificationRepository } from "@/repositories";

export const notificationService = {
  async getNotifications(userId: string, limit: number = 20) {
    return notificationRepository.findMany(userId, limit);
  },

  async getUnreadCount(userId: string) {
    return notificationRepository.countUnread(userId);
  },

  async markAsRead(notificationId: string) {
    return notificationRepository.markAsRead(notificationId);
  },

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(userId);
  },

  async createNotification(data: {
    userId: string;
    title: string;
    message: string;
    type?: string;
    link?: string;
  }) {
    return notificationRepository.create(data);
  },
};
