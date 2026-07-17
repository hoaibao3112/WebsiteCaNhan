'use client';

import { useState } from 'react';
import { Search, PenTool, Code2, Rocket, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface Step {
  name: string;
  title: string;
  description: string;
  deliverables: string[];
  Icon: React.ElementType;
  color: string;
}

const steps: Step[] = [
  {
    name: 'Tiếp Nhận Brief',
    title: 'Tiếp Nhận Brief & Tư Vấn',
    description:
      'Lắng nghe ý tưởng của bạn, khảo sát thị trường và đối thủ để định hình cấu trúc trang web tối ưu nhất cho thương hiệu.',
    deliverables: [
      'Bản phân tích đối thủ',
      'Sơ đồ luồng sitemap',
      'Brief dự án chi tiết',
      'Timeline & roadmap',
    ],
    Icon: Search,
    color: '#006672',
  },
  {
    name: 'Thiết Kế UI/UX',
    title: 'Thiết Kế Bản Vẽ UI/UX',
    description:
      'Vẽ mockup giao diện trên Figma từ trang chủ tới trang con, tinh chỉnh phối màu chuẩn bộ nhận diện thương hiệu của bạn.',
    deliverables: [
      'File Figma mockup đầy đủ',
      'Design system & brand kit',
      'Prototype tương tác',
      'Feedback & revision 2 lần',
    ],
    Icon: PenTool,
    color: '#ca8a04',
  },
  {
    name: 'Lập Trình Hệ Thống',
    title: 'Lập Trình & Phát Triển',
    description:
      'Viết mã nguồn Next.js tốc độ cao, responsive mượt mà trên mọi thiết bị và tối ưu điểm Core Web Vitals / SEO Google tối đa.',
    deliverables: [
      'Link staging xem trước',
      'Code review & testing',
      'Responsive mọi màn hình',
      'Tối ưu tốc độ & SEO',
    ],
    Icon: Code2,
    color: '#6366f1',
  },
  {
    name: 'Bàn Giao & Hỗ Trợ',
    title: 'Bàn Giao & Chăm Sóc',
    description:
      'Cấu hình tên miền, deploy lên Vercel và bàn giao tài liệu hướng dẫn tự quản trị nội dung dễ dàng sau khi launch.',
    deliverables: [
      'Tài liệu hướng dẫn đầy đủ',
      'Bàn giao source code',
      'Hỗ trợ 30 ngày sau launch',
      'Training quản trị nội dung',
    ],
    Icon: Rocket,
    color: '#16a34a',
  },
];

/** Content card dùng chung cho cả mobile và desktop */
function StepContent({
  step,
  index,
  shouldReduce,
}: {
  step: Step;
  index: number;
  shouldReduce: boolean | null;
}) {
  const Icon = step.Icon;
  return (
    <motion.div
      key={index}
      initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut' as const }}
      className="flex flex-col gap-6 h-full"
    >
      {/* Badge */}
      <span
        className="inline-flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider w-fit"
        style={{ background: `${step.color}18`, color: step.color }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: step.color }} />
        Giai đoạn 0{index + 1} / 04
      </span>

      {/* Title & description */}
      <div>
        <h3 className="text-xl sm:text-2xl font-black text-[#0f0f0f] leading-tight mb-3">
          {step.title}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
      </div>

      {/* Deliverables */}
      <div className="pt-5 border-t border-zinc-100 flex-1">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4">
          Kết quả bạn nhận được:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {step.deliverables.map((item, i) => (
            <li key={i} className="flex items-center gap-2.5">
              <div
                className="h-5 w-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${step.color}18` }}
              >
                <Check className="h-3 w-3 stroke-[2.5]" style={{ color: step.color }} />
              </div>
              <span className="text-sm font-semibold text-zinc-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Watermark icon */}
      <div
        className="absolute bottom-4 right-4 opacity-[0.04] pointer-events-none"
        aria-hidden
      >
        <Icon className="h-28 w-28" style={{ color: step.color }} />
      </div>
    </motion.div>
  );
}

export default function ProcessTabs() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-padding bg-[#f4f9f9]">
      <div className="container-lumina">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-[#006672] uppercase tracking-widest mb-3">
            Cách chúng tôi làm việc
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] leading-tight">
            Quy trình 4 bước rõ ràng
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6b7280] leading-relaxed">
            Mỗi dự án đều đi qua quy trình chuẩn hóa — giúp đảm bảo chất lượng và tiến độ bàn giao.
          </p>
        </div>

        {/* ─── MOBILE: stacked tab pills + card (< 768px) ─── */}
        <div className="block md:hidden">
          {/* 4 pill buttons */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              const isActive = activeStep === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-200"
                  style={
                    isActive
                      ? { borderColor: step.color, background: step.color, color: '#fff' }
                      : { borderColor: '#e5e7eb', background: '#fff', color: '#9ca3af' }
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="text-[9px] font-black tracking-wider">0{i + 1}</span>
                </button>
              );
            })}
          </div>

          {/* Content card */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm relative overflow-hidden min-h-[280px]">
            <StepContent
              step={steps[activeStep]}
              index={activeStep}
              shouldReduce={shouldReduce}
            />
          </div>

          {/* Step nav */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
              disabled={activeStep === 0}
              className="text-xs font-bold text-zinc-400 hover:text-[#006672] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Bước trước
            </button>
            <div className="flex gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeStep === i ? 24 : 6,
                    background: activeStep === i ? '#006672' : '#e5e7eb',
                  }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
              disabled={activeStep === 3}
              className="text-xs font-bold text-zinc-400 hover:text-[#006672] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Bước tiếp →
            </button>
          </div>
        </div>

        {/* ─── DESKTOP: 2-col layout (≥ 768px) ─── */}
        <div className="hidden md:grid md:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Left column — flex-based stepper (NO absolute positioning on dot) */}
          <div className="relative">
            {/* Track line — positioned between center of first and last dot */}
            <div
              className="absolute top-[28px] bottom-[28px] w-[2px] rounded-full bg-zinc-200"
              style={{ left: 19 }}
            />
            {/* Active track */}
            <motion.div
              className="absolute w-[2px] rounded-full origin-top"
              style={{ left: 19, top: 28, background: '#006672' }}
              animate={{ height: `${(activeStep / 3) * (100 - 0)}%` }}
              transition={{ duration: 0.45, ease: 'easeOut' as const }}
            />

            <div className="flex flex-col gap-1">
              {steps.map((step, i) => {
                const Icon = step.Icon;
                const isActive = activeStep === i;
                const isDone = i < activeStep;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className={`group flex items-center gap-3 text-left py-3 px-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white border-[#006672]/25 shadow-sm'
                        : 'border-transparent hover:bg-white/70'
                    }`}
                  >
                    {/* ── Dot: in NORMAL FLOW, no absolute ── */}
                    <div
                      className="shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 relative bg-white"
                      style={
                        isActive
                          ? {
                              background: step.color,
                              borderColor: step.color,
                              boxShadow: `0 0 0 5px ${step.color}22`,
                            }
                          : isDone
                          ? { background: '#006672', borderColor: '#006672' }
                          : { borderColor: '#e5e7eb' }
                      }
                    >
                      <Icon
                        className="h-4 w-4 shrink-0"
                        style={{ color: isActive || isDone ? '#fff' : '#9ca3af' }}
                      />
                    </div>

                    {/* ── Text: flex sibling, never overlaps ── */}
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-[9px] uppercase font-black tracking-wider mb-0.5"
                        style={{ color: isActive ? step.color : '#9ca3af' }}
                      >
                        Bước 0{i + 1}
                      </p>
                      <p
                        className={`text-sm font-bold leading-snug truncate ${
                          isActive
                            ? 'text-[#0f0f0f]'
                            : 'text-zinc-400 group-hover:text-zinc-600'
                        }`}
                      >
                        {step.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right column — content card */}
          <div className="bg-white rounded-2xl border border-zinc-100 p-8 shadow-sm relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <StepContent
              step={steps[activeStep]}
              index={activeStep}
              shouldReduce={shouldReduce}
            />

            {/* Step nav footer */}
            <div className="relative z-10 flex items-center justify-between pt-5 border-t border-zinc-100 mt-6">
              <button
                type="button"
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                disabled={activeStep === 0}
                className="text-xs font-bold text-zinc-400 hover:text-[#006672] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Bước trước
              </button>
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: activeStep === i ? 24 : 6,
                      background: activeStep === i ? '#006672' : '#e5e7eb',
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveStep((s) => Math.min(3, s + 1))}
                disabled={activeStep === 3}
                className="text-xs font-bold text-zinc-400 hover:text-[#006672] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Bước tiếp →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
