'use client';

import { MessageCircle, Palette, Zap, Search, Rocket } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const steps = [
  {
    number: '01',
    title: 'Tư vấn & Khám phá',
    description: 'Tiếp nhận yêu cầu, phân tích đối thủ, định hướng chiến lược phù hợp mục tiêu của bạn.',
    Icon: MessageCircle,
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    number: '02',
    title: 'Thiết kế giao diện',
    description: 'Thiết kế wireframe, prototype và UI chuẩn UX, demo trực tiếp để bạn góp ý trước khi code.',
    Icon: Palette,
    color: '#a855f7',
    bg: '#faf5ff',
  },
  {
    number: '03',
    title: 'Phát triển & Tích hợp',
    description: 'Lập trình responsive, tích hợp hệ thống backend, payment, CRM theo yêu cầu.',
    Icon: Zap,
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  {
    number: '04',
    title: 'Kiểm tra & Tối ưu',
    description: 'Test đa thiết bị, tối ưu Core Web Vitals, bảo mật và SEO On-page.',
    Icon: Search,
    color: '#10b981',
    bg: '#f0fdf4',
  },
  {
    number: '05',
    title: 'Bàn giao & Hỗ trợ',
    description: 'Triển khai live, hướng dẫn sử dụng, hỗ trợ 3 tháng miễn phí sau bàn giao.',
    Icon: Rocket,
    color: '#ef4444',
    bg: '#fef2f2',
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
      className={`relative flex items-center gap-0 md:gap-8 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content card */}
      <div className={`flex-1 ${isRight ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-16 md:pl-0`}>
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, x: isRight ? -32 : 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            y: -6,
            boxShadow: `0 20px 56px ${step.color}22`,
            borderColor: step.color + '60',
          }}
          transition_hover={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="inline-block group bg-white border border-[#e2ecec] rounded-2xl p-6 shadow-sm text-left cursor-default"
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              whileHover={shouldReduce ? {} : { rotate: [0, -12, 12, 0], scale: 1.15 }}
              transition={{ duration: 0.5 }}
              className="p-2 rounded-xl"
              style={{ background: step.bg, color: step.color }}
            >
              <step.Icon className="size-5" />
            </motion.div>
            <motion.span
              className="text-xs font-black tracking-widest"
              style={{ color: step.color }}
              animate={shouldReduce ? {} : isInView ? { opacity: [0, 1] } : { opacity: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
            >
              BƯỚC {step.number}
            </motion.span>
          </div>
          <h3 className="text-lg font-extrabold text-[#0f0f0f] mb-2">{step.title}</h3>
          <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>

          {/* Bottom accent line — animates in on view */}
          <motion.div
            className="mt-4 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </div>

      {/* Center dot — pop in with pulse ring */}
      <div className="absolute left-0 md:static md:flex md:shrink-0 z-10">
        <motion.div
          initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 + index * 0.08 }}
          className="relative size-12 rounded-full border-2 bg-white flex items-center justify-center font-black text-sm"
          style={{ borderColor: step.color, color: step.color }}
        >
          {step.number}
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: step.color }}
            animate={shouldReduce ? {} : { scale: [1, 1.6], opacity: [0.5, 0] }}
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
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-lumina">

        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="section-label w-fit mx-auto mb-4">
            Quy trình làm việc
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] leading-tight">
            5 bước đơn giản
            <br />
            <span className="gradient-text-primary">đến sản phẩm hoàn hảo</span>
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Quy trình minh bạch, cộng tác chặt chẽ — bạn luôn biết chúng tôi đang làm gì.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">

          {/* Animated vertical center line */}
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-0.5 overflow-hidden"
          >
            <motion.div
              className="w-full h-full"
              style={{ background: 'linear-gradient(to bottom, #6366f1, #a855f7, #f59e0b, #10b981, #ef4444)' }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Moving glow dot on the line */}
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_3px_rgba(99,102,241,0.6)] left-1/2 -translate-x-1/2"
              animate={lineInView ? { top: ['0%', '100%'] } : {}}
              transition={{ duration: 3, delay: 1.6, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
