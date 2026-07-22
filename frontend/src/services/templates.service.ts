import 'server-only';

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

// Deterministic hash từ string — thay thế Math.random() để tránh SSR hydration mismatch
function hashString(str: string): number {
  return Array.from(str).reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

const CATEGORY_KEYWORD_MAP: Array<{ keywords: string[]; image: string }> = [
  {
    keywords: ['tiệc cưới', 'thiệp cưới', 'đám cưới', 'iwedding'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    keywords: ['portfolio', 'profile', 'cá nhân', 'cv'],
    image: PORTFOLIO_IMAGES[0], // fallback — sẽ được override bằng numId bên dưới nếu cần
  },
  {
    keywords: ['tài chính', 'luật', 'đầu tư', 'ngân hàng'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
  },
  {
    keywords: ['thời trang', 'mẹ & bé', 'mẹ và bé', 'phụ kiện', 'kính mắt', 'bán lẻ', 'shop', 'store'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    keywords: ['mỹ phẩm', 'làm đẹp', 'beauty'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
  },
  {
    keywords: ['spa', 'chăm sóc sức khoẻ', 'sức khoẻ', 'nha khoa', 'phòng khám', 'thú cưng', 'làm tóc'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
  {
    keywords: ['nhà hàng', 'bar', 'pub', 'club', 'trà', 'cà phê', 'tiệm bánh', 'nước uống', 'đồ uống', 'ăn uống'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  },
  {
    keywords: ['bất động sản', 'villa', 'homestay', 'khách sạn', 'nội thất', 'xây dựng', 'co-working'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  },
  {
    keywords: ['phần mềm', 'app', 'saas', 'công nghệ', 'điện tử'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    keywords: ['du lịch', 'nghỉ dưỡng', 'khám phá', 'leo núi'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  },
  {
    keywords: ['gym', 'yoga', 'thể thao'],
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    keywords: ['agency', 'marketing', 'coaching', 'tư vấn'],
    image: AGENCY_IMAGES[0],
  },
  {
    keywords: ['quà tết', 'hoa', 'tâm linh', 'gốm'],
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80',
  },
  {
    keywords: ['vận tải', 'logistics', 'xe máy'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
  },
  {
    keywords: ['cây cảnh', 'nông nghiệp', 'chăn nuôi', 'carbon'],
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80',
  },
  {
    keywords: ['sách', 'khoá học', 'sinh viên', 'tài liệu', 'phi lợi nhuận', 'hội thảo', 'sự kiện'],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
  },
];

export function getTemplateCoverImage(title: string, rawImage?: string, id?: string): string {
  if (rawImage && !rawImage.includes('photo-1507238691740-187a5b1d37b8')) {
    return rawImage;
  }

  const name = (title || '').toLowerCase();
  // Dùng hash string thay Math.random() để đảm bảo deterministic trên SSR
  const numId = parseInt(id || '0', 10) || hashString(title || '');

  // Portfolio/CV cần index rotation riêng
  if (['portfolio', 'profile', 'cá nhân', 'cv'].some((kw) => name.includes(kw))) {
    return PORTFOLIO_IMAGES[numId % PORTFOLIO_IMAGES.length];
  }

  // Agency/marketing cần index rotation riêng
  if (['agency', 'marketing', 'coaching', 'tư vấn'].some((kw) => name.includes(kw))) {
    return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
  }

  const matched = CATEGORY_KEYWORD_MAP.find((item) =>
    item.keywords.some((kw) => name.includes(kw)),
  );
  if (matched) return matched.image;

  return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
}

function mapTemplate(t: Record<string, unknown>): Template {
  return {
    id: t.id as string,
    slug: t.slug as string,
    title: t.title as string,
    category: t.category as string,
    categoryLabel: categoryLabels[t.category as string] || (t.category as string),
    description: t.description as string,
    image: getTemplateCoverImage(t.title as string, t.image as string | undefined, t.id as string | undefined),
    tags: (t.tags as string[]) || [],
    features: (t.features as string[]) || [],
    demoImages: (t.demoImages as string[]) || [],
    liveUrl: (t.liveUrl as string | null) || null,
    pbConfig: (t.pbConfig as Record<string, unknown> | null) || null,
    price: t.price ? parseFloat(t.price as string) : 0,
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

      const data = await res.json() as { templates: Record<string, unknown>[] };
      return (data.templates || []).map(mapTemplate);
    } catch (error) {
      console.warn(
        '⚠️ [API Fallback] Error fetching templates from backend API, falling back to mock data:',
        error instanceof Error ? error.message : error,
      );
      return mockTemplates.map((t) => mapTemplate(t as unknown as Record<string, unknown>));
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

      const data = await res.json() as Record<string, unknown>;
      return mapTemplate(data);
    } catch (error) {
      console.warn(
        `⚠️ [API Fallback] Error fetching template detail for slug '${slug}', falling back to mock data:`,
        error instanceof Error ? error.message : error,
      );
      const found = mockTemplates.find((t) => t.slug === slug);
      return found ? mapTemplate(found as unknown as Record<string, unknown>) : null;
    }
  },
};
