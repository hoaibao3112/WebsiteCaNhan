import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { GetTemplatesQueryDto } from './dto/templates.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetTemplatesQueryDto) {
    const { category, page, limit } = query;

    const whereClause: Prisma.TemplateWhereInput = {
      isActive: true,
    };

    if (category && category !== 'all' && category !== 'All') {
      whereClause.category = category;
    }

    const skip = (page - 1) * limit;

    const [templates, total] = await Promise.all([
      this.prisma.template.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.template.count({ where: whereClause }),
    ]);

    return {
      templates,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneBySlug(slug: string) {
    const template = await this.prisma.template.findUnique({
      where: {
        slug,
      },
    });

    if (!template || !template.isActive) {
      return null;
    }

    return template;
  }
}
