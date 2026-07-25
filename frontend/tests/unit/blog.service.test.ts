import { describe, it, expect } from 'vitest';
import { createBlogPostSchema, BlogService } from '@/services/blog.service';

describe('Blog Validation & Service Unit Tests', () => {
  describe('createBlogPostSchema (Zod Schema)', () => {
    it('chấp nhận input bài viết hợp lệ đầy đủ coverImage và contentImages', () => {
      const input = {
        title: 'Hướng Dẫn Tối Ưu SEO Với Next.js 14',
        content: 'Đây là nội dung bài viết chi tiết kéo dài hơn 10 ký tự...',
        summary: 'Tóm tắt bài viết ngắn gọn.',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        contentImages: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
        ],
        author: 'KABO Team',
        tags: ['NextJS', 'SEO'],
        categoryName: 'Công Nghệ & AI',
      };

      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.coverImage).toBe('https://images.unsplash.com/photo-1551288049-bebda4e38f71');
        expect(result.data.contentImages).toHaveLength(2);
        expect(result.data.author).toBe('KABO Team');
      }
    });

    it('gán giá trị mặc định cho author và contentImages khi không truyền', () => {
      const input = {
        title: 'Bài viết thử nghiệm',
        content: 'Nội dung bài viết mẫu kéo dài đủ 10 ký tự.',
      };

      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.author).toBe('KABO Editorial');
        expect(result.data.contentImages).toEqual([]);
        expect(result.data.isPublished).toBe(true);
      }
    });

    it('từ chối khi tiêu đề dưới 3 ký tự', () => {
      const input = {
        title: 'AB',
        content: 'Nội dung bài viết hợp lệ có độ dài thỏa mãn.',
      };

      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Tiêu đề phải có ít nhất 3 ký tự');
      }
    });

    it('từ chối khi nội dung dưới 10 ký tự', () => {
      const input = {
        title: 'Tiêu đề hợp lệ',
        content: 'Ngắn',
      };

      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Nội dung bài viết phải có ít nhất 10 ký tự');
      }
    });
  });

  describe('BlogService.calculateReadingTime', () => {
    it('tính toán đúng thời gian đọc (~200 từ/phút)', () => {
      const shortText = 'Đây là một câu ngắn.';
      expect(BlogService.calculateReadingTime(shortText)).toBe(1);

      // Tạo văn bản 400 từ
      const text400Words = Array(400).fill('từ').join(' ');
      expect(BlogService.calculateReadingTime(text400Words)).toBe(2);

      // Văn bản chứa thẻ HTML (600 từ 'chữ' + 2 từ trong Tiêu đề = 602 từ => Math.ceil(602/200) = 4)
      const htmlText = '<h2>Tiêu đề</h2><p>' + Array(600).fill('chữ').join(' ') + '</p>';
      expect(BlogService.calculateReadingTime(htmlText)).toBe(4);
    });
  });
});
