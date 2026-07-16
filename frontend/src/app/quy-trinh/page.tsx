import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import ContactForm from '@/components/sections/pricing/ContactForm';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Quy trình & Báo giá',
  description:
    'Giá cả minh bạch, thực thi đẳng cấp. Chọn mô hình hợp tác phù hợp với tốc độ của bạn.',
  alternates: { canonical: '/quy-trinh' },
};

const plans = [
  {
    name: 'Cơ bản',
    subtitle: 'Dành cho startup chứng minh ý tưởng.',
    price: '$15k',
    period: '/tháng',
    featured: false,
    features: [
      { label: 'Thiết kế UX/UI', ok: true },
      { label: 'Phát triển Frontend', ok: true },
      { label: 'Kiến trúc Backend', ok: false },
    ],
    cta: 'Chọn Cơ bản',
  },
  {
    name: 'Doanh nghiệp',
    subtitle: 'Đã phát triển toàn diện (Full-stack).',
    price: '$35k',
    period: '/tháng',
    featured: true,
    badge: 'Phổ biến nhất',
    features: [
      { label: 'Đội ngũ chuyên trách', ok: true },
      { label: 'Phát triển Full-stack', ok: true },
      { label: 'Kiến trúc đám mây', ok: true },
    ],
    cta: 'Chọn Doanh nghiệp',
  },
  {
    name: 'Cao cấp',
    subtitle: 'Quy mô & hỗ trợ Enterprise.',
    price: 'Tuỳ chỉnh',
    period: '',
    featured: false,
    features: [
      { label: 'Mọi thứ trong Doanh nghiệp', ok: true },
      { label: 'Hỗ trợ 24/7 SLA', ok: true },
      { label: 'Tích hợp AI/ML', ok: true },
    ],
    cta: 'Liên hệ Sales',
  },
];

export default function PricingPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}>
        <div className="container-lumina text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight animate-fade-in-up">
            Giá cả Minh bạch.
            <br />
            <span className="text-[#e11d48]">Thực thi Đẳng cấp.</span>
          </h1>
          <p className="mt-6 text-base text-[#6b7280] leading-relaxed max-w-xl mx-auto animate-fade-in-up-delay-1">
            Chúng tôi không chỉ xây dựng phần mềm; chúng tôi kiến tạo động lực kỹ thuật số. Chọn mô hình hợp tác phù hợp với tốc độ của bạn.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 bg-white">
        <div className="container-lumina">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 animate-fade-in-up-delay-${i + 1} ${
                  plan.featured ? 'card-lumina-featured' : 'card-lumina'
                }`}
              >
                {plan.badge && (
                  <div className="pricing-badge">{plan.badge}</div>
                )}

                <div className="mb-6 mt-2">
                  <h2
                    className={`text-xl font-black mb-1 ${
                      plan.featured ? 'text-white' : 'text-[#0f0f0f]'
                    }`}
                  >
                    {plan.name}
                  </h2>
                  <p
                    className={`text-sm ${
                      plan.featured ? 'text-white/80' : 'text-[#6b7280]'
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>

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

                <ul className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5">
                      <Check
                        className={`h-4 w-4 shrink-0 ${
                          f.ok
                            ? plan.featured
                              ? 'text-white'
                              : 'text-[#e11d48]'
                            : 'text-[#d1d5db]'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          f.ok
                            ? plan.featured
                              ? 'text-white'
                              : 'text-[#374151]'
                            : 'text-[#d1d5db] line-through'
                        }`}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all duration-200 ${
                    plan.featured
                      ? 'bg-white text-[#e11d48] hover:bg-[#fff1f2]'
                      : 'border border-[#e5e7eb] text-[#374151] hover:border-[#e11d48] hover:text-[#e11d48]'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}
      >
        <div className="container-lumina">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] leading-tight mb-4">
                Cùng xây dựng điều phi thường.
              </h2>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-8">
                Hãy cho chúng tôi biết về dự án, tiến độ và mục tiêu của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ để lên lịch thoả luận chi tiết.
              </p>

              {/* Trust signals */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: '⚡', text: 'Phản hồi trong 24 giờ làm việc' },
                  { icon: '🔒', text: 'Thông tin của bạn được bảo mật tuyệt đối' },
                  { icon: '✦', text: 'Tư vấn lần đầu hoàn toàn miễn phí' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm text-[#374151] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl p-8 border border-[#f0e8e8] shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
