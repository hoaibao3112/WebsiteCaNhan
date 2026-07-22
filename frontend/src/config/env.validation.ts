import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().optional().default('postgresql://postgres:postgres@localhost:5432/postgres?schema=frontend'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  SMTP_HOST: z.string().default('smtp.mailtrap.io'),
  SMTP_PORT: z.coerce.number().int().positive().default(2525),
  SMTP_USER: z.string().default('mock@example.com'),
  SMTP_PASSWORD: z.string().default('mock_password'),
  DEFAULT_ACCOUNT_ID: z.string().default('lumina-agency-default'),
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:5000'),
  API_KEY: z.string().default('studiocanhan_secure_api_key_7799'),
});

let parsedEnvCache: z.infer<typeof envSchema> | null = null;

export function validateEnv(): z.infer<typeof envSchema> {
  // During Next.js build phase, bypass strict validation to prevent build-time crashes
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return process.env as unknown as z.infer<typeof envSchema>;
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.warn('⚠️ Missing or invalid environment variables, using fallbacks:');
    console.warn(JSON.stringify(result.error.format(), null, 2));
    // Return parsed result with default fallback values rather than crashing runtime
    return envSchema.parse({});
  }

  return result.data;
}

// Use a Proxy to lazy-evaluate environment variables.
// This prevents ESM import hoisting from validating variables before they are loaded by @next/env or dotenv.
export const env = new Proxy({} as z.infer<typeof envSchema>, {
  get(target, prop) {
    if (process.env.NODE_ENV === 'test') {
      return (process.env as any)[prop];
    }
    if (!parsedEnvCache) {
      parsedEnvCache = validateEnv();
    }
    return (parsedEnvCache as any)[prop];
  },
});
