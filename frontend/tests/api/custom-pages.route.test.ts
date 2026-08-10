import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock Prisma ────────────────────────────────────────────────────────────
vi.mock('@/lib/prisma', () => ({
  prisma: {
    customPage: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { prisma } from '@/lib/prisma';

// ─── Set required env vars BEFORE importing route handlers ──────────────────
const TEST_API_KEY = 'test-secure-api-key-for-unit-tests';
process.env.API_KEY = TEST_API_KEY;
process.env.DEFAULT_ACCOUNT_ID = 'test-account';

// ─── Import route handlers ──────────────────────────────────────────────────
import { POST } from '@/app/api/v1/custom-pages/route';
import { GET, PUT } from '@/app/api/v1/custom-pages/[slug]/route';

describe('Custom Pages API Routes — Auth & IDOR Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ══════════════════════════════════════════════════════════════════════════
  // POST /api/v1/custom-pages
  // ══════════════════════════════════════════════════════════════════════════

  describe('POST /api/v1/custom-pages', () => {
    it('trả 401 khi không gửi x-api-key header', async () => {
      const request = new Request('http://localhost/api/v1/custom-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'test',
          title: 'Test Page',
          templateId: 't1',
          pbConfig: {},
        }),
      }) as any;

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(401);
      expect(json.success).toBe(false);
      expect(json.error).toContain('Unauthorized');
    });

    it('trả 401 khi gửi x-api-key sai', async () => {
      const request = new Request('http://localhost/api/v1/custom-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'wrong-key',
        },
        body: JSON.stringify({
          slug: 'test',
          title: 'Test Page',
          templateId: 't1',
          pbConfig: {},
        }),
      }) as any;

      const response = await POST(request);
      expect(response.status).toBe(401);
    });

    it('trả 201 khi x-api-key hợp lệ và body đúng', async () => {
      const mockPage = {
        id: 'page-1',
        accountId: 'test-account',
        slug: 'test-page',
        title: 'Test Page',
        templateId: 't1',
        pbConfig: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(prisma.customPage.findFirst).mockResolvedValue(null);
      vi.mocked(prisma.customPage.create).mockResolvedValue(mockPage as any);

      const request = new Request('http://localhost/api/v1/custom-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TEST_API_KEY,
        },
        body: JSON.stringify({
          slug: 'test-page',
          title: 'Test Page',
          templateId: 't1',
          pbConfig: {},
        }),
      }) as any;

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(201);
      expect(json.slug).toBe('test-page');

      // Verify Prisma was called with server-derived accountId, NOT from header
      expect(vi.mocked(prisma.customPage.create)).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            accountId: 'test-account', // server-derived, not from client
          }),
        })
      );
    });

    it('KHÔNG sử dụng x-account-id từ client header (fix IDOR)', async () => {
      vi.mocked(prisma.customPage.findFirst).mockResolvedValue(null);
      vi.mocked(prisma.customPage.create).mockResolvedValue({ id: 'p1' } as any);

      const request = new Request('http://localhost/api/v1/custom-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TEST_API_KEY,
          'x-account-id': 'hacker-account-id', // attacker tries IDOR
        },
        body: JSON.stringify({
          slug: 'malicious',
          title: 'IDOR Test',
          templateId: 't1',
          pbConfig: {},
        }),
      }) as any;

      await POST(request);

      // Verify the server ignored the client-sent x-account-id
      expect(vi.mocked(prisma.customPage.findFirst)).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            accountId: 'test-account', // NOT 'hacker-account-id'
          }),
        })
      );
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // GET /api/v1/custom-pages/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  describe('GET /api/v1/custom-pages/[slug]', () => {
    it('trả 401 khi không gửi x-api-key', async () => {
      const request = new Request('http://localhost/api/v1/custom-pages/my-page', {
        method: 'GET',
      }) as any;

      const response = await GET(request, { params: { slug: 'my-page' } });
      expect(response.status).toBe(401);
    });

    it('trả 200 khi x-api-key hợp lệ và page tồn tại', async () => {
      vi.mocked(prisma.customPage.findFirst).mockResolvedValue({
        id: 'p1',
        slug: 'my-page',
        title: 'My Page',
      } as any);

      const request = new Request('http://localhost/api/v1/custom-pages/my-page', {
        method: 'GET',
        headers: { 'x-api-key': TEST_API_KEY },
      }) as any;

      const response = await GET(request, { params: { slug: 'my-page' } });
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.slug).toBe('my-page');
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  // PUT /api/v1/custom-pages/[slug]
  // ══════════════════════════════════════════════════════════════════════════

  describe('PUT /api/v1/custom-pages/[slug]', () => {
    it('trả 401 khi không gửi x-api-key', async () => {
      const request = new Request('http://localhost/api/v1/custom-pages/my-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated' }),
      }) as any;

      const response = await PUT(request, { params: { slug: 'my-page' } });
      expect(response.status).toBe(401);
    });

    it('trả 200 khi x-api-key hợp lệ và update thành công', async () => {
      vi.mocked(prisma.customPage.findFirst).mockResolvedValue({
        id: 'p1',
        slug: 'my-page',
        title: 'Old Title',
      } as any);
      vi.mocked(prisma.customPage.update).mockResolvedValue({
        id: 'p1',
        slug: 'my-page',
        title: 'Updated Title',
      } as any);

      const request = new Request('http://localhost/api/v1/custom-pages/my-page', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': TEST_API_KEY,
        },
        body: JSON.stringify({ title: 'Updated Title' }),
      }) as any;

      const response = await PUT(request, { params: { slug: 'my-page' } });
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.title).toBe('Updated Title');
    });
  });
});
