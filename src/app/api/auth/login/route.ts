import { NextRequest } from "next/server";
import { userService } from "@/services";
import { loginSchema } from "@/validators";
import { successResponse, errorResponse } from "@/types/api";
import { checkRateLimit } from "@/lib/rate-limit";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    checkRateLimit("login", 5);

    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      const details = result.error.flatten().fieldErrors;
      return errorResponse("Validation failed", 400, details);
    }

    const data = await userService.login(result.data);
    return successResponse(data, "Login successful");
  } catch (error) {
    if (error instanceof AppError) {
      return errorResponse(error.message, error.statusCode);
    }
    logger.error("Login failed", error as Error);
    return errorResponse("Internal server error", 500);
  }
}