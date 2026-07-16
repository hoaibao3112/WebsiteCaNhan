'use client';

import { useState } from 'react';
import type { Project } from '@/types';

const CATEGORIES = [
  { key: 'all', label: 'Tất cả' },
  { key: 'landing', label: 'Trang dịch' },
  { key: 'ecommerce', label: 'Thương mại điện tử' },
  { key: 'enterprise', label: 'Doanh nghiệp' },
] as const;

interface Props {
  projects: Project[];
}

export default function PortfolioGrid({ projects }: Props) {
  const [active, setActive] = useState<string>('all');

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActive(cat.key)}
            className={`filter-tab ${active === cat.key ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((project, i) => (
          <div
            key={project.id}
            className={`project-card group ${
              project.size === 'large' && i === 0
                ? 'md:col-span-2 md:row-span-2 h-80 md:h-auto min-h-[360px]'
                : 'h-60'
            }`}
            style={{
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="project-card-overlay">
              <div>
                <span className="text-xs text-white/70 font-medium uppercase tracking-wider">
                  {project.categoryLabel}
                </span>
                <p className="text-white font-bold text-base leading-tight mt-0.5">
                  {project.title}
                </p>
                <p className="text-white/70 text-xs mt-1 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#9ca3af]">
          Không có dự án nào trong danh mục này.
        </div>
      )}
    </div>
  );
}
