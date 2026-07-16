import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center pt-32">
      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
        <HelpCircle className="text-[#e11d48] w-8 h-8 animate-pulse" />
      </div>
      <h1 className="text-4xl font-black text-[#0f0f0f] mb-2">404 — Không Tìm Thấy</h1>
      <p className="text-[#6b7280] text-sm max-w-md mb-6 leading-relaxed">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển sang một liên kết khác.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="btn-primary"
        >
          Về trang chủ
        </Link>
        <Link
          href="/quy-trinh#contact"
          className="btn-secondary"
        >
          Liên hệ trợ giúp
        </Link>
      </div>
    </div>
  );
}
