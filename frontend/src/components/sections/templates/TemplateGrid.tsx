'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import type { Template } from '@/types';
import { cn } from '@/lib/utils';

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
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActive(cat.key)}
            className={cn('filter-tab', active === cat.key && 'active')}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template, i) => (
          <div
            key={template.id}
            className={`template-card group flex flex-col rounded-2xl overflow-hidden border border-[#f0e8e8] bg-white hover:shadow-xl transition-all duration-300 animate-fade-in-up`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#fdf5f5]">
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
                  className="flex items-center gap-2 bg-white text-[#e11d48] px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-[#fff1f2] transition-colors"
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
            <div className="p-5 flex flex-col gap-2 flex-1">
              <h3 className="font-black text-[#0f0f0f] text-base">{template.title}</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2">
                {template.description}
              </p>

              {/* Bottom row */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0e8e8]">
                <Link
                  href={`/giao-dien-mau/${template.slug}`}
                  className="text-sm font-semibold text-[#e11d48] hover:underline"
                >
                  Xem chi tiết →
                </Link>
                <Eye className="h-4 w-4 text-[#9ca3af]" />
              </div>
            </div>
          </div>
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
