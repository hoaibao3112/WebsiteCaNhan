import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Lỗi xác thực dữ liệu',
        details: error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Handle Prisma check dynamically to avoid erroring if Prisma is not deployed/generated yet
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; message?: string };
    if (prismaError.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Không tìm thấy dữ liệu' }, { status: 404 });
    }
    if (prismaError.code === 'P2002') {
      return NextResponse.json({ success: false, error: 'Dữ liệu đã tồn tại' }, { status: 409 });
    }
  }

  console.error('[API Error]', error);
  return NextResponse.json(
    { success: false, error: 'Đã xảy ra sự cố hệ thống. Vui lòng thử lại sau!' },
    { status: 500 }
  );
}
