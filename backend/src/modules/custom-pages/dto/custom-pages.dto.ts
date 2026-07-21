import { z } from 'zod';

export const createCustomPageSchema = z.object({
  slug: z.string().min(3),
  title: z.string().min(1),
  templateId: z.string().min(1),
  pbConfig: z.any(),
});

export const updateCustomPageSchema = z.object({
  title: z.string().optional(),
  pbConfig: z.any().optional(),
});

export type CreateCustomPageDto = z.infer<typeof createCustomPageSchema>;
export type UpdateCustomPageDto = z.infer<typeof updateCustomPageSchema>;
