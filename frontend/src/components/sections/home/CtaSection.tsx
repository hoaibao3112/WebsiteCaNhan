'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Phone, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const trustItems = [
  'Miễn phí tư vấn',
  'Không ràng buộc',
  'Bảo hành 12 tháng',
];

export default function CtaSection() {
  return (
    <section aria-label="Bắt đầu hành trình" className="section-padding relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-bg opacity-70" />

      {/* Decorative blobs */}
      <motion.div
        className="absolute top-0 right-0 size-80 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #006672 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 size-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ca8a04 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="container-lumina relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

          {/* Badge */}
          <ScrollReveal direction="down" delay={0}>
            <motion.div
              className="section-label"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Sparkles className="size-3" />
              Bắt đầu ngay hôm nay
            </motion.div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f0f0f] leading-tight">
              Sẵn sàng tạo ra
              <br />
              <span className="animate-shimmer-text">website của bạn?</span>
            </h2>
          </ScrollReveal>

          {/* Sub */}
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-[#6b7280] text-base max-w-lg leading-relaxed">
              Đội ngũ của chúng tôi sẵn sàng tư vấn và báo giá miễn phí. Liên hệ ngay — phản hồi
              trong <strong className="text-[#006672]">24 giờ</strong>.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal direction="up" delay={0.3} className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link href="/quy-trinh#contact" className="btn-primary text-base px-8 py-4 gap-2 w-full sm:w-auto justify-center">
                  Nhận báo giá miễn phí
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="size-5" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <a href="tel:+84123456789" className="btn-secondary text-base px-8 py-4 gap-2 w-full sm:w-auto justify-center">
                  <Phone className="size-5" /> Gọi tư vấn ngay
                </a>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Trust row — stagger */}
          <StaggerContainer
            className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs text-[#9ca3af]"
            staggerDelay={0.1}
          >
            {trustItems.map((item) => (
              <StaggerItem key={item} direction="up">
                <motion.span
                  className="flex items-center gap-1.5"
                  whileHover={{ color: '#006672', scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle className="size-3.5 text-[#006672]" />
                  {item}
                </motion.span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
