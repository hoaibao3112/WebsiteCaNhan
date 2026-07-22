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
    keywords: ['spa', 'chăm sóc sức khoẻ', 'sức khoẻ', 'nha khoa', 'phòng khám', 'thú cưng', 'làm tóc'],
    image: '/demo/spa/hero.svg',
  },
  {
    keywords: ['nhà hàng', 'bar', 'pub', 'club', 'trà', 'cà phê', 'tiệm bánh', 'nước uống', 'đồ uống', 'ăn uống'],
    image: '/demo/cafe/hero.svg',
  },
  {
    keywords: ['hoa tươi', 'hoa', 'florist'],
    image: '/demo/florist/hero.svg',
  },
  {
    keywords: ['cây cảnh', 'nông nghiệp', 'chăn nuôi', 'carbon'],
    image: '/demo/plant-shop/hero.svg',
  },
  {
    keywords: ['gốm', 'đồ gốm', 'pottery', 'ceramic'],
    image: '/demo/pottery/hero.svg',
  },
  {
    keywords: ['nội thất', 'nhà cửa', 'interior', 'furniture'],
    image: '/demo/interior-design/hero.svg',
  },
  {
    keywords: ['kính mắt', 'kính', 'eyewear', 'optics'],
    image: '/demo/eyewear/hero.svg',
  },
  {
    keywords: ['mỹ phẩm', 'làm đẹp', 'beauty'],
    image: '/demo/cosmetics/hero.svg',
  },
  {
    keywords: ['xe máy', 'motor', 'xe'],
    image: '/demo/motorbike/hero.svg',
  },
  {
    keywords: ['mẹ & bé', 'mẹ và bé', 'baby', 'trẻ em'],
    image: '/demo/mother-baby/hero.svg',
  },
  {
    keywords: ['thực phẩm chức năng', 'chức năng', 'supplement', 'vitamin'],
    image: '/demo/health-supplements/hero.svg',
  },
  {
    keywords: ['bất động sản', 'villa', 'homestay', 'khách sạn', 'xây dựng', 'co-working'],
    image: '/demo/enterprise-construction/hero.png',
  },
  {
    keywords: ['phần mềm', 'app', 'saas', 'công nghệ', 'điện tử'],
    image: '/demo/enterprise-b2b-tech/hero.png',
  },
  {
    keywords: ['agency', 'marketing', 'coaching', 'tư vấn'],
    image: '/demo/agency-marketing/hero.png',
  },
];

