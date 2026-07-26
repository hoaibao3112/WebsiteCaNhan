'use client';

import { Cpu, ShieldCheck, Zap, Gauge } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import RichTechBackground from '@/components/ui/RichTechBackground';

const techBadges = [
  { name: 'Next.js 14 App Router', cat: 'Frontend', desc: 'Server Side Rendering & Tốc độ vượt trội' },
  { name: 'React 19 & TypeScript', cat: 'Core UI', desc: 'Strict typing & không có lỗi runtime' },
  { name: 'Tailwind CSS v4', cat: 'Styling', desc: 'Giao diện mượt mà & glassmorphism' },
  { name: 'Node.js & NestJS API', cat: 'Backend', desc: 'Kiến trúc API hiệu năng cao' },
  { name: 'Prisma ORM & PostgreSQL', cat: 'Database', desc: 'Truy vấn dữ liệu dưới milisecond' },
  { name: 'Supabase Cloud DB', cat: 'Infrastructure', desc: 'Cơ sở dữ liệu đám mây & sao lưu tự động' },
  { name: 'Core Web Vitals ≥ 98', cat: 'Performance', desc: 'Tốc độ load trang dưới 1.2 giây' },
  { name: 'Cổng thanh toán MoMo / VNPAY', cat: 'Integration', desc: 'Tích hợp tự động hoá đơn hàng' },
];

const guarantees = [
  { icon: Zap, title: 'Bàn giao Source Code 100%', desc: 'Bạn toàn quyền sở hữu mã nguồn website, không bị ràng buộc nền tảng.' },
  { icon: ShieldCheck, title: 'Bảo hành 12 Tháng & SLA Uptime', desc: 'Hỗ trợ kỹ thuật, vá lỗi bảo mật và nâng cấp miễn phí 1 năm.' },
  { icon: Gauge, title: 'Tối ưu Chuẩn SEO Google', desc: 'Cấu trúc Semantic HTML, Schema JSON-LD và Sitemap tự động.' },
];

export default function TechStackSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden text-white border-y border-[#006672]/30 min-h-[750px] flex items-center">
      
      {/* Rich Dynamic Animated Background with Particles & Laser Light Scan */}
      <RichTechBackground />

      <div className="container-lumina max-w-[1280px] relative z-10 w-full">

        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#006672]/40 border border-[#80c2cb]/50 text-[#80c2cb] text-xs font-black px-4.5 py-2 rounded-full uppercase tracking-widest mb-4 shadow-lg backdrop-blur-md">
            <Cpu className="size-4 text-[#fbe449]" />
            Công Nghệ & Nền Tảng
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-md">
            Xây dựng trên nền tảng <br />
            <span className="gradient-text-primary text-[#fbe449] drop-shadow-sm">
              hiện đại & tối ưu nhất
            </span>
          </h2>
          <p className="mt-4 text-white/90 text-sm sm:text-base leading-relaxed font-medium max-w-xl mx-auto drop-shadow-sm">
            Chúng tôi sử dụng các công nghệ tiên tiến hàng đầu thế giới để đảm bảo website của bạn luôn đạt tốc độ tối đa, bảo mật tuyệt đối và chuẩn SEO.
          </p>
        </ScrollReveal>

        {/* Tech Cards Grid - Spacious Glassmorphism cards */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mb-16" staggerDelay={0.08}>
          {techBadges.map((item) => (
            <StaggerItem key={item.name} direction="up">
              <motion.div
                whileHover={shouldReduce ? {} : { y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="p-7 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md hover:border-[#fbe449]/70 hover:bg-white/15 transition-all duration-300 h-full flex flex-col justify-between group cursor-default shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#006672]/60 text-[#fbe449] border border-white/20 shadow-sm">
                      {item.cat}
                    </span>
                    <span className="size-2.5 rounded-full bg-[#fbe449] animate-pulse shadow-[0_0_10px_#fbe449]" />
                  </div>
                  <h3 className="font-extrabold text-white text-base lg:text-lg mb-2.5 leading-snug group-hover:text-[#fbe449] transition-colors drop-shadow-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Guarantee Banner - Spacious layout */}
        <ScrollReveal direction="up" delay={0.2} className="w-full">
          <div className="bg-white/10 border border-white/25 rounded-3xl p-8 lg:p-11 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {guarantees.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4.5 items-start">
                  <div className="size-13 rounded-2xl bg-[#006672] text-[#fbe449] flex items-center justify-center shrink-0 shadow-lg border border-white/20">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base lg:text-lg mb-1.5 leading-snug drop-shadow-sm">{title}</h4>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
