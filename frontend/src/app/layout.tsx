import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'KABO AGENCY — Thiết kế Website May đo, Bứt phá Tăng trưởng',
    template: '%s — KABO AGENCY',
  },
  description:
    'Chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên. Thiết kế web may đo, SEO, Digital Marketing.',
  keywords: 'thiết kế website, agency thiết kế web, SEO, digital marketing, kabo agency, website cao cấp, thiết kế web hcm',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kabo.agency'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'KABO AGENCY',
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
    site: '@kaboagency',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'KABO AGENCY',
  description: 'Agency thiết kế website cao cấp, tối ưu SEO và Digital Marketing tại TP. HCM',
  url: 'https://kabo.agency',
  logo: 'https://kabo.agency/logo-kabo.jpg',
  image: 'https://kabo.agency/logo-kabo.jpg',
  telephone: '+84374170367',
  email: 'baohoaitran3112@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'TP. Hồ Chí Minh',
    addressRegion: 'Hồ Chí Minh',
    addressCountry: 'VN',
  },
  areaServed: 'VN',
  priceRange: '$$$',
  sameAs: [
    'https://www.facebook.com/tran.bao.28897',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={jakarta.variable}>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-white text-[#0f0f0f] antialiased">
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
