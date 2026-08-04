"use server";

import { AthleteService } from "../services/athlete.service";
import { AthleteProfileInput, AthleteProfileSchema } from "../validators";
import { AppError } from "@/core/errors/AppError";
import { ZodError } from "zod";
import { getSession } from "@/features/auth/utils/session";
import { revalidatePath } from "next/cache";

export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
};

export async function getDashboardAction(): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session) throw new AppError("Unauthorized", 401);

    const data = await AthleteService.getDashboardData(session.userId);
    return { success: true, data };
  } catch (error: any) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function setupProfileAction(input: AthleteProfileInput): Promise<ActionResponse> {
  try {
    const session = await getSession();
    if (!session) throw new AppError("Unauthorized", 401);

    const validatedData = AthleteProfileSchema.parse(input);
    const profile = await AthleteService.setupProfile(session.userId, validatedData);
    
    revalidatePath("/athlete");
    return { success: true, data: profile };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return { success: false, validationErrors: error.flatten().fieldErrors };
    }
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
