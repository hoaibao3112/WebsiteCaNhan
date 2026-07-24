import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const createBlogPostSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().min(10, 'Nội dung bài viết phải có ít nhất 10 ký tự'),
  categoryName: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().default(true),
  accountId: z.string().optional(),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export class BlogService {
  /**
   * Tạo mới một bài viết blog vào CSDL
   */
  static async createPost(input: CreateBlogPostInput, targetAccountId: string) {
    const accountId = targetAccountId;
    const slug = input.slug && input.slug.trim() !== '' ? slugify(input.slug) : slugify(input.title);

    let categoryId: string | null = null;

    if (input.categoryName && input.categoryName.trim() !== '') {
      const categorySlug = slugify(input.categoryName);
      const category = await prisma.blogCategory.upsert({
        where: {
          accountId_slug: {
            accountId,
            slug: categorySlug,
          },
        },
        update: {
          name: input.categoryName,
        },
        create: {
          accountId,
          name: input.categoryName,
          slug: categorySlug,
        },
      });
      categoryId = category.id;
    }

    // Đảm bảo slug là duy nhất cho accountId này
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await prisma.blogPost.findUnique({
        where: {
          accountId_slug: {
            accountId,
            slug: finalSlug,
          },
        },
      });
      if (!existing) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const post = await prisma.blogPost.create({
      data: {
        accountId,
        title: input.title,
        slug: finalSlug,
        summary: input.summary || null,
        content: input.content,
        metaTitle: input.metaTitle || input.title,
        metaDescription: input.metaDescription || input.summary || null,
        featuredImage: input.featuredImage || null,
        tags: input.tags || [],
        isPublished: input.isPublished ?? true,
        publishedAt: input.isPublished ? new Date() : null,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return post;
  }

  /**
   * Lấy danh sách bài viết theo accountId
   */
  static async getPosts(accountId: string, options: { page?: number; limit?: number; categorySlug?: string; tag?: string; search?: string } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 10));
    const skip = (page - 1) * limit;

    const where: any = {
      accountId,
      isPublished: true,
    };

    if (options.categorySlug) {
      where.category = {
        slug: options.categorySlug,
      };
    }

    if (options.tag) {
      where.tags = {
        has: options.tag,
      };
    }

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { summary: { contains: options.search, mode: 'insensitive' } },
        { content: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: { category: true },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết bài viết theo slug
   */
  static async getPostBySlug(accountId: string, slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: {
        accountId_slug: {
          accountId,
          slug,
        },
      },
      include: {
        category: true,
      },
    });

    if (!post || !post.isPublished) {
      return null;
    }

    return post;
  }

  /**
   * Lấy danh sách tất cả các danh mục bài viết
   */
  static async getCategories(accountId: string) {
    return prisma.blogCategory.findMany({
      where: { accountId },
      include: {
        _count: {
          select: { posts: { where: { isPublished: true } } },
        },
      },
      orderBy: { name: 'asc' },
    });
  }
}
