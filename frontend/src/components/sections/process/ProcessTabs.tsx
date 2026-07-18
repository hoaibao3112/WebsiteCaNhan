'use client';

import { useState } from 'react';
import { Search, Palette, Code2, Rocket, Check, Clock, HelpCircle, Workflow, Settings } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface Step {
  name: string;
  subtitle: string;
  title: string;
  description: string;
  deliverables: string[];
  Icon: React.ElementType;
  GraphicIcon: React.ElementType;
  color: string;
  duration: string;
}

const steps: Step[] = [
  {
    name: 'Khởi động',
    subtitle: 'Brief & Tư vấn',
    title: 'Tiếp nhận Brief & Tư vấn',
    description:
      'Lắng nghe ý tưởng, khảo sát thị trường và đối thủ để định hình cấu trúc website tối ưu cho thương hiệu của bạn.',
    deliverables: [
      'Bản phân tích đối thủ cạnh tranh',
      'Sơ đồ luồng sitemap',
      'Brief dự án chi tiết',
      'Timeline & roadmap rõ ràng',
    ],
    Icon: Search,
    GraphicIcon: Workflow,
    color: '#006672',
    duration: '1 - 3 ngày',
  },
  {
    name: 'Sáng tạo',
    subtitle: 'Thiết kế UI/UX',
    title: 'Thiết kế Giao diện UI/UX',
    description:
      'Vẽ bản vẽ mockup trên Figma từ trang chủ tới trang con, tinh chỉnh phối màu chuẩn bộ nhận diện thương hiệu của bạn.',
    deliverables: [
      'File Figma mockup đầy đủ các trang',
      'Design system & brand kit',
      'Prototype tương tác mô phỏng',
      'Revision không giới hạn',
    ],
    Icon: Palette,
    GraphicIcon: Palette,
    color: '#ca8a04',
    duration: '3 - 7 ngày',
  },
  {
    name: 'Phát triển',
    subtitle: 'Lập trình',
    title: 'Lập trình & Phát triển',
    description:
      'Viết mã nguồn Next.js tốc độ cao, responsive mượt mà trên mọi thiết bị và tối ưu điểm Core Web Vitals / SEO Google tối đa.',
    deliverables: [
      'Link staging xem trước thời gian thực',
      'Code review & testing chuẩn bảo mật',
      'Tương thích 100% mọi loại màn hình',
      'Tối ưu tốc độ tải và SEO On-page',
    ],
    Icon: Code2,
    GraphicIcon: Code2,
    color: '#6366f1',
    duration: '7 - 21 ngày',
  },
  {
    name: 'Bàn giao',
    subtitle: 'Bàn giao & Hỗ trợ',
    title: 'Bàn giao & Chăm sóc',
    description:
      'Cấu hình tên miền, deploy lên môi trường production, bàn giao tài liệu và hỗ trợ kỹ thuật tận tâm.',
    deliverables: [
      'Tài liệu hướng dẫn quản trị chi tiết',
      'Bàn giao toàn bộ mã nguồn sạch',
      'Hỗ trợ kỹ thuật 30 ngày sau launch',
      'Training trực tiếp hoặc qua video',
    ],
    Icon: Rocket,
    GraphicIcon: Rocket,
    color: '#16a34a',
    duration: '1 - 2 ngày',
  },
];

export default function ProcessTabs() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduce = useReducedMotion();
  const currentStep = steps[activeStep];
  const StepIcon = currentStep.Icon;
  const StepGraphicIcon = currentStep.GraphicIcon;

  return (
    <section className="py-20 px-4 md:px-6 max-w-[1280px] mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="inline-flex items-center text-primary font-bold tracking-wider text-xs uppercase mb-4 gap-2">
          <span className="size-1.5 rounded-full bg-yellow-500"></span>
          CÁCH CHÚNG TÔI LÀM VIỆC
        </span>
        <h2 className="text-3xl md:text-5xl font-black text-[#191c1d] mb-4">
          Quy trình <span className="text-primary">4 bước</span> rõ ràng
        </h2>
        <p className="text-lg md:text-xl text-[#3d494b] max-w-3xl mx-auto leading-relaxed">
          Mỗi dự án đều đi qua quy trình chuẩn hóa — đảm bảo chất lượng và tiến độ bàn giao.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {steps.map((step, idx) => {
            const Icon = step.Icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex-1 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative overflow-hidden group border-2 ${
                  isActive
                    ? 'bg-white border-primary shadow-[0px_10px_30px_rgba(0,31,36,0.05)]'
                    : 'bg-white border-[#bcc9cb] hover:border-primary/50'
                }`}
                type="button"
              >
                {/* Background light gradient on hover / active */}
                <div
                  className={`absolute -top-4 -right-4 size-16 rounded-full blur-xl transition-all duration-300 ${
                    isActive ? 'bg-primary/10 scale-125' : 'bg-transparent group-hover:bg-[#ca8a04]/10'
                  }`}
                />
                
                {/* Icon wrapper */}
                <span
                  className={`size-11 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-[#eceeef] text-[#3d494b] group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
                >
                  <Icon className="size-5" />
                </span>

                <h3
                  className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-[#191c1d] group-hover:text-primary'
                  }`}
                >
                  {step.name}
                </h3>
                <p className="text-xs text-[#3d494b]">{step.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Content Card with Framer Motion Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={shouldReduce ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-[0px_10px_30px_rgba(0,31,36,0.05)] border border-[#e1e3e4] relative overflow-hidden min-h-[380px]"
          >
            {/* Giant Watermark Number */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[180px] md:text-[220px] font-black text-[#e1e3e4]/30 leading-none select-none pointer-events-none">
              0{activeStep + 1}
            </div>

            <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 flex flex-col gap-5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-[#006672]/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    GIAI ĐOẠN 0{activeStep + 1} / 04
                  </span>
                  <span className="text-[#3d494b] text-sm flex items-center gap-1.5 font-semibold">
                    <Clock className="size-4 text-primary" /> {currentStep.duration}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3.5xl font-black text-[#191c1d]">
                  {currentStep.title}
                </h3>
                
                <p className="text-base text-[#3d494b] leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Deliverables list */}
                <div className="border-t border-[#e1e3e4] pt-5">
                  <h4 className="text-xs font-bold text-[#3d494b] uppercase tracking-widest mb-4">
                    Kết quả bạn nhận được:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentStep.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="size-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-[#191c1d] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Graphic on the right */}
              <div className="hidden md:flex md:col-span-5 justify-end relative">
                <div className="size-64 rounded-full bg-primary/5 relative flex items-center justify-center animate-pulse-soft">
                  <div className="size-48 rounded-full bg-primary/10 backdrop-blur-md border border-primary/15 flex items-center justify-center absolute">
                    <StepGraphicIcon className="size-20 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-[#3d494b] mb-4">Sẵn sàng bắt đầu dự án?</p>
          <a
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-[#004d56] transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg group active:scale-95"
            href="#contact"
          >
            Nhận tư vấn miễn phí
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
