import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service.js';
import type { CreateCustomPageDto, UpdateCustomPageDto } from './dto/custom-pages.dto.js';

@Injectable()
export class CustomPagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomPageDto) {
    if (dto.templateId !== 'kabo-default') {
      const template = await this.prisma.template.findUnique({ where: { id: dto.templateId } });
      if (!template) throw new NotFoundException(`Template '${dto.templateId}' not found`);
    }
    return this.prisma.customPage.create({
      data: {
        slug: dto.slug,
        title: dto.title,
        templateId: dto.templateId,
        pbConfig: dto.pbConfig as Prisma.InputJsonValue,
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
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.pbConfig !== undefined && { pbConfig: dto.pbConfig as Prisma.InputJsonValue }),
      },
    });
  }
}
