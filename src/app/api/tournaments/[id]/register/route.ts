import { NextRequest } from "next/server";
import { tournamentService } from "@/services";
import { getSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/types/api";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    const { id } = await params;

    const registration = await tournamentService.registerForTournament(
      id,
      session.userId,
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