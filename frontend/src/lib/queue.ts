import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

let emailQueueInstance: Queue | null = null;

export function getEmailQueue(): Queue {
  // During Next.js build phase, return a mocked queue to avoid connecting to Redis and causing ECONNREFUSED logs
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {
      add: async () => ({}) as any,
    } as unknown as Queue;
  }

  if (!emailQueueInstance) {
    const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    } as any);

    emailQueueInstance = new Queue('email-queue', { connection });
  }

  return emailQueueInstance;
}
