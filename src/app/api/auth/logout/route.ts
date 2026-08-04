import { clearSessionCookie } from "@/lib/auth";
import { successResponse } from "@/types/api";

export async function POST() {
  await clearSessionCookie();
  return successResponse(null, "Logged out successfully");
}