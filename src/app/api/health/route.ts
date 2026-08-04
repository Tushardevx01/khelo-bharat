import { successResponse } from "@/types/api";

export async function GET() {
  return successResponse({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV,
  });
}