import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { contactSchema } from '@/schemas/contact.schema';
import { handleError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit: 3 submissions per 10 minutes per IP
    const limited = await rateLimit(req, { limit: 3, windowSeconds: 600 });
    if (limited) return limited;

    // 2. Parse + validate
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = result.data;

    // 3. Try to save to DB (optional — graceful fallback)
    try {
      const { prisma } = await import('@/lib/prisma');
      await prisma.contactSubmission.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          budget: data.budget,
          projectDescription: data.projectDescription,
        },
      });
    } catch (dbError) {
      // Log but don't fail the request — email is more important
      console.error('[Contact] DB save failed:', dbError);
    }

    // 4. Log for development (replace with email queue in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Contact Form] New submission:', {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        budget: `$${data.budget.toLocaleString()}`,
        description: data.projectDescription.substring(0, 100),
      });
    }

    // 5. In production: enqueue email via BullMQ
    // await emailQueue.add('send-contact-email', { data }, { attempts: 3 })

    return NextResponse.json(
      { success: true, message: 'Yêu cầu đã được ghi nhận. Chúng tôi sẽ liên hệ trong 24 giờ.' },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
