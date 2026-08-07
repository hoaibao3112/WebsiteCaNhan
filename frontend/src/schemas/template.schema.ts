import { z } from 'zod';

export const getTemplatesQuerySchema = z.object({
  category: z
    .string()
    .optional()
    .transform((val) => val?.toLowerCase())
    .pipe(z.enum(['saas', 'ecommerce', 'enterprise', 'all']).optional()),
  page: z.coerce.number().int().min(1).max(100000).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type GetTemplatesQueryDto = z.infer<typeof getTemplatesQuerySchema>;
