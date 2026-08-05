import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number");
export const nameSchema = z.string().min(2).max(100);
export const uuidSchema = z.string().uuid();

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const searchSchema = z.object({
  query: z.string().min(1),
  type: z.enum(["athletes", "tournaments", "schools", "sponsors"]).optional(),
});
