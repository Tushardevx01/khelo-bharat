import { z } from "zod";

export const sendMessageSchema = z.object({
  receiverId: z.string().uuid(),
  content: z.string().min(1).max(5000),
});

export const messageQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(50),
});
