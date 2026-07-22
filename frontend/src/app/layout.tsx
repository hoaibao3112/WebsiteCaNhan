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
    default: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp — May Đo Giao Diện Chuẩn SEO',
    template: '%s — Dịch Vụ Thiết Kế Website Chuyên Nghiệp',
  },
  description:
    'Dịch vụ thiết kế website trọn gói theo yêu cầu cho mọi ngành nghề: Shop bán hàng, Spa, Cà phê, Doanh nghiệp, Bất động sản. Kho +100 mẫu giao diện cao cấp, chuẩn SEO Google, tối ưu Mobile, tặng Tên miền & SSL.',
  keywords:
    'thiết kế website, dịch vụ làm website, thiết kế web trọn gói, làm web chuẩn seo, mẫu website đẹp, thiết kế website đồng tháp, dịch vụ làm web bán hàng, thiết kế web doanh nghiệp, webmaydo',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixechienthangdongthap.com'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp',
    title: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp — May Đo Giao Diện Chuẩn SEO',
    description:
      'Tạo website sang trọng, chuẩn SEO Google cho mọi ngành nghề. Tăng tốc độ bán hàng, tối ưu hiển thị Mobile.',
    images: [
      {
        url: '/logo-kabo.jpg',
        width: 1200,
        height: 630,
        alt: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp — May Đo Giao Diện Chuẩn SEO',
    description: 'Kho +100 giao diện website cao cấp, thiết kế trọn gói chuẩn SEO Google.',
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
  '@type': 'ProfessionalService',
  name: 'Dịch Vụ Thiết Kế Website Chuyên Nghiệp',
  description: 'Chuyên thiết kế website may đo trọn gói, tối ưu chuẩn SEO Google, giao diện cao cấp cho mọi ngành nghề.',
  url: 'https://www.laixechienthangdongthap.com',
  logo: 'https://www.laixechienthangdongthap.com/logo-kabo.jpg',
  image: 'https://www.laixechienthangdongthap.com/logo-kabo.jpg',
  telephone: '+84374170367',
  email: 'baohoaitran3112@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'TP. Cao Lãnh',
    addressRegion: 'Đồng Tháp',
    addressCountry: 'VN',
  },
  areaServed: 'VN',
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/tran.bao.28897',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
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
