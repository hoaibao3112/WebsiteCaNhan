import { Module } from '@nestjs/common';
import { TemplatesController } from './templates.controller.js';
import { TemplatesService } from './templates.service.js';

@Module({
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
