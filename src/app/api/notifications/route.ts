import { notificationService } from "@/features/notifications/services/notification.service";
import { requireAuth } from "@/features/auth/utils/auth";
import { successResponse, errorResponse } from "@/types/api";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const user = await requireAuth();
    const notifications = await notificationService.getNotifications(user.id);
    return successResponse(notifications);
  } catch (error) {
    logger.error("Failed to fetch notifications", error as Error);
    return errorResponse("Internal server error", 500);
  }
}