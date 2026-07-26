import type { Metadata } from 'next';
import HeroSection from '@/components/sections/home/HeroSection';
import BentoFeaturesSection from '@/components/sections/home/BentoFeaturesSection';
import InteractiveMinigamesSection from '@/components/sections/home/InteractiveMinigamesSection';
import TechStackSection from '@/components/sections/home/TechStackSection';
import CostCalculatorSection from '@/components/sections/home/CostCalculatorSection';
import ServicesSection from '@/components/sections/home/ServicesSection';
import FeaturedProjectsSection from '@/components/sections/home/FeaturedProjectsSection';
import ProcessSection from '@/components/sections/home/ProcessSection';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import FaqSection from '@/components/sections/home/FaqSection';
import PricingSection from '@/components/sections/home/PricingSection';
import CtaSection from '@/components/sections/home/CtaSection';

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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BentoFeaturesSection />
      <InteractiveMinigamesSection />
      <TechStackSection />
      <CostCalculatorSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
