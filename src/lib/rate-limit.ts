const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now - record.lastReset > windowMs) {
    rateLimitMap.set(key, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}
