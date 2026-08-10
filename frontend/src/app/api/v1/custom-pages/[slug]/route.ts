import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { updateCustomPageSchema } from '@/schemas/custom-page.schema';
import { requireApiKey, getServerAccountId } from '@/lib/api-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // ── Auth check ──
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { slug } = params;
    // Server-derived accountId — không tin client header
    const accountId = getServerAccountId();

    const page = await prisma.customPage.findFirst({
      where: { accountId, slug },
    });

    if (!page) {
      return NextResponse.json(
        { message: `Custom page with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error(`Error fetching custom page ${params.slug}:`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // ── Auth check ──
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const { slug } = params;
    const body = await request.json();
    const validation = updateCustomPageSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid request body',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Server-derived accountId — không tin client header
    const accountId = getServerAccountId();

    const existingPage = await prisma.customPage.findFirst({
      where: { accountId, slug },
    });

    if (!existingPage) {
      return NextResponse.json(
        { message: `Custom page with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    const updateData: Record<string, any> = {};
    if (validation.data.title !== undefined) {
      updateData.title = validation.data.title;
    }
    if (validation.data.pbConfig !== undefined) {
      updateData.pbConfig = validation.data.pbConfig as any;
    }

    const updatedPage = await prisma.customPage.update({
      where: { id: existingPage.id },
      data: updateData,
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error(`Error updating custom page ${params.slug}:`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
