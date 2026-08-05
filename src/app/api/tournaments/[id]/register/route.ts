import { NextRequest } from "next/server";
import { tournamentService } from "@/features/tournaments/services/tournament.service";
import { requireAuth } from "@/features/auth/utils/auth";
import { successResponse, errorResponse } from "@/types/api";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    const registration = await tournamentService.registerForTournament(
      id,
      user.id,
      "ATHLETE"
    );

    return successResponse(registration, "Registered successfully", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Failed to register for tournament", error as Error);
    return errorResponse("Internal server error", 500);
  }
}