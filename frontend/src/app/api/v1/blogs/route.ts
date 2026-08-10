import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { BlogService, createBlogPostSchema } from '@/services/blog.service';
import { requireBearerToken, getServerAccountId } from '@/lib/api-auth';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Kiểm tra Authorization Header — fail-fast, KHÔNG có hardcoded fallback
    const authError = requireBearerToken(req, 'BLOG_API_SECRET_KEY');
    if (authError) return authError;

    // 2. Parse body và validate với Zod
    const body = await req.json();
    const validatedData = createBlogPostSchema.parse(body);

    // Server-derived accountId — không tin client input
    const accountId = validatedData.accountId || getServerAccountId();

    // 3. Đưa bài viết vào CSDL
    const post = await BlogService.createPost(validatedData, accountId);

    // 4. Invalidate Next.js cache ngay lập tức để trang web cập nhật tức thì
    try {
      revalidatePath('/blog');
      if (post?.slug) {
        revalidatePath(`/blog/${post.slug}`);
      }
      revalidatePath('/');
    } catch (e) {
      console.warn('Lỗi revalidatePath:', e);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Đăng bài viết thành công!',
        data: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          postUrl: `/blog/${post.slug}`,
          coverImage: (post as any).coverImage || (post as any).featuredImage || null,
          contentImages: (post as any).contentImages || [],
          author: (post as any).author || 'KABO Editorial',
          isPublished: post.isPublished,
          createdAt: post.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu bài viết không hợp lệ',
          details: (error.issues || []).map((e: any) => `${e.path.join('.')}: ${e.message}`),
        },
        { status: 400 }
      );
    }

    console.error('Lỗi khi tạo blog post:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Lỗi hệ thống khi đăng bài viết',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categorySlug = searchParams.get('category') || undefined;
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('search') || undefined;

    // Server-derived accountId — public read endpoint
    const accountId = getServerAccountId();

    const result = await BlogService.getPosts(accountId, {
      page,
      limit,
      categorySlug,
      tag,
      search,
    });

    return NextResponse.json({
      success: true,
      data: result.posts,
      pagination: result.pagination,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Lỗi khi lấy danh sách bài viết',
      },
      { status: 500 }
    );
  }
}
