import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, ExternalLink, ArrowLeft } from 'lucide-react';
import { templates } from '@/data/templates';

export const revalidate = false; // Fully static

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    return { title: 'Không tìm thấy' };
  }

  return {
    title: `${template.title} — Giao diện Premium`,
    description: template.description,
    alternates: { canonical: `/giao-dien-mau/${slug}` },
    openGraph: {
      title: `${template.title} — LUMINA AGENCY`,
      description: template.description,
      url: `/giao-dien-mau/${slug}`,
      images: [{ url: template.image, width: 1200, height: 630 }],
    },
  };
}

export default async function TemplateDetailPage({ params }: Props) {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = templates
    .filter((t) => t.slug !== slug && t.category === template.category)
    .slice(0, 3);

  const fallbackRelated = templates
    .filter((t) => t.slug !== slug)
    .slice(0, 3);

  const related = relatedTemplates.length > 0 ? relatedTemplates : fallbackRelated;

  return (
    <div className="pt-16">
      {/* Back */}
      <div className="container-lumina pt-8">
        <Link
          href="/giao-dien-mau"
          className="inline-flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#e11d48] transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Thư viện Giao diện
        </Link>
      </div>

      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}
      >
        <div className="container-lumina">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left — Info */}
            <div className="animate-fade-in-up">
              {/* Category */}
              <div className="section-label mb-4 w-fit">{template.categoryLabel}</div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] leading-tight mb-4">
                Chi tiết Mẫu:{' '}
                <span className="text-[#e11d48]">{template.title}</span>
              </h1>

              <p className="text-[#6b7280] text-base leading-relaxed mb-8">
                {template.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#fff1f2] text-[#e11d48] text-xs font-semibold rounded-full border border-[#fda4af]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-lg font-black text-[#0f0f0f] mb-4">
                  Tính năng nổi bật
                </h2>
                <ul className="flex flex-col gap-3">
                  {template.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#e11d48] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#374151] font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quy-trinh#contact"
                  className="btn-primary"
                >
                  Dùng mẫu này →
                </Link>
                {template.demoUrl && (
                  <a
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Xem demo live
                  </a>
                )}
              </div>
            </div>

            {/* Right — Preview */}
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
                    {template.demoUrl || `lumina.agency/demo/${template.slug}`}
                  </div>
                </div>
                <div className="aspect-[4/3] bg-[#fdf5f5] overflow-hidden">
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

      {/* Thu vien Giao dien */}
      <section
        className="section-padding bg-white"
      >
        <div className="container-lumina">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[#0f0f0f]">Thư viện Giao diện</h2>
            <Link
              href="/giao-dien-mau"
              className="text-sm font-semibold text-[#e11d48] hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((t) => (
              <Link
                key={t.id}
                href={`/giao-dien-mau/${t.slug}`}
                className="group block rounded-xl overflow-hidden border border-[#f0e8e8] bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#e11d48] mb-1">{t.categoryLabel}</p>
                  <p className="font-black text-[#0f0f0f] text-sm">{t.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}
      >
        <div className="container-lumina text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-[#0f0f0f] mb-4">
            Sẵn sàng nâng cấp sản phẩm của bạn?
          </h2>
          <p className="text-[#6b7280] text-sm mb-8">
            Liên hệ ngay để nhận tư vấn miễn phí và bắt đầu xây dựng website đẳng cấp.
          </p>
          <Link href="/quy-trinh#contact" className="btn-primary text-base px-8 py-4">
            Bắt đầu ngay →
          </Link>
        </div>
      </section>
    </div>
  );
}
