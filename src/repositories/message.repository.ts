import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class MessageRepository {
  async create(data: Prisma.MessageCreateInput) {
    return prisma.message.create({ data });
  }

  async getConversation(userId1: string, userId2: string, limit: number = 50) {
    return prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 },
        ],
        deletedAt: null,
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
        receiver: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: "asc" },
      take: limit,
    });
  }

  async getConversations(userId: string) {
    const messages = await prisma.message.groupBy({
      by: ["senderId", "receiverId"],
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
        deletedAt: null,
      },
      _max: { createdAt: true },
      orderBy: { _max: { createdAt: "desc" } },
    });

    const conversationIds = new Set<string>();
    messages.forEach((m) => {
      const otherId = m.senderId === userId ? m.receiverId : m.senderId;
      conversationIds.add(otherId);
    });

    const conversations = await Promise.all(
      Array.from(conversationIds).map(async (otherId) => {
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: otherId },
              { senderId: otherId, receiverId: userId },
            ],
            deletedAt: null,
          },
          include: {
            sender: { select: { id: true, name: true, avatar: true } },
            receiver: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: "desc" },
        });

        const unreadCount = await prisma.message.count({
          where: {
            senderId: otherId,
            receiverId: userId,
            isRead: false,
            deletedAt: null,
          },
        });

        return { lastMessage, unreadCount };
      })
    );

    return conversations.sort((a, b) => {
      if (!a.lastMessage || !b.lastMessage) return 0;
      return new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime();
    });
  }

  async markAsRead(senderId: string, receiverId: string) {
    return prisma.message.updateMany({
      where: { senderId, receiverId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
  }

  async getUnreadCount(userId: string) {
    return prisma.message.count({
      where: { receiverId: userId, isRead: false, deletedAt: null },
    });
  }

  async delete(id: string) {
    return prisma.message.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const messageRepository = new MessageRepository();
