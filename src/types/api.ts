import { NextResponse } from "next/server";

type SuccessResponse<T = null> = {
  success: true;
  data?: T;
  message?: string;
};

type ErrorResponse = {
  success: false;
  error: string;
  details?: Record<string, string[]>;
};

export function successResponse<T>(data?: T, message?: string, status = 200): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function errorResponse(error: string, status = 500, details?: Record<string, string[]>): NextResponse<ErrorResponse> {
  return NextResponse.json({ success: false, error, details }, { status });
}

export function paginatedResponse<T>(
  data: T[],
  pagination: { page: number; pageSize: number; total: number },
  message?: string
): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    pagination: {
      ...pagination,
      totalPages: Math.ceil(pagination.total / pagination.pageSize),
    },
    message,
  });
}
