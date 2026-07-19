'use client';

import Link from 'next/link';
import { Palette, Code2, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import ScrollReveal from '@/components/ui/ScrollReveal';

const services = [
  {
    Icon: Palette,
    tag: 'Design',
    title: 'Thiết kế UX/UI',
    description: 'Giao diện hiện đại, tối ưu chuyển đổi và trải nghiệm người dùng mượt mà theo chuẩn quốc tế.',
    accent: '#006672',
    bg: '#f0f7f8',
  },
  {
    Icon: Code2,
    tag: 'Development',
    title: 'Phát triển Web',
    description: 'Code sạch, hiệu năng tốt, tốc độ tải trang nhanh và tương thích đa thiết bị hoàn hảo.',
    accent: '#ca8a04',
    bg: '#fefce8',
    featured: true,
  },
  {
    Icon: BarChart3,
    tag: 'Marketing',
    title: 'Digital Marketing',
    description: 'SEO, Google Ads, Analytics — chiến lược tổng thể giúp tăng traffic và doanh thu thực tế.',
    accent: '#006672',
    bg: '#f0f7f8',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f4f9f9 0%, white 100%)' }}>
      <div className="container-lumina">

        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="section-label w-fit mx-auto mb-4">
            Dịch vụ của chúng tôi
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] leading-tight">
            Giải pháp toàn diện
            <br />
            <span className="gradient-text-primary">cho website của bạn</span>
          </h2>
          <p className="mt-4 text-[#6b7280] text-sm max-w-lg mx-auto leading-relaxed">
            Từ ý tưởng đến sản phẩm hoàn chỉnh — chúng tôi đồng hành cùng bạn trong từng bước.
          </p>
        </ScrollReveal>

        {/* Cards — stagger reveal */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {services.map((service) => (
            <StaggerItem key={service.title} direction="up">
              <motion.div
                whileHover={
                  service.featured
                    ? { y: -6, boxShadow: '0 28px 70px rgba(0,102,114,0.30)' }
                    : { y: -6, boxShadow: '0 20px 60px rgba(0,102,114,0.12)', borderColor: '#80c2cb' }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={`relative group h-full rounded-3xl p-8 flex flex-col gap-5 border ${
                  service.featured
                    ? 'bg-[#006672] border-[#006672] text-white shadow-[0_20px_60px_rgba(0,102,114,0.25)]'
                    : 'bg-white border-[#e2ecec]'
                }`}
              >
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-[#ca8a04] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Phổ biến nhất
                  </div>
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="size-14 rounded-2xl flex items-center justify-center shadow-sm"
                  style={{
                    background: service.featured ? 'rgba(255,255,255,0.15)' : service.bg,
                    color: service.featured ? 'white' : service.accent,
                  }}
                >
                  <service.Icon className="size-7" />
                </motion.div>

                {/* Tag */}
                <span className={`text-[10px] font-bold uppercase tracking-widest ${service.featured ? 'text-white/60' : 'text-[#9ca3af]'}`}>
                  {service.tag}
                </span>

                {/* Title */}
                <h3 className={`text-xl font-extrabold leading-tight -mt-2 ${service.featured ? 'text-white' : 'text-[#0f0f0f]'}`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${service.featured ? 'text-white/75' : 'text-[#6b7280]'}`}>
                  {service.description}
                </p>

                {/* Arrow */}
                <div className={`mt-auto flex items-center gap-1.5 text-sm font-semibold ${service.featured ? 'text-white' : 'text-[#006672]'}`}>
                  Tìm hiểu thêm{' '}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="size-4" />
                  </motion.span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal direction="up" delay={0.3} className="text-center mt-12">
          <Link href="/dich-vu" className="btn-secondary">
            Xem tất cả dịch vụ →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
