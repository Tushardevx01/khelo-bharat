import { NextRequest } from "next/server";
import { tournamentService } from "@/features/tournaments/services/tournament.service";
import { successResponse, errorResponse } from "@/types/api";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tournament = await tournamentService.getTournamentById(id);
    return successResponse(tournament);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Failed to fetch tournament", error as Error);
    return errorResponse("Internal server error", 500);
  }
}