import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(
    private readonly schema: ZodSchema,
    private readonly customMessage?: string,
  ) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    // Khi dùng @UsePipes ở cấp method, bỏ qua param dạng chuỗi/ID đơn lẻ nếu schema là ZodObject
    if (metadata?.type === 'param' && typeof value === 'string') {
      return value;
    }

    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException({
        message: this.customMessage || 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
    }
    return result.data;
  }
}
