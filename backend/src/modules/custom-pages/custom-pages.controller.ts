import { Controller, Post, Get, Put, Body, Param, UseGuards, UsePipes, NotFoundException } from '@nestjs/common';
import { CustomPagesService } from './custom-pages.service.js';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import {
  createCustomPageSchema,
  updateCustomPageSchema,
  type CreateCustomPageDto,
  type UpdateCustomPageDto,
} from './dto/custom-pages.dto.js';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe.js';

@Controller('api/custom-pages')
@UseGuards(ApiKeyGuard)
export class CustomPagesController {
  constructor(private readonly customPagesService: CustomPagesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCustomPageSchema, 'Invalid request body'))
  async createCustomPage(@Body() body: CreateCustomPageDto) {
    // Không catch ở đây — để AllExceptionsFilter bắt P2002 → 409 Conflict
    return this.customPagesService.create(body);
  }

  @Get(':slug')
  async getCustomPage(@Param('slug') slug: string) {
    const page = await this.customPagesService.findOneBySlug(slug);
    if (!page) {
      throw new NotFoundException(`Custom page with slug '${slug}' not found`);
    }
    return page;
  }

  @Put(':slug')
  @UsePipes(new ZodValidationPipe(updateCustomPageSchema, 'Invalid request body'))
  async updateCustomPage(@Param('slug') slug: string, @Body() body: UpdateCustomPageDto) {
    // Không catch ở đây — để filter xử lý Prisma errors (P2025 → 404)
    return this.customPagesService.update(slug, body);
  }
}
