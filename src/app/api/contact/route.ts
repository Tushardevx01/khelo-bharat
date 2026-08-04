import { NextRequest } from "next/server";
import { contactService } from "@/features/contact/services/contact.service";
import { contactSchema } from "@/lib/validators/common";
import { successResponse, errorResponse } from "@/types/api";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, details);
    }

    const data = await contactService.submitContact(result.data);
    return successResponse(null, data.message, 201);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Failed to submit contact form", error as Error);
    return errorResponse("Internal server error", 500);
  }
}