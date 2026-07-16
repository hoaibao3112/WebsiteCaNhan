import Link from 'next/link';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Cơ bản',
    subtitle: 'Dành cho startup chứng minh ý tưởng.',
    price: '$15k',
    period: '/tháng',
    featured: false,
    features: [
      { label: 'Thiết kế UX/UI', included: true },
      { label: 'Phát triển Frontend', included: true },
      { label: 'Kiến trúc Backend', included: false },
    ],
    cta: 'Chọn Cơ bản',
    href: '/quy-trinh#contact',
  },
  {
    name: 'Doanh nghiệp',
    subtitle: 'Đã phát triển toàn diện (Full-stack).',
    price: '$35k',
    period: '/tháng',
    featured: true,
    badge: 'Phổ biến nhất',
    features: [
      { label: 'Đội ngũ chuyên trách', included: true },
      { label: 'Phát triển Full-stack', included: true },
      { label: 'Kiến trúc đám mây', included: true },
    ],
    cta: 'Chọn Doanh nghiệp',
    href: '/quy-trinh#contact',
  },
  {
    name: 'Cao cấp',
    subtitle: 'Quy mô & hỗ trợ Enterprise.',
    price: 'Tuỳ chỉnh',
    period: '',
    featured: false,
    features: [
      { label: 'Mọi thứ trong Doanh nghiệp', included: true },
      { label: 'Hỗ trợ 24/7 SLA', included: true },
      { label: 'Tích hợp AI/ML', included: true },
    ],
    cta: 'Liên hệ Sales',
    href: '/quy-trinh#contact',
  },
];

export default function PricingSection() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}>
      <div className="container-lumina">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#e11d48] uppercase tracking-widest mb-3">
            Bảng giá minh bạch
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
            Bảng giá dịch vụ
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Chọn mô hình hợp tác phù hợp với tốc độ của bạn. Không phí ẩn, không bất ngờ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? 'card-lumina-featured'
                  : 'card-lumina'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="pricing-badge">{plan.badge}</div>
              )}

              {/* Plan info */}
              <div className="mb-6">
                <h3
                  className={`text-xl font-black mb-1 ${
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
              <div className="mb-6">
                <span
                  className={`text-4xl font-black ${
                    plan.featured ? 'text-white' : 'text-[#0f0f0f]'
                  }`}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-sm ml-1 ${
                      plan.featured ? 'text-white/70' : 'text-[#9ca3af]'
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center gap-2.5">
                    <Check
                      className={`h-4 w-4 shrink-0 ${
                        feature.included
                          ? plan.featured
                            ? 'text-white'
                            : 'text-[#e11d48]'
                          : 'text-[#d1d5db]'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        feature.included
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

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 ${
                  plan.featured
                    ? 'bg-white text-[#e11d48] hover:bg-[#fff1f2]'
                    : 'border border-[#e5e7eb] text-[#374151] hover:border-[#e11d48] hover:text-[#e11d48]'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
