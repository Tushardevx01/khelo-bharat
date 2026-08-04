import { NextRequest } from "next/server";
import { athleteRepository } from "@/repositories";
import { paginationSchema } from "@/validators";
import { successResponse, errorResponse, paginatedResponse } from "@/types/api";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const validated = paginationSchema.parse(params);

    const { athletes, total } = await athleteRepository.findMany({
      ...validated,
      sport: searchParams.get("sport") || undefined,
      city: searchParams.get("city") || undefined,
    });

    return paginatedResponse(athletes, {
      page: validated.page,
      pageSize: validated.pageSize,
      total,
    });
  } catch (error) {
    logger.error("Failed to fetch athletes", error as Error);
    return errorResponse("Internal server error", 500);
  }
}