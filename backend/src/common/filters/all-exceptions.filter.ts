import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Đã xảy ra sự cố hệ thống. Vui lòng thử lại sau!';
    let details: any = null;

    if (exception instanceof HttpException) {
      const resObj = exception.getResponse();
      message = typeof resObj === 'string' ? resObj : (resObj as any).message || exception.message;
    } else if (exception instanceof Error) {
      if (process.env.NODE_ENV !== 'production') {
        message = exception.message;
        details = exception.stack;
      }
    }

    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status} - Error: ${
        exception instanceof Error ? exception.stack : exception
      }`
    );

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? message[0] : message,
      data: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(details && { details }),
      },
    });
  }
}
