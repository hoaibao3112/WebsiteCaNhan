import { prisma } from '@/lib/prisma';
import { getEmailQueue } from '@/lib/queue';
import { env } from '@/config/env.validation';
import type { ContactInput } from '@/schemas/contact.schema';

export const contactService = {
  async submitForm(data: ContactInput) {
    const defaultAccountId = env.DEFAULT_ACCOUNT_ID || 'lumina-agency-default';

    // 1. Save to Database (Multi-tenant Isolation using accountId)
    const submission = await prisma.contactSubmission.create({
      data: {
        accountId: defaultAccountId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        budget: data.budget,
        projectDescription: data.projectDescription,
      },
    });

    // 2. Queue Email Job (BullMQ)
    await getEmailQueue().add(
      'send-contact-email',
      {
        submissionId: submission.id,
        accountId: defaultAccountId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        budget: data.budget,
        projectDescription: data.projectDescription,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 100 },
      }
    );

    return submission;
  },
};
