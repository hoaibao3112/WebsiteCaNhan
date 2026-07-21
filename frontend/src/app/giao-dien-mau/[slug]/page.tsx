import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ExternalLink, ArrowLeft, Layers, Smartphone, Sparkles, Check, Eye, Zap, ShieldCheck, Wand2 } from 'lucide-react';
import { backendTemplatesService } from '@/services/templates.service';

export const revalidate = 86400; // ISR 24 hours

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allTemplates = await backendTemplatesService.getAllTemplates();
  return allTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = await backendTemplatesService.getTemplateBySlug(slug);

  if (!template) {
    return { title: 'Không tìm thấy' };
  }

  return {
    title: `${template.title} — Giao diện Premium`,
    description: template.description,
    alternates: { canonical: `/giao-dien-mau/${slug}` },
    openGraph: {
      title: `${template.title} — KABO AGENCY`,
      description: template.description,
      url: `/giao-dien-mau/${slug}`,
      images: [{ url: template.image, width: 1200, height: 630 }],
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = await backendTemplatesService.getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const allTemplates = await backendTemplatesService.getAllTemplates();
  const related = allTemplates
    .filter((t) => t.slug !== slug)
    .slice(0, 3);

  const featureCards = [
    {
      number: '01',
      title: 'Hiển thị sản phẩm',
      desc: 'Bố cục trực quan giúp người dùng hiểu nhanh sản phẩm.',
    },
    {
      number: '02',
      title: 'Chuyển đổi tối ưu',
      desc: 'Các CTAs được sắp xếp khoa học, tăng tỉ lệ signup.',
    },
    {
      number: '03',
      title: 'Hỗ trợ đa nền tảng',
      desc: 'Tương thích 100% các thiết bị, mượt mà trên mobile.',
    },
  ];

  return (
    <div className="pt-16 bg-white">
      {/* Back link */}
      <div className="container-lumina pt-8">
        <Link
          href="/giao-dien-mau"
          className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#006672] transition-colors font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại thư viện
        </Link>
      </div>

      {/* Hero Section */}
      <section className="pb-16 pt-6" style={{ background: 'linear-gradient(to bottom, #f4f9f9, white)' }}>
        <div className="container-lumina">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column — Info */}
            <div className="animate-fade-in-up flex flex-col gap-6">
              <div className="section-label w-fit">
                <Sparkles className="h-3 w-3" />
                PREMIUM TEMPLATE
              </div>

              <h1 className="text-4xl lg:text-[48px] font-black text-[#0f0f0f] leading-tight">
                Chi tiết Mẫu:<br />
                <span className="text-[#006672]">{template.title}</span>
              </h1>

              <p className="text-[#6b7280] text-sm sm:text-base leading-relaxed max-w-xl">
                Một clean theme, layout hiện đại dành cho giới thiệu phần mềm SaaS, giúp tăng tỉ lệ chuyển đổi tối đa cho phần mềm của bạn. Thiết kế đầy đủ các trang cần thiết như Home, Feature, Pricing, Onboarding.
              </p>

               {/* CTAs */}
               <div className="flex flex-wrap gap-3 pt-2">
                 <Link
                   href={`/builder/${template.slug}`}
                   className="btn-primary text-sm animate-pulse-subtle"
                 >
                   Dùng mẫu này ngay
                 </Link>
                  <Link
                    href={`/giao-dien-mau/${template.slug}/demo`}
                    className="btn-secondary text-sm flex items-center gap-2 px-6 py-3 cursor-pointer"
                  >
                    <Eye className="h-4.5 w-4.5" />
                    Xem demo ảnh ({template.demoImages.length})
                  </Link>
                  {template.liveUrl && (
                    <a
                      href={template.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm flex items-center gap-2 px-6 py-3 cursor-pointer"
                    >
                      <ExternalLink className="h-4.5 w-4.5" />
                      Xem bản thử thực tế
                    </a>
                  )}
               </div>
             </div>
 
             {/* Right Column — Large Mockup */}
             <div className="animate-fade-in-up-delay-2">
               <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#f0e8e8]">
                 {/* Browser bar */}
                 <div className="bg-[#f8f8f8] px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                   </div>
                   <div className="flex-1 mx-3 bg-white rounded px-3 py-1 text-xs text-gray-400 font-mono truncate">
                     kabo.agency/demo/${template.slug}
                  </div>
                </div>
                <div className="aspect-[4/3] bg-surface overflow-hidden">
                  <img
                    src={template.image}
                    alt={`Preview của ${template.title}`}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards section */}
      <section className="py-20 sm:py-28 bg-[#fafbfc] border-y border-[#e2ecec]">
        <div className="container-lumina max-w-[1340px] mx-auto px-4 sm:px-8 flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006672]/10 text-[#006672] font-black text-xs uppercase tracking-wider mb-3">
              <Sparkles className="size-3.5" />
              Đặc Quyền Giao Diện Premium
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] leading-tight text-center">
              Tính Năng Nổi Bật & Tối Ưu Tối Đa
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#6b7280] leading-relaxed text-center max-w-2xl">
              Mọi mẫu website tại KABO Agency đều được thiết kế tỉ mỉ, tích hợp chuẩn hóa công nghệ mới nhất để mang lại hiệu suất kinh doanh vượt trội.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-14">
            {[
              {
                icon: Sparkles,
                color: 'text-[#006672]',
                bgColor: 'bg-[#006672]/10 border-[#006672]/20',
                title: 'Giao Diện Chuẩn UI/UX Quốc Tế',
                desc: 'Thiết kế tinh tế, màu sắc hài hòa và bố cục chuẩn mực mang lại trải nghiệm thị giác ấn tượng, thu hút khách hàng ngay từ ánh nhìn đầu tiên.',
                badge: 'Thiết kế độc quyền',
              },
              {
                icon: Zap,
                color: 'text-amber-600',
                bgColor: 'bg-amber-500/10 border-amber-500/20',
                title: 'Tối Ưu Tốc Độ Load Dưới 1s',
                desc: 'Mã nguồn sạch, nén hình ảnh chuẩn WebP/AVIF giúp website tải tức thì, đạt điểm tối đa Google PageSpeed Insights.',
                badge: 'PageSpeed 99/100',
              },
              {
                icon: Smartphone,
                color: 'text-indigo-600',
                bgColor: 'bg-indigo-500/10 border-indigo-500/20',
                title: 'Tương Thích Mobile 100%',
                desc: 'Hiển thị hoàn hảo và mượt mà trên mọi thiết bị: iPhone, Android, Tablet, Macbook cho đến màn hình PC 4K.',
                badge: 'Fully Responsive',
              },
              {
                icon: ShieldCheck,
                color: 'text-emerald-600',
                bgColor: 'bg-emerald-500/10 border-emerald-500/20',
                title: 'Chuẩn SEO Google & Tăng CTR',
                desc: 'Tích hợp sẵn cấu trúc thẻ Heading, Meta Tags, OpenGraph, Schema Markup giúp từ khóa của bạn nhanh chóng thăng hạng Top Google.',
                badge: 'Google SEO Ready',
              },
              {
                icon: Layers,
                color: 'text-blue-600',
                bgColor: 'bg-blue-500/10 border-blue-500/20',
                title: 'Đầy Đủ Các Trang & Form Đăng Ký',
                desc: 'Trang chủ, Giới thiệu, Sản phẩm/Dịch vụ, Bài viết tin tức và Form nhận tư vấn kết nối trực tiếp với Zalo / Hotline.',
                badge: 'Trọn gói tính năng',
              },
              {
                icon: Wand2,
                color: 'text-purple-600',
                bgColor: 'bg-purple-500/10 border-purple-500/20',
                title: 'Dễ Dàng Tùy Biến Theo Yêu Cầu',
                desc: 'Đội ngũ KABO Agency hỗ trợ tùy chỉnh màu sắc, logo, hình ảnh, văn bản và bố cục theo chính xác nhận diện thương hiệu của bạn.',
                badge: 'Hỗ trợ 24/7',
              },
            ].map((feat, i) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={i}
                  className="group relative p-8 sm:p-10 rounded-3xl bg-white border border-[#e5e7eb] hover:border-[#006672]/30 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center justify-between"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* Top Icon & Badge */}
                    <div className="flex flex-col items-center gap-3 mb-6">
                      <div className={`p-4.5 rounded-2xl border ${feat.bgColor} transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                        <IconComp className={`size-7 ${feat.color}`} />
                      </div>
                      <span className="text-[11px] font-extrabold px-3.5 py-1 rounded-full bg-[#f3f4f6] text-[#4b5563] group-hover:bg-[#006672] group-hover:text-white transition-colors">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#0f0f0f] group-hover:text-[#006672] transition-colors mb-3 leading-snug text-center">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed text-center">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#f3f4f6] w-full flex items-center justify-center gap-2 text-xs font-extrabold text-[#006672]">
                    <CheckCircle2 className="size-4 text-emerald-500" />
                    <span>Đã được kiểm định chất lượng</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Commitment Banner */}
          <div className="mt-16 w-full p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#006672] to-[#004d56] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-5 text-center sm:text-left">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shrink-0">
                <Sparkles className="size-8 text-amber-300" />
              </div>
              <div>
                <h4 className="text-xl font-black">Bàn giao Full Nguồn Code & Tên Miền</h4>
                <p className="text-xs sm:text-sm text-white/80 mt-1">Đã bao gồm cấu hình hosting, bảo mật SSL và hướng dẫn quản trị chi tiết.</p>
              </div>
            </div>
            <a
              href="https://zalo.me/0374170367"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#006672] hover:bg-amber-300 hover:text-[#0f0f0f] rounded-2xl font-black text-sm whitespace-nowrap shadow-xl transition-all"
            >
              Tư Vấn & Báo Giá Ngay →
            </a>
          </div>
        </div>
      </section>

      {/* Thu vien Giao dien */}
      <section className="section-padding bg-white">
        <div className="container-lumina">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#0f0f0f]">Thu viện Giao diện</h2>
              <p className="text-xs text-[#6b7280] mt-1">Khám phá các mẫu giao diện website khác.</p>
            </div>
            <Link
              href="/giao-dien-mau"
              className="text-sm font-semibold text-[#006672] hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((t) => (
              <Link
                key={t.id}
                href={`/giao-dien-mau/${t.slug}`}
                className="group block rounded-xl overflow-hidden border border-border bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-surface">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 border-t border-border">
                  <p className="text-[10px] font-bold text-[#006672] uppercase tracking-wider mb-1">{t.categoryLabel}</p>
                  <p className="font-bold text-[#0f0f0f] text-sm group-hover:text-[#006672] transition-colors">{t.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-zinc-50 border-t border-[#f0e8e8]">
        <div className="container-lumina text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-[#0f0f0f] mb-4">
            Sẵn sàng nâng cấp sản phẩm của bạn?
          </h2>
          <p className="text-[#6b7280] text-sm mb-8 max-w-md mx-auto">
            Hãy liên hệ ngay để nhận tư vấn miễn phí từ đội ngũ thiết kế của chúng tôi.
          </p>
          <a
            href="https://zalo.me/0374170367"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Nhận tư vấn ngay →
          </a>
        </div>
      </section>
    </div>
  );
}
