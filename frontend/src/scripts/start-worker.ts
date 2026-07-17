import { loadEnvConfig } from '@next/env';
// Load environment variables using Next.js native environment loader
loadEnvConfig(process.cwd());

import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import nodemailer from 'nodemailer';
import { env } from '../config/env.validation';

// BullMQ connection requires maxRetriesPerRequest: null
const connection = new Redis(env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
} as any);

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

console.log('🚀 [BullMQ Worker] Connecting to Redis & starting...');

const worker = new Worker(
  'email-queue',
  async (job) => {
    if (job.name === 'send-contact-email') {
      const { firstName, lastName, email, budget, projectDescription } = job.data;
      const fullName = `${firstName} ${lastName}`;

      console.log(`✉️ [Worker] Processing email for: ${fullName} <${email}>`);

      const mailOptions = {
        from: `"${fullName}" <${env.SMTP_USER}>`,
        to: env.SMTP_USER, // Redirect to the agency email itself
        subject: `[Kabo Contact] Yêu cầu thiết kế từ ${fullName}`,
        html: `
          <h3>Yêu cầu liên hệ mới từ Kabo Agency</h3>
          <p><strong>Khách hàng:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Ngân sách ước tính:</strong> $${budget.toLocaleString()}</p>
          <p><strong>Chi tiết dự án:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #006672; margin-top: 10px;">
            ${projectDescription.replace(/\n/g, '<br/>')}
          </blockquote>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ [Worker] Email sent successfully for job ${job.id}`);
    }
  },
  { connection, concurrency: 5 }
);

worker.on('completed', (job) => {
  console.log(`✨ [Worker] Job ${job.id} completed successfully.`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ [Worker] Job ${job?.id} failed: ${err.message}`);
});

// Graceful Shutdown
const shutdown = async (signal: string) => {
  console.log(`\n🛑 [Worker] Received ${signal}. Shutting down worker...`);
  try {
    await worker.close();
    await connection.quit();
    console.log('👋 [Worker] Connections closed. Exit success.');
    process.exit(0);
  } catch (err) {
    console.error('❌ [Worker] Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
