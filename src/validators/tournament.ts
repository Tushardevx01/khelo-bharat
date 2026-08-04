import { z } from "zod";

export const createTournamentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be at most 200 characters"),
  description: z.string().max(2000, "Description must be at most 2000 characters").optional(),
  sportId: z.string().uuid("Invalid sport ID"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  registrationDeadline: z.string().min(1, "Registration deadline is required"),
  location: z.string().min(1, "Location is required"),
  address: z.string().max(500).optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  format: z.enum(["LEAGUE", "KNOCKOUT", "GROUP", "MIXED"]),
  maxParticipants: z.number().int().min(2, "At least 2 participants required").max(10000),
  entryFee: z.number().min(0, "Entry fee must be non-negative"),
  prizePool: z.number().min(0, "Prize pool must be non-negative"),
  imageUrl: z.string().url("Invalid image URL").optional(),
}).refine(
  (data) => new Date(data.endDate) >= new Date(data.startDate),
  { message: "End date must be after start date", path: ["endDate"] }
).refine(
  (data) => new Date(data.registrationDeadline) < new Date(data.startDate),
  { message: "Registration deadline must be before start date", path: ["registrationDeadline"] }
);

export const tournamentQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
  sport: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  city: z.string().optional(),
});

export type CreateTournamentInput = z.infer<typeof createTournamentSchema>;
export type TournamentQueryInput = z.infer<typeof tournamentQuerySchema>;
