'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import type { Template } from '@/types';
import { cn } from '@/lib/utils';
import FadeInView from '@/components/ui/FadeInView';
import Magnetic from '@/components/ui/Magnetic';


const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'saas', label: 'SaaS & Công nghệ' },
  { key: 'ecommerce', label: 'Thương mại Điện tử' },
  { key: 'enterprise', label: 'Doanh nghiệp' },
] as const;

interface Props {
  templates: Template[];
}

export default function TemplateGrid({ templates }: Props) {
  const [active, setActive] = useState<string>('all');

  const filtered =
    active === 'all'
      ? templates
      : templates.filter((t) => t.category === active);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {CATEGORIES.map((cat) => (
          <Magnetic key={cat.key}>
            <button
              type="button"
              onClick={() => setActive(cat.key)}
              className={cn(
                'filter-tab px-5 py-2 rounded-full border border-border text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95',
                active === cat.key
                  ? 'bg-[#006672] text-white border-[#006672] shadow-[0_4px_12px_rgba(0,102,114,0.2)]'
                  : 'bg-white text-[#6b7280] hover:text-[#006672] hover:border-[#006672]'
              )}
            >
              {cat.label}
            </button>
          </Magnetic>
        ))}
      </div>


      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template, i) => (
          <FadeInView key={template.id} delay={i * 0.1}>
          <div
            className="template-card group flex flex-col rounded-2xl overflow-hidden border border-border bg-white hover:shadow-xl transition-all duration-300 h-full"
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Eye Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                  href={`/giao-dien-mau/${template.slug}`}
                  className="flex items-center gap-2 bg-white text-[#006672] px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-[#f0f7f8] transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Xem chi tiết
                </Link>
              </div>
              {/* Category tag */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 text-[#374151] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {template.categoryLabel}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col gap-3 flex-1 bg-white">
              <h3 className="font-extrabold text-[#0f0f0f] text-lg tracking-tight transition-colors duration-300 group-hover:text-[#006672]">
                {template.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2">
                {template.description}
              </p>

              {/* Actions row */}
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[#e2ecec]/50">
                <Magnetic>
                  <Link
                    href={`/giao-dien-mau/${template.slug}`}
                    className="bg-[#006672] hover:bg-[#004d56] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 block w-[160px] md:w-[180px] lg:w-[190px]"
                  >
                    Xem chi tiết
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href={`/giao-dien-mau/${template.slug}`}
                    aria-label="Xem chi tiết"
                    className="p-2.5 rounded-xl border border-[#e2ecec] text-[#6b7280] hover:text-[#006672] hover:border-[#006672] transition-colors flex items-center justify-center aspect-square bg-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
          </FadeInView>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#9ca3af]">
          Không có giao diện nào trong danh mục này.
        </div>
      )}
    </div>
  );
}
