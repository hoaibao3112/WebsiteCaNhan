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
  MessageCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

const PLANS_V2 = [
  {
    id: 'landing',
    category: 'TIẾT KIỆM & NHANH CHÓNG',
    categoryColor: 'text-[#6b7280]',
    title: 'Landing Page',
    price: '2.990.000₫',
    unit: 'trọn gói',
    time: '2 ngày',
    description: 'Phù hợp chạy quảng cáo, giới thiệu sản phẩm/dịch vụ đơn lẻ và tối ưu thu thập khách hàng tiềm năng.',
    features: [
      'Giao diện 1 trang chuẩn UI/UX chuyển đổi cao',
      'Tối ưu hiển thị hoàn hảo trên Mobile & PC',
      'Form liên hệ gửi về Email / Google Sheets',
      'Tích hợp nút gọi nhanh, Zalo, Messenger',
      'Tặng Tên miền quốc tế & SSL 1 năm',
      'Bảo hành kỹ thuật 12 tháng miễn phí',
    ],
    highlight: false,
    badge: null,
    buttonText: 'Nhận tư vấn gói này',
    href: 'https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20Landing%20Page%20(2.990.000đ)',
    buttonClass: 'bg-[#f0f7f8] text-[#006672] hover:bg-[#e0f2f4] hover:text-[#004d56]',
    cardBorder: 'border border-[#e5e7eb] bg-white hover:border-[#80c2cb] hover:shadow-xl',
  },
  {
    id: 'company',
    category: 'DOANH NGHIỆP UY TÍN',
    categoryColor: 'text-[#006672]',
    title: 'Doanh Nghiệp Chuẩn SEO',
    price: '5.990.000₫',
    unit: 'trọn gói',
    time: '3 - 5 ngày',
    description: 'Dành cho công ty, doanh nghiệp cần website chuẩn SEO, nhận diện thương hiệu chuyên nghiệp và tự chủ nội dung.',
    features: [
      'Thiết kế giao diện nhận diện thương hiệu độc quyền',
      'Cấu trúc đa trang: Giới thiệu, Dịch vụ, Dự án, Tin tức',
      'Trang quản trị CMS Tiếng Việt tự chủ 100%',
      'Tối ưu Google PageSpeed 95+ & SEO On-page',
      'Tích hợp Form, Google Maps, Chat Zalo',
      'Tặng Tên miền quốc tế & SSL 1 năm',
      'Bảo hành & hỗ trợ kỹ thuật 12 tháng',
      'Bàn giao 100% mã nguồn không phụ thuộc',
    ],
    highlight: true,
    badge: 'PHỔ BIẾN NHẤT',
    buttonText: 'Nhận tư vấn gói Doanh Nghiệp',
    href: 'https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20Doanh%20Nghiệp%20(5.990.000đ)',
    buttonClass: 'bg-[#006672] text-white hover:bg-[#004d56] shadow-lg shadow-[#006672]/25',
    cardBorder: 'border-2 border-[#006672] bg-white shadow-xl shadow-[#006672]/15',
  },
  {
    id: 'ecommerce',
    category: 'BÁN HÀNG CHUYÊN NGHIỆP',
    categoryColor: 'text-[#ca8a04]',
    title: 'Shop Bán Hàng E-Commerce',
    price: '9.990.000₫',
    unit: 'trọn gói',
    time: '5 - 7 ngày',
    description: 'Shop bán hàng trực tuyến, catalogue sản phẩm và thanh toán tự động tiện lợi.',
    features: [
      'Catalogue sản phẩm, giỏ hàng & đặt hàng',
      'Tích hợp VietQR quét mã, MoMo, VNPAY tự động',
      'Quản lý kho hàng, đơn hàng & thông báo realtime',
      'Thiết kế Figma độc quyền theo yêu cầu',
      'Tích hợp đồng bộ CRM / Google Sheets',
      'Bảo mật nâng cao & sao lưu tự động định kỳ',
      'Hỗ trợ ưu tiên 24/7 & bảo hành 12 tháng',
    ],
    highlight: false,
    badge: 'KINH DOANH',
    buttonText: 'Nhận tư vấn gói E-Commerce',
    href: 'https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20E-Commerce%20(9.990.000đ)',
    buttonClass: 'border-2 border-[#e5e7eb] text-[#374151] hover:border-[#006672] hover:text-[#006672] bg-white',
    cardBorder: 'border border-[#e5e7eb] bg-white hover:border-[#80c2cb] hover:shadow-xl',
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Thiết kế độc bản Figma',
    color: '#006672',
    bg: '#f0f7f8',
    image: '/pricing-cover-ai.png',
    items: [
      'Thiết kế giao diện độc quyền theo nhận diện thương hiệu',
      'Bản vẽ Figma hoàn chỉnh được khách hàng duyệt trước khi lập trình',
      'Tối ưu từng điểm chạm và hành trình trải nghiệm người dùng (UX)',
      'Tương thích hoàn hảo trên Mobile, Tablet và Desktop',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Bán hàng & Thanh toán online',
    color: '#0d9488',
    bg: '#f0fdfa',
    image: '/pricing-cover-ecommerce.png',
    items: [
      'Catalogue sản phẩm, phân loại danh mục thông minh',
      'Giỏ hàng & quy trình thanh toán tinh gọn 1 trang',
      'Tích hợp VietQR quét mã tự động, MoMo, VNPAY',
      'Quản trị đơn hàng và thông báo về Email/Zalo ngay lập tức',
    ],
  },
  {
    icon: Zap,
    title: 'Tối ưu tốc độ & chuẩn SEO',
    color: '#ca8a04',
    bg: '#fefce8',
    image: '/pricing-cover-lead.png',
    items: [
      'Nền tảng Next.js tối ưu Google PageSpeed 95+',
      'Cấu trúc dữ liệu Schema JSON-LD & Sitemap XML chuẩn Google',
      'Thời gian tải trang dưới 1.5 giây giúp tăng chuyển đổi đơn hàng',
      'Tối ưu toàn bộ thẻ Meta, OpenGraph và chuẩn Semantic HTML',
    ],
  },
  {
    icon: BarChart2,
    title: 'Tên miền, SSL & Báo cáo',
    color: '#2563eb',
    bg: '#eff6ff',
    image: '/pricing-cover-domain.png',
    items: [
      'Tặng Tên miền quốc tế (.com/.net) & chứng chỉ SSL 1 năm',
      'Cài đặt Google Analytics & Google Search Console',
      'Theo dõi lượng truy cập và hành vi khách hàng chi tiết',
      'Hỗ trợ cấu hình DNS và email doanh nghiệp theo tên miền',
    ],
  },
  {
    icon: FileText,
    title: 'Quản lý nội dung CMS Tiếng Việt',
    color: '#7c3aed',
    bg: '#f5f3ff',
    image: '/pricing-cover-cms.png',
    items: [
      'Giao diện quản trị Tiếng Việt dễ sử dụng cho mọi người',
      'Tự do chỉnh sửa bài viết, hình ảnh, banner không cần biết code',
      'Video hướng dẫn sử dụng 1-1 chi tiết',
      'Bàn giao 100% tài khoản và cơ sở dữ liệu',
    ],
  },
  {
    icon: Layers,
    title: 'Bảo hành & Đồng hành kỹ thuật',
    color: '#059669',
    bg: '#ecfdf5',
    image: '/pricing-cover-unlimited.png',
    items: [
      'Bảo hành kỹ thuật miễn phí 12 tháng cho toàn bộ dự án',
      'Hỗ trợ kỹ thuật 24/7 trực tiếp qua Zalo / Hotline',
      'Sao lưu dữ liệu định kỳ chống mất mát',
      'Tư vấn nâng cấp và mở rộng tính năng linh hoạt',
    ],
  },
];

const FAQS = [
  {
    q: 'Chi phí trên có phát sinh thêm khoản nào không?',
    a: 'Báo giá của KABO là trọn gói và minh bạch. Mọi gói đều đã bao gồm thiết kế, lập trình, tặng tên miền & SSL năm đầu và bảo hành 12 tháng, không phát sinh chi phí ẩn.',
  },
  {
    q: 'Thời gian bàn giao website là bao lâu?',
    a: 'Landing Page bàn giao trong 2 ngày. Website Doanh nghiệp chuẩn SEO bàn giao từ 3 - 5 ngày. Gói Shop Bán Hàng bàn giao từ 5 - 7 ngày làm việc.',
  },
  {
    q: 'Sau khi bàn giao, tôi có toàn quyền sở hữu website không?',
    a: 'Có, 100%. Bạn sở hữu hoàn toàn mã nguồn (Source Code), cơ sở dữ liệu và toàn quyền quản trị mà không bị ràng buộc bởi bất kỳ bên thứ ba nào.',
  },
  {
    q: 'KABO hỗ trợ phương thức thanh toán nào?',
    a: 'Chúng tôi hỗ trợ chuyển khoản ngân hàng (chia làm các đợt theo hợp đồng: Đặt cọc triển khai -> Bàn giao nghiệm thu) và xuất hóa đơn VAT đầy đủ cho doanh nghiệp.',
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
      <section className="relative bg-gradient-to-b from-[#f0f7f8] via-[#f8fafc] to-[#fafafa] pt-16 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 w-full flex justify-center border-b border-[#e2ecec]">
        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">

          {/* Title Header */}
          <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full mx-auto mb-14 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#006672] bg-[#006672]/10 px-4 py-1.5 rounded-full">
              <Sparkles className="size-3.5" /> Bảng giá dịch vụ KABO
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
              Bảng Giá Thiết Kế Website Trọn Gói
            </h1>
            <p className="text-[#64748b] text-sm sm:text-base leading-relaxed max-w-xl">
              Chi phí minh bạch, chuẩn SEO Google, tối ưu tốc độ và đồng hành bảo hành 12 tháng.
            </p>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl w-full mx-auto items-stretch justify-center pt-2">
            {PLANS_V2.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 lg:p-7 flex flex-col justify-between h-full transition-all duration-300 ${plan.cardBorder}`}
              >
                {/* Top Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#006672] text-white font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-lg z-20 whitespace-nowrap">
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
                    <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mb-3">
                      {plan.title}
                    </h2>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-slate-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-[#006672] tracking-tight">
                          {plan.price}
                        </span>
                        {plan.unit && (
                          <span className="text-xs font-semibold text-[#64748b]">/{plan.unit}</span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-[#ca8a04] mt-1.5 flex items-center gap-1.5">
                        <Clock className="size-3.5" /> Bàn giao: {plan.time}
                      </div>
                      <p className="text-xs text-[#64748b] mt-2 leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Feature checklist */}
                    <ul className="flex flex-col gap-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-[#334155] font-medium leading-relaxed">
                          <span className="size-4.5 rounded-full bg-[#006672]/10 text-[#006672] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="size-3" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom CTA Button */}
                  <a
                    href={plan.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 rounded-2xl text-xs font-extrabold text-center transition-all duration-200 flex items-center justify-center gap-2 mt-auto ${plan.buttonClass}`}
                  >
                    <MessageCircle className="size-4" />
                    {plan.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-20 sm:py-28 bg-white w-full flex justify-center px-4 sm:px-6 lg:px-8 border-b border-[#e2ecec]">
        <div className="max-w-6xl w-full mx-auto flex flex-col items-center">

          <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f172a] tracking-tight leading-tight">
              Cam kết tiêu chuẩn chất lượng tại KABO
            </h2>
            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed max-w-xl">
              Mọi sản phẩm bàn giao đều đạt tiêu chuẩn kỹ thuật hiện đại, thẩm mỹ cao và tối ưu kinh doanh.
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
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <div
                          className="size-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                          style={{ background: feat.bg }}
                        >
                          <IconComp className="size-5" style={{ color: feat.color }} />
                        </div>
                        <h3 className="font-extrabold text-[#0f172a] text-base leading-snug">{feat.title}</h3>
                      </div>

                      <ul className="flex flex-col gap-2.5 mt-2">
                        {feat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-[#475569] leading-relaxed">
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
          </div>

        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] border-b border-[#e2ecec] w-full flex justify-center">
        <div className="max-w-4xl w-full mx-auto">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl w-full mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
              Câu hỏi thường gặp về báo giá
            </h2>
            <p className="text-sm text-[#64748b]">
              Giải đáp thắc mắc về chi phí, quy trình thanh toán và cam kết dịch vụ
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#e5e7eb] overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0f172a] hover:text-[#006672] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`size-4 text-[#64748b] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#006672]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#64748b] leading-relaxed border-t border-slate-100 pt-3">
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
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#004d56] text-white w-full flex justify-center">
        <div className="max-w-3xl w-full mx-auto text-center flex flex-col items-center justify-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Sẵn sàng bắt đầu cùng KABO?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Liên hệ ngay để nhận tư vấn giải pháp và báo giá chi tiết trong vòng 24 giờ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://zalo.me/0374170367"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#006672] hover:bg-[#f0f7f8] font-extrabold py-4 px-8 rounded-2xl text-sm transition-all duration-200 shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="size-4" />
              Nhận tư vấn qua Zalo
            </a>
            <Link
              href="/du-an"
              className="border-2 border-white/40 hover:border-white text-white font-extrabold py-4 px-8 rounded-2xl text-sm transition-all duration-200"
            >
              Xem dự án tiêu biểu
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
