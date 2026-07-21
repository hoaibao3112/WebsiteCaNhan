import { env } from '@/config/env.validation';
import type { Template } from '@/types';
import { templates as mockTemplates } from '@/data/templates';

const categoryLabels: Record<string, string> = {
  saas: 'SaaS & Công nghệ',
  ecommerce: 'Thương mại Điện tử',
  enterprise: 'Doanh nghiệp',
};

function mapTemplate(t: any): Template {
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    category: t.category,
    categoryLabel: categoryLabels[t.category] || t.category,
    description: t.description,
    image: t.image,
    tags: t.tags || [],
    features: t.features || [],
    demoImages: t.demoImages || [],
    liveUrl: t.liveUrl || null,
    pbConfig: t.pbConfig || null,
    price: t.price ? parseFloat(t.price) : 0,
  };
}

export const backendTemplatesService = {
  async getAllTemplates(): Promise<Template[]> {
    try {
      const url = `${env.NEXT_PUBLIC_API_URL}/api/templates?limit=100`;
      
      const res = await fetch(url, {
        headers: {
          'x-api-key': env.API_KEY,
        },
        next: { revalidate: 86400 }, // Cache on server for 24 hours (ISR)
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch templates: ${res.statusText}`);
      }

      const data = await res.json();
      return (data.templates || []).map(mapTemplate);
    } catch (error) {
      console.warn('⚠️ [API Fallback] Error fetching templates from backend API, falling back to mock data:', error instanceof Error ? error.message : error);
      return mockTemplates;
    }
  },

  async getTemplateBySlug(slug: string): Promise<Template | null> {
    try {
      const url = `${env.NEXT_PUBLIC_API_URL}/api/templates/${slug}`;
      
      const res = await fetch(url, {
        headers: {
          'x-api-key': env.API_KEY,
        },
        next: { revalidate: 86400 }, // Cache on server for 24 hours (ISR)
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`Failed to fetch template by slug ${slug}: ${res.statusText}`);
      }

      const data = await res.json();
      return mapTemplate(data);
    } catch (error) {
      console.warn(`⚠️ [API Fallback] Error fetching template detail for slug '${slug}', falling back to mock data:`, error instanceof Error ? error.message : error);
      return mockTemplates.find((t) => t.slug === slug) || null;
    }
  },
};
