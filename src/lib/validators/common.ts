import { z } from "zod";

export const idSchema = z.string().uuid("Invalid ID format");

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number").optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/).optional(),
  bio: z.string().max(1000).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  pincode: z.string().regex(/^\d{6}$/).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

export const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().max(1000).optional(),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url().optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(["PARTICIPATION", "ACHIEVEMENT", "MERIT", "COMPLETION"]),
  recipientId: z.string().uuid(),
  tournamentId: z.string().uuid().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type AchievementInput = z.infer<typeof achievementSchema>;
export type CertificateInput = z.infer<typeof certificateSchema>;
