import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getTemplatesQuerySchema } from '@/schemas/template.schema';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = {
      category: searchParams.get('category') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    };

    const validation = getTemplatesQuerySchema.safeParse(rawQuery);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid query parameters',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { category, page, limit } = validation.data;
    const accountId = request.headers.get('x-account-id') || 'default-account';

    const where: any = {
      accountId,
      isActive: true,
    };

    if (category && category !== 'all') {
      where.category = category;
    }

    const skip = (page - 1) * limit;

    const [templates, total] = await Promise.all([
      prisma.template.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.template.count({ where }),
    ]);

    return NextResponse.json({
      data: templates,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
