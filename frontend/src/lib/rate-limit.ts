import { NextRequest, NextResponse } from 'next/server';

interface RateLimitOptions {
  limit: number;
  windowSeconds: number;
}

export async function rateLimit(
  req: NextRequest,
  options: RateLimitOptions = { limit: 3, windowSeconds: 600 },
): Promise<NextResponse | null> {
  // Try Redis rate limiting, fallback to null (allow) if Redis unavailable
  try {
    const { redis } = await import('./redis');

    const identifier =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      '127.0.0.1';

    const key = `rate_limit:${req.nextUrl.pathname}:${identifier}`;

    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, options.windowSeconds);
    }

    if (current > options.limit) {
      return NextResponse.json(
        {
          success: false,
          error: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
          retryAfter: options.windowSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(options.windowSeconds),
            'X-RateLimit-Limit': String(options.limit),
            'X-RateLimit-Remaining': '0',
          },
        },
      );
    }
    return null;
  } catch {
    // Redis unavailable — allow request (fail open for marketing site)
    return null;
  }
}
