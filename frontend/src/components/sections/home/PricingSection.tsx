'use client';

import { Check, Sparkles, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

const plans = [
  {
    name: 'Landing Page',
    subtitle: 'Tối ưu chuyển đổi cho chiến dịch quảng cáo & bán hàng đơn lẻ',
    price: '2.990.000₫',
    period: 'trọn gói',
    featured: false,
    badge: null,
    features: [
      { label: 'Giao diện 1 trang chuẩn UI/UX chuyển đổi cao', ok: true },
      { label: 'Tối ưu hiển thị Mobile, Tablet, Desktop', ok: true },
      { label: 'Form thu lead gửi về Email / Google Sheets', ok: true },
      { label: 'Tích hợp nút gọi nhanh, Zalo, Messenger', ok: true },
      { label: 'Tặng Tên miền quốc tế & SSL 1 năm', ok: true },
      { label: 'Bảo hành kỹ thuật 12 tháng', ok: true },
      { label: 'Hệ thống CMS quản trị bài viết đa trang', ok: false },
      { label: 'Tích hợp cổng thanh toán online tự động', ok: false },
    ],
    cta: 'Nhận tư vấn qua Zalo',
    href: 'https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20Landing%20Page%20(2.990.000đ)',
    accentColor: '#006672',
  },
  {
    name: 'Doanh Nghiệp Chuẩn SEO',
    subtitle: 'Khẳng định uy tín thương hiệu & tăng trưởng khách hàng bền vững',
    price: '5.990.000₫',
    period: 'trọn gói',
    featured: true,
    badge: 'Phổ biến nhất',
    features: [
      { label: 'Thiết kế giao diện nhận diện thương hiệu độc quyền', ok: true },
      { label: 'Cấu trúc đa trang: Giới thiệu, Dịch vụ, Dự án, Tin tức', ok: true },
      { label: 'Trang quản trị CMS Tiếng Việt tự chủ 100% nội dung', ok: true },
      { label: 'Tối ưu Google PageSpeed 95+ & chuẩn SEO On-page', ok: true },
      { label: 'Tích hợp Form liên hệ, Google Maps, Chat Zalo', ok: true },
      { label: 'Tặng Tên miền quốc tế & SSL 1 năm', ok: true },
      { label: 'Bảo hành & hỗ trợ kỹ thuật 12 tháng', ok: true },
      { label: 'Bàn giao 100% source code không phụ thuộc', ok: true },
    ],
    cta: 'Nhận tư vấn qua Zalo',
    href: 'https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20Doanh%20Nghiệp%20(5.990.000đ)',
    accentColor: '#006672',
  },
  {
    name: 'Shop Bán Hàng E-Commerce',
    subtitle: 'Cửa hàng trực tuyến chuyên nghiệp & bán hàng đa kênh',
    price: '9.990.000₫',
    period: 'trọn gói',
    featured: false,
    badge: 'Kinh doanh',
    features: [
      { label: 'Catalogue sản phẩm, giỏ hàng & đặt hàng', ok: true },
      { label: 'Tích hợp thanh toán VietQR quét mã, MoMo, VNPAY', ok: true },
      { label: 'Quản lý đơn hàng, tồn kho & thông báo realtime', ok: true },
      { label: 'Thiết kế Figma độc quyền theo nhận diện', ok: true },
      { label: 'Tích hợp đồng bộ CRM / Google Sheets', ok: true },
      { label: 'Bảo mật nâng cao & sao lưu dữ liệu định kỳ', ok: true },
      { label: 'Hỗ trợ ưu tiên 24/7 & bảo hành 12 tháng', ok: true },
      { label: 'Bàn giao toàn bộ mã nguồn & hướng dẫn 1:1', ok: true },
    ],
    cta: 'Nhận tư vấn qua Zalo',
    href: 'https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20E-Commerce%20(9.990.000đ)',
    accentColor: '#ca8a04',
  },
];

export default function PricingSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-padding bg-white overflow-hidden border-b border-[#e2ecec]">
      <div className="container-lumina max-w-[1280px]">

        <ScrollReveal direction="up" className="text-center mb-14">
          <div className="section-label mx-auto mb-4">
            Bảng Giá Dịch Vụ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f]">
            Chi Phí Minh Bạch,<br />
            <span className="gradient-text-primary">Giá Trị Thực Tế</span>
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Mọi gói dịch vụ đều cam kết bảo hành kỹ thuật 12 tháng, tặng Tên miền &amp; SSL, bàn giao 100% mã nguồn.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch" staggerDelay={0.12}>
          {plans.map((plan, i) => (
            <StaggerItem key={plan.name} direction="up">
              <motion.div
                whileHover={shouldReduce ? {} : {
                  y: plan.featured ? -4 : -8,
                  boxShadow: plan.featured
                    ? '0 32px 80px rgba(0,102,114,0.35)'
                    : '0 24px 64px rgba(0,102,114,0.12)',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={`relative rounded-3xl flex flex-col justify-between min-h-[580px] sm:min-h-[620px] h-full transition-all duration-300 ${
                  plan.featured
                    ? 'card-lumina-featured p-6 sm:p-9 scale-100 lg:scale-105 shadow-2xl z-10'
                    : 'card-lumina p-6 sm:p-9'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="pricing-badge">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan info */}
                  <div className="mb-6 mt-2">
                    <h3 className={`text-2xl font-black mb-2 ${plan.featured ? 'text-white' : 'text-[#0f0f0f]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${plan.featured ? 'text-white/85' : 'text-[#6b7280]'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-black ${plan.featured ? 'text-[#fbe449]' : 'text-[#006672]'}`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className={`text-xs font-semibold ${plan.featured ? 'text-white/75' : 'text-[#6b7280]'}`}>
                          /{plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3.5 mb-8">
                    {plan.features.map((feature, fi) => (
                      <li
                        key={feature.label}
                        className="flex items-start gap-2.5 text-xs sm:text-sm"
                      >
                        <Check
                          className={`size-4 shrink-0 mt-0.5 ${
                            feature.ok
                              ? plan.featured ? 'text-[#fbe449]' : 'text-[#006672]'
                              : 'text-[#d1d5db]'
                          }`}
                        />
                        <span
                          className={
                            feature.ok
                              ? plan.featured ? 'text-white/95' : 'text-[#374151]'
                              : 'text-[#9ca3af] line-through'
                          }
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 text-center py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-200 mt-auto ${
                    plan.featured
                      ? 'bg-white text-[#006672] hover:bg-[#f0f7f8] shadow-md'
                      : 'bg-[#006672] text-white hover:bg-[#004d56]'
                  }`}
                >
                  <MessageCircle className="size-4" />
                  {plan.cta}
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
