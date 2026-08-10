'use client';

import Image from 'next/image';
import { Star, Zap, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const IMAGES = [
  { src: '/hero-card-1.png', title: 'Thương mại điện tử Premium', tag: 'E-Commerce' },
  { src: '/hero-card-2.png', title: 'Nhà hàng & F&B Cao cấp', tag: 'Restaurant' },
  { src: '/hero-card-3.png', title: 'Spa & Chăm sóc sức khỏe', tag: 'Beauty & Wellness' },
  { src: '/bento-ai.png', title: 'Thiết kế thông minh với AI', tag: 'AI Powered' },
  { src: '/hero-visual.png', title: 'Trình dựng kéo thả KABO', tag: 'Drag & Drop' },
  { src: '/pricing-cover-ecommerce.png', title: 'Shop bán hàng online', tag: 'Online Store' },
  { src: '/bento-model.png', title: 'Thời trang & Lookbook', tag: 'Fashion' },
];

export default function HeroImageSlider() {
  const [current, setCurrent] = useState(0);
  const shouldReduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
    setProgress(0);
  };

  // Autoplay and progress bar
  useEffect(() => {
    const duration = 4500; // 4.5 seconds per slide
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        handleNext();
        currentStep = 0;
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] select-none flex items-center justify-center">
      {/* Background glow shadow */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[#6366f1]/25 via-[#a855f7]/20 to-[#06b6d4]/15 blur-3xl pointer-events-none" />

      {/* 3D Stacked Cards Container */}
      <div className="relative w-full h-full cursor-pointer" onClick={handleNext}>
        <AnimatePresence mode="popLayout">
          {IMAGES.map((img, idx) => {
            const total = IMAGES.length;
            const offset = (idx - current + total) % total;
            const isVisible = offset <= 3; // Show top 4 stacked cards

            if (!isVisible) return null;

            // Stack layer offset properties
            const stackScale = 1 - offset * 0.05;
            const stackY = offset * 14;
            const stackX = offset === 1 ? 14 : offset === 2 ? -12 : offset === 3 ? 8 : 0;
            const stackRotate = offset === 1 ? 3 : offset === 2 ? -2.5 : offset === 3 ? 1.5 : 0;
            const stackOpacity = 1 - offset * 0.22;
            const zIndex = total - offset;

            return (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.85, y: 40, rotate: 6 }}
                animate={{
                  opacity: stackOpacity,
                  scale: stackScale,
                  y: stackY,
                  x: stackX,
                  rotate: stackRotate,
                  zIndex,
                }}
                exit={{
                  opacity: 0,
                  x: 160,
                  rotate: 15,
                  scale: 0.9,
                  transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={offset === 0 && !shouldReduce ? { scale: 1.02, y: -4 } : {}}
                className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.18)] border border-[#e5e7eb] bg-white"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover object-top"
                  priority={offset === 0}
                  loading={offset === 0 ? 'eager' : 'lazy'}
                  fetchPriority={offset === 0 ? 'high' : 'auto'}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Card Title & Tag Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase mb-1.5 border border-white/20">
                      {img.tag}
                    </span>
                    <p className="text-white font-extrabold text-base sm:text-lg leading-snug drop-shadow-sm">
                      {img.title}
                    </p>
                  </div>

                  {/* Card count pill */}
                  <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold shrink-0 border border-white/10">
                    {idx + 1} / {total}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Progress bar at the bottom */}
        <div className="absolute bottom-0 left-6 right-6 h-[4px] bg-white/20 backdrop-blur-md rounded-full overflow-hidden z-40 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#06b6d4] transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: '50ms' }}
          />
        </div>

        {/* Navigation Dot Indicators */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-[#f0f0f0]">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(idx);
                setProgress(0);
              }}
              className="relative size-3 flex items-center justify-center rounded-full"
              type="button"
              aria-label={`Chuyển tới ảnh ${idx + 1}`}
            >
              {current === idx && (
                <motion.span
                  layoutId="activeHeroDot"
                  className="absolute inset-0 rounded-full border-2 border-[#6366f1]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className={`size-1.5 rounded-full transition-colors duration-300 ${
                current === idx ? 'bg-[#6366f1]' : 'bg-[#9ca3af]/40 hover:bg-[#6366f1]/60'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Floating badge — bottom left */}
      <motion.div
        className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl shadow-2xl border border-[#f0f0f0] px-4 py-3 flex items-center gap-3"
        animate={shouldReduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="size-9 rounded-xl bg-[#fef9c3] flex items-center justify-center shrink-0">
          <Star className="size-4.5 text-[#f59e0b] fill-[#f59e0b]" />
        </div>
        <div>
          <p className="text-xs font-black text-[#0f0f0f]">98% hài lòng</p>
          <p className="text-[10px] text-[#9ca3af]">Khách hàng</p>
        </div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        className="absolute -top-4 -right-4 z-20 bg-[#6366f1] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
        animate={shouldReduce ? {} : { x: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <Zap className="size-4 text-white" />
        <span className="text-xs font-bold text-white">120+ Dự án</span>
      </motion.div>

      {/* Floating badge — right middle */}
      <motion.div
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white rounded-2xl shadow-xl border border-[#f0f0f0] px-3 py-2.5 flex items-center gap-2"
        animate={shouldReduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <TrendingUp className="size-4 text-[#22c55e]" />
        <span className="text-xs font-bold text-[#0f0f0f]">+42% tăng trưởng</span>
      </motion.div>
    </div>
  );
}
