import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { contactSchema } from '@/schemas/contact.schema';
import { contactService } from '@/services/contact.service';
import { handleError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit: 3 submissions per 10 minutes per IP/client
    const limited = await rateLimit(req, { limit: 3, windowSeconds: 600 });
    if (limited) return limited;

    // 2. Parse and validate input data using Zod schema
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Dữ liệu nhập vào không hợp lệ',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // 3. Delegate to Business Service Layer (Multi-tenant saving & job queueing)
    await contactService.submitForm(result.data);

    // 4. Return standard production response
    return NextResponse.json(
      {
        success: true,
        message: 'Yêu cầu của bạn đã được ghi nhận thành công. Chúng tôi sẽ liên hệ trong vòng 24 giờ!',
      },
      { status: 201 },
    );
  } catch (error) {
    return handleError(error);
  }
}
