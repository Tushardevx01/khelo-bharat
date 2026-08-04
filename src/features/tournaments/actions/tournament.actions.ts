"use server";

import { tournamentService } from "../services/tournament.service";
import { AppError } from "@/lib/errors";

export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function getActiveTournamentsAction(): Promise<ActionResponse> {
  try {
    const data = await tournamentService.getTournaments({ page: 1, pageSize: 50, status: "REGISTRATION_OPEN" });
    return { success: true, data };
  } catch (error: any) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
