import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const getTemplates = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;

    const whereClause: { isActive: boolean; category?: string } = {
      isActive: true,
    };

    if (category && typeof category === 'string' && category !== 'All') {
      whereClause.category = category;
    }

    const templates = await prisma.template.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
