'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ShaderBackground from '@/components/ui/ShaderBackground';
import Magnetic from '@/components/ui/Magnetic';

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

  return (
    <motion.span ref={ref}>
      {shouldReduce ? `${value}${suffix}` : rounded}
    </motion.span>
  );
}

const stats = [
  { value: 120, suffix: '+', label: 'Dự án hoàn thành' },
  { value: 98, suffix: '%', label: 'Khách hàng hài lòng' },
  { value: 5, suffix: '★', label: 'Đánh giá trung bình' },
];

function useLineAnim(shouldReduce: boolean) {
  return (delay: number) => {
    if (shouldReduce) return {};
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease: 'easeOut' as const },
    };
  };
}

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const anim = useLineAnim(!!shouldReduce);

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center pt-20 pb-16 bg-white">
      {/* Decorative background blobs */}
      <div className="bg-blob bg-[#80c2cb]/20 w-[500px] h-[500px] -top-32 -left-32 pointer-events-none" />
      <div
        className="bg-blob bg-[#ca8a04]/15 w-[400px] h-[400px] -bottom-32 -right-32 pointer-events-none"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="bg-blob bg-[#006672]/5 w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ animationDelay: '-10s' }}
      />

      {/* Floating badge top-right */}
      <motion.div
        className="absolute top-32 right-8 hidden lg:flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-[#e2ecec]"
        animate={shouldReduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="size-4 text-[#ca8a04]" />
        <span className="text-xs font-bold text-[#0f0f0f]">Premium Design</span>
      </motion.div>

      {/* Floating badge left */}
      <motion.div
        className="absolute top-48 left-8 hidden lg:flex items-center gap-2 bg-[#006672] rounded-full px-4 py-2 shadow-lg"
        animate={shouldReduce ? {} : { x: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Star className="size-3.5 text-white fill-white" />
        <span className="text-xs font-bold text-white">Top Rated</span>
      </motion.div>

      <div className="container-lumina w-full z-10 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-7">

            {/* Badge */}
            <motion.div {...anim(0)} className="section-label w-fit">
              <Zap className="size-3" />
              Sáng Tạo Đột Phá · Trải Nghiệm Đỉnh Cao
            </motion.div>

            {/* Headline — line-by-line reveal */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold leading-[1.08] tracking-tight">
              <motion.span {...anim(0.1)} className="block text-[#0f0f0f]">
                Thiết kế{' '}
                <span className="animate-shimmer-text">Website</span>
              </motion.span>
              <motion.span {...anim(0.22)} className="block text-[#0f0f0f]">
                May đo,
              </motion.span>
              <motion.span {...anim(0.34)} className="block gradient-text-primary">
                Bứt phá Tăng trưởng
              </motion.span>
            </h1>

            {/* Subtext */}
            <motion.p {...anim(0.46)} className="text-base text-[#6b7280] leading-relaxed max-w-md">
              Trong thế giới số, sự hiện diện của bạn là thương hiệu. Chúng tôi kiến tạo những
              trải nghiệm kỹ thuật số <strong className="text-[#0f0f0f]">thúc đẩy tăng trưởng</strong> thực sự.
            </motion.p>

            {/* CTAs */}
            <motion.div {...anim(0.56)} className="flex flex-col sm:flex-row gap-3 pt-1">
              <Magnetic>
                <motion.div
                  whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: '0 8px 30px rgba(0,102,114,0.25)' }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="rounded-full"
                >
                  <Link href="/quy-trinh#contact" className="btn-primary text-sm justify-center sm:justify-start gap-2">
                    Nhận báo giá miễn phí
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="size-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </Magnetic>
              <Magnetic>
                <motion.div
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="rounded-full"
                >
                  <Link href="/du-an" className="btn-secondary text-sm justify-center sm:justify-start">
                    Xem dự án →
                  </Link>
                </motion.div>
              </Magnetic>
            </motion.div>

            {/* Stats — animated counter */}
            <motion.div {...anim(0.66)} className="flex flex-wrap gap-8 pt-6 border-t border-[#e2ecec]">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="text-2xl font-extrabold text-[#006672] leading-none tabular-nums">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-xs text-[#9ca3af] mt-1">{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Clients */}
            <motion.div {...anim(0.74)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest">Đối tác tin dùng:</span>
              {['BRAND ONE', 'TECH CO', 'NEXUS', 'ELEVATE'].map((name) => (
                <motion.span
                  key={name}
                  className="text-xs font-black text-zinc-300 tracking-wider cursor-default"
                  whileHover={{ color: '#006672', scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {name}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column — Hero Visual ── */}
          <motion.div
            className="relative h-[420px] lg:h-[520px]"
            initial={shouldReduce ? {} : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Main card */}
            <motion.div
              className="absolute inset-0 rounded-3xl overflow-hidden border border-[#e2ecec] shadow-[0_30px_80px_rgba(0,102,114,0.08)] bg-white"
              whileHover={{ boxShadow: '0 40px_100px_rgba(0,102,114,0.13)' }}
              transition={{ duration: 0.4 }}
            >
              {/* WebGL Shader Background Overlay */}
              <div className="absolute inset-0 z-0 opacity-40">
                <ShaderBackground />
              </div>

              {/* Header bar */}
              <div className="relative z-10 flex items-center gap-2 px-4 py-3 bg-[#f8fafa]/80 backdrop-blur-sm border-b border-[#e2ecec]">
                <div className="size-3 rounded-full bg-[#006672] animate-pulse-soft" />
                <div className="size-3 rounded-full bg-[#ca8a04]" />
                <div className="size-3 rounded-full bg-zinc-300" />
                <div className="flex-1 mx-3 h-5 rounded bg-[#f0f7f8]/90 flex items-center px-3">
                  <span className="text-[9px] text-zinc-400 font-mono">kabo.agency</span>
                </div>
              </div>

              {/* Content area */}
              <div className="relative z-10 p-6 flex flex-col h-full gap-4 bg-white/10 backdrop-blur-[2px]">
                {/* Mock heading */}
                <div className="flex flex-col gap-2">
                  <div className="h-3 rounded-full bg-[#006672] w-3/4 opacity-80" />
                  <div className="h-2.5 rounded-full bg-zinc-100 w-full" />
                  <div className="h-2.5 rounded-full bg-zinc-100 w-5/6" />
                </div>

                {/* Mock cards — staggered appear */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { color: 'bg-[#006672]', label: 'UX/UI Design' },
                    { color: 'bg-[#ca8a04]', label: 'Web Dev' },
                    { color: 'bg-zinc-800', label: 'SEO & Ads' },
                    { color: 'bg-[#80c2cb]', label: 'Branding' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.04 }}
                      className="rounded-xl bg-white/70 border border-[#e2ecec]/50 p-3 flex items-center gap-2 backdrop-blur-sm cursor-default"
                    >
                      <div className={`size-6 rounded-lg ${item.color} opacity-90`} />
                      <span className="text-[10px] font-semibold text-zinc-500">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Mock chart — animated bars */}
                <div className="flex-1 flex items-end gap-1.5 pt-2">
                  {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-md"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.7, delay: 0.8 + i * 0.06, ease: 'easeOut' }}
                      style={{
                        background: i === 7 ? '#006672' : `rgba(0,102,114,${0.15 + i * 0.08})`,
                      }}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="size-3.5 text-[#006672]" />
                    <span className="text-[10px] font-bold text-[#006672]">+42% tăng trưởng</span>
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono">100% Core Web Vitals</span>
                </div>
              </div>
            </motion.div>

            {/* Floating metric card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-[#e2ecec] px-4 py-3 flex items-center gap-3"
              animate={shouldReduce ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.06 }}
            >
              <div className="size-10 rounded-xl bg-[#f0f7f8] flex items-center justify-center">
                <Star className="size-5 text-[#ca8a04] fill-[#ca8a04]" />
              </div>
              <div>
                <p className="text-xs font-black text-[#0f0f0f]">98% hài lòng</p>
                <p className="text-[10px] text-[#9ca3af]">Khách hàng</p>
              </div>
            </motion.div>

            {/* Floating metric card 2 */}
            <motion.div
              className="absolute -top-4 -right-4 bg-[#006672] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2"
              animate={shouldReduce ? {} : { x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              whileHover={{ scale: 1.06 }}
            >
              <Zap className="size-4 text-white" />
              <span className="text-xs font-bold text-white">120+ Dự án</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