export function getTemplateCoverImage(title: string, rawImage?: string, id?: string): string {
  const name = (title || '').toLowerCase();
  const numId = parseInt(id || '0', 10) || hashString(title || '');

  if (name.includes('tiệc cưới') || name.includes('thiệp cưới') || name.includes('đám cưới') || name.includes('iwedding')) {
    return '/demo/to-chuc-tiec-cuoi-6655/hero.png';
  }

  if (['portfolio', 'profile', 'cá nhân', 'cv'].some((kw) => name.includes(kw))) {
    return PORTFOLIO_IMAGES[numId % PORTFOLIO_IMAGES.length];
  }

  if (['agency', 'marketing', 'coaching', 'tư vấn'].some((kw) => name.includes(kw))) {
    return AGENCY_IMAGES[numId % AGENCY_IMAGES.length];
  }

  if (['tài chính', 'luật', 'đầu tư', 'ngân hàng'].some((kw) => name.includes(kw))) {
    return '/demo/cong-ty-tai-chinh/hero.png';
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
    ];
  }

  if (name.includes('portfolio') || name.includes('profile') || name.includes('cá nhân') || name.includes('cv')) {
    return [
      '/demo/portfolio-1/hero.png',
      '/demo/portfolio-2/hero.png',
      '/demo/portfolio-3/hero.png',
      '/demo/portfolio-motion-designer/hero.png',
      '/demo/portfolio-product-manager/hero.png',
    ];
  }

  if (name.includes('agency') || name.includes('marketing') || name.includes('coaching') || name.includes('tư vấn')) {
    return [
      '/demo/agency-marketing/hero.png',
      '/hero-card-2.png',
      '/pricing-cover-cms.png',
      '/hero-visual.png',
    ];
  }

  if (name.includes('chăm sóc sức khoẻ') || name.includes('spa') || name.includes('sức khoẻ') || name.includes('thư giãn')) {
    return [
      '/demo/spa/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-lead.png',
      '/hero-visual.png',
    ];
  }

  if (name.includes('trà') || name.includes('cà phê') || name.includes('cafe') || name.includes('nước uống')) {
    return [
      '/demo/cafe/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('hoa') || name.includes('hoa tươi') || name.includes('florist')) {
    return [
      '/demo/florist/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('cây cảnh') || name.includes('nông nghiệp') || name.includes('cây xanh')) {
    return [
      '/demo/plant-shop/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('gốm') || name.includes('đồ gốm') || name.includes('pottery') || name.includes('ceramic')) {
    return [
      '/demo/pottery/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('nội thất') || name.includes('nhà cửa') || name.includes('interior') || name.includes('furniture')) {
    return [
      '/demo/interior-design/hero.svg',
      '/demo/enterprise-construction/hero.png',
      '/pricing-cover-cms.png',
      '/hero-card-1.png',
    ];
  }

  if (name.includes('kính mắt') || name.includes('kính') || name.includes('eyewear') || name.includes('optics')) {
    return [
      '/demo/eyewear/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('ăn uống') || name.includes('nhà hàng') || name.includes('bistro') || name.includes('dining')) {
    return [
      '/demo/restaurant/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-lead.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('mỹ phẩm') || name.includes('làm đẹp') || name.includes('beauty') || name.includes('cosmetic')) {
    return [
      '/demo/cosmetics/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('xe máy') || name.includes('motor') || name.includes('xe')) {
    return [
      '/demo/motorbike/hero.svg',
      '/demo/enterprise-b2b-tech/hero.png',
      '/pricing-cover-lead.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('đóng chai') || name.includes('đồ uống') || name.includes('beverage') || name.includes('drink')) {
    return [
      '/demo/cafe/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('thực phẩm chức năng') || name.includes('chức năng') || name.includes('supplement') || name.includes('vitamin')) {
    return [
      '/demo/health-supplements/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('điện tử') || name.includes('gadget') || name.includes('thiết bị')) {
    return [
      '/demo/enterprise-b2b-tech/hero.png',
      '/bento-ai.png',
      '/pricing-cover-ai.png',
      '/hero-visual.png',
    ];
  }

  if (name.includes('mẹ & bé') || name.includes('mẹ và bé') || name.includes('baby') || name.includes('trẻ em')) {
    return [
      '/demo/mother-baby/hero.svg',
      '/bento-ecommerce.png',
      '/pricing-cover-ecommerce.png',
      '/bento-checkout.png',
    ];
  }

  if (name.includes('tài chính') || name.includes('luật') || name.includes('đầu tư') || name.includes('ngân hàng')) {
    return [
      '/demo/cong-ty-tai-chinh/hero.png',
      '/pricing-cover-unlimited.png',
      '/bento-ai.png',
      '/hero-card-1.png',
    ];
  }

  if (name.includes('công nghệ') || name.includes('phần mềm') || name.includes('saas') || name.includes('tech')) {
    return [
      '/demo/enterprise-b2b-tech/hero.png',
      '/bento-ai.png',
      '/pricing-cover-ai.png',
      '/hero-visual.png',
    ];
  }

  if (name.includes('doanh nghiệp') || name.includes('xây dựng') || name.includes('enterprise')) {
    return [
      '/demo/enterprise-construction/hero.png',
      '/demo/enterprise-b2b-tech/hero.png',
      '/pricing-cover-cms.png',
      '/hero-card-1.png',
    ];
  }

  return [
    '/demo/enterprise-b2b-tech/hero.png',
    '/bento-ecommerce.png',
    '/pricing-cover-cms.png',
    '/hero-visual.png',
  ];
}

function mapTemplate(t: Record<string, unknown>): Template {
  const titleStr = (t.title as string) || '';
  const slugStr = (t.slug as string) || '';
  const rawDemo = (t.demoImages as string[]) || [];

  // Lọc chỉ giữ lại các đường dẫn là ảnh chụp màn hình giao diện website (Web UI Mockups)
  const validDemo = rawDemo.filter((url) =>
    url.startsWith('/demo/') || url.startsWith('/bento-') || url.startsWith('/pricing-') || url.startsWith('/hero-')
  );

  const demoImages = validDemo.length >= 3 ? validDemo : getDefaultDemoImages(titleStr, slugStr);

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
