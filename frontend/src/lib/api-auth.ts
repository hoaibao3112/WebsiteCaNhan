import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

/**
 * requireApiKey — Auth middleware cho Next.js API route handlers.
 *
 * Mô phỏng đúng pattern ApiKeyGuard bên NestJS backend:
 * - Client gửi header `x-api-key`
 * - Server so sánh timing-safe với `API_KEY` từ env
 * - Trả 401 nếu thiếu/sai key, null nếu pass
 *
 * Usage trong route handler:
 * ```ts
 * const authError = requireApiKey(request);
 * if (authError) return authError;
 * ```
 */
export function requireApiKey(request: NextRequest | Request): NextResponse | null {
  const expectedKey = process.env.API_KEY;

  if (!expectedKey) {
    // Fail-fast nếu server chưa cấu hình API_KEY
    console.error('[AUTH] FATAL: API_KEY environment variable is not set.');
    return NextResponse.json(
      {
        success: false,
        error: 'Server configuration error. Liên hệ quản trị viên.',
      },
      { status: 500 }
    );
  }

  const apiKey = request.headers.get('x-api-key');

  if (!apiKey || !safeEqual(apiKey, expectedKey)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized. API Key không hợp lệ hoặc bị thiếu.',
      },
      { status: 401 }
    );
  }

  return null; // Auth passed
}

/**
 * requireBearerToken — Auth middleware cho Bearer token pattern (dùng cho blog API).
 *
 * Client gửi header `Authorization: Bearer <secret>`
 * Server so sánh timing-safe với secret key từ env.
 */
export function requireBearerToken(
  request: NextRequest | Request,
  envVarName: string,
): NextResponse | null {
  const expectedSecret = process.env[envVarName];

  if (!expectedSecret) {
    console.error(`[AUTH] FATAL: ${envVarName} environment variable is not set.`);
    return NextResponse.json(
      {
        success: false,
        error: 'Server configuration error. Liên hệ quản trị viên.',
      },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get('authorization');
  const expectedAuth = `Bearer ${expectedSecret}`;

  if (!authHeader || !safeEqual(authHeader, expectedAuth)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized. Mã bảo mật Authorization Token không hợp lệ.',
      },
      { status: 401 }
    );
  }

  return null; // Auth passed
}

/**
 * Server-derived account ID — không tin client header.
 * Single-tenant: luôn dùng DEFAULT_ACCOUNT_ID từ env.
 */
export function getServerAccountId(): string {
  return process.env.DEFAULT_ACCOUNT_ID || 'default-account';
}

// ─── Internals ──────────────────────────────────────────────────────────────

function safeEqual(received: string, expected: string): boolean {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
