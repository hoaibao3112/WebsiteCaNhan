import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const beVietnam = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese', 'latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'LUMINA AGENCY — Thiết kế Website May do, Bứt phá Tăng trưởng',
    template: '%s — LUMINA AGENCY',
  },
  description:
    'Chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên. Thiết kế web may đo, SEO, Digital Marketing.',
  keywords: 'thiết kế website, agency thiết kế web, SEO, digital marketing, lumina agency, website cao cấp',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://lumina.agency'),
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'LUMINA AGENCY',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="flex min-h-screen flex-col bg-white text-[#0f0f0f] antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Floating Contact Buttons */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <a
            href="https://zalo.me/0900000000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat qua Zalo"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-200"
          >
            <span className="font-bold text-[11px] leading-none">Zalo</span>
          </a>
        </div>
      </body>
    </html>
  );
}
