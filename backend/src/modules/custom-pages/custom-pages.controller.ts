import { Controller, Post, Get, Put, Body, Param, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { CustomPagesService } from './custom-pages.service.js';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import { createCustomPageSchema, updateCustomPageSchema } from './dto/custom-pages.dto.js';

@Controller('api/custom-pages')
@UseGuards(ApiKeyGuard)
export class CustomPagesController {
  constructor(private readonly customPagesService: CustomPagesService) {}

  @Post()
  async createCustomPage(@Body() body: any) {
    const validation = createCustomPageSchema.safeParse(body);
    if (!validation.success) {
      throw new BadRequestException({
        message: 'Invalid request body',
        details: validation.error.flatten().fieldErrors,
      });
    }

    try {
      return await this.customPagesService.create(validation.data);
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to create custom page (possibly duplicate slug)',
        details: error instanceof Error ? error.message : String(error),
      });
    }
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
  async updateCustomPage(@Param('slug') slug: string, @Body() body: any) {
    const validation = updateCustomPageSchema.safeParse(body);
    if (!validation.success) {
      throw new BadRequestException({
        message: 'Invalid request body',
        details: validation.error.flatten().fieldErrors,
      });
    }

    try {
      return await this.customPagesService.update(slug, validation.data);
    } catch (error) {
      throw new BadRequestException({
        message: 'Failed to update custom page',
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
