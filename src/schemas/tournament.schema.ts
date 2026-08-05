import { z } from "zod";

export const createTournamentSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  sportCategory: z.enum([
    "CRICKET", "FOOTBALL", "BASKETBALL", "TENNIS", "BADMINTON",
    "ATHLETICS", "SWIMMING", "VOLLEYBALL", "HOCKEY", "KABADDI", "OTHER"
  ]),
  startDate: z.coerce.date().min(new Date()),
  endDate: z.coerce.date(),
  registrationDeadline: z.coerce.date().optional(),
  location: z.string().min(3).max(200),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  maxParticipants: z.number().min(2).max(10000).optional(),
  entryFee: z.number().min(0).optional(),
  prizePool: z.number().min(0).optional(),
  rules: z.string().max(5000).optional(),
  poster: z.string().url().optional(),
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
}).refine((data) => !data.registrationDeadline || data.registrationDeadline >= new Date(), {
  message: "Registration deadline must be in the future",
  path: ["registrationDeadline"],
});

export const updateTournamentSchema = createTournamentSchema.partial();

export const tournamentQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sportCategory: z.string().optional(),
  status: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  sortBy: z.enum(["startDate", "createdAt", "totalParticipants"]).default("startDate"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
