import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { PrismaService } from '../src/database/prisma.service.js';
import { AllExceptionsFilter } from '../src/common/filters/all-exceptions.filter.js';
import { Prisma } from '@prisma/client';

describe('CustomPagesController (e2e)', () => {
  let app: INestApplication;
  const TEST_API_KEY = 'test-secret-key-12345';

  const mockPrismaService = {
    customPage: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn().mockImplementation(({ data }) =>
        Promise.resolve({
          id: 'test-page-id',
          createdAt: new Date(),
          updatedAt: new Date(),
          ...data,
        }),
      ),
      update: jest.fn().mockImplementation(({ where, data }) => {
        if (where.slug === 'non-existent-slug') {
          throw new Prisma.PrismaClientKnownRequestError(
            'An operation failed because it depends on one or more records that were required but not found.',
            {
              code: 'P2025',
              clientVersion: '5.17.0',
            },
          );
        }
        return Promise.resolve({
          id: 'existing-page-id',
          slug: where.slug,
          title: data.title || 'Existing Page',
          templateId: 'kabo-default',
          pbConfig: data.pbConfig || {},
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }),
    },
    template: {
      findUnique: jest.fn().mockResolvedValue({ id: 'kabo-default' }),
    },
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    process.env.API_KEY = TEST_API_KEY;
    process.env.ALLOW_INSECURE_LOCAL = 'false';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('PUT /api/custom-pages/:slug', () => {
    it('should return 404 when updating non-existent slug (Prisma P2025 Bug Fix)', async () => {
      const response = await request(app.getHttpServer())
        .put('/api/custom-pages/non-existent-slug')
        .set('x-api-key', TEST_API_KEY)
        .send({
          title: 'Cập nhật tiêu đề mới',
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          message: 'Không tìm thấy dữ liệu cần cập nhật.',
          data: expect.objectContaining({
            statusCode: 404,
            path: '/api/custom-pages/non-existent-slug',
          }),
        }),
      );
    });
  });

  describe('POST /api/custom-pages - Auth & Validation Security', () => {
    it('should return 401 Unauthorized when x-api-key header is missing', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/custom-pages')
        .send({
          slug: 'test-unauthorized-page',
          title: 'Unauthorized Test',
          templateId: 'kabo-default',
          pbConfig: { hero: { title: 'Hello' } },
        });

      expect(response.status).toBe(401);
      expect(response.body).toEqual(
        expect.objectContaining({
          success: false,
          message: 'Unauthorized: Invalid or missing API Key',
          data: expect.objectContaining({
            statusCode: 401,
            path: '/api/custom-pages',
          }),
        }),
      );
    });

    it('should return 400 Bad Request when pbConfig exceeds MAX_CONFIG_DEPTH (20)', async () => {
      // Create deeply nested object (depth 25 > 20)
      let deepConfig: Record<string, unknown> = { leaf: 'deep value' };
      for (let i = 0; i < 25; i++) {
        deepConfig = { nested: deepConfig };
      }

      const response = await request(app.getHttpServer())
        .post('/api/custom-pages')
        .set('x-api-key', TEST_API_KEY)
        .send({
          slug: 'depth-bomb-test-page',
          title: 'Depth Bomb Test',
          templateId: 'kabo-default',
          pbConfig: deepConfig,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid request body');
      expect(response.body.data).toBeDefined();
      expect(response.body.data.details).toBeDefined();
      expect(response.body.data.details.pbConfig).toBeDefined();
      expect(response.body.data.details.pbConfig[0]).toContain('maximum depth is 20');
    });
  });
});
