'use client';

import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const plans = [
  {
    name: 'CƠ BẢN',
    subtitle: 'Dành cho startup chứng minh ý tưởng.',
    price: '$999',
    period: '/dự án',
    featured: false,
    features: [
      { label: 'Landing Page (1 trang)', ok: true },
      { label: 'Responsive đa thiết bị', ok: true },
      { label: 'Tối ưu tốc độ cơ bản', ok: true },
      { label: 'Hỗ trợ sau bàn giao 30 ngày', ok: true },
      { label: 'Thiết kế Figma', ok: false },
      { label: 'Hệ thống CMS', ok: false },
      { label: 'Tích hợp thanh toán', ok: false },
      { label: 'Bảo mật nâng cao', ok: false },
    ],
    cta: 'Chọn gói này',
    href: 'https://zalo.me/0374170367',
    accentColor: '#6366f1',
  },
  {
    name: 'Pro',
    subtitle: 'Cho doanh nghiệp vừa & nhỏ',
    price: '24.990.000₫',
    period: 'trọn gói',
    featured: true,
    badge: 'Phổ biến nhất',
    features: [
      { label: 'Giao diện thiết kế theo yêu cầu', ok: true },
      { label: 'Lên tới 10 trang nội dung', ok: true },
      { label: 'Tối ưu chuẩn SEO On-page', ok: true },
      { label: 'Tích hợp CMS quản trị bài viết', ok: true },
      { label: 'Form liên hệ + Zalo / Facebook', ok: true },
      { label: 'Hỗ trợ kỹ thuật 12 tháng', ok: true },
      { label: 'Tốc độ load dưới 1.5 giây', ok: true },
      { label: 'Bảo mật SSL + Backup tự động', ok: true },
    ],
    cta: 'Bắt đầu ngay',
    href: 'https://zalo.me/0374170367',
    accentColor: '#006672',
  },
  {
    name: 'Enterprise',
    subtitle: 'Giải pháp thương mại & ứng dụng lớn',
    price: 'Liên hệ',
    period: '',
    featured: false,
    features: [
      { label: 'E-commerce / Web App', ok: true },
      { label: 'Thiết kế Figma cao cấp', ok: true },
      { label: 'Tích hợp API bên thứ 3', ok: true },
      { label: 'Hệ thống thanh toán', ok: true },
      { label: 'Bảo mật & hiệu năng nâng cao', ok: true },
      { label: 'Hỗ trợ 24/7 chuyên nghiệp', ok: true },
      { label: 'SLA cam kết thời gian', ok: true },
      { label: 'Tích hợp AI / tự động hoá', ok: true },
    ],
    cta: 'Liên hệ tư vấn',
    href: 'https://zalo.me/0374170367',
    accentColor: '#a855f7',
  },
];

export default function PricingSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-lumina">

        <ScrollReveal direction="up" className="text-center mb-14">
          <p className="text-sm font-bold text-[#006672] uppercase tracking-widest mb-3">
            Bảng giá dịch vụ
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
            Đầu tư đúng chỗ,<br />
            <span className="gradient-text-primary">tăng trưởng thật sự</span>
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Gói dịch vụ minh bạch, chi phí tối ưu — không phát sinh ẩn.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" staggerDelay={0.12}>
          {plans.map((plan, i) => (
            <StaggerItem key={plan.name} direction="up">
              <motion.div
                whileHover={shouldReduce ? {} : {
                  y: plan.featured ? -4 : -8,
                  boxShadow: plan.featured
                    ? '0 32px 80px rgba(0,102,114,0.35)'
                    : `0 24px 64px ${plan.accentColor}22`,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={`relative rounded-3xl flex flex-col justify-between min-h-[580px] sm:min-h-[640px] h-full ${
                  plan.featured
                    ? 'card-lumina-featured p-6 sm:p-10 scale-100 lg:scale-105 shadow-2xl z-10'
                    : 'card-lumina p-6 sm:p-10'
                }`}
              >
                {/* Animated gradient border on hover for non-featured */}
                {!plan.featured && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${plan.accentColor}15, transparent)`,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Featured sparkle animation */}
                {plan.featured && !shouldReduce && (
                  <motion.div
                    className="absolute top-4 right-12 opacity-30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="size-5 text-white" />
                  </motion.div>
                )}

                {/* Badge */}
                {plan.badge && (
                  <motion.div
                    className="pricing-badge"
                    animate={shouldReduce ? {} : { scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {plan.badge}
                  </motion.div>
                )}

                <div>
                  {/* Plan info */}
                  <div className="mb-8 mt-2">
                    <h3 className={`text-2xl font-black mb-2 ${plan.featured ? 'text-white' : 'text-[#0f0f0f]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.featured ? 'text-white/80' : 'text-[#6b7280]'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price — count up animation */}
                  <div className="mb-8">
                    <motion.span
                      className={`text-5xl font-black ${plan.featured ? 'text-white' : 'text-[#0f0f0f]'}`}
                      initial={shouldReduce ? false : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {plan.price}
                    </motion.span>
                    {plan.period && (
                      <span className={`text-base ml-1.5 ${plan.featured ? 'text-white/70' : 'text-[#9ca3af]'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features — stagger within card */}
                  <ul className="flex flex-col gap-4 mb-10">
                    {plan.features.map((feature, fi) => (
                      <motion.li
                        key={feature.label}
                        className="flex items-center gap-3"
                        initial={shouldReduce ? false : { opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + fi * 0.04 }}
                      >
                        <motion.div
                          whileHover={shouldReduce ? {} : { scale: 1.2, rotate: 8 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Check
                            className={`h-5 w-5 shrink-0 ${
                              feature.ok
                                ? plan.featured ? 'text-white' : 'text-[#006672]'
                                : 'text-[#d1d5db]'
                            }`}
                          />
                        </motion.div>
                        <span
                          className={`text-sm ${
                            feature.ok
                              ? plan.featured ? 'text-white' : 'text-[#374151]'
                              : 'text-[#d1d5db] line-through'
                          }`}
                        >
                          {feature.label}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <motion.a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduce ? {} : { scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`block text-center py-4 px-8 rounded-full font-bold text-base transition-all duration-200 mt-auto ${
                    plan.featured
                      ? 'bg-white text-[#006672] hover:bg-[#f0f7f8] shadow-md'
                      : 'border-2 border-[#e5e7eb] text-[#374151] hover:border-[#006672] hover:text-[#006672]'
                  }`}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
