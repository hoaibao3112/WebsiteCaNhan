import { env } from '@/config/env.validation';
import type { Template } from '@/types';
import { templates as mockTemplates } from '@/data/templates';

const categoryLabels: Record<string, string> = {
  saas: 'SaaS & Công nghệ',
  ecommerce: 'Thương mại Điện tử',
  enterprise: 'Doanh nghiệp',
};

const PORTFOLIO_IMAGES = [
  '/demo/portfolio-1/hero.png',
  '/demo/portfolio-2/hero.png',
  '/demo/portfolio-3/hero.png',
  '/demo/portfolio-motion-designer/hero.png',
  '/demo/portfolio-product-manager/hero.png',
];

const AGENCY_IMAGES = [
  '/demo/agency-marketing/hero.png',
  '/demo/enterprise-b2b-tech/hero.png',
  '/demo/enterprise-construction/hero.png',
  '/demo/cong-ty-tai-chinh/hero.png',
];

// Deterministic hash từ string — thay thế Math.random() để tránh SSR hydration mismatch
function hashString(str: string): number {
  return Array.from(str).reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

const CATEGORY_KEYWORD_MAP: Array<{ keywords: string[]; image: string }> = [
  {
    keywords: ['tiệc cưới', 'thiệp cưới', 'đám cưới', 'iwedding'],
    image: '/demo/to-chuc-tiec-cuoi-6655/hero.png',
  },
  {
    keywords: ['portfolio', 'profile', 'cá nhân', 'cv'],
    image: PORTFOLIO_IMAGES[0],
  },
  {
    keywords: ['tài chính', 'luật', 'đầu tư', 'ngân hàng'],
    image: '/demo/cong-ty-tai-chinh/hero.png',
  },
  {
    keywords: ['thời trang', 'mẹ & bé', 'mẹ và bé', 'phụ kiện', 'kính mắt', 'bán lẻ', 'shop', 'store'],
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80',
  },
  {
    keywords: ['mỹ phẩm', 'làm đẹp', 'beauty'],
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80',
  },
  {
    keywords: ['spa', 'chăm sóc sức khoẻ', 'sức khoẻ', 'nha khoa', 'phòng khám', 'thú cưng', 'làm tóc'],
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
  },
  {
    keywords: ['nhà hàng', 'bar', 'pub', 'club', 'trà', 'cà phê', 'tiệm bánh', 'nước uống', 'đồ uống', 'ăn uống'],
    image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=800&q=80',
  },
  {
    keywords: ['bất động sản', 'villa', 'homestay', 'khách sạn', 'nội thất', 'xây dựng', 'co-working'],
    image: '/demo/enterprise-construction/hero.png',
  },
  {
    keywords: ['phần mềm', 'app', 'saas', 'công nghệ', 'điện tử'],
    image: '/demo/enterprise-b2b-tech/hero.png',
  },
  {
    keywords: ['du lịch', 'nghỉ dưỡng', 'khám phá', 'leo núi'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
  },
  {
    keywords: ['gym', 'yoga', 'thể thao'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
  },
  {
    keywords: ['agency', 'marketing', 'coaching', 'tư vấn'],
    image: '/demo/agency-marketing/hero.png',
  },
  {
    keywords: ['hoa tươi', 'hoa', 'florist'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
  },
  {
    keywords: ['quà tết', 'tâm linh', 'gốm'],
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
  },
  {
    keywords: ['vận tải', 'logistics', 'xe máy'],
    image: '/demo/enterprise-b2b-tech/hero.png',
  },
  {
    keywords: ['cây cảnh', 'nông nghiệp', 'chăn nuôi', 'carbon'],
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80',
  },
  {
    keywords: ['sách', 'khoá học', 'sinh viên', 'tài liệu', 'phi lợi nhuận', 'hội thảo', 'sự kiện'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80',
  },
];

export function getTemplateCoverImage(title: string, rawImage?: string, id?: string): string {
  const name = (title || '').toLowerCase();
  const numId = parseInt(id || '0', 10) || hashString(title || '');

  if (name.includes('tiệc cưới') || name.includes('thiệp cưới') || name.includes('đám cưới') || name.includes('iwedding')) {
    return '/demo/to-chuc-tiec-cuoi-6655/hero.png';
  }

  // Portfolio/CV cần index rotation riêng
  if (['portfolio', 'profile', 'cá nhân', 'cv'].some((kw) => name.includes(kw))) {
    return PORTFOLIO_IMAGES[numId % PORTFOLIO_IMAGES.length];
  }

  // Agency/marketing cần index rotation riêng
  if (['agency', 'marketing', 'coaching', 'tư vấn'].some((kw) => name.includes(kw))) {
    return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
  }

  if (['tài chính', 'luật', 'đầu tư', 'ngân hàng'].some((kw) => name.includes(kw))) {
    return '/demo/cong-ty-tai-chinh/hero.png';
  }

  if (['doanh nghiệp', 'xây dựng', 'bất động sản', 'kiến trúc'].some((kw) => name.includes(kw))) {
    return numId % 2 === 0 ? '/demo/enterprise-construction/hero.png' : '/demo/enterprise-b2b-tech/hero.png';
  }

  const matched = CATEGORY_KEYWORD_MAP.find((item) =>
    item.keywords.some((kw) => name.includes(kw)),
  );
  if (matched) return matched.image;

  return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
}

export function getDefaultDemoImages(title: string, slug?: string): string[] {
  const name = (title || '').toLowerCase();
  const slugStr = (slug || '').toLowerCase();

  if (slugStr === 'to-chuc-tiec-cuoi-6655' || name.includes('tiệc cưới') || name.includes('thiệp cưới') || name.includes('đám cưới') || name.includes('iwedding')) {
    return [
      '/demo/to-chuc-tiec-cuoi-6655/hero.png',
      '/demo/to-chuc-tiec-cuoi-6655/services.png',
      '/demo/to-chuc-tiec-cuoi-6655/gallery.png',
      '/demo/to-chuc-tiec-cuoi-6655/pricing.png',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    ];
  }

  if (name.includes('portfolio') || name.includes('profile') || name.includes('cá nhân') || name.includes('cv')) {
    return [
      '/demo/portfolio-1/hero.png',
      '/demo/portfolio-2/hero.png',
      '/demo/portfolio-3/hero.png',
      '/demo/portfolio-motion-designer/hero.png',
      '/demo/portfolio-product-manager/hero.png',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
    ];
  }

  if (name.includes('agency') || name.includes('marketing') || name.includes('coaching') || name.includes('tư vấn')) {
    return [
      '/demo/agency-marketing/hero.png',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
    ];
  }

  if (name.includes('chăm sóc sức khoẻ') || name.includes('spa') || name.includes('sức khoẻ') || name.includes('thư giãn')) {
    return [
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=1200&q=80',
    ];
  }

  if (name.includes('trà') || name.includes('cà phê') || name.includes('cafe') || name.includes('nước uống')) {
    return [
      'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=1200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
    ];
  }

  if (name.includes('hoa') || name.includes('hoa tươi') || name.includes('florist')) {
    return [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('cây cảnh') || name.includes('nông nghiệp') || name.includes('cây xanh')) {
    return [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('công nghệ') || name.includes('phần mềm') || name.includes('saas') || name.includes('tech')) {
    return [
      '/demo/enterprise-b2b-tech/hero.png',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
    ];
  }

  if (name.includes('doanh nghiệp') || name.includes('xây dựng') || name.includes('enterprise')) {
    return [
      '/demo/enterprise-construction/hero.png',
      '/demo/enterprise-b2b-tech/hero.png',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    ];
  }

  if (name.includes('gốm') || name.includes('đồ gốm') || name.includes('pottery') || name.includes('ceramic')) {
    return [
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=1200&q=80',
    ];
  }

  if (name.includes('nội thất') || name.includes('nhà cửa') || name.includes('interior') || name.includes('furniture')) {
    return [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('kính mắt') || name.includes('kính') || name.includes('eyewear') || name.includes('optics')) {
    return [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('ăn uống') || name.includes('nhà hàng') || name.includes('bistro') || name.includes('dining')) {
    return [
      'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=1200&q=80',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
    ];
  }

  if (name.includes('mỹ phẩm') || name.includes('làm đẹp') || name.includes('beauty') || name.includes('cosmetic')) {
    return [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('xe máy') || name.includes('motor') || name.includes('xe')) {
    return [
      '/demo/enterprise-b2b-tech/hero.png',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
    ];
  }

  if (name.includes('đóng chai') || name.includes('đồ uống') || name.includes('beverage') || name.includes('drink')) {
    return [
      'https://images.unsplash.com/photo-1542744094-3a31b272c490?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('thực phẩm chức năng') || name.includes('chức năng') || name.includes('supplement') || name.includes('vitamin')) {
    return [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('điện tử') || name.includes('gadget') || name.includes('thiết bị')) {
    return [
      '/demo/enterprise-b2b-tech/hero.png',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('mẹ & bé') || name.includes('mẹ và bé') || name.includes('baby') || name.includes('trẻ em')) {
    return [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ];
  }

  if (name.includes('tài chính') || name.includes('luật') || name.includes('đầu tư') || name.includes('ngân hàng')) {
    return [
      '/demo/cong-ty-tai-chinh/hero.png',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    ];
  }

  return [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  ];
}

function mapTemplate(t: Record<string, unknown>): Template {
  const titleStr = (t.title as string) || '';
  const slugStr = (t.slug as string) || '';
  const rawDemo = (t.demoImages as string[]) || [];
  const demoImages = rawDemo.length > 0 ? rawDemo : getDefaultDemoImages(titleStr, slugStr);

  return {
    id: t.id as string,
    slug: slugStr,
    title: titleStr,
    category: t.category as Template['category'],
    categoryLabel: categoryLabels[t.category as string] || (t.category as string),
    description: t.description as string,
    image: getTemplateCoverImage(titleStr, t.image as string | undefined, t.id as string | undefined),
    tags: (t.tags as string[]) || [],
    features: (t.features as string[]) || [],
    demoImages,
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
