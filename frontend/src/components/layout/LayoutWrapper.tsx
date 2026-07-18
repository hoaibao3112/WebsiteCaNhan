'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: Props) {
  const pathname = usePathname();
  const isDemoPage = pathname?.endsWith('/demo');

  if (isDemoPage) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      {/* Floating Zalo Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://zalo.me/0374170367"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat qua Zalo"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 hover:scale-110 transition-all duration-200"
        >
          <span className="font-bold text-[11px] leading-none">Zalo</span>
        </a>
      </div>
    </>
  );
}
