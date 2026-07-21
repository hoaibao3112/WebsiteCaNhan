'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  Sparkles,
  Zap,
  Layers,
  ShoppingCart,
  BarChart2,
  FileText,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

const PLANS_V2 = [
  {
    id: 'standard',
    category: 'PHỔ BIẾN NHẤT',
    categoryColor: 'text-[#6b7280]',
    title: 'Standard',
    price: '990K',
    unit: '/tháng',
    description: 'Phù hợp cho cá nhân, shop online và doanh nghiệp vừa & nhỏ bắt đầu bứt phá.',
    features: [
      'Tối đa 5 quản trị viên',
      '5 kênh bán hàng / Landing Page',
      '50MB Lưu trữ cloud tốc độ cao',
      'Đầy đủ tính năng thiết kế & SEO nâng cao',
      'Tích hợp AI sáng tạo nội dung',
    ],
    highlight: false,
    badge: null,
    buttonText: 'Chọn Standard',
    buttonClass: 'bg-[#f0eeff] text-[#6366f1] hover:bg-[#e0e7ff] hover:text-[#4f46e5]',
    cardBorder: 'border border-[#e5e7eb] bg-white hover:border-[#6366f1]/40 hover:shadow-xl',
  },
  {
    id: 'premium',
    category: 'QUY MÔ KINH DOANH',
    categoryColor: 'text-[#6366f1]',
    title: 'Premium',
    price: '1.990K',
    unit: '/tháng',
    description: 'Dành cho thương hiệu tăng trưởng nhanh cần toàn bộ công cụ & tính năng mạnh nhất.',
    features: [
      'Không giới hạn người dùng & quản trị',
      'Không giới hạn số lượng website & kịch bản',
      '100MB Lưu trữ cloud cao cấp',
      'Full features cao cấp nhất & ưu tiên hỗ trợ',
      'Tự động báo cáo SEO & thu lead tự động',
      'Kết nối đa kênh thanh toán (VNPAY, MoMo)',
    ],
    highlight: true,
    badge: 'ĐỀ XUẤT',
    buttonText: 'Chọn Premium',
    buttonClass: 'bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white hover:from-[#4f46e5] hover:to-[#4338ca] shadow-lg shadow-[#6366f1]/25',
    cardBorder: 'border-2 border-[#6366f1] bg-white shadow-xl shadow-[#6366f1]/15',
  },
  {
    id: 'custom',
    category: 'GIẢI PHÁP RIÊNG',
    categoryColor: 'text-[#6b7280]',
    title: 'Custom',
    price: 'Liên hệ',
    unit: '',
    description: 'Thiết kế lộ trình riêng biệt phù hợp với nhu cầu đặc thù và vận hành quy mô lớn.',
    features: [
      'May đo thiết kế UI/UX độc quyền 100%',
      'Hạ tầng Server Cloud riêng biệt SLA 99.9%',
      'Tích hợp hệ thống ERP, CRM, Nhanh.vn, Haravan',
      'Đội ngũ Senior Dev & PM đồng hành 1:1',
    ],
    highlight: false,
    badge: null,
    buttonText: 'Liên hệ ngay',
    buttonClass: 'border-2 border-[#e5e7eb] text-[#374151] hover:border-[#6366f1] hover:text-[#6366f1] bg-white',
    cardBorder: 'border border-[#e5e7eb] bg-white hover:border-[#6366f1]/40 hover:shadow-xl',
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Chỉnh sửa website bằng AI',
    color: '#a855f7',
    bg: '#faf5ff',
    image: '/pricing-cover-ai.png',
    items: [
      'Chỉnh sửa website chỉ bằng cách chọn block, không cần biết code',
      'Chỉnh sửa nội dung, hình ảnh, layout bằng câu lệnh',
      'Tạo mới hoặc thay đổi section (banner, sản phẩm, form...) trong vài giây',
      'Viết lại nội dung theo nhiều tone (bán hàng, chuyên nghiệp, trẻ trung...)',
      'Tạo và thay thế hình ảnh trực tiếp bằng AI phù hợp với nội dung',
    ],
  },
  {
    icon: Layers,
    title: 'Không giới hạn số lượng',
    color: '#06b6d4',
    bg: '#ecfeff',
    image: '/pricing-cover-unlimited.png',
    items: [
      'Không giới hạn số lượng website / landing page',
      'Không giới hạn số lượng template trong kho',
      'Không hiển thị quảng cáo KABO trên trang xuất bản trong thời hạn gói',
      'Không giới hạn số lượng quản trị viên cùng quản lý và chỉnh sửa website',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Quản lý bán hàng',
    color: '#10b981',
    bg: '#ecfdf5',
    image: '/pricing-cover-ecommerce.png',
    items: [
      'Thêm giỏ hàng & nút mua hàng nhanh',
      'Quản lý sản phẩm, tồn kho và đơn hàng',
      'Đa dạng phương thức thanh toán: COD, chuyển khoản, VNPAY, MoMo',
      'Tùy chỉnh giao diện hiển thị danh sách sản phẩm trên website',
    ],
  },
  {
    icon: Zap,
    title: 'Thu lead, tối ưu chuyển đổi',
    color: '#f59e0b',
    bg: '#fffbeb',
    image: '/pricing-cover-lead.png',
    items: [
      'Tạo form thu lead, khảo sát khách hàng',
      'Lưu dữ liệu về Google Sheet, Gmail, Webhook API',
      'Tạo Gamification đa dạng: vòng quay may mắn, máy tìm kho báu, lật lì xì, đập niêu',
      'Tạo banner, popup quảng cáo, thông báo khuyến mãi',
    ],
  },
  {
    icon: BarChart2,
    title: 'Kết nối tên miền và xem báo cáo',
    color: '#3b82f6',
    bg: '#eff6ff',
    image: '/pricing-cover-domain.png',
    items: [
      'Kết nối tên miền riêng của bạn hoặc mua tên miền ngay trên KABO',
      'Báo cáo SEO tự động và gợi ý tối ưu',
      'Báo cáo truy cập theo trang, theo kênh, theo chiến dịch quảng cáo',
      'Miễn phí chứng chỉ bảo mật SSL',
    ],
  },
  {
    icon: FileText,
    title: 'Quản lý nội dung CMS',
    color: '#8b5cf6',
    bg: '#f5f3ff',
    image: '/pricing-cover-cms.png',
    items: [
      'Tạo bài viết và tin tức nhanh chóng',
      'Cấu hình bài viết chuẩn SEO (meta title, description, slug)',
      'Quản lý bài viết, danh mục bài viết',
      'Tùy chỉnh giao diện hiển thị danh sách bài viết đa dạng',
    ],
  },
];

const ADVANCED_ITEMS = [
  'Cấu hình đa ngôn ngữ cho website',
  'Kết nối quảng cáo đa nền tảng Facebook Ads, Tiktok Ads, Google Ads...',
  'Tùy chỉnh trang với HTML / JavaScript / CSS nâng cao',
  'Gắn mật khẩu bảo vệ trang',
  'Ưu tiên hỗ trợ và đặc quyền trải nghiệm sớm tính năng mới',
];

const FAQS = [
  {
    q: 'Điều gì xảy ra khi gói KABO của tôi hết hạn?',
    a: 'Khi hết hạn, trang web của bạn vẫn được duy trì lưu trữ an toàn trong 30 ngày. Bạn có thể gia hạn bất kỳ lúc nào để duy trì trang web tiếp tục hoạt động mà không bị gián đoạn.',
  },
  {
    q: 'Tôi có thể thanh toán gói KABO bằng những phương thức thanh toán nào?',
    a: 'KABO hỗ trợ thanh toán linh hoạt qua Chuyển khoản ngân hàng (QR Code tự động 24/7), Thẻ ATM nội địa, Thẻ quốc tế (Visa/Mastercard) và Ví điện tử.',
  },
  {
    q: 'Các gói dịch vụ Standard, Premium khác gì nhau?',
    a: 'Gói Standard phù hợp cho các doanh nghiệp vừa và nhỏ bắt đầu vận hành. Gói Premium được mở rộng hoàn toàn không giới hạn kênh, không giới hạn quản trị viên kèm hỗ trợ ưu tiên 1:1.',
  },
  {
    q: 'Tôi có được hỗ trợ trỏ tên miền và cài đặt ban đầu không?',
    a: 'Có! Đội ngũ kỹ thuật của KABO hỗ trợ trỏ tên miền, cấu hình SSL miễn phí và hướng dẫn sử dụng 1:1 qua Zalo/Hotline cho tất cả khách hàng.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] w-full flex flex-col items-center" style={{ paddingTop: '72px' }}>

      {/* ── HERO PRICING HEADER ── */}
      <section className="relative bg-gradient-to-b from-[#f0eeff] via-[#f8f7ff] to-[#fafafa] pt-16 sm:pt-24 pb-28 sm:pb-36 lg:pb-44 px-4 sm:px-6 lg:px-8 w-full flex justify-center mb-12 sm:mb-20">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-[#6366f1]/10 blur-3xl" />

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">

          {/* Title Header */}
          <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full mx-auto mb-14 sm:mb-20 space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#6366f1] bg-[#6366f1]/10 px-3.5 py-1.5 rounded-full">
                <Sparkles className="size-3.5" /> Bảng giá dịch vụ KABO
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] tracking-tight leading-tight">
              Lựa chọn gói phù hợp
            </h1>
            <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-xl">
              Nâng cấp ngay để sử dụng toàn bộ các tính năng cao cấp trên nền tảng KABO
            </p>
          </div>

          {/* 3 Pricing Cards Grid (Centered w-full max-w-5xl) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl w-full mx-auto items-stretch justify-center pt-4">
            {PLANS_V2.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 lg:p-7 flex flex-col justify-between h-full transition-all duration-300 ${plan.cardBorder}`}
              >
                {/* Top Badge sitting strictly over the card's top border */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6366f1] text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-lg z-20 whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category subhead */}
                    <span className={`text-[11px] font-extrabold tracking-wider uppercase block mb-1 ${plan.categoryColor}`}>
                      {plan.category}
                    </span>

                    {/* Plan title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-[#0f0f0f] tracking-tight mb-3">
                      {plan.title}
                    </h3>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-[#0f0f0f] tracking-tight">
                          {plan.price}
                        </span>
                        {plan.unit && (
                          <span className="text-sm font-medium text-[#6b7280]">{plan.unit}</span>
                        )}
                      </div>
                      <p className="text-xs text-[#6b7280] mt-2 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Feature checklist */}
                    <ul className="flex flex-col gap-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#374151] font-medium leading-relaxed">
                          <span className="size-4.5 rounded-full bg-[#6366f1]/10 text-[#6366f1] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom CTA Button */}
                  <Link
                    href="/quy-trinh#contact"
                    className={`w-full py-3.5 rounded-2xl text-xs font-extrabold text-center transition-all duration-200 flex items-center justify-center gap-2 mt-auto ${plan.buttonClass}`}
                  >
                    {plan.buttonText}
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FEATURES GRID WITH GENERATED COVER IMAGES ── */}
      <section className="pt-20 sm:pt-28 pb-24 sm:pb-32 bg-white w-full flex justify-center px-4 sm:px-6 lg:px-8 border-t border-[#e5e7eb]">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center">

          <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full mx-auto mb-16 sm:mb-20 space-y-3 pt-6 sm:pt-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f0f0f] tracking-tight leading-tight">
              Tất cả các gói đều không giới hạn tính năng
            </h2>
            <p className="text-sm sm:text-base text-[#6b7280] leading-relaxed max-w-xl">
              Trải nghiệm trọn bộ công cụ mạnh mẽ để sở hữu website đẳng cấp và bứt phá doanh số
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch w-full">
            {FEATURES.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-3xl border border-[#e5e7eb] overflow-hidden bg-white hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Generated Cover Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                  </div>

                  {/* Feature content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div
                          className="size-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                          style={{ background: feat.bg }}
                        >
                          <IconComp className="size-5" style={{ color: feat.color }} />
                        </div>
                        <h3 className="font-extrabold text-[#0f0f0f] text-base leading-snug">{feat.title}</h3>
                      </div>

                      <ul className="flex flex-col gap-2.5 mt-2">
                        {feat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-[#4b5563] leading-relaxed">
                            <span
                              className="size-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: `${feat.color}22` }}
                            >
                              <Check className="size-2.5" style={{ color: feat.color }} />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Advanced Extra Card */}
            <div className="rounded-3xl border border-dashed border-[#6366f1]/40 overflow-hidden bg-gradient-to-br from-[#f8f7ff] to-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full p-6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="size-9 rounded-xl bg-indigo-100 text-[#6366f1] flex items-center justify-center shrink-0">
                    <Zap className="size-5" />
                  </div>
                  <h3 className="font-extrabold text-[#0f0f0f] text-base">Tính năng nâng cao</h3>
                </div>

                <p className="text-xs text-[#6b7280] mb-4">
                  Dành cho các dự án thương mại &amp; doanh nghiệp cần giải pháp tùy biến chuyên sâu:
                </p>

                <ul className="flex flex-col gap-2.5">
                  {ADVANCED_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#4b5563] leading-relaxed">
                      <span className="size-4 rounded-full bg-[#6366f1]/15 text-[#6366f1] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-2.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-indigo-100">
                <Link
                  href="/quy-trinh#contact"
                  className="text-xs font-bold text-[#6366f1] hover:text-[#4f46e5] flex items-center gap-1"
                >
                  Yêu cầu tư vấn tính năng riêng →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#fafafa] border-t border-[#e5e7eb] w-full flex justify-center">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl w-full mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f0f0f] tracking-tight">
              Câu hỏi thường gặp
            </h2>
            <p className="text-sm text-[#6b7280]">
              Giải đáp thắc mắc của bạn về bảng giá và dịch vụ KABO
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#ffffff] border border-[#e5e7eb] overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0f0f0f] hover:text-[#6366f1] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 text-[#9ca3af] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#6366f1]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#6b7280] leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white w-full flex justify-center">
        <div className="max-w-3xl w-full mx-auto text-center flex flex-col items-center justify-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Sẵn sàng bứt phá cùng KABO AGENCY?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Bắt đầu tạo website ngay hôm nay. Hỗ trợ thiết kế, cấu hình tên miền và tối ưu SEO trọn gói.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/quy-trinh#contact"
              className="bg-white text-[#4f46e5] hover:bg-indigo-50 font-extrabold py-4 px-8 rounded-2xl text-sm transition-all duration-200 shadow-xl shadow-black/10 flex items-center justify-center gap-2"
            >
              Liên hệ tư vấn ngay
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/giao-dien-mau"
              className="border-2 border-white/40 hover:border-white text-white font-extrabold py-4 px-8 rounded-2xl text-sm transition-all duration-200"
            >
              Xem kho giao diện mẫu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
