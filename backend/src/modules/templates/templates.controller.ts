import { Controller, Get, Query, Param, UseGuards, UsePipes, NotFoundException } from '@nestjs/common';
import { TemplatesService } from './templates.service.js';
import { ApiKeyGuard } from '../../common/guards/api-key.guard.js';
import { getTemplatesQuerySchema, type GetTemplatesQueryDto } from './dto/templates.dto.js';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe.js';

@Controller('api/templates')
@UseGuards(ApiKeyGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(getTemplatesQuerySchema, 'Invalid query parameters'))
  async getTemplates(@Query() query: GetTemplatesQueryDto) {
    return this.templatesService.findAll(query);
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
