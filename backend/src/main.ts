import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'production';
  const allowedOrigin = process.env.CORS_ORIGIN;

  if (isProduction && !allowedOrigin) {
    throw new Error('Server configuration error: CORS_ORIGIN is required in production environment');
  }

  const app = await NestFactory.create(AppModule);

  // Enable CORS based on production rules
  app.enableCors({
    origin: allowedOrigin || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  });

  // Apply Global Exceptions Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Expose Root and Health Check endpoints directly on HTTP Adapter (Express instance)
  const server = app.getHttpAdapter().getInstance();
  const healthHandler = (_req: any, res: any) => {
    res.json({ status: 'OK', message: 'Studio Ca Nhan API is running', timestamp: new Date() });
  };
  server.get('/', healthHandler);
  server.head('/', healthHandler);
  server.get('/api/health', healthHandler);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}

bootstrap();
