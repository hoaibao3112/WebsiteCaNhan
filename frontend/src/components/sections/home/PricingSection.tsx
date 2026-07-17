import Link from 'next/link';
import { Check } from 'lucide-react';
import FadeInView from '@/components/ui/FadeInView';

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
    href: '/quy-trinh#contact',
  },
  {
    name: 'DOANH NGHIỆP',
    subtitle: 'Tối ưu cho doanh nghiệp vừa và nhỏ.',
    price: '$2,499',
    period: '/dự án',
    featured: true,
    badge: 'Phổ biến nhất',
    features: [
      { label: 'Website (5–10 trang)', ok: true },
      { label: 'Responsive đa thiết bị', ok: true },
      { label: 'Thiết kế Figma tuỳ chỉnh', ok: true },
      { label: 'Hệ thống CMS quản trị', ok: true },
      { label: 'Tối ưu SEO On-page', ok: true },
      { label: 'Train quản trị website', ok: true },
      { label: 'Hỗ trợ 3 tháng sau bàn giao', ok: true },
      { label: 'Tích hợp thanh toán', ok: false },
    ],
    cta: 'Chọn gói này',
    href: '/quy-trinh#contact',
  },
  {
    name: 'CAO CẤP',
    subtitle: 'Giải pháp toàn diện cho doanh nghiệp lớn.',
    price: 'Tuỳ chỉnh',
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
    href: '/quy-trinh#contact',
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-lumina">
        <FadeInView className="text-center mb-14">
          <p className="text-sm font-bold text-[#006672] uppercase tracking-widest mb-3">
            Bảng giá dịch vụ
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
            Bảng giá dịch vụ
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Tiết kiệm chi phí với các gói dịch vụ chuẩn của chúng tôi.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <FadeInView key={plan.name} delay={i * 0.12}>
            <div
              className={`relative rounded-3xl flex flex-col justify-between min-h-[640px] h-full ${
                plan.featured
                  ? 'card-lumina-featured p-10 scale-105 shadow-2xl z-10'
                  : 'card-lumina p-10'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="pricing-badge">{plan.badge}</div>
              )}

              <div>
                {/* Plan info */}
                <div className="mb-8 mt-2">
                  <h3
                    className={`text-2xl font-black mb-2 ${
                      plan.featured ? 'text-white' : 'text-[#0f0f0f]'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      plan.featured ? 'text-white/80' : 'text-[#6b7280]'
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className={`text-5xl font-black ${
                      plan.featured ? 'text-white' : 'text-[#0f0f0f]'
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-base ml-1.5 ${
                        plan.featured ? 'text-white/70' : 'text-[#9ca3af]'
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-center gap-3">
                      <Check
                        className={`h-5 w-5 shrink-0 ${
                          feature.ok
                            ? plan.featured
                              ? 'text-white'
                              : 'text-[#006672]'
                            : 'text-[#d1d5db]'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          feature.ok
                            ? plan.featured
                              ? 'text-white'
                              : 'text-[#374151]'
                            : 'text-[#d1d5db] line-through'
                        }`}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block text-center py-4 px-8 rounded-full font-bold text-base transition-all duration-200 mt-auto ${
                  plan.featured
                    ? 'bg-white text-[#006672] hover:bg-[#f0f7f8] shadow-md'
                    : 'border-2 border-[#e5e7eb] text-[#374151] hover:border-[#006672] hover:text-[#006672]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
