import { userService } from "@/features/auth/services/user.service";
import { getSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/types/api";
import { UnauthorizedError } from "@/lib/errors";

export async function GET() {
  try {
    const session = await getSession();
    const user = await userService.getProfile(session.userId);
    return successResponse({ user });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return errorResponse(error.message, 401);
    }
    return errorResponse("Internal server error", 500);
  }
}