import type { Metadata } from 'next';
import HeroSection from '@/components/sections/home/HeroSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import FeaturedProjectsSection from '@/components/sections/home/FeaturedProjectsSection';
import ProcessSection from '@/components/sections/home/ProcessSection';
import PricingSection from '@/components/sections/home/PricingSection';
import CtaSection from '@/components/sections/home/CtaSection';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'LUMINA AGENCY — Thiết kế Website May do, Bứt phá Tăng trưởng',
  description:
    'Chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên. Từ website chuyên đổi cao đến các nền tảng thương mại điện tử phức tạp.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LUMINA AGENCY — Thiết kế Website May do, Bứt phá Tăng trưởng',
    description:
      'Thiết kế Website May do, Bứt phá Tăng trưởng. Sáng tạo, Đột phá, Trải nghiệm Đỉnh Cao.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
