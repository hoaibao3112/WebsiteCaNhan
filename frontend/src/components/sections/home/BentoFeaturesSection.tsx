'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Sparkles, Globe, Type, Image as ImageIcon, LayoutGrid } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ── Typewriter ── */
const WORDS = ['Nhanh hơn.', 'Đẹp hơn.', 'Dễ hơn.', 'Mạnh hơn.'];

function TypewriterText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && displayed.length < word.length)
      ref.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === word.length)
      ref.current = setTimeout(() => setDeleting(true), 1600);
    else if (deleting && displayed.length > 0)
      ref.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 45);
    else { setDeleting(false); setWordIdx(i => (i + 1) % WORDS.length); }
    return () => { if (ref.current) clearTimeout(ref.current); };
  }, [displayed, deleting, wordIdx]);

  return (
    <span className="text-[1.7rem] font-black leading-tight text-[#3730a3]">
      {displayed}<span className="animate-pulse text-[#6366f1]">|</span>
    </span>
  );
}

function Pill({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
      style={{ background: `${color}33`, color }}>
      <Icon className="h-3 w-3" />{label}
    </span>
  );
}

/* ── Animated Cell wrapper ── */
function AnimatedCell({
  children,
  style,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduce ? {} : { y: -4, scale: 1.015, transition: { duration: 0.25 } }}
      className={`relative rounded-2xl overflow-hidden group min-w-0 cursor-pointer ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Floating particles background ── */
function FloatingDots() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#6366f1]/10"
          style={{
            width: `${10 + i * 6}px`,
            height: `${10 + i * 6}px`,
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -12 - i * 3, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function BentoFeaturesSection() {
  const ROW_H = 260;
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20 bg-[#fafafa] relative overflow-hidden">
      <FloatingDots />

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* Header — animated */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: -12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs font-bold tracking-widest uppercase text-[#6366f1] mb-3"
          >
            Tính năng nổi bật
          </motion.p>
          <motion.h2
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-black text-[#0f0f0f] leading-tight"
          >
            Mọi thứ bạn cần để{' '}
            <motion.span
              className="text-[#6366f1] inline-block"
              animate={shouldReduce ? {} : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              bứt phá
            </motion.span>{' '}
            trên nền tảng số
          </motion.h2>
          <motion.p
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-4 text-[#6b7280] text-sm max-w-xl mx-auto leading-relaxed"
          >
            Từ thiết kế đến bán hàng, từ AI đến xuất bản — tất cả trong một nền tảng duy nhất.
          </motion.p>
        </div>

        {/* ── ROW 1 ── */}
        <div className="flex flex-col md:flex-row gap-3 mb-3 md:h-[260px]">

          {/* 1 — Ecommerce */}
          <AnimatedCell className="flex-1 bg-[#e8f4f8] min-h-[220px] md:min-h-0" delay={0}>
            <div className="absolute top-3 left-3 z-10">
              <Pill icon={ShoppingCart} label="Sản phẩm" color="#0891b2" />
            </div>
            <Image src="/bento-ecommerce.png" alt="Giao diện cửa hàng online KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e8f4f8]/50 via-transparent to-transparent" />
            {/* Shimmer overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </AnimatedCell>

          {/* 2 — Checkout */}
          <AnimatedCell className="flex-1 bg-[#f0eeff] min-h-[220px] md:min-h-0" delay={0.08}>
            <Image src="/bento-checkout.png" alt="Giỏ hàng và thanh toán KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </AnimatedCell>

          {/* 3 — AI */}
          <AnimatedCell className="flex-1 bg-[#312e81] min-h-[220px] md:min-h-0" delay={0.16}>
            <div className="absolute top-3 left-3 z-10">
              <Pill icon={Sparkles} label="Tùy chỉnh với AI" color="#a5b4fc" />
            </div>
            <Image src="/bento-ai.png" alt="Tùy chỉnh website với AI" fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#312e81]/40 via-transparent to-[#312e81]/20" />
            {/* AI sparkle effect */}
            <motion.div
              className="absolute top-2 right-2 z-10"
              animate={shouldReduce ? {} : { rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="size-4 text-[#a5b4fc]/60" />
            </motion.div>
          </AnimatedCell>

          {/* 4 — Domain */}
          <AnimatedCell className="flex-1 bg-[#14532d] min-h-[220px] md:min-h-0" delay={0.24}>
            <div className="absolute top-3 left-3 z-10">
              <Pill icon={Globe} label="Tên miền" color="#86efac" />
            </div>
            <Image src="/bento-domain.png" alt="Kết nối tên miền KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#14532d]/40 via-transparent to-transparent" />
            {/* Globe spin */}
            <motion.div
              className="absolute bottom-3 right-3 z-10"
              animate={shouldReduce ? {} : { rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <Globe className="size-5 text-[#86efac]/50" />
            </motion.div>
          </AnimatedCell>
        </div>

        {/* ── ROW 2 ── */}
        <div className="flex flex-col md:flex-row gap-3 md:h-[260px]">

          {/* 5 — Typewriter */}
          <AnimatedCell delay={0.32} className="flex-1 min-h-[200px] md:min-h-0">
            <div className="w-full h-full bg-gradient-to-br from-[#e0e7ff] via-[#ede9fe] to-[#fce7f3] p-5 flex flex-col overflow-hidden">
              <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 w-fit mb-3">
                <Type className="h-3.5 w-3.5 text-[#6366f1]" />
                <span className="text-xs font-bold text-[#6366f1]">Văn bản</span>
              </div>
              <div className="flex-1 bg-white/50 backdrop-blur-sm rounded-xl border border-white/80 p-4 flex items-center">
                <TypewriterText />
              </div>
              <div className="absolute bottom-4 right-4">
                <motion.svg
                  width="26" height="26" viewBox="0 0 24 24" fill="#6366f1"
                  className="drop-shadow-md"
                  animate={shouldReduce ? {} : { y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M4 0l16 12-7 2-4 8z" />
                </motion.svg>
              </div>
            </div>
          </AnimatedCell>

          {/* 6 — Model */}
          <AnimatedCell className="flex-1 min-h-[220px] md:min-h-0" delay={0.4}>
            <Image src="/bento-model.png" alt="Giao diện website đẹp KABO Agency" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/30 via-transparent to-transparent" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              whileHover={{ translateX: '200%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />
          </AnimatedCell>

          {/* 7 — Portfolio (2/4) */}
          <AnimatedCell className="bg-[#a3e635] flex-1 md:flex-[2] min-h-[240px] md:min-h-0" delay={0.48}>
            <div className="absolute top-3 left-3 z-10">
              <Pill icon={LayoutGrid} label="Thư viện mẫu" color="#365314" />
            </div>
            <Image src="/bento-portfolio.png" alt="Thư viện giao diện mẫu KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex justify-around items-center"
              initial={shouldReduce ? false : { y: 8, opacity: 0.8 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {[
                { icon: ImageIcon, label: 'Thư viện ảnh' },
                { icon: LayoutGrid, label: 'Slideshow' },
                { icon: LayoutGrid, label: 'Slideshow+' },
                { icon: LayoutGrid, label: 'Danh sách' },
              ].map(({ icon: Icon, label }, i) => (
                <motion.button
                  key={label}
                  type="button"
                  className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#374151] hover:text-[#6366f1] transition-colors"
                  whileHover={shouldReduce ? {} : { scale: 1.15, y: -2 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Icon className="h-4 w-4" />{label}
                </motion.button>
              ))}
            </motion.div>
          </AnimatedCell>

        </div>
      </div>
    </section>
  );
}
