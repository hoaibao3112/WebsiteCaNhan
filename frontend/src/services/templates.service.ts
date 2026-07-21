import { env } from '@/config/env.validation';
import type { Template } from '@/types';
import { templates as mockTemplates } from '@/data/templates';

const categoryLabels: Record<string, string> = {
  saas: 'SaaS & Công nghệ',
  ecommerce: 'Thương mại Điện tử',
  enterprise: 'Doanh nghiệp',
};

const PORTFOLIO_IMAGES = [
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
  'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=800&q=80',
  'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
];

const AGENCY_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
];

export function getTemplateCoverImage(title: string, rawImage?: string, id?: string): string {
  if (rawImage && !rawImage.includes('photo-1507238691740-187a5b1d37b8')) {
    return rawImage;
  }

  const name = (title || '').toLowerCase();
  const numId = parseInt(id || '0', 10) || Math.floor(Math.random() * 100);

  if (name.includes('tiệc cưới') || name.includes('thiệp cưới') || name.includes('đám cưới') || name.includes('iwedding')) {
    return 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';
  }
  if (name.includes('portfolio') || name.includes('profile') || name.includes('cá nhân') || name.includes('cv')) {
    return PORTFOLIO_IMAGES[numId % PORTFOLIO_IMAGES.length];
  }
  if (name.includes('agency') || name.includes('marketing') || name.includes('coaching') || name.includes('tư vấn')) {
    return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
  }
  if (name.includes('tài chính') || name.includes('luật') || name.includes('đầu tư') || name.includes('ngân hàng')) {
    return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80';
  }
  if (name.includes('thời trang') || name.includes('mẹ & bé') || name.includes('mẹ và bé') || name.includes('phụ kiện') || name.includes('kính mắt') || name.includes('bán lẻ') || name.includes('shop') || name.includes('store')) {
    return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80';
  }
  if (name.includes('mỹ phẩm') || name.includes('làm đẹp') || name.includes('beauty')) {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  }
  if (name.includes('spa') || name.includes('chăm sóc sức khoẻ') || name.includes('sức khoẻ') || name.includes('nha khoa') || name.includes('phòng khám') || name.includes('thú cưng') || name.includes('làm tóc')) {
    return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80';
  }
  if (name.includes('nhà hàng') || name.includes('bar') || name.includes('pub') || name.includes('club') || name.includes('trà') || name.includes('cà phê') || name.includes('tiệm bánh') || name.includes('nước uống') || name.includes('đồ uống') || name.includes('ăn uống')) {
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80';
  }
  if (name.includes('bất động sản') || name.includes('villa') || name.includes('homestay') || name.includes('khách sạn') || name.includes('nội thất') || name.includes('xây dựng') || name.includes('co-working')) {
    return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';
  }
  if (name.includes('phần mềm') || name.includes('app') || name.includes('saas') || name.includes('công nghệ') || name.includes('điện tử')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
  }
  if (name.includes('du lịch') || name.includes('nghỉ dưỡng') || name.includes('khám phá') || name.includes('leo núi')) {
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
  }
  if (name.includes('gym') || name.includes('yoga') || name.includes('thể thao')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80';
  }
  if (name.includes('quà tết') || name.includes('hoa') || name.includes('tâm linh') || name.includes('gốm')) {
    return 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80';
  }
  if (name.includes('vận tải') || name.includes('logistics') || name.includes('xe máy')) {
    return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80';
  }
  if (name.includes('cây cảnh') || name.includes('nông nghiệp') || name.includes('chăn nuôi') || name.includes('carbon')) {
    return 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80';
  }
  if (name.includes('sách') || name.includes('khoá học') || name.includes('sinh viên') || name.includes('tài liệu') || name.includes('phi lợi nhuận') || name.includes('hội thảo') || name.includes('sự kiện')) {
    return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80';
  }

  return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
}

function mapTemplate(t: any): Template {
  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    category: t.category,
    categoryLabel: categoryLabels[t.category] || t.category,
    description: t.description,
    image: getTemplateCoverImage(t.title, t.image, t.id),
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
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch templates: ${res.statusText}`);
      }

      const data = await res.json();
      return (data.templates || []).map(mapTemplate);
    } catch (error) {
      console.warn('⚠️ [API Fallback] Error fetching templates from backend API, falling back to mock data:', error instanceof Error ? error.message : error);
      return mockTemplates.map(mapTemplate);
    }
  },

  async getTemplateBySlug(slug: string): Promise<Template | null> {
    try {
      const url = `${env.NEXT_PUBLIC_API_URL}/api/templates/${slug}`;
      
      const res = await fetch(url, {
        headers: {
          'x-api-key': env.API_KEY,
        },
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`Failed to fetch template by slug ${slug}: ${res.statusText}`);
      }

      const data = await res.json();
      return mapTemplate(data);
    } catch (error) {
      console.warn(`⚠️ [API Fallback] Error fetching template detail for slug '${slug}', falling back to mock data:`, error instanceof Error ? error.message : error);
      const found = mockTemplates.find((t) => t.slug === slug);
      return found ? mapTemplate(found) : null;
    }
  },
};
