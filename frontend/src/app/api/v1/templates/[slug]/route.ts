import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerAccountId } from '@/lib/api-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    // Server-derived accountId — không tin client header (fix IDOR)
    const accountId = getServerAccountId();

    const template = await prisma.template.findFirst({
      where: {
        accountId,
        slug,
        isActive: true,
      },
    });

    if (!template) {
      return NextResponse.json(
        { message: `Template with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error(`Error fetching template ${params.slug}:`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
