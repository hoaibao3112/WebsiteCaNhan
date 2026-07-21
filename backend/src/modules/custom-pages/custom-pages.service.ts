import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service.js';
import type { CreateCustomPageDto, UpdateCustomPageDto } from './dto/custom-pages.dto.js';

@Injectable()
export class CustomPagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomPageDto) {
    return this.prisma.customPage.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        templateId: dto.templateId,
        pbConfig: dto.pbConfig,
      },
    });
  }

  async findOneBySlug(slug: string) {
    return this.prisma.customPage.findUnique({
      where: {
        slug,
      },
    });
  }

  async update(slug: string, dto: UpdateCustomPageDto) {
    return this.prisma.customPage.update({
      where: {
        slug,
      },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.pbConfig && { pbConfig: dto.pbConfig }),
      },
    });
  }
}
