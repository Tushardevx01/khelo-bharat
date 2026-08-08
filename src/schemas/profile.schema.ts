import { z } from "zod";

const sportCategorySchema = z.enum([
  "CRICKET", "FOOTBALL", "BASKETBALL", "TENNIS", "BADMINTON", "ATHLETICS",
  "SWIMMING", "VOLLEYBALL", "HOCKEY", "KABADDI", "CHESS", "TABLE_TENNIS",
  "WRESTLING", "BOXING", "WEIGHTLIFTING", "SHOOTING", "ARCHERY", "OTHER",
]);

export const createCoachSchema = z.object({
  sportCategory: sportCategorySchema,
  specialization: z.string().trim().max(200).optional(),
  certifications: z.array(z.string().trim().min(1).max(200)).max(20).default([]),
  experience: z.number().int().min(0).max(100).optional(),
  hourlyRate: z.number().nonnegative().max(1_000_000).optional(),
});

export const createSchoolSchema = z.object({
  schoolName: z.string().trim().min(2).max(200),
  schoolType: z.string().trim().min(2).max(100),
  address: z.string().trim().min(5).max(500),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid six-digit PIN code"),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  website: z.string().url().optional(),
  principalName: z.string().trim().min(2).max(150).optional(),
  establishedYear: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  totalStudents: z.number().int().nonnegative().max(10_000_000).optional(),
  sportsFacilities: z.array(z.string().trim().min(1).max(100)).max(100).default([]),
});

export const createSponsorSchema = z.object({
  companyName: z.string().trim().min(2).max(200),
  companyType: z.string().trim().max(100).optional(),
  industry: z.string().trim().max(100).optional(),
  budget: z.number().nonnegative().max(1_000_000_000).optional(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
});
