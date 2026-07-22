import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { TemplatesModule } from './modules/templates/templates.module.js';
import { CustomPagesModule } from './modules/custom-pages/custom-pages.module.js';
import { HealthController } from './modules/health/health.controller.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    DatabaseModule,
    TemplatesModule,
    CustomPagesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
