import { BadRequestException, ArgumentMetadata } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  const testSchema = z.object({
    name: z.string().min(2),
    age: z.coerce.number().int().min(1),
  });

  it('should parse and return transformed data for valid input', () => {
    const pipe = new ZodValidationPipe(testSchema, 'Invalid input');
    const metadata: ArgumentMetadata = { type: 'body' };
    const input = { name: 'John Doe', age: '25' };

    const result = pipe.transform(input, metadata);

    expect(result).toEqual({
      name: 'John Doe',
      age: 25, // coerced to number
    });
  });

  it('should throw BadRequestException with custom message and details for invalid input', () => {
    const customMsg = 'Dữ liệu đầu vào không hợp lệ';
    const pipe = new ZodValidationPipe(testSchema, customMsg);
    const metadata: ArgumentMetadata = { type: 'body' };
    const invalidInput = { name: 'J', age: -5 };

    try {
      pipe.transform(invalidInput, metadata);
      fail('Expected BadRequestException to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      const res = (error as BadRequestException).getResponse() as {
        message: string;
        details: Record<string, string[]>;
      };
      expect(res.message).toBe(customMsg);
      expect(res.details).toBeDefined();
      expect(res.details.name).toBeDefined();
      expect(res.details.age).toBeDefined();
    }
  });

  it('should bypass validation and return original string when metadata.type is param', () => {
    const pipe = new ZodValidationPipe(testSchema, 'Invalid body');
    const paramMetadata: ArgumentMetadata = { type: 'param', data: 'slug' };
    const rawParamValue = 'my-test-slug';

    const result = pipe.transform(rawParamValue, paramMetadata);

    expect(result).toBe(rawParamValue);
  });
});
