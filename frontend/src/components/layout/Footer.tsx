import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fdf5f5] border-t border-[#f0e8e8]">
      <div className="container-lumina py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-[#e11d48] font-black text-lg tracking-tight">LUMINA</span>
              <span className="text-[#0f0f0f] font-black text-lg tracking-tight"> AGENCY</span>
            </div>
            <p className="text-sm text-[#6b7280] leading-relaxed max-w-xs">
              Kiến tạo trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên.
            </p>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="text-sm font-bold text-[#0f0f0f] mb-4 uppercase tracking-wider">
              Dịch vụ
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '/dich-vu', label: 'Thiết kế Web' },
                { href: '/dich-vu', label: 'SEO & Tối ưu hóa' },
                { href: '/dich-vu', label: 'Quảng cáo Kỹ thuật số' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#6b7280] hover:text-[#e11d48] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Công ty */}
          <div>
            <h3 className="text-sm font-bold text-[#0f0f0f] mb-4 uppercase tracking-wider">
              Công ty
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '/du-an', label: 'Kho lưu trữ Dự án' },
                { href: '/quy-trinh', label: 'Quy trình' },
                { href: '/giao-dien-mau', label: 'Thư viện Giao diện' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#6b7280] hover:text-[#e11d48] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pháp lý */}
          <div>
            <h3 className="text-sm font-bold text-[#0f0f0f] mb-4 uppercase tracking-wider">
              Pháp lý
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '#', label: 'Chính sách bảo mật' },
                { href: '#', label: 'Điều khoản dịch vụ' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#6b7280] hover:text-[#e11d48] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#f0e8e8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#9ca3af]">
            © {currentYear} LUMINA Fullstack Agency. Đã đăng ký Bản quyền.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#9ca3af] hover:text-[#e11d48] transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#9ca3af] hover:text-[#e11d48] transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
