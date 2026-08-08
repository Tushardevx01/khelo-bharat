export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, "CONFLICT", 409);
    this.name = "ConflictError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = "Too many requests") {
    super(message, "RATE_LIMITED", 429);
    this.name = "RateLimitError";
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Something went wrong") {
    super(message, "INTERNAL_SERVER_ERROR", 500);
    this.name = "InternalServerError";
  }
}

export function handleApiError(error: unknown): {
  success: false;
  error: { code: string; message: string };
  status: number;
} {
  if (error instanceof AppError) {
    return {
      success: false,
      error: { code: error.code, message: error.message },
      status: error.statusCode,
    };
  }
  console.error("Unexpected application error", error);
  return {
    success: false,
    error: { code: "INTERNAL_SERVER_ERROR", message: "Something went wrong" },
    status: 500,
  };
}
