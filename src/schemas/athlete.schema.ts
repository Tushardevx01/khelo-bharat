import { z } from "zod";

export const createAthleteSchema = z.object({
  sportCategory: z.enum([
    "CRICKET", "FOOTBALL", "BASKETBALL", "TENNIS", "BADMINTON",
    "ATHLETICS", "SWIMMING", "VOLLEYBALL", "HOCKEY", "KABADDI", "OTHER"
  ]),
  schoolId: z.string().uuid().optional(),
  coachId: z.string().uuid().optional(),
  height: z.number().min(50).max(250).optional(),
  weight: z.number().min(20).max(200).optional(),
  experience: z.string().max(500).optional(),
});

export const updateAthleteSchema = createAthleteSchema.partial();

export const athleteQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sportCategory: z.string().optional(),
  sortBy: z.enum(["ranking", "createdAt", "achievementsCount"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
