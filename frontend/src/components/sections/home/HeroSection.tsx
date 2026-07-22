'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Zap, TrendingUp, Play } from 'lucide-react';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  { src: '/hero-card-1.png', title: 'Thương mại điện tử Premium', tag: 'E-Commerce' },
  { src: '/hero-card-2.png', title: 'Nhà hàng & F&B Cao cấp', tag: 'Restaurant' },
  { src: '/hero-card-3.png', title: 'Spa & Chăm sóc sức khỏe', tag: 'Beauty & Wellness' },
  { src: '/bento-ai.png', title: 'Thiết kế thông minh với AI', tag: 'AI Powered' },
  { src: '/hero-visual.png', title: 'Trình dựng kéo thả KABO', tag: 'Drag & Drop' },
  { src: '/pricing-cover-ecommerce.png', title: 'Shop bán hàng online', tag: 'Online Store' },
  { src: '/bento-model.png', title: 'Thời trang & Lookbook', tag: 'Fashion' },
];

function HeroImageSlider() {
  const [current, setCurrent] = useState(0);
  const shouldReduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % IMAGES.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
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

/* ── Animated counter ── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isInView || shouldReduce) return;
    const ctrl = animate(count, value, { duration: 1.8, ease: 'easeOut' });
    return ctrl.stop;
  }, [isInView, value, count, shouldReduce]);

  return <motion.span ref={ref}>{shouldReduce ? `${value}${suffix}` : rounded}</motion.span>;
}

/* ── Typewriter ── */
const WORDS = ['nhanh chóng.', 'đột phá.', 'chuyên nghiệp.', 'tăng trưởng.'];

function TypewriterWord() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = WORDS[idx];
    if (!deleting && text.length < word.length)
      t.current = setTimeout(() => setText(word.slice(0, text.length + 1)), 70);
    else if (!deleting && text.length === word.length)
      t.current = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text.length > 0)
      t.current = setTimeout(() => setText(word.slice(0, text.length - 1)), 40);
    else { setDeleting(false); setIdx(i => (i + 1) % WORDS.length); }
    return () => { if (t.current) clearTimeout(t.current); };
  }, [text, deleting, idx]);

  return (
    <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
      {text}<span className="animate-pulse text-[#6366f1]">|</span>
    </span>
  );
}

const STATS = [
  { value: 120, suffix: '+', label: 'Dự án', color: '#6366f1' },
  { value: 98,  suffix: '%', label: 'Hài lòng',  color: '#10b981' },
  { value: 5,   suffix: '★', label: 'Đánh giá',  color: '#f59e0b' },
];

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  const anim = (delay: number) =>
    shouldReduce ? {} : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.55, delay, ease: 'easeOut' as const },
    };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-24 pb-16 bg-white">

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#6366f1]/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#a855f7]/6 blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col gap-8 max-w-[520px]">

            {/* Headline */}
            <div>
              <motion.p {...anim(0.08)} className="text-[11px] font-bold tracking-widest uppercase text-[#6366f1] mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#6366f1] animate-pulse inline-block" />
                Thiết kế Website · KABO Agency
              </motion.p>

              <h1 className="text-[44px] sm:text-[54px] lg:text-[62px] font-black leading-[1.06] tracking-tight">
                <motion.span {...anim(0.12)} className="block text-[#0f0f0f]">Tạo Website &</motion.span>
                <motion.span {...anim(0.2)} className="block text-[#0f0f0f]">Landing Page</motion.span>
                <motion.span {...anim(0.28)} className="block min-h-[1.12em]">
                  <TypewriterWord />
                </motion.span>
              </h1>
            </div>

            {/* Short description */}
            <motion.p {...anim(0.38)} className="text-[#6b7280] text-[15px] leading-[1.75] max-w-[400px]">
              Kéo thả dễ dàng, giao diện đẹp chuẩn —{' '}
              <span className="font-semibold text-[#0f0f0f]">không cần biết code</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div {...anim(0.46)} className="flex gap-3">
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/quy-trinh#contact"
                  className="flex items-center gap-2.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-extrabold py-4 px-8 rounded-2xl text-sm shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/35 transition-all duration-200">
                  Dùng thử miễn phí
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                    <ArrowRight className="size-4" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div whileHover={shouldReduce ? {} : { scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/giao-dien-mau"
                  className="flex items-center gap-2 border-2 border-[#e5e7eb] hover:border-[#6366f1]/40 text-[#374151] hover:text-[#6366f1] font-extrabold py-4 px-7 rounded-2xl text-sm bg-white hover:bg-[#fafbff] transition-all duration-200">
                  <Play className="size-3.5 fill-current" />
                  Xem mẫu
                </Link>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div {...anim(0.54)} className="h-px bg-gradient-to-r from-[#e5e7eb] via-[#6366f1]/20 to-transparent" />

            {/* Stats */}
            <motion.div {...anim(0.6)} className="flex gap-6">
              {STATS.map((s, i) => (
                <motion.div key={i} className="flex flex-col gap-0.5"
                  whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <span className="text-[28px] font-black tabular-nums leading-none" style={{ color: s.color }}>
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-xs text-[#9ca3af] font-medium">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* ══ RIGHT — Interactive image slideshow ══ */}
          <motion.div
            className="relative h-[460px] lg:h-[540px]"
            initial={shouldReduce ? {} : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            <HeroImageSlider />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
