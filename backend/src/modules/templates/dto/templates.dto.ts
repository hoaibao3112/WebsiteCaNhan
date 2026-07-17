import { z } from 'zod';

export const getTemplatesQuerySchema = z.object({
  category: z.enum(['saas', 'ecommerce', 'enterprise', 'all', 'All']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export type GetTemplatesQueryDto = z.infer<typeof getTemplatesQuerySchema>;
