'use client';

import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const testimonials = [
  {
    name: 'Trần Bảo Đăng',
    role: 'Chủ cửa hàng Thời trang Nam',
    initials: 'TĐ',
    rating: 5,
    comment:
      'Tôi rất thích làm việc với KABO Agency! Giao diện chuẩn mobile vô cùng trực quan và mượt mà. Chỉ sau 3 ngày ra mắt website mới, doanh số bán hàng online của cửa hàng tôi đã tăng gấp đôi.',
    verified: true,
  },
  {
    name: 'Dương Hoàng Nam',
    role: 'CEO Nova Tech Co.',
    initials: 'HN',
    rating: 5,
    comment:
      'Đội ngũ hỗ trợ kỹ thuật tuyệt vời! Web tải siêu nhanh với điểm Lighthouse đạt 98. Khách hàng đối tác của tôi khen giao diện rất sang trọng và chuyên nghiệp.',
    verified: true,
  },
  {
    name: 'Nguyễn Linh Chi',
    role: 'Founder Beauty Spa & Wellness',
    initials: 'LC',
    rating: 5,
    comment:
      'Giao diện may đo thiết kế riêng mang đúng tinh thần thương hiệu Spa của mình. Tính năng đặt lịch hẹn và kết nối Zalo tự động giúp mình chốt khách cực kỳ dễ dàng.',
    verified: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-[#f4f9f9] relative overflow-hidden">
      <div className="container-lumina">

        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="section-label mx-auto mb-4">
            <Star className="size-3.5 text-[#006672] fill-current" />
            Đánh giá từ Khách hàng
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] leading-tight">
            Khách hàng nói gì về <br />
            <span className="gradient-text-primary">KABO AGENCY</span>
          </h2>
          <p className="mt-4 text-[#6b7280] text-sm max-w-lg mx-auto leading-relaxed">
            Hơn 120+ doanh nghiệp và thương hiệu Việt đã tin tưởng đồng hành cùng chúng tôi.
          </p>
        </ScrollReveal>

        {/* Testimonial Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {testimonials.map((item) => (
            <StaggerItem key={item.name} direction="up">
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,102,114,0.14)', borderColor: '#80c2cb' }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="bg-white rounded-3xl p-8 border border-[#e2ecec] shadow-sm flex flex-col justify-between h-full relative group"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-[#006672]/15 group-hover:text-[#006672]/30 transition-colors">
                  <Quote className="size-10" />
                </div>

                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-4 text-[#f59e0b] fill-[#f59e0b]" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-[#374151] text-sm leading-relaxed mb-8 italic">
                    "{item.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#f0f7f8]">
                  <div className="size-11 rounded-2xl bg-[#006672] text-white font-extrabold flex items-center justify-center text-sm shrink-0 shadow-md">
                    {item.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-[#0f0f0f] text-base leading-snug">{item.name}</h4>
                      {item.verified && (
                        <CheckCircle2 className="size-4 text-[#006672]" />
                      )}
                    </div>
                    <p className="text-xs text-[#6b7280] font-medium">{item.role}</p>
                  </div>
                </div>

              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
