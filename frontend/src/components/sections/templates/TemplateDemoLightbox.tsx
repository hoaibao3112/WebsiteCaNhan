'use client';

import { useState, useEffect } from 'react';
import { X, Play, ArrowLeft, ArrowRight, Eye, Layers } from 'lucide-react';

interface Props {
  demoImages: string[];
  title: string;
}

export default function TemplateDemoLightbox({ demoImages, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowRight' && isOpen) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && isOpen) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex]);

  // Disable scroll on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = () => {
    if (demoImages.length > 0) {
      setActiveIndex((prev) => (prev + 1) % demoImages.length);
    }
  };

  const handlePrev = () => {
    if (demoImages.length > 0) {
      setActiveIndex((prev) => (prev - 1 + demoImages.length) % demoImages.length);
    }
  };

  if (!demoImages || demoImages.length === 0) return null;

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setActiveIndex(0);
        }}
        className="btn-secondary text-sm flex items-center gap-2 px-6 py-3 cursor-pointer"
      >
        <Eye className="h-4 w-4" />
        Xem demo ảnh ({demoImages.length})
      </button>

      {/* Fullscreen Overlay Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col justify-between overflow-hidden text-white animate-fade-in">
          {/* Header Bar */}
          <div className="bg-zinc-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="bg-[#006672] text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Demo
              </span>
              <h3 className="font-bold text-sm sm:text-base text-zinc-100">{title}</h3>
            </div>

            {/* Tab navigation for screens */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
              {demoImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeIndex === i
                      ? 'bg-white text-black font-black shadow-md scale-105'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                  }`}
                >
                  Trang {i + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400 font-mono">
                {activeIndex + 1} / {demoImages.length}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white cursor-pointer"
                title="Đóng (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Viewport - scrollable vertical area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-zinc-950/40 relative group">
            {/* Scrollable screenshot container */}
            <div className="max-w-[1200px] w-full flex flex-col items-center">
              <img
                src={demoImages[activeIndex]}
                alt={`${title} Screen ${activeIndex + 1}`}
                className="w-full h-auto object-contain rounded-lg shadow-2xl select-none"
                loading="eager"
              />
            </div>

            {/* Left navigation arrow */}
            {demoImages.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-[#006672] p-3 rounded-full text-white transition-all shadow-lg hover:scale-105 z-10 opacity-0 group-hover:opacity-100 md:block hidden cursor-pointer"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            )}

            {/* Right navigation arrow */}
            {demoImages.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-[#006672] p-3 rounded-full text-white transition-all shadow-lg hover:scale-105 z-10 opacity-0 group-hover:opacity-100 md:block hidden cursor-pointer"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Footer controls for mobile/ease of use */}
          <div className="bg-zinc-900 px-6 py-3 flex sm:hidden items-center justify-between border-t border-zinc-800">
            <button
              type="button"
              onClick={handlePrev}
              disabled={demoImages.length <= 1}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" /> Trước
            </button>
            <span className="text-xs text-zinc-400">
              Trang {activeIndex + 1} / {demoImages.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={demoImages.length <= 1}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 disabled:opacity-50"
            >
              Sau <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
