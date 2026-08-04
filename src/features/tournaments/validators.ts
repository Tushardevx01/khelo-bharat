import { z } from "zod";

export const TournamentStatus = z.enum(["DRAFT", "UPCOMING", "REGISTRATION_OPEN", "REGISTRATION_CLOSED", "ONGOING", "COMPLETED", "CANCELLED"]);

export const TournamentSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  sportId: z.string(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  city: z.string().optional(),
  state: z.string().optional(),
});

export type TournamentInput = z.infer<typeof TournamentSchema>;
