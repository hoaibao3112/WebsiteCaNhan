'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/du-an', label: 'Dự án' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/quy-trinh', label: 'Quy trình' },
  { href: '/giao-dien-mau', label: 'Giao diện mẫu' },
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
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-white/80 backdrop-blur-sm',
      )}
    >
      <div className="container-lumina">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="text-[#e11d48] font-black text-lg tracking-tight leading-none">
              LUMINA
            </span>
            <span className="text-[#0f0f0f] font-black text-lg tracking-tight leading-none">
              {' '}AGENCY
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
                  pathname === link.href
                    ? 'text-[#e11d48]'
                    : 'text-[#374151] hover:text-[#e11d48]',
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#e11d48] rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/quy-trinh#contact"
              className="btn-primary text-sm py-2 px-5"
            >
              Nhận báo giá
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-[#374151] hover:bg-[#fff1f2] hover:text-[#e11d48] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container-lumina py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[#fff1f2] text-[#e11d48]'
                    : 'text-[#374151] hover:bg-gray-50',
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <Link
                href="/quy-trinh#contact"
                className="btn-primary w-full justify-center text-sm"
              >
                Nhận báo giá
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
