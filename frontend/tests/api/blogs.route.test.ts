import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, GET } from '@/app/api/v1/blogs/route';

// Mock BlogService
vi.mock('@/services/blog.service', async () => {
  const actual = await vi.importActual<typeof import('@/services/blog.service')>('@/services/blog.service');
  return {
    ...actual,
    BlogService: {
      ...actual.BlogService,
      createPost: vi.fn(),
      getPosts: vi.fn(),
    },
  };
});

import { BlogService } from '@/services/blog.service';

// Set env var for tests — no hardcoded fallback
const BLOG_API_SECRET_KEY = 'test-blog-secret-for-unit-tests';
process.env.BLOG_API_SECRET_KEY = BLOG_API_SECRET_KEY;

describe('POST & GET /api/v1/blogs Route Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/v1/blogs (MCP Claude Auto-Posting)', () => {
    it('trả về 401 Unauthorized nếu không gửi header Authorization hợp lệ', async () => {
      const request = new Request('http://localhost/api/v1/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Test Post', content: 'Nội dung test kéo dài...' }),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(401);
      expect(json.success).toBe(false);
      expect(json.error).toContain('Unauthorized');
    });

    it('trả về 400 Bad Request nếu dữ liệu bài viết không hợp lệ', async () => {
      const request = new Request('http://localhost/api/v1/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BLOG_API_SECRET_KEY}`,
        },
        body: JSON.stringify({ title: 'AB', content: 'Ngắn' }), // Title < 3, Content < 10
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(400);
      expect(json.success).toBe(false);
      expect(json.error).toContain('Dữ liệu bài viết không hợp lệ');
    });

    it('tạo bài viết thành công 201 khi token chuẩn và body hợp lệ', async () => {
      const mockCreatedPost = {
        id: 'post-123',
        title: 'Bài viết tạo bởi MCP Claude',
        slug: 'bai-viet-tao-boi-mcp-claude',
        summary: 'Tóm tắt bài viết tự động.',
        content: 'Đây là nội dung bài viết chất lượng được đăng tự động từ AI.',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        contentImages: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f'],
        author: 'Claude AI Assistant',
        isPublished: true,
        createdAt: new Date(),
      };

      vi.mocked(BlogService.createPost).mockResolvedValue(mockCreatedPost as any);

      const request = new Request('http://localhost/api/v1/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BLOG_API_SECRET_KEY}`,
        },
        body: JSON.stringify({
          title: 'Bài viết tạo bởi MCP Claude',
          content: 'Đây là nội dung bài viết chất lượng được đăng tự động từ AI.',
          summary: 'Tóm tắt bài viết tự động.',
          coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          contentImages: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f'],
          author: 'Claude AI Assistant',
        }),
      });

      const response = await POST(request);
      const json = await response.json();

      expect(response.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.data.postUrl).toBe('/blog/bai-viet-tao-boi-mcp-claude');
      expect(json.data.coverImage).toBe('https://images.unsplash.com/photo-1551288049-bebda4e38f71');
      expect(json.data.author).toBe('Claude AI Assistant');
    });
  });

  describe('GET /api/v1/blogs', () => {
    it('lấy danh sách bài viết thành công 200 kèm phân trang', async () => {
      const mockResult = {
        posts: [
          { id: '1', title: 'Blog 1', slug: 'blog-1', coverImage: 'https://img.com/1' },
          { id: '2', title: 'Blog 2', slug: 'blog-2', coverImage: 'https://img.com/2' },
        ],
        pagination: { page: 1, limit: 10, total: 2, totalPages: 1 },
      };

      vi.mocked(BlogService.getPosts).mockResolvedValue(mockResult as any);

      const request = new Request('http://localhost/api/v1/blogs?page=1&limit=10');
      const response = await GET(request);
      const json = await response.json();

      expect(response.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data).toHaveLength(2);
      expect(json.pagination.total).toBe(2);
    });
  });
});
