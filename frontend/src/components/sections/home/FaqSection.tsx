'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';

const faqs = [
  {
    q: 'Thời gian hoàn thành thiết kế website mất bao lâu?',
    a: 'Đối với Landing Page hoặc Website doanh nghiệp tiêu chuẩn, thời gian bàn giao chỉ từ 3 đến 5 ngày làm việc. Đối với website bán hàng E-Commerce hoặc hệ thống Web App phức tạp, thời gian triển khai từ 7 đến 14 ngày.',
  },
  {
    q: 'Tôi có được bàn giao toàn bộ Source Code và quyền sở hữu không?',
    a: 'Có, 100%. Sau khi nghiệm thu bàn giao, bạn sở hữu hoàn toàn mã nguồn (Source Code), cơ sở dữ liệu và tài khoản quản trị website. Bạn không bị đóng khóa hay phụ thuộc vào bất kỳ nền tảng bên thứ ba nào.',
  },
  {
    q: 'Website có đảm bảo chuẩn SEO Google và tối ưu tốc độ Mobile không?',
    a: 'Tất cả website do KABO Agency thiết kế đều được tối ưu chuẩn SEO On-page (Schema JSON-LD, Sitemap XML, Semantic HTML5) và đạt điểm tốc độ Core Web Vitals từ 95/100 trên Google PageSpeed Insights.',
  },
  {
    q: 'Tôi không biết về lập trình thì có tự thay đổi nội dung được không?',
    a: 'Hoàn toàn được. Chúng tôi tích hợp hệ thống quản trị trực quan bằng Tiếng Việt cực kỳ dễ sử dụng. Bạn có thể tự chỉnh sửa chữ, thay đổi hình ảnh, đăng bài viết hoặc sản phẩm mới chỉ sau 5 phút hướng dẫn qua video 1-1.',
  },
  {
    q: 'Chính sách bảo hành và hỗ trợ sau khi bàn giao như thế nào?',
    a: 'Chúng tôi cam kết bảo hành kỹ thuật 12 tháng miễn phí cho mọi dự án. Đội ngũ KABO luôn túc trực hỗ trợ 24/7 qua Zalo/Hotline nếu bạn gặp bất kỳ vấn đề gì trong quá trình vận hành.',
  },
  {
    q: 'Có hỗ trợ ký Hợp đồng dịch vụ và xuất Hóa đơn VAT không?',
    a: 'Có đầy đủ. KABO cung cấp hợp đồng pháp lý rõ ràng bảo vệ quyền lợi hai bên và xuất hóa đơn GTGT (VAT) hợp lệ cho doanh nghiệp của bạn.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx((prev) => (prev === i ? null : i));
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-lumina max-w-4xl mx-auto">

        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="section-label mx-auto mb-4">
            <HelpCircle className="size-3.5 text-[#006672]" />
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] leading-tight">
            Câu hỏi thường gặp <br />
            <span className="gradient-text-primary">về dịch vụ của KABO</span>
          </h2>
          <p className="mt-4 text-[#6b7280] text-sm max-w-xl mx-auto leading-relaxed">
            Mọi thắc mắc phổ biến nhất của khách hàng trước khi bắt đầu thiết kế website.
          </p>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <ScrollReveal direction="up" delay={0.1} className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={faq.q}
                className="border border-[#e2ecec] rounded-2xl overflow-hidden bg-white transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full p-6 text-left font-extrabold text-[#0f0f0f] text-base sm:text-lg flex items-center justify-between gap-4 hover:text-[#006672] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`size-5 text-[#006672] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-[#4b5563] leading-relaxed border-t border-[#f0f7f8] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </ScrollReveal>

        {/* Support Banner */}
        <ScrollReveal direction="up" delay={0.2} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-[#f0f7f8] border border-[#80c2cb]/40 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-[#0f0f0f]">
            <MessageSquare className="size-4 text-[#006672]" />
            Bạn có câu hỏi khác?{' '}
            <a href="https://zalo.me/0374170367" target="_blank" rel="noopener noreferrer" className="text-[#006672] font-black underline hover:opacity-80">
              Nhắn Zalo tư vấn ngay
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
