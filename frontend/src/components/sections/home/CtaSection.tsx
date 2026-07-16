import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-lumina">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16"
          style={{
            background: 'linear-gradient(135deg, #fdf5f5 0%, #fff1f2 50%, #fef9f0 100%)',
            border: '1px solid #fda4af',
          }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl -z-0"
            style={{ background: 'rgba(225,29,72,0.08)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl -z-0"
            style={{ background: 'rgba(245,158,11,0.08)' }}
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] leading-tight mb-4">
                Hãy bắt đầu dự án của bạn
              </h2>
              <p className="text-[#6b7280] text-sm leading-relaxed mb-6">
                Hãy cho chúng tôi biết về dự án, tiến độ và mục tiêu của bạn. Chúng tôi sẽ phản hồi trong vòng 24 giờ để lên lịch thoả luận chi tiết.
              </p>

              {/* Trust signals */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#f0e8e8] w-fit">
                <Calendar className="h-5 w-5 text-[#e11d48] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#0f0f0f]">Lịch trình hiện tại</p>
                  <p className="text-xs text-[#6b7280]">Đang nhận lịch cho Q3 2024</p>
                </div>
              </div>
            </div>

            {/* Right — Quick form or CTAs */}
            <div className="flex flex-col gap-3">
              <Link
                href="/quy-trinh#contact"
                className="btn-primary justify-center py-4 text-base"
              >
                Bắt đầu tư vấn miễn phí <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/giao-dien-mau"
                className="btn-secondary justify-center py-4 text-base"
              >
                Xem Thư viện Giao diện →
              </Link>
              <p className="text-center text-xs text-[#9ca3af] mt-1">
                Không cam kết. Phản hồi trong 24 giờ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
