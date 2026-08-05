"use server";

import { auth } from "@clerk/nextjs/server";
import { messageService } from "@/services/message.service";

export async function sendMessage(receiverId: string, content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return messageService.sendMessage(user.id, receiverId, content);
}

export async function getConversation(otherUserId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return messageService.getConversation(user.id, otherUserId);
}

export async function getConversations() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return messageService.getConversations(user.id);
}

export async function markAsRead(senderId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return messageService.markAsRead(senderId, user.id);
}

export async function getUnreadMessageCount() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { userService } = await import("@/services/user.service");
  const user = await userService.getUserByClerkId(userId);

  return messageService.getUnreadCount(user.id);
}
