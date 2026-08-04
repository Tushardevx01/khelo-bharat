import { notificationService } from "@/features/notifications/services/notification.service";
import { getSession } from "@/lib/auth";
import { successResponse, errorResponse } from "@/types/api";

export async function POST() {
  try {
    const session = await getSession();
    await notificationService.markAllAsRead(session.userId);
    return successResponse(null, "Notifications marked as read");
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}