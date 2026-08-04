"use server";

import { TournamentService } from "../services/tournament.service";
import { AppError } from "@/core/errors/AppError";

export type ActionResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function getActiveTournamentsAction(): Promise<ActionResponse> {
  try {
    const data = await TournamentService.getActiveTournaments();
    return { success: true, data };
  } catch (error: any) {
    if (error instanceof AppError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
