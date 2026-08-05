import { notificationService } from "@/features/notifications/services/notification.service";
import { requireAuth } from "@/features/auth/utils/auth";
import { successResponse, errorResponse } from "@/types/api";

export async function POST() {
  try {
    const user = await requireAuth();
    await notificationService.markAllAsRead(user.id);
    return successResponse(null, "Notifications marked as read");
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}