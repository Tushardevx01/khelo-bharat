import { certificateRepository } from "@/features/certificates/repositories/certificate.repository";
import { requireAuth } from "@/features/auth/utils/auth";
import { successResponse, errorResponse } from "@/types/api";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const user = await requireAuth();
    const certificates = await certificateRepository.findByRecipient(user.id);
    return successResponse(certificates);
  } catch (error) {
    logger.error("Failed to fetch certificates", error as Error);
    return errorResponse("Internal server error", 500);
  }
}