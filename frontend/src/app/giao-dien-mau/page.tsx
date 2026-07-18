import type { Metadata } from 'next';
import Link from 'next/link';
import { backendTemplatesService } from '@/services/templates.service';
import TemplateGrid from '@/components/sections/templates/TemplateGrid';

export const revalidate = 86400; // 24 hours ISR

export const metadata: Metadata = {
  title: 'Thư viện Giao diện Premium',
  description:
    'Khám phá bộ sưu tập các giao diện website cao cấp được thiết kế tỉ mỉ, tối ưu chuyển đổi và sẵn sàng để tuỳ biến cho thương hiệu của bạn.',
  alternates: { canonical: '/giao-dien-mau' },
  openGraph: {
    title: 'Thư viện Giao diện Premium — KABO AGENCY',
    description: 'Bộ sưu tập giao diện website cao cấp, sẵn sàng tuỳ biến.',
    url: '/giao-dien-mau',
  },
};

export default async function TemplateLibraryPage() {
  const templates = await backendTemplatesService.getAllTemplates();

  return (
    <div style={{ paddingTop: '68px' }} className="relative overflow-hidden bg-white">
      {/* Ambient Background Blobs */}
      <div className="bg-blob bg-[#80c2cb]/20 w-[500px] h-[500px] -top-32 -left-32 pointer-events-none" />
      <div className="bg-blob bg-[#fefce8]/40 w-[400px] h-[400px] top-[20%] -right-32 pointer-events-none" style={{ animationDelay: '-5s' }} />
      <div className="bg-blob bg-[#80c2cb]/15 w-[600px] h-[600px] bottom-[10%] left-[10%] pointer-events-none" style={{ animationDelay: '-10s' }} />

      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, #f4f9f9, white)' }}
      >
        <div className="container-lumina">
          <div className="text-center max-w-3xl mx-auto mb-14 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight mb-4">
              Thư viện{' '}
              <span className="text-[#006672]">Premium</span>
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
        style={{ background: 'linear-gradient(to bottom, white, #f4f9f9)' }}
      >
        <div className="container-lumina">
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: 'linear-gradient(135deg, #f4f9f9 0%, #f0f7f8 100%)',
              border: '1px solid #e2ecec',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] mb-4">
              Bạn cần một thiết kế{' '}
              <span className="text-[#006672]">độc bản</span>?
            </h2>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-xl mx-auto mb-8">
              KABO Agency không chỉ cung cấp mẫu có sẵn. Chúng tôi kiến tạo những trải nghiệm bespoke, phù hợp tuyệt đối với định vị thương hiệu của bạn.
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
