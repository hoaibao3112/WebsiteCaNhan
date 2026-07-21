import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Zap, ShieldCheck, Sparkles, ArrowRight, Clock, Star, Users } from 'lucide-react';
import ContactForm from '@/components/sections/pricing/ContactForm';
import ProcessTabs from '@/components/sections/process/ProcessTabs';
import FadeInView from '@/components/ui/FadeInView';
import { customPagesService } from '@/services/custom-pages.service';
import BuilderCanvas from '@/components/sections/builder/BuilderCanvas';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Quy trình & Báo giá Dịch vụ',
  description:
    'Giá cả minh bạch, thực thi đẳng cấp. Quy trình làm việc 5 bước rõ ràng từ brief đến bàn giao. Nhận báo giá miễn phí ngay hôm nay từ KABO AGENCY.',
  alternates: { canonical: '/quy-trinh' },
  openGraph: {
    title: 'Quy trình & Báo giá Dịch vụ — KABO AGENCY',
    description: 'Quy trình minh bạch 5 bước, giá cả rõ ràng, báo giá miễn phí trong 24h.',
    url: '/quy-trinh',
    images: [{ url: '/logo-kabo.jpg', width: 1200, height: 630, alt: 'KABO AGENCY Quy trình & Báo giá' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quy trình & Báo giá — KABO AGENCY',
    description: 'Quy trình minh bạch, giá cả rõ ràng. Nhận báo giá miễn phí trong 24h.',
    images: ['/logo-kabo.jpg'],
  },
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
    badge: 'PHỔ BIẾN NHẤT',
    features: [
      { label: 'Website 5-10 trang đầy đủ', ok: true },
      { label: 'Thiết kế Figma tùy chỉnh', ok: true },
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

export default async function PricingPage() {
  const pageData = await customPagesService.getPageBySlug('quy-trinh');

  if (pageData && pageData.pbConfig) {
    return (
      <div className="min-h-screen bg-white">
        <BuilderCanvas
          pbConfig={pageData.pbConfig}
          selectedId={null}
          allowEdit={false}
        />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '68px' }} className="bg-surface text-on-surface">

      {/* ── Hero Section ── */}
      <section
        className="pt-16 pb-20 md:pt-24 md:pb-24"
        style={{ background: 'linear-gradient(160deg, #f0f9f9 0%, #ffffff 60%)' }}
      >
        <div className="container-lumina text-center max-w-3xl mx-auto">
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-[#006672]/10 text-primary text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 animate-fade-in">
            <Zap className="size-3.5" />
            Quy trình & Báo giá
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-8 animate-fade-in-up">
            Giá cả Minh bạch.
            <br />
            <span className="gradient-text-primary">Thực thi Đẳng cấp.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#3d494b] leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in-up-delay-1">
            Chúng tôi không chỉ xây dựng website — chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy tăng trưởng thực sự.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up-delay-2">
            <Link
              href="#contact"
              className="btn-primary text-sm justify-center gap-2 shadow-md hover:shadow-lg transition-all px-8 py-3.5"
            >
              Nhận báo giá miễn phí <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#pricing"
              className="btn-secondary text-sm justify-center hover:bg-primary/5 hover:border-primary transition-all px-8 py-3.5"
            >
              Xem bảng giá →
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-[#e2ecec] mt-4 animate-fade-in-up-delay-3">
            {trustItems.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-[#006672]/10 flex items-center justify-center shrink-0">
                  <Icon className="size-3.5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-[#191c1d]">{text}</span>
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
      <section id="pricing" className="py-20 bg-surface-bright relative">
        <div className="container-lumina max-w-[1280px]">

          <FadeInView className="text-center mb-16">
            <span className="inline-flex items-center text-primary font-bold tracking-wider text-xs uppercase mb-4 gap-2">
              <Star className="size-3.5 text-primary" />
              BẢNG GIÁ DỊCH VỤ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191c1d]">
              Chọn gói phù hợp
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#3d494b] max-w-xl mx-auto leading-relaxed">
              Giá cố định, không phát sinh thêm. Mọi gói đều bao gồm bàn giao source code và tài liệu hướng dẫn.
            </p>
          </FadeInView>

          {/* Cards container matching the end-aligned card heights */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end"
            style={{ width: '100%', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            {plans.map((plan, i) => (
              <FadeInView key={plan.name} delay={i * 0.12} className="h-full">
                {plan.featured ? (
                  /* Popular Featured Card */
                  <div className="bg-primary rounded-2xl p-8 shadow-glass relative overflow-hidden md:-mt-8 md:mb-0 mb-4 ring-4 ring-primary/20 flex flex-col h-full text-white">
                    <div className="absolute top-0 right-0 left-0 bg-secondary text-secondary-fixed text-center py-2 text-xs font-black tracking-widest flex items-center justify-center gap-1.5 shadow-sm">
                      <Star className="size-3.5 fill-current" /> {plan.badge}
                    </div>

                    <div className="pt-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-white/80 text-sm mb-6 h-10 leading-relaxed">{plan.subtitle}</p>

                      <div className="mb-8">
                        <span className="text-4xl lg:text-5xl font-bold text-secondary-fixed">{plan.price}</span>
                        <span className="text-white/80 text-sm ml-1">{plan.period}</span>
                      </div>

                      <ul className="flex flex-col gap-4 mb-8 flex-1">
                        {plan.features.map((f) => (
                          <li key={f.label} className="flex items-start gap-3">
                            <Check className="size-5 text-secondary-fixed shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-white leading-snug">{f.label}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={plan.href}
                        className="block w-full py-4 px-4 text-center rounded-lg bg-secondary text-on-secondary-container font-bold hover:bg-secondary-fixed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group text-sm"
                      >
                        {plan.cta}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Standard Card (Basic / Premium) */
                  <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-soft-float border border-surface-variant relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                    <h3 className="text-xl font-bold text-[#191c1d] mb-2">{plan.name}</h3>
                    <p className="text-[#3d494b] text-sm mb-6 h-10 leading-relaxed">{plan.subtitle}</p>

                    <div className="mb-8">
                      <span className="text-4xl lg:text-5xl font-bold text-[#191c1d]">{plan.price}</span>
                      {plan.period && <span className="text-[#3d494b] text-sm ml-1">{plan.period}</span>}
                    </div>

                     <ul className="flex flex-col gap-4 mb-8 flex-1">
                       {plan.features.map((f) => (
                         <li key={f.label} className={`flex items-start gap-3 ${!f.ok ? 'opacity-40' : ''}`}>
                           {f.ok ? (
                             <Check className="size-5 text-primary shrink-0 mt-0.5" />
                           ) : (
                             <span className="size-5 flex items-center justify-center text-[#3d494b] font-bold shrink-0 mt-0.5">✕</span>
                           )}
                           <span className={`text-sm font-semibold leading-snug ${f.ok ? 'text-[#191c1d]' : 'text-[#3d494b] line-through'}`}>
                             {f.label}
                           </span>
                         </li>
                       ))}
                     </ul>

                     <Link
                       href={plan.href}
                       className={`block w-full py-3 px-4 text-center rounded-lg border-2 font-bold transition-all flex items-center justify-center gap-2 group text-sm ${
                         plan.name === 'Cơ Bản'
                           ? 'border-primary text-primary hover:bg-primary/5'
                           : 'border-[#bcc9cb] text-[#3d494b] hover:border-primary hover:text-primary'
                       }`}
                     >
                       {plan.cta}
                       <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                     </Link>
                  </div>
                )}
              </FadeInView>
            ))}
          </div>

          {/* Bottom note */}
          <div className="text-center mt-10 text-sm text-[#3d494b]">
            Chưa chắc chắn?{' '}
            <Link href="#contact" className="text-primary font-bold hover:underline">
              Liên hệ tư vấn miễn phí
            </Link>{' '}
            — không ràng buộc.
          </div>
        </div>
      </section>

      {/* ── Visual Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#006672]/20 to-transparent" />

      {/* ── Contact Form Section ── */}
      <section
        id="contact"
        className="py-20 px-4 md:px-6 max-w-[1280px] mx-auto relative"
      >
        <FadeInView className="text-center mb-16">
          <span className="inline-flex items-center text-primary font-bold tracking-wider text-xs uppercase mb-4 gap-2">
            <Users className="size-3.5 text-primary" />
            LIÊN HỆ TƯ VẤN
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#191c1d] mb-4">
            Cùng xây dựng <span className="text-primary">điều phi thường.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#3d494b] max-w-2xl mx-auto leading-relaxed">
            Cho chúng tôi biết về dự án của bạn — chúng tôi sẽ phản hồi trong vòng 24 giờ với đề xuất chi tiết và miễn phí.
          </p>
        </FadeInView>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Trust Signals (Left Column - 5/12 width) */}
          <FadeInView className="lg:col-span-5 flex flex-col gap-6" delay={0.1}>
            <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-[#eceeef]/50 transition-colors group">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Zap className="size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#191c1d] mb-1">Phản hồi trong 24 giờ</h4>
                <p className="text-sm text-[#3d494b] leading-relaxed">Chúng tôi cam kết phản hồi mọi yêu cầu trong ngày làm việc tiếp theo.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-[#eceeef]/50 transition-colors group">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#191c1d] mb-1">Bảo mật tuyệt đối</h4>
                <p className="text-sm text-[#3d494b] leading-relaxed">Thông tin dự án của bạn được giữ bí mật và không chia sẻ bên thứ 3.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-[#eceeef]/50 transition-colors group">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Users className="size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-[#191c1d] mb-1">Tư vấn miễn phí</h4>
                <p className="text-sm text-[#3d494b] leading-relaxed">Buổi tư vấn đầu tiên hoàn toàn không tốn phí, không ràng buộc.</p>
              </div>
            </div>

            {/* Stats Block inside a golden shape styled container */}
            <div className="bg-primary rounded-2xl p-6 text-white mt-8 relative overflow-hidden shadow-lg">
              {/* Background abstract shape */}
              <div className="absolute -right-8 -bottom-8 size-32 bg-secondary-fixed/20 rounded-full blur-2xl"></div>
              <h4 className="text-xs font-black uppercase tracking-widest mb-4 opacity-80">ĐƯỢC TIN TƯỞNG BỞI</h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 relative z-10">
                <div>
                  <div className="text-3xl font-black mb-1">120+</div>
                  <div className="text-xs opacity-80 font-semibold">Dự án hoàn thành</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1 flex items-center gap-1">
                    4.9<Star className="size-5 text-secondary-fixed fill-current shrink-0" />
                  </div>
                  <div className="text-xs opacity-80 font-semibold">Đánh giá trung bình</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">98%</div>
                  <div className="text-xs opacity-80 font-semibold">Khách hàng hài lòng</div>
                </div>
                <div>
                  <div className="text-3xl font-black mb-1">3 năm</div>
                  <div className="text-xs opacity-80 font-semibold">Kinh nghiệm làm việc</div>
                </div>
              </div>
            </div>
          </FadeInView>

          {/* Contact Form (Right Column - 7/12 width) */}
          <FadeInView className="lg:col-span-7 mx-auto w-full max-w-[620px]" delay={0.2}>
            <div className="glass-panel bg-white/80 rounded-2xl shadow-glass border border-[#e1e3e4] p-5 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#191c1d]">Gửi yêu cầu tư vấn</h3>
                <div className="flex gap-1">
                  <div className="size-2 rounded-full bg-[#bcc9cb]"></div>
                  <div className="size-2 rounded-full bg-[#bcc9cb]"></div>
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
              </div>
              <p className="text-sm text-[#3d494b] mb-6 pb-6 border-b border-[#e1e3e4]">
                Điền thông tin bên dưới — miễn phí & không ràng buộc
              </p>
              
              <ContactForm />
            </div>
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
