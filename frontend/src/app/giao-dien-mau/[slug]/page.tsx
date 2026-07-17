import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, ExternalLink, ArrowLeft, Layers, Smartphone, Sparkles, Check } from 'lucide-react';
import { backendTemplatesService } from '@/services/templates.service';
import TemplateDemoLightbox from '@/components/sections/templates/TemplateDemoLightbox';

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
                   href="/quy-trinh#contact"
                   className="btn-primary text-sm"
                 >
                   Dùng mẫu này ngay
                 </Link>
                 <TemplateDemoLightbox
                   demoImages={template.demoImages}
                   title={template.title}
                 />
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
      <section className="section-padding bg-zinc-50 border-y border-[#f0e8e8]">
        <div className="container-lumina">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0f0f0f]">
              Tính năng nổi bật
            </h2>
            <p className="mt-2 text-sm text-[#6b7280]">
              Mọi tính năng được chăm chút để đem lại hiệu suất tốt nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureCards.map((feat) => (
              <div key={feat.number} className="card-lumina p-8 bg-white flex flex-col gap-4">
                <span className="text-3xl font-black text-[#006672]/20">{feat.number}</span>
                <h3 className="text-lg font-bold text-[#0f0f0f]">{feat.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Core Checklists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-12 pt-8 border-t border-zinc-200">
            {[
              { text: 'Thiết kế chuẩn UI/UX' },
              { text: 'Hiệu năng và tốc độ tối ưu' },
              { text: 'Responsive 100% các thiết bị' },
              { text: 'Tích hợp đầy đủ các trang' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-[#006672] shrink-0" />
                <span className="text-sm font-semibold text-[#374151]">{item.text}</span>
              </div>
            ))}
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
          <Link href="/quy-trinh#contact" className="btn-primary text-base px-8 py-4">
            Nhận tư vấn ngay →
          </Link>
        </div>
      </section>
    </div>
  );
}
