import { notificationService } from "@/features/notifications/services/notification.service";
import { getSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/types/api";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const session = await getSession();
    const notifications = await notificationService.getNotifications(session.userId);
    return successResponse(notifications);
  } catch (error) {
    logger.error("Failed to fetch notifications", error as Error);
    return errorResponse("Internal server error", 500);
  }
}