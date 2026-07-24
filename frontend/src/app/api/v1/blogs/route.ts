import { NextResponse } from 'next/server';
import { BlogService, createBlogPostSchema } from '@/services/blog.service';
import { z } from 'zod';

const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';
const BLOG_API_SECRET_KEY = process.env.BLOG_API_SECRET_KEY || 'studiocanhan_blog_secret_8899';

export async function POST(req: Request) {
  try {
    // 1. Kiểm tra Authorization Header (Secret Token)
    const authHeader = req.headers.get('authorization');
    const expectedAuth = `Bearer ${BLOG_API_SECRET_KEY}`;

    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Mã bảo mật Authorization Token không hợp lệ.',
        },
        { status: 401 }
      );
    }

    // 2. Parse body và validate với Zod
    const body = await req.json();
    const validatedData = createBlogPostSchema.parse(body);

    const accountId = validatedData.accountId || DEFAULT_ACCOUNT_ID;

    // 3. Đưa bài viết vào CSDL
    const post = await BlogService.createPost(validatedData, accountId);

    return NextResponse.json(
      {
        success: true,
        message: 'Đăng bài viết thành công!',
        data: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          postUrl: `/blog/${post.slug}`,
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
    const accountId = searchParams.get('accountId') || DEFAULT_ACCOUNT_ID;

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
