import type { Metadata } from 'next';
import HeroSection from '@/components/sections/home/HeroSection';
import BentoFeaturesSection from '@/components/sections/home/BentoFeaturesSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import FeaturedProjectsSection from '@/components/sections/home/FeaturedProjectsSection';
import ProcessSection from '@/components/sections/home/ProcessSection';
import PricingSection from '@/components/sections/home/PricingSection';
import CtaSection from '@/components/sections/home/CtaSection';
import { customPagesService } from '@/services/custom-pages.service';
import BuilderCanvas from '@/components/sections/builder/BuilderCanvas';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'KABO AGENCY — Thiết kế Website May đo, Bứt phá Tăng trưởng',
  description:
    'Chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên. Từ website chuyển đổi cao đến các nền tảng thương mại điện tử phức tạp.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'KABO AGENCY — Thiết kế Website May đo, Bứt phá Tăng trưởng',
    description:
      'Thiết kế Website May đo, Bứt phá Tăng trưởng. Sáng tạo, Đột phá, Trải nghiệm Đỉnh Cao.',
    url: '/',
    images: [
      {
        url: '/logo-kabo.jpg',
        width: 1200,
        height: 630,
        alt: 'KABO AGENCY — Thiết kế Website Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KABO AGENCY — Thiết kế Website May đo, Bứt phá Tăng trưởng',
    description: 'Thiết kế Website May đo, Bứt phá Tăng trưởng. Sáng tạo, Đột phá.',
    images: ['/logo-kabo.jpg'],
  },
};

export default async function HomePage() {
  const pageData = await customPagesService.getPageBySlug('home');

  if (pageData && pageData.pbConfig) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSection />
        <BentoFeaturesSection />
        <BuilderCanvas
          pbConfig={pageData.pbConfig}
          selectedId={null}
          allowEdit={false}
        />
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <BentoFeaturesSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
