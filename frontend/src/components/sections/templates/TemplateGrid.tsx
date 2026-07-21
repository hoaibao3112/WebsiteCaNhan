'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Eye, Search, Download, Wand2, ChevronDown, Star, Sparkles
} from 'lucide-react';
import type { Template } from '@/types';
import { cn } from '@/lib/utils';
import FadeInView from '@/components/ui/FadeInView';

const CATEGORIES = [
  { key: 'all', label: 'Tất cả danh mục' },
  { key: 'enterprise', label: 'Doanh Nghiệp' },
  { key: 'ecommerce', label: 'Bán hàng & E-commerce' },
  { key: 'saas', label: 'Dịch vụ & SaaS' },
  { key: 'personal', label: 'Cá nhân & Portfolio' },
  { key: 'other', label: 'Khác' },
];

const INITIAL_LIMIT = 18;
const PAGE_SIZE = 18;

function getThumbnailUrl(url: string): string {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?w=600&q=80&auto=format`;
  }
  return url;
}

interface Props {
  templates: Template[];
}

export default function TemplateGrid({ templates }: Props) {
  const [active, setActive] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [displayLimit, setDisplayLimit] = useState<number>(INITIAL_LIMIT);

  const handleCategoryChange = (key: string) => {
    setActive(key);
    setDisplayLimit(INITIAL_LIMIT);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setDisplayLimit(INITIAL_LIMIT);
  };

  // Dynamically classify templates
  const getTemplateCategory = (t: Template): string => {
    const titleLower = t.title.toLowerCase();
    if (titleLower.includes('portfolio') || titleLower.includes('profile') || titleLower.includes('ca nhan') || titleLower.includes('cá nhân')) {
      return 'personal';
    }
    if (t.category === 'ecommerce') return 'ecommerce';
    if (t.category === 'enterprise') return 'enterprise';
    if (t.category === 'saas') return 'saas';
    return 'other';
  };

  const getCategoryLabel = (t: Template): string => {
    const cat = getTemplateCategory(t);
    switch (cat) {
      case 'personal': return 'PORTFOLIO CÁ NHÂN';
      case 'ecommerce': return 'THƯƠNG MẠI ĐIỆN TỬ';
      case 'enterprise': return 'DOANH NGHIỆP';
      case 'saas': return 'DỊCH VỤ & SAAS';
      default: return 'GIAO DIỆN PREMIUM';
    }
  };

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const tempCat = getTemplateCategory(t);
      const matchesCategory = 
        active === 'all' || 
        (active === 'other' && tempCat === 'other') ||
        (active === tempCat);

      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [templates, active, search]);

  const visibleTemplates = useMemo(() => {
    return filtered.slice(0, displayLimit);
  }, [filtered, displayLimit]);

  const hasMore = filtered.length > displayLimit;
  const remainingCount = filtered.length - displayLimit;

  return (
    <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center select-none space-y-10">
      
      {/* Top Filter Bar (Centered Glassmorphism Panel - Enlarged & Spacious) */}
      <div className="w-full bg-white/95 backdrop-blur-md border border-[#e2ecec] rounded-3xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Category Pills Slider */}
        <div className="flex items-center gap-3 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleCategoryChange(cat.key)}
                className={cn(
                  'px-6 py-3.5 rounded-2xl text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer border',
                  isActive
                    ? 'bg-[#006672] text-white border-[#006672] shadow-lg shadow-[#006672]/25 scale-105'
                    : 'bg-[#f8fafb] text-[#374151] border-[#e5e7eb] hover:bg-[#eef5f6] hover:text-[#006672] hover:border-[#006672]/30'
                )}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full lg:w-96 shrink-0 flex items-center">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder="Tìm kiếm mẫu giao diện..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-5 py-3.5 bg-[#f8fafb] border border-[#e5e7eb] rounded-2xl text-sm font-bold focus:outline-none focus:border-[#006672] focus:bg-white focus:ring-4 focus:ring-[#006672]/10 transition-all text-[#111827] placeholder-gray-400"
          />
        </div>
      </div>

      {/* Count Info Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 gap-3 text-sm font-bold text-[#6b7280]">
        <span className="flex items-center gap-2.5 text-[#0f0f0f] text-base font-black">
          <Sparkles className="size-5 text-[#006672]" />
          Kho Giao diện ({filtered.length} mẫu sẵn có)
        </span>
        <span className="bg-[#f0f7f8] text-[#006672] px-4 py-2 rounded-full border border-[#006672]/20 font-extrabold text-xs">
          Đang hiển thị {visibleTemplates.length}/{filtered.length} mẫu
        </span>
      </div>

      {/* Grid Container (Full Width Responsive Grid) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {visibleTemplates.map((template, i) => {
          const numericId = parseInt(template.id.replace(/\D/g, '')) || (i + 1) * 17;
          const downloads = (numericId % 180) + 65;
          const rating = (4.8 + ((numericId % 3) * 0.1)).toFixed(1);
          const delay = (i % 6) * 0.04;

          return (
            <FadeInView key={template.id} delay={delay}>
              <div className="group flex flex-col rounded-3xl overflow-hidden border border-[#e5e7eb] bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                
                {/* Image Aspect Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f9fafb] border-b border-[#f3f4f6]">
                  <img
                    src={getThumbnailUrl(template.image)}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-black/65 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 shadow-sm">
                    {getCategoryLabel(template)}
                  </div>

                  {/* Rating Tag */}
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md text-[#0f0f0f] text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-gray-100">
                    <Star className="size-3 text-amber-500 fill-amber-500" />
                    <span>{rating}</span>
                  </div>

                  {/* Hover Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6 gap-3">
                    <Link
                      href={`/giao-dien-mau/${template.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-white text-[#0f0f0f] hover:bg-[#f0f7f8] hover:text-[#006672] py-3 rounded-2xl font-extrabold text-xs shadow-xl transition-all"
                    >
                      <Eye className="size-4" />
                      Xem Demo Chi Tiết
                    </Link>
                    
                    <a
                      href="https://zalo.me/0374170367"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#006672] hover:bg-[#004d56] text-white py-3 rounded-2xl font-extrabold text-xs shadow-xl transition-all"
                    >
                      <Wand2 className="size-4" />
                      Nhận Tư Vấn Mẫu Này
                    </a>
                  </div>
                </div>

                {/* Bottom Title & Details */}
                <div className="p-5 flex flex-col gap-3 flex-1 bg-white justify-between">
                  <div>
                    <h3 className="font-extrabold text-[#0f0f0f] text-base leading-snug group-hover:text-[#006672] transition-colors duration-200">
                      {template.title}
                    </h3>
                    <p className="text-xs text-[#6b7280] line-clamp-2 mt-1.5 leading-relaxed">
                      {template.description || 'Giao diện tối ưu chuẩn SEO, thiết kế hiện đại, mượt mà trên mobile và tối ưu tỷ lệ chuyển đổi.'}
                    </p>
                  </div>

                  {/* Info stats bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#f3f4f6] text-xs font-bold text-[#6b7280]">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                      <Download className="size-3.5 text-emerald-600" />
                      {downloads} doanh nghiệp dùng
                    </span>
                    <span className="text-[#006672] font-black">
                      Từ 990.000₫
                    </span>
                  </div>
                </div>

              </div>
            </FadeInView>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-8 pb-4">
          <button
            type="button"
            onClick={() => setDisplayLimit((prev) => prev + PAGE_SIZE)}
            className="btn-primary text-sm py-4 px-10 gap-2.5 shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full font-extrabold"
          >
            <span>Xem thêm giao diện ({remainingCount} mẫu nữa)</span>
            <ChevronDown className="size-4 animate-bounce" />
          </button>
          <p className="text-xs text-[#6b7280] mt-3 font-semibold">
            Đã tải {visibleTemplates.length} / {filtered.length} giao diện
          </p>
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="w-full text-center py-20 text-gray-500 font-bold text-sm bg-[#f8fafb] rounded-3xl border border-dashed border-gray-300">
          Không tìm thấy giao diện nào phù hợp với tìm kiếm &quot;{search}&quot;.
        </div>
      )}

    </div>
  );
}
