'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const stats = [
  { value: '120+', label: 'Dự án hoàn thành' },
  { value: '98%', label: 'Khách hàng hài lòng' },
  { value: '5★', label: 'Đánh giá trung bình' },
];

// Helper to generate per-element animation props with staggered delay
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
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #80c2cb 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ca8a04 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #006672 0%, transparent 60%)' }}
      />

      {/* Floating badge top-right */}
      <div className="absolute top-32 right-8 hidden lg:flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border border-[#e2ecec] animate-float">
        <Sparkles className="h-4 w-4 text-[#ca8a04]" />
        <span className="text-xs font-bold text-[#0f0f0f]">Premium Design</span>
      </div>

      {/* Floating badge left */}
      <div className="absolute top-48 left-8 hidden lg:flex items-center gap-2 bg-[#006672] rounded-full px-4 py-2 shadow-lg animate-float-x">
        <Star className="h-3.5 w-3.5 text-white fill-white" />
        <span className="text-xs font-bold text-white">Top Rated</span>
      </div>

      <div className="container-lumina w-full z-10 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left Column ── */}
          <div className="flex flex-col gap-7">

            {/* Badge */}
            <motion.div {...anim(0)} className="section-label w-fit">
              <Zap className="h-3 w-3" />
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

            {/* CTAs — with micro-interaction */}
            <motion.div {...anim(0.56)} className="flex flex-col sm:flex-row gap-3 pt-1">
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.03, boxShadow: '0 8px 30px rgba(0,102,114,0.25)' }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link href="/quy-trinh#contact" className="btn-primary text-sm justify-center sm:justify-start gap-2">
                  Nhận báo giá miễn phí <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={shouldReduce ? {} : { scale: 1.03 }}
                whileTap={shouldReduce ? {} : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="rounded-full"
              >
                <Link href="/du-an" className="btn-secondary text-sm justify-center sm:justify-start">
                  Xem dự án →
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div {...anim(0.66)} className="flex flex-wrap gap-8 pt-6 border-t border-[#e2ecec]">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-extrabold text-[#006672] leading-none">{s.value}</span>
                  <span className="text-xs text-[#9ca3af] mt-1">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Clients */}
            <motion.div {...anim(0.74)} className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest">Đối tác tin dùng:</span>
              {['BRAND ONE', 'TECH CO', 'NEXUS', 'ELEVATE'].map((name) => (
                <span key={name} className="text-xs font-black text-zinc-300 tracking-wider hover:text-[#006672] transition-colors duration-200">
                  {name}
                </span>
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
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#e2ecec] shadow-[0_30px_80px_rgba(0,102,114,0.08)] bg-white">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#f8fafa] border-b border-[#e2ecec]">
                <div className="size-3 rounded-full bg-[#006672] animate-pulse-soft" />
                <div className="size-3 rounded-full bg-[#ca8a04]" />
                <div className="size-3 rounded-full bg-zinc-300" />
                <div className="flex-1 mx-3 h-5 rounded bg-[#f0f7f8] flex items-center px-3">
                  <span className="text-[9px] text-zinc-400 font-mono">kabo.agency</span>
                </div>
              </div>

              {/* Content area */}
              <div className="p-6 flex flex-col h-full gap-4">
                {/* Mock heading */}
                <div className="space-y-2">
                  <div className="h-3 rounded-full bg-[#006672] w-3/4 opacity-80" />
                  <div className="h-2.5 rounded-full bg-zinc-100 w-full" />
                  <div className="h-2.5 rounded-full bg-zinc-100 w-5/6" />
                </div>

                {/* Mock cards */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {[
                    { color: 'bg-[#006672]', label: 'UX/UI Design' },
                    { color: 'bg-[#ca8a04]', label: 'Web Dev' },
                    { color: 'bg-zinc-800', label: 'SEO & Ads' },
                    { color: 'bg-[#80c2cb]', label: 'Branding' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-zinc-50 border border-[#e2ecec] p-3 flex items-center gap-2"
                    >
                      <div className={`size-6 rounded-lg ${item.color} opacity-90`} />
                      <span className="text-[10px] font-semibold text-zinc-500">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Mock chart */}
                <div className="flex-1 flex items-end gap-1.5 pt-2">
                  {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${h}%`,
                        background: i === 7 ? '#006672' : `rgba(0,102,114,${0.15 + i * 0.08})`,
                        transition: `height 0.6s ease ${i * 0.05}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-[#006672]" />
                    <span className="text-[10px] font-bold text-[#006672]">+42% tăng trưởng</span>
                  </div>
                  <span className="text-[9px] text-zinc-400 font-mono">100% Core Web Vitals</span>
                </div>
              </div>
            </div>

            {/* Floating metric card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-[#e2ecec] px-4 py-3 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-[#f0f7f8] flex items-center justify-center">
                <Star className="h-5 w-5 text-[#ca8a04] fill-[#ca8a04]" />
              </div>
              <div>
                <p className="text-xs font-black text-[#0f0f0f]">98% hài lòng</p>
                <p className="text-[10px] text-[#9ca3af]">Khách hàng</p>
              </div>
            </div>

            {/* Floating metric card 2 */}
            <div className="absolute -top-4 -right-4 bg-[#006672] rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2 animate-float-x">
              <Zap className="h-4 w-4 text-white" />
              <span className="text-xs font-bold text-white">120+ Dự án</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
