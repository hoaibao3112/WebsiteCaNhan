import { Module } from '@nestjs/common';
import { CustomPagesController } from './custom-pages.controller.js';
import { CustomPagesService } from './custom-pages.service.js';

@Module({
  controllers: [CustomPagesController],
  providers: [CustomPagesService],
  exports: [CustomPagesService],
})
export class CustomPagesModule {}
