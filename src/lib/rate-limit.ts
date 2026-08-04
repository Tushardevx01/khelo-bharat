import { RATE_LIMIT } from "@/config";
import { RateLimitError } from "./errors";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(
  key: string,
  limit: number = RATE_LIMIT.MAX_REQUESTS,
  windowMs: number = RATE_LIMIT.WINDOW_MS
): void {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return;
  }

  if (record.count >= limit) {
    throw new RateLimitError("Too many requests. Please try again later.");
  }

  record.count++;
}

export function resetRateLimit(key: string): void {
  rateLimitMap.delete(key);
}

export function getRateLimitCount(key: string): number {
  return rateLimitMap.get(key)?.count ?? 0;
}
