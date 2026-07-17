import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Zap, ShieldCheck, Sparkles, ArrowRight, Clock, Star } from 'lucide-react';
import ContactForm from '@/components/sections/pricing/ContactForm';
import ProcessTabs from '@/components/sections/process/ProcessTabs';
import FadeInView from '@/components/ui/FadeInView';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Quy trình & Báo giá — KABO AGENCY',
  description:
    'Giá cả minh bạch, thực thi đẳng cấp. Quy trình làm việc 4 bước rõ ràng từ brief đến bàn giao. Nhận báo giá miễn phí ngay hôm nay.',
  alternates: { canonical: '/quy-trinh' },
};

const plans = [
  {
    name: 'Cơ Bản',
    subtitle: 'Dành cho startup muốn ra mắt nhanh.',
    price: '$999',
    period: '/dự án',
    featured: false,
    features: [
      { label: 'Landing Page (1 trang)', ok: true },
      { label: 'Thiết kế Figma cơ bản', ok: true },
      { label: 'Responsive đa thiết bị', ok: true },
      { label: 'Tối ưu tốc độ cơ bản', ok: true },
      { label: 'Hỗ trợ sau bàn giao 30 ngày', ok: true },
      { label: 'Hệ thống CMS', ok: false },
      { label: 'Tích hợp thanh toán', ok: false },
    ],
    cta: 'Chọn gói Cơ Bản',
    href: '#contact',
  },
  {
    name: 'Doanh Nghiệp',
    subtitle: 'Tối ưu cho doanh nghiệp vừa và nhỏ.',
    price: '$2,499',
    period: '/dự án',
    featured: true,
    badge: 'Phổ biến nhất',
    features: [
      { label: 'Website 5–10 trang đầy đủ', ok: true },
      { label: 'Thiết kế Figma tuỳ chỉnh', ok: true },
      { label: 'Responsive + Core Web Vitals', ok: true },
      { label: 'Hệ thống CMS quản trị', ok: true },
      { label: 'Tối ưu SEO On-page toàn diện', ok: true },
      { label: 'Training quản trị website', ok: true },
      { label: 'Hỗ trợ 3 tháng sau bàn giao', ok: true },
    ],
    cta: 'Chọn gói Doanh Nghiệp',
    href: '#contact',
  },
  {
    name: 'Cao Cấp',
    subtitle: 'Giải pháp toàn diện cho doanh nghiệp lớn.',
    price: 'Tuỳ chỉnh',
    period: '',
    featured: false,
    features: [
      { label: 'E-commerce / Web App phức tạp', ok: true },
      { label: 'Thiết kế Figma cao cấp', ok: true },
      { label: 'Tích hợp API bên thứ 3', ok: true },
      { label: 'Hệ thống thanh toán online', ok: true },
      { label: 'Bảo mật & hiệu năng nâng cao', ok: true },
      { label: 'Hỗ trợ 24/7 chuyên nghiệp', ok: true },
      { label: 'SLA cam kết uptime', ok: true },
    ],
    cta: 'Liên hệ tư vấn',
    href: '#contact',
  },
];

const trustItems = [
  { Icon: Clock, text: 'Phản hồi trong 24 giờ' },
  { Icon: Star, text: '120+ dự án hoàn thành' },
  { Icon: Sparkles, text: 'Báo giá miễn phí' },
];

export default function PricingPage() {
  return (
    <div className="pt-16">

      {/* ── Hero Section ── */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(160deg, #f0f9f9 0%, #ffffff 60%)' }}
      >
        <div className="container-lumina text-center max-w-3xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-[#006672]/10 text-[#006672] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6">
            <Zap className="h-3.5 w-3.5" />
            Quy trình & Báo giá
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6">
            Giá cả Minh bạch.
            <br />
            <span className="text-[#006672]">Thực thi Đẳng cấp.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-xl mx-auto mb-10">
            Chúng tôi không chỉ xây dựng website — chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy tăng trưởng thực sự.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="#contact"
              className="btn-primary text-sm justify-center gap-2"
            >
              Nhận báo giá miễn phí <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#pricing"
              className="btn-secondary text-sm justify-center"
            >
              Xem bảng giá →
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-[#e2ecec]">
            {trustItems.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-[#006672]/10 flex items-center justify-center shrink-0">
                  <Icon className="h-3.5 w-3.5 text-[#006672]" />
                </div>
                <span className="text-sm font-semibold text-[#374151]">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quy Trình Làm Việc ── */}
      <ProcessTabs />

      {/* ── Visual Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#006672]/20 to-transparent" />

      {/* ── Pricing Cards ── */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-lumina">

          <FadeInView className="text-center mb-14">
            <p className="text-xs font-bold text-[#006672] uppercase tracking-widest mb-3">
              Bảng giá dịch vụ
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
              Chọn gói phù hợp
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed">
              Giá cố định, không phát sinh thêm. Mọi gói đều bao gồm bàn giao source code và tài liệu hướng dẫn.
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {plans.map((plan, i) => (
              <FadeInView key={plan.name} delay={i * 0.12}>
                <div
                  className={`relative rounded-2xl flex flex-col h-full p-8 ${
                    plan.featured
                      ? 'card-lumina-featured shadow-2xl md:scale-105 z-10'
                      : 'card-lumina'
                  }`}
                >
                  {plan.badge && (
                    <div className="pricing-badge">{plan.badge}</div>
                  )}

                  {/* Plan header */}
                  <div className="mb-6 mt-2">
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
                  <div className="mb-8">
                    <span
                      className={`text-4xl lg:text-5xl font-black ${
                        plan.featured ? 'text-white' : 'text-[#0f0f0f]'
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-sm ml-1.5 ${
                          plan.featured ? 'text-white/70' : 'text-[#9ca3af]'
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3.5 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-3">
                        <Check
                          className={`h-4 w-4 mt-0.5 shrink-0 ${
                            f.ok
                              ? plan.featured
                                ? 'text-white'
                                : 'text-[#006672]'
                              : 'text-[#d1d5db]'
                          }`}
                        />
                        <span
                          className={`text-sm leading-snug ${
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

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className={`block text-center py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-200 mt-auto ${
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

          {/* Bottom note */}
          <FadeInView delay={0.4} className="text-center mt-10">
            <p className="text-sm text-zinc-400">
              Chưa chắc chắn? <Link href="#contact" className="text-[#006672] font-semibold hover:underline">Liên hệ tư vấn miễn phí</Link> — không ràng buộc.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* ── Visual Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#006672]/20 to-transparent" />

      {/* ── Contact Form Section ── */}
      <section
        id="contact"
        className="section-padding"
        style={{ background: 'linear-gradient(160deg, #f0f9f9 0%, #ffffff 60%)' }}
      >
        <div className="container-lumina">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left */}
            <div>
              <p className="text-xs font-bold text-[#006672] uppercase tracking-widest mb-4">
                Liên hệ
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] leading-tight mb-4">
                Cùng xây dựng<br />
                điều phi thường.
              </h2>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-10">
                Hãy cho chúng tôi biết về dự án, tiến độ và mục tiêu của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ để lên lịch thảo luận chi tiết.
              </p>

              {/* Trust signals */}
              <div className="flex flex-col gap-4">
                {[
                  { Icon: Zap, text: 'Phản hồi trong 24 giờ làm việc' },
                  { Icon: ShieldCheck, text: 'Thông tin của bạn được bảo mật tuyệt đối' },
                  { Icon: Sparkles, text: 'Tư vấn lần đầu hoàn toàn miễn phí' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#f0f7f8] text-[#006672] shrink-0">
                      <item.Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-[#374151] font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
