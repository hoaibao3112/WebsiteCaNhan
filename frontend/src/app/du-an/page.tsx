import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import PortfolioGrid from '@/components/sections/portfolio/PortfolioGrid';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Kho lưu trữ Dự án',
  description:
    'Trưng bày những trải nghiệm kỹ thuật số gần đây và ấn tượng nhất của chúng tôi. Từ các trang dịch chuyên đổi cao đến các nền tảng thương mại điện tử phức tạp.',
  alternates: { canonical: '/du-an' },
  openGraph: {
    title: 'Kho lưu trữ Dự án — LUMINA AGENCY',
    description: 'Portfolio của LUMINA AGENCY — những dự án website ấn tượng nhất.',
    url: '/du-an',
  },
};

export default function PortfolioPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #fdf5f5, white)' }}>
        <div className="container-lumina">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-black text-[#0f0f0f] leading-tight mb-4">
              Kho lưu trữ <span className="text-[#e11d48]">Dự án</span>
            </h1>
            <p className="text-[#6b7280] text-base leading-relaxed">
              Trưng bày những trải nghiệm kỹ thuật số gần đây và ấn tượng nhất của chúng tôi. Từ các trang dịch chuyên đổi cao đến các nền tảng thương mại điện tử phức tạp.
            </p>
          </div>

          <div className="mt-12">
            <PortfolioGrid projects={projects} />
          </div>
        </div>
      </section>
    </div>
  );
}
