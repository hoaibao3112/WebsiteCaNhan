import { Controller, Post, Get, Put, Body, Param, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { CustomPagesService } from './custom-pages.service.js';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import { createCustomPageSchema, updateCustomPageSchema } from './dto/custom-pages.dto.js';

@Controller('api/custom-pages')
@UseGuards(ApiKeyGuard)
export class CustomPagesController {
  constructor(private readonly customPagesService: CustomPagesService) {}

  @Post()
  async createCustomPage(@Body() body: unknown) {
    const validation = createCustomPageSchema.safeParse(body);
    if (!validation.success) {
      throw new BadRequestException({
        message: 'Invalid request body',
        details: validation.error.flatten().fieldErrors,
      });
    }
    // Không catch ở đây — để AllExceptionsFilter bắt P2002 → 409 Conflict
    return this.customPagesService.create(validation.data);
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
  async updateCustomPage(@Param('slug') slug: string, @Body() body: unknown) {
    const validation = updateCustomPageSchema.safeParse(body);
    if (!validation.success) {
      throw new BadRequestException({
        message: 'Invalid request body',
        details: validation.error.flatten().fieldErrors,
      });
    }
    // Không catch ở đây — để filter xử lý Prisma errors
    return this.customPagesService.update(slug, validation.data);
  }
}
