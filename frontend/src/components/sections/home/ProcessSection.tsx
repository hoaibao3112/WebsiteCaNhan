'use client';

import { MessageCircle, Palette, Zap, Search, Rocket } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import RichTechBackground from '@/components/ui/RichTechBackground';

const steps = [
  {
    number: '01',
    title: 'Tư vấn & Khám phá',
    description: 'Tiếp nhận yêu cầu, phân tích đối thủ, định hướng chiến lược phù hợp mục tiêu của bạn.',
    Icon: MessageCircle,
    color: '#38bdf8',
    bg: 'bg-sky-500/20',
  },
  {
    number: '02',
    title: 'Thiết kế giao diện',
    description: 'Thiết kế wireframe, prototype và UI chuẩn UX, demo trực tiếp để bạn góp ý trước khi code.',
    Icon: Palette,
    color: '#c084fc',
    bg: 'bg-purple-500/20',
  },
  {
    number: '03',
    title: 'Phát triển & Tích hợp',
    description: 'Lập trình responsive, tích hợp hệ thống backend, payment, CRM theo yêu cầu.',
    Icon: Zap,
    color: '#fbe449',
    bg: 'bg-amber-500/20',
  },
  {
    number: '04',
    title: 'Kiểm tra & Tối ưu',
    description: 'Test đa thiết bị, tối ưu Core Web Vitals, bảo mật và SEO On-page.',
    Icon: Search,
    color: '#34d399',
    bg: 'bg-emerald-500/20',
  },
  {
    number: '05',
    title: 'Bàn giao & Hỗ trợ',
    description: 'Triển khai live, hướng dẫn sử dụng, hỗ trợ 3 tháng miễn phí sau bàn giao.',
    Icon: Rocket,
    color: '#f87171',
    bg: 'bg-red-500/20',
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduce = useReducedMotion();
  const isRight = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-0 md:gap-12 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isRight ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'} pl-16 md:pl-0`}>
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, x: isRight ? -32 : 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -6,
            boxShadow: `0 20px 50px rgba(0, 102, 114, 0.4)`,
            borderColor: '#fbe449',
          }}
          className="inline-block group bg-white/10 border border-white/20 backdrop-blur-md rounded-3xl p-7 sm:p-9 shadow-xl text-left cursor-default max-w-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3.5 mb-4">
            <div
              className={`p-2.5 rounded-2xl ${step.bg} border border-white/10`}
              style={{ color: step.color }}
            >
              <step.Icon className="size-5 sm:size-6" />
            </div>
            <span
              className="text-xs font-black tracking-widest uppercase"
              style={{ color: step.color }}
            >
              BƯỚC {step.number}
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2.5 leading-snug drop-shadow-sm">
            {step.title}
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
            {step.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className="mt-5 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>

      {/* Center dot — glowing tech node */}
      <div className="absolute left-0 md:static md:flex md:shrink-0 z-10">
        <motion.div
          initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 + index * 0.08 }}
          className="relative size-14 rounded-full border-2 bg-[#006672] flex items-center justify-center font-black text-base text-white shadow-2xl"
          style={{ borderColor: step.color }}
        >
          {step.number}
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: step.color }}
            animate={shouldReduce ? {} : { scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: index * 0.3 }}
          />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.1 });

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden text-white border-y border-[#006672]/30 min-h-[850px] flex items-center">
      
      {/* Rich Dynamic Animated Background with Particles & Light Scan */}
      <RichTechBackground />

      <div className="container-lumina max-w-[1280px] relative z-10 w-full">

        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#006672]/40 border border-[#80c2cb]/50 text-[#80c2cb] text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
            Quy trình làm việc
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
            5 bước đơn giản <br />
            <span className="text-[#fbe449] drop-shadow-sm">đến sản phẩm hoàn hảo</span>
          </h2>
          <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed font-medium max-w-xl mx-auto drop-shadow-sm">
            Quy trình minh bạch, cộng tác chặt chẽ — bạn luôn biết chúng tôi đang làm gì.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative max-w-5xl mx-auto">

          {/* Animated vertical center line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-1 overflow-hidden rounded-full"
          >
            <motion.div
              className="w-full h-full"
              style={{ background: 'linear-gradient(to bottom, #38bdf8, #c084fc, #fbe449, #34d399, #f87171)' }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Moving glow dot on the line */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-[#fbe449] shadow-[0_0_12px_4px_#fbe449] left-1/2 -translate-x-1/2"
              animate={lineInView ? { top: ['0%', '100%'] } : {}}
              transition={{ duration: 3.5, delay: 1.6, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-14">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
