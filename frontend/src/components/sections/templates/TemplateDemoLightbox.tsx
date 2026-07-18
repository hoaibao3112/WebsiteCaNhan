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

      {/* Fullscreen Overlay - Behaves like a real live webpage demo */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#f8fafb] z-[9999] overflow-y-auto flex flex-col items-center animate-fade-in scroll-smooth">
          {/* Floating Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="fixed top-6 right-6 z-50 p-3.5 bg-white/90 hover:bg-white text-[#0f0f0f] rounded-full shadow-xl border border-[#e2ecec] hover:scale-110 transition-all flex items-center justify-center cursor-pointer backdrop-blur-md"
            title="Đóng (Esc)"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Floating Page Navigation (for multi-page templates) */}
          {demoImages.length > 1 && (
            <div className="fixed top-6 left-6 z-50 flex items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#e2ecec] shadow-lg">
              {demoImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeIndex === i
                      ? 'bg-[#006672] text-white shadow-md'
                      : 'bg-zinc-50 text-[#6b7280] hover:bg-zinc-100 hover:text-[#006672]'
                  }`}
                >
                  Trang {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Full-width scrollable image layout (Feels like a real webpage) */}
          <div className="w-full max-w-[1600px] mx-auto shadow-2xl bg-white min-h-screen">
            <img
              src={demoImages[activeIndex]}
              alt={`${title} Screen ${activeIndex + 1}`}
              className="w-full h-auto block select-none"
              loading="eager"
            />
          </div>
        </div>
      )}
    </>
  );
}
