/* eslint-disable */
"use server";

import { AthleteService } from "../services/athlete.service";
import { AthleteProfileInput, AthleteProfileSchema } from "../validators";
import { AppError } from "@/lib/errors";
import { ZodError } from "zod";
import { getCurrentUser } from "@/features/auth/utils/auth";
import { revalidatePath } from "next/cache";

export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: Record<string, string[]>;
};

export async function getDashboardAction(): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (!user) throw new AppError("Unauthorized", 401);

    const data = await AthleteService.getDashboardData(user.id);
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
    const user = await getCurrentUser();
    if (!user) throw new AppError("Unauthorized", 401);

    const validatedData = AthleteProfileSchema.parse(input);
    const profile = await AthleteService.setupProfile(user.id, validatedData);
    
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
