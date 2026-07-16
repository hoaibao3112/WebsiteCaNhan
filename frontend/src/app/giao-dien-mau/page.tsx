import type { Metadata } from 'next';
import Link from 'next/link';
import { templates } from '@/data/templates';
import TemplateGrid from '@/components/sections/templates/TemplateGrid';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Thư viện Giao diện Premium',
  description:
    'Khám phá bộ sưu tập các giao diện website cao cấp được thiết kế tỉ mỉ, tối ưu chuyển đổi và sẵn sàng để tuỳ biến cho thương hiệu của bạn.',
  alternates: { canonical: '/giao-dien-mau' },
  openGraph: {
    title: 'Thư viện Giao diện Premium — LUMINA AGENCY',
    description: 'Bộ sưu tập giao diện website cao cấp, sẵn sàng tuỳ biến.',
    url: '/giao-dien-mau',
  },
};

export default function TemplateLibraryPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}
      >
        <div className="container-lumina">
          <div className="text-center max-w-3xl mx-auto mb-14 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight mb-4">
              Thư viện{' '}
              <span className="text-[#e11d48]">Premium</span>
            </h1>
            <p className="text-[#6b7280] text-base leading-relaxed">
              Khám phá bộ sưu tập các giao diện website cao cấp được thiết kế tỉ mỉ, tối ưu chuyển đổi và sẵn sàng để tuỳ biến cho thương hiệu của bạn. Sự kết hợp hoàn hảo giữa thẩm mỹ hiện đại và hiệu suất vượt trội.
            </p>
          </div>

          {/* Grid with filter */}
          <TemplateGrid templates={templates} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, white, #fdf5f5)' }}
      >
        <div className="container-lumina">
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, #fdf5f5 0%, #fff1f2 100%)',
              border: '1px solid #fda4af',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] mb-4">
              Bạn cần một thiết kế{' '}
              <span className="text-[#e11d48]">độc bản</span>?
            </h2>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-xl mx-auto mb-8">
              LUMINA Agency không chỉ cung cấp mẫu có sẵn. Chúng tôi kiến tạo những trải nghiệm bespoke, phù hợp tuyệt đối với định vị thương hiệu của bạn.
            </p>
            <Link href="/quy-trinh#contact" className="btn-primary text-base px-8 py-4">
              Bắt đầu dự án ngay →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
