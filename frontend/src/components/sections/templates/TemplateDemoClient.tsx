'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Magnetic from '@/components/ui/Magnetic';

interface Props {
  demoImages: string[];
  title: string;
  slug: string;
}

export default function TemplateDemoClient({ demoImages, title, slug }: Props) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (demoImages.length > 1) {
      setActiveIndex((prev) => (prev + 1) % demoImages.length);
    }
  };

  const handlePrev = () => {
    if (demoImages.length > 1) {
      setActiveIndex((prev) => (prev - 1 + demoImages.length) % demoImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        router.push(`/giao-dien-mau/${slug}`);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [demoImages, slug]);

  if (!demoImages || demoImages.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#f8fafb] flex flex-col items-center relative select-none">
      {/* Floating Header Actions (Back button & Page tabs) */}
      <div className="fixed top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        {/* Back Link */}
        <div className="pointer-events-auto">
          <Link
            href={`/giao-dien-mau/${slug}`}
            className="flex items-center gap-2 px-5 py-3 bg-white/70 hover:bg-white/90 text-[#0f0f0f] rounded-full shadow-[0_12px_40px_rgba(0,102,114,0.12)] border border-white/50 hover:scale-105 transition-all text-sm font-bold backdrop-blur-xl cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại chi tiết
          </Link>
        </div>

        {/* Page Switcher Tabs */}
        {demoImages.length > 1 && (
          <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 bg-white/70 backdrop-blur-xl rounded-full border border-white/50 shadow-[0_12px_40px_rgba(0,102,114,0.12)]">
            {demoImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'bg-[#006672] text-white shadow-[0_4px_12px_rgba(0,102,114,0.25)] scale-105'
                    : 'text-[#374151] hover:text-[#006672] hover:bg-white/40'
                }`}
              >
                Trang {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Empty placeholder to balance flex row on desktop */}
        <div className="w-[145px] hidden sm:block pointer-events-none" />
      </div>

      {/* Main Single Image Viewer Area */}
      <div className="w-full flex-1 flex justify-center items-start pt-28 pb-10 relative group">
        {/* Left Arrow Button */}
        {demoImages.length > 1 && (
          <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
            <Magnetic>
              <button
                type="button"
                onClick={handlePrev}
                className="w-14 h-14 bg-white/95 hover:bg-white text-[#0f0f0f] rounded-full shadow-2xl border border-[#e2ecec] flex items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-md"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </Magnetic>
          </div>
        )}

        {/* The Image Wrapper Container */}
        <div className="w-full max-w-[1600px] mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-[#e2ecec]">
          <img
            src={demoImages[activeIndex]}
            alt={`${title} Screen ${activeIndex + 1}`}
            className="w-full h-auto block select-none pointer-events-none"
            loading="eager"
          />
        </div>

        {/* Right Arrow Button */}
        {demoImages.length > 1 && (
          <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:block">
            <Magnetic>
              <button
                type="button"
                onClick={handleNext}
                className="w-14 h-14 bg-white/95 hover:bg-white text-[#0f0f0f] rounded-full shadow-2xl border border-[#e2ecec] flex items-center justify-center transition-all hover:scale-110 cursor-pointer backdrop-blur-md"
                aria-label="Ảnh sau"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </Magnetic>
          </div>
        )}
      </div>

      {/* Floating control bar for Mobile devices */}
      {demoImages.length > 1 && (
        <div className="fixed bottom-6 z-40 md:hidden flex items-center gap-6 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full border border-[#e2ecec] shadow-2xl">
          <button
            type="button"
            onClick={handlePrev}
            className="text-sm font-extrabold text-[#6b7280] hover:text-[#006672] transition-colors"
          >
            Trước
          </button>
          <span className="text-xs font-mono font-bold text-[#374151]">
            {activeIndex + 1} / {demoImages.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="text-sm font-extrabold text-[#6b7280] hover:text-[#006672] transition-colors"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
