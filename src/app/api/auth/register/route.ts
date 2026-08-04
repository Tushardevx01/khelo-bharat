import { NextRequest } from "next/server";
import { userService } from "@/services";
import { registerSchema } from "@/validators";
import { successResponse, errorResponse } from "@/types/api";
import { checkRateLimit } from "@/lib/rate-limit";
import { AppError, ValidationError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    checkRateLimit("register", 5);

    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, details);
    }

    const data = await userService.register({ ...result.data, role: result.data.role ?? "ATHLETE" });
    return successResponse(data, "Registration successful", 201);
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Registration failed", error as Error);
    return errorResponse("Internal server error", 500);
  }
}