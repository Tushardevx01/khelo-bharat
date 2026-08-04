import { certificateRepository } from "@/repositories";
import { getSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/types/api";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const session = await getSession();
    const certificates = await certificateRepository.findByRecipient(session.userId);
    return successResponse(certificates);
  } catch (error) {
    logger.error("Failed to fetch certificates", error as Error);
    return errorResponse("Internal server error", 500);
  }
}