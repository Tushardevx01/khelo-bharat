import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum(["ATHLETE", "SCHOOL_ADMIN", "COACH", "SPONSOR"]),
});

export const tournamentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  sportId: z.string().uuid("Invalid sport ID"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  registrationDeadline: z.string().min(1, "Registration deadline is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  format: z.enum(["LEAGUE", "KNOCKOUT", "GROUP", "MIXED"]),
  maxParticipants: z.number().min(2, "At least 2 participants required"),
  entryFee: z.number().min(0, "Entry fee must be non-negative"),
  prizePool: z.number().min(0, "Prize pool must be non-negative"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const profileSchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
  bio: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const certificateSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  type: z.enum(["PARTICIPATION", "ACHIEVEMENT", "MERIT", "COMPLETION"]),
  recipientId: z.string().uuid(),
  tournamentId: z.string().uuid().optional(),
});

export const achievementSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  date: z.string().min(1),
  category: z.string().min(1),
  imageUrl: z.string().url().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type TournamentInput = z.infer<typeof tournamentSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type CertificateInput = z.infer<typeof certificateSchema>;
export type AchievementInput = z.infer<typeof achievementSchema>;
