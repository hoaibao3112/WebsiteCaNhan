import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Prisma P2002: Unique constraint violation → 409 Conflict
    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2002') {
      const target = (exception.meta?.target as string[])?.join(', ') || 'field';
      this.logger.warn(`[${request.method}] ${request.url} - Prisma P2002: duplicate on ${target}`);
      return response.status(HttpStatus.CONFLICT).json({
        success: false,
        message: `Dữ liệu đã tồn tại: ${target} bị trùng lặp.`,
        data: {
          statusCode: HttpStatus.CONFLICT,
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      });
    }

    // Prisma P2025: Record to update/delete not found → 404 Not Found
    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2025') {
      this.logger.warn(`[${request.method}] ${request.url} - Prisma P2025: Record not found`);
      return response.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Không tìm thấy dữ liệu cần cập nhật.',
        data: {
          statusCode: HttpStatus.NOT_FOUND,
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      });
    }

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Đã xảy ra sự cố hệ thống. Vui lòng thử lại sau!';
    let details: unknown;

    if (exception instanceof HttpException) {
      const resObj = exception.getResponse();
      message = typeof resObj === 'string' ? resObj : (resObj as { message?: string }).message || exception.message;
      if (typeof resObj === 'object' && resObj !== null && 'details' in resObj) {
        details = (resObj as { details?: unknown }).details;
      }
    } else if (exception instanceof Error) {
      if (process.env.NODE_ENV !== 'production') {
        message = exception.message;
        details = exception.stack;
      }
    }

    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status} - Error: ${
        exception instanceof Error ? exception.stack : exception
      }`,
    );

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? message[0] : message,
      data: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(details !== undefined ? { details } : {}),
      },
    });
  }
}
