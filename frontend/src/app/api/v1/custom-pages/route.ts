import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createCustomPageSchema } from '@/schemas/custom-page.schema';
import { requireApiKey, getServerAccountId } from '@/lib/api-auth';

export async function POST(request: NextRequest) {
  // ── Auth check ──
  const authError = requireApiKey(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const validation = createCustomPageSchema.safeParse(body);

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
    const { slug, title, templateId, pbConfig } = validation.data;

    const existingPage = await prisma.customPage.findFirst({
      where: { accountId, slug },
    });

    if (existingPage) {
      return NextResponse.json(
        { message: `Custom page with slug '${slug}' already exists` },
        { status: 409 }
      );
    }

    const customPage = await prisma.customPage.create({
      data: {
        accountId,
        slug,
        title,
        templateId,
        pbConfig: pbConfig as any,
      },
    });

    return NextResponse.json(customPage, { status: 201 });
  } catch (error) {
    console.error('Error creating custom page:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
