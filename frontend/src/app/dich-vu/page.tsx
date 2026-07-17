import type { Metadata } from 'next';
import { Globe, Search, Megaphone, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Dịch vụ',
  description:
    'Chúng tôi tạo ra các trải nghiệm kỹ thuật số hiện đại, cân bằng giữa độ chính xác kỹ thuật và năng lượng sáng tạo.',
  alternates: { canonical: '/dich-vu' },
};

const services = [
  {
    icon: Globe,
    title: 'Thiết kế Web Theo yêu cầu',
    tagline: 'Giao diện đẳng cấp, hiệu suất vượt trội',
    description:
      'Thiết kế hiệu suất cao, thẩm mỹ và trải nghiệm người dùng hoàn hảo. Mỗi website là một tác phẩm được tuỳ chỉnh riêng cho thương hiệu.',
    features: [
      'UI/UX Design từ Figma đến code',
      'Next.js + Tailwind CSS (Lighthouse ≥ 95)',
      'Responsive tuyệt đối mọi thiết bị',
      'SEO On-page tối ưu',
      'Tích hợp CMS dễ quản lý',
    ],
    color: '#006672',
    bgColor: '#f0f7f8',
  },
  {
    icon: Search,
    title: 'SEO & Tối ưu hóa',
    tagline: 'Thống trị thứ hạng tìm kiếm',
    description:
      'Chiến lược tăng khả năng hiển thị, giúp thương hiệu thống trị thứ hạng tìm kiếm. Từ audit kỹ thuật đến content strategy.',
    features: [
      'Audit kỹ thuật website toàn diện',
      'Keyword research & content strategy',
      'Core Web Vitals optimization',
      'Link building & authority',
      'Báo cáo monthly chi tiết',
    ],
    color: '#ca8a04',
    bgColor: '#fdfbf7',
  },
  {
    icon: Megaphone,
    title: 'Quảng cáo Kỹ thuật số',
    tagline: 'ROAS cao, chi phí tối ưu',
    description:
      'Chiến dịch chuyển đổi cao trên mạng xã hội và tìm kiếm để mở rộng quy mô ngay lập tức. Data-driven, không đoán mò.',
    features: [
      'Google Ads & Meta Ads chuyên nghiệp',
      'A/B testing liên tục',
      'Retargeting & lookalike audience',
      'Landing page tối ưu chuyển đổi',
      'Dashboard báo cáo real-time',
    ],
    color: '#475569',
    bgColor: '#f8fafc',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f4f9f9, white)' }}>
        <div className="container-lumina text-center max-w-3xl mx-auto">
          <div className="section-label mx-auto mb-6 animate-fade-in">
            <Sparkles className="h-3 w-3" /> Chuyên môn của chúng tôi
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight animate-fade-in-up">
            Nâng tầm
            <br />
            <span className="gradient-text-primary">
              Sự hiện diện Kỹ thuật số
            </span>
          </h1>
          <p className="mt-6 text-base text-[#6b7280] leading-relaxed max-w-xl mx-auto animate-fade-in-up-delay-1">
            Chúng tôi tạo ra các trải nghiệm kỹ thuật số hiện đại, cân bằng giữa độ chính xác kỹ thuật và năng lượng sáng tạo.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(to bottom, white, #f4f9f9)' }}
      >
        <div className="container-lumina">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className={`card-lumina p-8 flex flex-col gap-6 animate-fade-in-up-delay-${i + 1}`}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: service.color, color: 'white' }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div>
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-1"
                      style={{ color: service.color }}
                    >
                      {service.tagline}
                    </p>
                    <h2 className="text-xl font-black text-[#0f0f0f] leading-tight mb-3">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#6b7280] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <CheckCircle
                          className="h-4 w-4 mt-0.5 shrink-0"
                          style={{ color: service.color }}
                        />
                        <span className="text-sm text-[#374151]">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/quy-trinh#contact"
                    className="mt-auto btn-secondary text-sm justify-center"
                  >
                    Tìm hiểu thêm →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-white">
        <div className="container-lumina text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-[#0f0f0f] mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-[#6b7280] text-sm mb-8">
            Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết trong 24 giờ.
          </p>
          <Link href="/quy-trinh#contact" className="btn-primary text-base px-8 py-4">
            Nhận báo giá miễn phí →
          </Link>
        </div>
      </section>
    </div>
  );
}
