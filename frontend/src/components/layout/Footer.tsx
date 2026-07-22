import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Dịch vụ',
    links: [
      { href: '/dich-vu', label: 'Thiết kế UX/UI' },
      { href: '/dich-vu', label: 'Phát triển Web' },
      { href: '/dich-vu', label: 'SEO & Tối ưu hóa' },
      { href: '/dich-vu', label: 'Digital Marketing' },
      { href: '/dich-vu', label: 'Quảng cáo Google/Meta' },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { href: '/du-an', label: 'Kho lưu trữ Dự án' },
      { href: '/giao-dien-mau', label: 'Thư viện Giao diện' },
      { href: '/quy-trinh', label: 'Quy trình làm việc' },
      { href: '/quy-trinh#contact', label: 'Liên hệ với chúng tôi' },
    ],
  },
  {
    title: 'Pháp lý',
    links: [
      { href: '#', label: 'Chính sách bảo mật' },
      { href: '#', label: 'Điều khoản dịch vụ' },
      { href: '#', label: 'Cookie Policy' },
    ],
  },
];

const socials = [
  {
    label: 'Zalo',
    href: 'https://zalo.me/0374170367',
    icon: (
      <span className="font-extrabold text-xs tracking-wider">ZALO</span>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/tran.bao.28897',
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.82a8.18 8.18 0 0 0 4.77 1.52V6.89a4.85 4.85 0 0 1-1-.2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0a1628]">
      {/* Decorative gradient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #006672 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ca8a04 0%, transparent 70%)' }}
      />

      {/* Top CTA Banner */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">Sẵn sàng bắt đầu?</p>
              <h3 className="text-white text-2xl font-extrabold leading-tight">
                Biến ý tưởng thành <span className="text-[#ca8a04]">website thực tế</span>
              </h3>
            </div>
            <a
              href="https://zalo.me/0374170367"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-[#006672] hover:bg-[#004d56] text-white font-bold text-sm px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,102,114,0.4)]"
            >
              Nhận tư vấn miễn phí →
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Brand Column — wider */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="inline-block w-fit">
              <div className="relative h-14 w-48 overflow-hidden rounded-xl">
                <Image
                  src="/logo-kabo.jpg"
                  alt="KABO AGENCY"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-white/55 text-sm leading-relaxed max-w-sm">
              Chúng tôi kiến tạo những trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên.
              Thiết kế web may đo, tối ưu SEO, digital marketing toàn diện.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:baohoaitran3112@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-[#80c2cb] transition-colors group-hover:bg-[#006672] group-hover:text-white">
                  <Mail className="size-4" />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                  baohoaitran3112@gmail.com
                </span>
              </a>
              <a
                href="tel:+84374170367"
                className="flex items-center gap-3 group"
              >
                <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-[#80c2cb] transition-colors group-hover:bg-[#006672] group-hover:text-white">
                  <Phone className="size-4" />
                </div>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                  0374 170 367
                </span>
              </a>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-[#80c2cb]">
                  <MapPin className="size-4" />
                </div>
                <span className="text-sm text-white/60">Quận 1, TP. Hồ Chí Minh</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="size-9 rounded-xl bg-white/10 flex items-center justify-center text-white/50 hover:bg-[#006672] hover:text-white transition-all duration-200 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-white text-xs font-black uppercase tracking-[0.12em] mb-5">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © {currentYear} KABO Agency. Đã đăng ký Bản quyền.
          </p>
          <div className="flex items-center gap-1 text-xs text-white/35">
            <span>Thiết kế bởi</span>
            <span className="text-[#ca8a04] font-bold ml-1">KABO Agency</span>
            <span className="ml-1">🇻🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
