import { Controller, Get, Query, Param, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { TemplatesService } from './templates.service.js';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import { getTemplatesQuerySchema } from './dto/templates.dto.js';

@Controller('api/templates')
@UseGuards(ApiKeyGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async getTemplates(@Query() queryParams: any) {
    const validation = getTemplatesQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      throw new BadRequestException({
        message: 'Invalid query parameters',
        details: validation.error.flatten().fieldErrors,
      });
    }

    return this.templatesService.findAll(validation.data);
  }

  @Get(':slug')
  async getTemplateBySlug(@Param('slug') slug: string) {
    const template = await this.templatesService.findOneBySlug(slug);
    if (!template) {
      throw new NotFoundException(`Template with slug '${slug}' not found`);
    }
    return template;
  }
}
