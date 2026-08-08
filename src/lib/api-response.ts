import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/errors";

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(error: unknown) {
  const result = handleApiError(error);
  return NextResponse.json(
    { success: result.success, error: result.error },
    { status: result.status },
  );
}
