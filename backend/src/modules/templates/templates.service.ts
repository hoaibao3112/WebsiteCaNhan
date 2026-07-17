import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import type { GetTemplatesQueryDto } from './dto/templates.dto.js';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetTemplatesQueryDto) {
    const { category, page, limit } = query;

    const whereClause: { isActive: boolean; category?: string } = {
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
    return this.prisma.template.findFirst({
      where: {
        slug,
        isActive: true,
      },
    });
  }
}
