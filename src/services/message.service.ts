import { messageRepository } from "@/repositories/message.repository";

export class MessageService {
  async sendMessage(senderId: string, receiverId: string, content: string) {
    return messageRepository.create({
      sender: { connect: { id: senderId } },
      receiver: { connect: { id: receiverId } },
      content,
    });
  }

  async getConversation(userId1: string, userId2: string, limit?: number) {
    return messageRepository.getConversation(userId1, userId2, limit);
  }

  async getConversations(userId: string) {
    return messageRepository.getConversations(userId);
  }

  async markAsRead(senderId: string, receiverId: string) {
    return messageRepository.markAsRead(senderId, receiverId);
  }

  async getUnreadCount(userId: string) {
    return messageRepository.getUnreadCount(userId);
  }

  async deleteMessage(id: string) {
    return messageRepository.delete(id);
  }
}

export const messageService = new MessageService();
