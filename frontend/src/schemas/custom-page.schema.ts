import { z } from 'zod';

const MAX_CONFIG_BYTES = 1024 * 1024;
const MAX_CONFIG_DEPTH = 20;
const MAX_CONFIG_KEYS = 2000;
const MAX_CONFIG_STRING = 100_000;

function validateConfig(value: unknown, depth = 0, seen = new Set<object>()): string | null {
  if (depth > MAX_CONFIG_DEPTH) return `maximum depth is ${MAX_CONFIG_DEPTH}`;
  if (typeof value === 'string' && value.length > MAX_CONFIG_STRING) return 'string value is too long';
  if (!value || typeof value !== 'object') return null;
  if (seen.has(value)) return 'circular values are not allowed';
  seen.add(value);
  if (Array.isArray(value) && value.length > MAX_CONFIG_KEYS) return 'array is too large';
  if (!Array.isArray(value) && Object.keys(value).length > MAX_CONFIG_KEYS) return 'object has too many keys';
  for (const child of Array.isArray(value) ? value : Object.values(value)) {
    const error = validateConfig(child, depth + 1, seen);
    if (error) return error;
  }
  seen.delete(value);
  return null;
}

const pageBuilderConfigSchema = z.unknown().superRefine((value, ctx) => {
  const error = validateConfig(value);
  if (error) ctx.addIssue({ code: z.ZodIssueCode.custom, message: error });
  try {
    if (JSON.stringify(value).length > MAX_CONFIG_BYTES) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'page configuration is too large' });
    }
  } catch {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'invalid page configuration' });
  }
});

export const createCustomPageSchema = z.object({
  slug: z.string().trim().min(3).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(200),
  templateId: z.string().trim().min(1).max(120),
  pbConfig: pageBuilderConfigSchema,
});

export const updateCustomPageSchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  pbConfig: pageBuilderConfigSchema.optional(),
});

export type CreateCustomPageDto = z.infer<typeof createCustomPageSchema>;
export type UpdateCustomPageDto = z.infer<typeof updateCustomPageSchema>;
