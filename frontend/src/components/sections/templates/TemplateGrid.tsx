'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Eye, Search, ChevronRight, Download, Wand2 
} from 'lucide-react';
import type { Template } from '@/types';
import { cn } from '@/lib/utils';
import FadeInView from '@/components/ui/FadeInView';

const SIDEBAR_CATEGORIES = [
  { key: 'all', label: 'Tất cả danh mục' },
  { key: 'enterprise', label: 'Doanh Nghiệp' },
  { key: 'ecommerce', label: 'Bán hàng' },
  { key: 'saas', label: 'Dịch vụ' },
  { key: 'personal', label: 'Cá nhân' },
  { key: 'other', label: 'Khác' },
];

interface Props {
  templates: Template[];
}

export default function TemplateGrid({ templates }: Props) {
  const [active, setActive] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  // Dynamically classify templates on client side for filtering
  const getTemplateCategory = (t: Template): string => {
    const titleLower = t.title.toLowerCase();
    if (titleLower.includes('portfolio') || titleLower.includes('profile') || titleLower.includes('ca nhan')) {
      return 'personal';
    }
    if (t.category === 'ecommerce') return 'ecommerce';
    if (t.category === 'enterprise') return 'enterprise';
    if (t.category === 'saas') return 'saas';
    return 'other';
  };

  const filtered = templates.filter((t) => {
    // 1. Category matching logic
    const tempCat = getTemplateCategory(t);
    const matchesCategory = 
      active === 'all' || 
      (active === 'other' && tempCat === 'other') ||
      (active === tempCat);

    // 2. Search matching logic
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start select-none">
      
      {/* Left Sidebar Category & Search Panel */}
      <aside className="w-full lg:w-[280px] shrink-0 bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-5 sticky top-24 shadow-sm">
        
        {/* Search Box */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#006672] transition-colors text-gray-800 placeholder-gray-400 font-medium"
          />
          <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-400" />
        </div>

        {/* Navigation Category list */}
        <div className="flex flex-col gap-1.5">
          {SIDEBAR_CATEGORIES.map((cat) => {
            const isActive = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActive(cat.key)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all cursor-pointer',
                  isActive
                    ? 'bg-[#006672] text-white shadow-[0_4px_12px_rgba(0,102,114,0.15)]'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <span>{cat.label}</span>
                <ChevronRight className={cn('h-4 w-4 opacity-70 transition-transform', isActive ? 'translate-x-0.5' : '')} />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Content Template Grid */}
      <section className="flex-1 w-full">
        {/* Center Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-[#1e1b4b] leading-tight">
            Tạo nhanh Website từ template chuyên nghiệp
          </h2>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((template, i) => {
            // Generate mock but consistent metrics based on ID to look real
            const numericId = parseInt(template.id.replace(/\D/g, '')) || 100;
            const downloads = (numericId % 150) + 45;
            const views = (numericId % 300) + 120;

            return (
              <FadeInView key={template.id} delay={i * 0.05}>
                <div className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200/80 bg-white hover:shadow-xl transition-all duration-300 h-full">
                  
                  {/* Aspect ratio frame for image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      loading="lazy"
                    />

                    {/* Interactive Action Overlay on hover */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                      <Link
                        href={`/giao-dien-mau/${template.slug}`}
                        className="w-[160px] flex items-center justify-center gap-2 bg-white text-[#006672] hover:bg-gray-100 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-colors text-center"
                      >
                        <Eye className="h-4.5 w-4.5" />
                        XEM CHI TIẾT
                      </Link>
                      
                      <Link
                        href={`/builder/${template.slug}`}
                        className="w-[160px] flex items-center justify-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white py-2.5 rounded-xl font-bold text-xs shadow-lg transition-colors text-center"
                      >
                        <Wand2 className="h-4.5 w-4.5" />
                        THIẾT KẾ MẪU
                      </Link>
                    </div>
                  </div>

                  {/* Template description metrics underneath */}
                  <div className="p-4 flex flex-col gap-2 flex-1 bg-white">
                    <h3 className="font-extrabold text-[#0f0f0f] text-base leading-snug group-hover:text-[#006672] transition-colors duration-200">
                      {template.title}
                    </h3>
                    
                    {/* Metrics detail row */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mt-auto pt-2">
                      <span className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        {downloads}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {views}
                      </span>
                    </div>
                  </div>

                </div>
              </FadeInView>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-bold text-sm bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            Không tìm thấy giao diện nào trong danh mục này.
          </div>
        )}
      </section>
    </div>
  );
}
