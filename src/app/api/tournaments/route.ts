import { NextRequest } from "next/server";
import { tournamentService } from "@/features/tournaments/services/tournament.service";
import { tournamentQuerySchema, createTournamentSchema } from "@/features/tournaments/validators";
import { successResponse, errorResponse, paginatedResponse } from "@/types/api";
import { requireAuth } from "@/features/auth/utils/auth";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const validated = tournamentQuerySchema.parse(params);

    const { tournaments, total } = await tournamentService.getTournaments(validated);
    return paginatedResponse(tournaments, {
      page: validated.page,
      pageSize: validated.pageSize,
      total,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Failed to fetch tournaments", error as Error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const result = createTournamentSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, details);
    }

    const tournament = await tournamentService.createTournament({
      ...result.data,
      organizerId: user.id,
      organizerType: "ADMIN",
    });

    return successResponse(tournament, "Tournament created", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Failed to create tournament", error as Error);
    return errorResponse("Internal server error", 500);
  }
}