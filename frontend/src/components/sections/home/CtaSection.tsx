import Link from 'next/link';
import { ArrowRight, Sparkles, Phone, CheckCircle } from 'lucide-react';

export default function CtaSection() {
  return (
    <section aria-label="Bắt đầu hành trình" className="section-padding relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-bg opacity-70" />

      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 size-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #006672 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 size-56 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ca8a04 0%, transparent 70%)' }}
      />

      <div className="container-lumina relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6 animate-fade-in-up">

          {/* Badge */}
          <div className="section-label">
            <Sparkles className="size-3" />
            Bắt đầu ngay hôm nay
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f0f0f] leading-tight">
            Sẵn sàng tạo ra
            <br />
            <span className="animate-shimmer-text">website của bạn?</span>
          </h2>

          {/* Sub */}
          <p className="text-[#6b7280] text-base max-w-lg leading-relaxed">
            Đội ngũ của chúng tôi sẵn sàng tư vấn và báo giá miễn phí. Liên hệ ngay — phản hồi
            trong <strong className="text-[#006672]">24 giờ</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/quy-trinh#contact"
              className="btn-primary text-base px-8 py-4 gap-2"
            >
              Nhận báo giá miễn phí <ArrowRight className="size-5" />
            </Link>
            <a
              href="tel:+84123456789"
              className="btn-secondary text-base px-8 py-4 gap-2"
            >
              <Phone className="size-5" /> Gọi tư vấn ngay
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs text-[#9ca3af]">
            <span className="flex items-center gap-1.5"><CheckCircle className="size-3.5 text-[#006672]" /> Miễn phí tư vấn</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="size-3.5 text-[#006672]" /> Không ràng buộc</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="size-3.5 text-[#006672]" /> Bảo hành 12 tháng</span>
          </div>
        </div>
      </div>
    </section>
  );
}
