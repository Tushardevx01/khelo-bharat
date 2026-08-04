import { z } from "zod";

export const AthleteProfileSchema = z.object({
  dateOfBirth: z.string().or(z.date()).optional(),
  gender: z.string().optional(),
  city: z.string().min(2, "City is required").max(100),
  state: z.string().min(2, "State is required").max(100),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  sports: z.string().min(2, "At least one sport is required"),
  position: z.string().optional(),
});

export type AthleteProfileInput = z.infer<typeof AthleteProfileSchema>;
