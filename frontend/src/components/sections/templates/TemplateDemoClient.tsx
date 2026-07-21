'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Monitor, Tablet, Smartphone, Wand2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BuilderCanvas from '@/components/sections/builder/BuilderCanvas';

interface Props {
  title: string;
  slug: string;
  price: string;
  pbConfig: any;
  demoImages: string[];
  image: string;
}

export default function TemplateDemoClient({ title, slug, price, pbConfig, demoImages, image }: Props) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Format price helper
  const renderPriceLabel = () => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice === 0) {
      return 'Miễn phí';
    }
    return `$${numPrice.toFixed(2)}`;
  };

  const hasLiveConfig = pbConfig && typeof pbConfig === 'object' && Object.keys(pbConfig).length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col relative select-none">
      
      {/* 1. Mockup Header Bar (mimicking Tempi.vn mockup header) */}
      <header className="h-16 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-50 sticky top-0">
        
        {/* Left: Back Link */}
        <div className="flex items-center gap-3">
          <Link
            href={`/giao-dien-mau`}
            className="p-2 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
            title="Quay lại thư viện"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="font-extrabold text-sm text-gray-800 line-clamp-1 max-w-[200px] md:max-w-xs">
            {title}
          </span>
        </div>

        {/* Center: Responsive Viewport Toggles */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={cn(
              'p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center',
              viewport === 'desktop'
                ? 'bg-white text-[#006672] shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            )}
            title="Giao diện máy tính"
          >
            <Monitor className="h-4.5 w-4.5" />
          </button>
          
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={cn(
              'p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center',
              viewport === 'tablet'
                ? 'bg-white text-[#006672] shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            )}
            title="Giao diện máy tính bảng"
          >
            <Tablet className="h-4.5 w-4.5" />
          </button>
          
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={cn(
              'p-2 rounded-lg transition-all cursor-pointer flex items-center justify-center',
              viewport === 'mobile'
                ? 'bg-white text-[#006672] shadow-sm'
                : 'text-gray-400 hover:text-gray-700'
            )}
            title="Giao diện điện thoại"
          >
            <Smartphone className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Right: Price & CTA to launch builder */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
              Giá Mẫu
            </span>
            <span className="text-sm font-extrabold text-[#006672]">
              {renderPriceLabel()}
            </span>
          </div>

          <Link
            href={`/builder/${slug}`}
            className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-md shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all text-center uppercase tracking-wider"
          >
            <Wand2 className="h-3.5 w-3.5" />
            Tạo website
          </Link>
        </div>
      </header>

      {/* 2. Responsive Render Viewport Workspace */}
      <main className="flex-1 overflow-y-auto w-full flex justify-center items-start bg-[#f0f2f5] py-8 px-4">
        
        <div
          className={cn(
            'transition-all duration-300 ease-in-out bg-white overflow-hidden shadow-2xl border border-gray-200/50',
            viewport === 'desktop' && 'w-full max-w-[1280px] rounded-2xl',
            viewport === 'tablet' && 'w-[768px] rounded-2xl min-h-[1024px]',
            viewport === 'mobile' && 'w-[375px] rounded-[32px] min-h-[812px] border-[6px] border-gray-800'
          )}
        >
          {/* Inner scrolling device viewport frame */}
          <div className="w-full h-full">
            {hasLiveConfig ? (
              // Renders live canvas from database configs
              <BuilderCanvas
                pbConfig={pbConfig}
                selectedId={null}
                allowEdit={false}
              />
            ) : (
              // Static Fallback Images if pbConfig is absent
              <div className="flex flex-col items-center">
                {demoImages && demoImages.length > 0 ? (
                  demoImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${title} Preview ${i + 1}`}
                      className="w-full h-auto block select-none pointer-events-none"
                      loading="lazy"
                    />
                  ))
                ) : (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-auto block select-none pointer-events-none"
                    loading="eager"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
