'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/du-an', label: 'Dự án' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/giao-dien-mau', label: 'Giao diện mẫu' },
  { href: '/quy-trinh', label: 'Quy trình' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.07)]'
          : 'bg-white/80 backdrop-blur-sm',
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <nav className="flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative h-10 w-36 overflow-hidden rounded-lg">
              <Image
                src="/logo-kabo.jpg"
                alt="KABO AGENCY"
                fill
                className="object-contain object-left transition-opacity duration-200 group-hover:opacity-90"
                priority
              />
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative py-2 text-sm font-semibold transition-all duration-200',
                  pathname === link.href
                    ? 'text-[#006672]'
                    : 'text-[#374151] hover:text-[#006672]',
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#006672] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="hidden md:flex items-center gap-4">
            <div className="w-px h-5 bg-[#e2ecec]" />
            <a
              href="tel:+84374170367"
              className="text-sm font-semibold text-[#6b7280] hover:text-[#006672] transition-colors"
            >
              0374 170 367
            </a>
            <Link
              href="/quy-trinh#contact"
              className="btn-primary text-sm py-2.5 px-5 gap-1.5"
            >
              Nhận báo giá <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#374151] hover:bg-[#f0f7f8] hover:text-[#006672] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-[#e2ecec]',
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200',
                pathname === link.href
                  ? 'bg-[#f0f7f8] text-[#006672]'
                  : 'text-[#374151] hover:bg-[#f8fbfb] hover:text-[#006672]',
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#e2ecec] mt-2 flex flex-col gap-2">
            <a href="tel:+84374170367" className="flex items-center justify-center gap-2 text-sm text-center text-[#6b7280] font-medium py-2 hover:text-[#006672] transition-colors">
              <Phone className="size-4" /> 0374 170 367
            </a>
            <Link
              href="/quy-trinh#contact"
              className="btn-primary w-full justify-center text-sm"
            >
              Nhận báo giá miễn phí
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
