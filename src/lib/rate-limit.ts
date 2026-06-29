type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, RateLimitBucket>();

function pruneExpiredBuckets(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

export function rateLimit(key: string, options: RateLimitOptions) {
  const now = Date.now();
  pruneExpiredBuckets(now);

  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    const resetAt = now + options.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: options.limit - 1, retryAfter: 0 };
  }

  current.count += 1;
  const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));

  return {
    ok: current.count <= options.limit,
    remaining: Math.max(0, options.limit - current.count),
    retryAfter,
  };
}

export function rateLimitJson(retryAfter: number) {
  return Response.json(
    {
      ok: false,
      error: "試行回数が多すぎます。少し時間をおいてから再試行してください",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    },
  );
}
