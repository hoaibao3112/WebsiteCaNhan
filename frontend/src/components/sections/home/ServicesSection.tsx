import Link from 'next/link';
import { Globe, Search, Megaphone } from 'lucide-react';

const services = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Thiết kế Website',
    description:
      'Thiết kế hiệu suất cao, thẩm mỹ và trải nghiệm người dùng hoàn hảo.',
    color: 'bg-[#e11d48]',
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: 'Tối ưu hoá',
    description:
      'Chiến lược tăng khả năng hiển thị, giúp thương hiệu thống trị thứ hạng tìm kiếm.',
    color: 'bg-[#b45309]',
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Digital Marketing',
    description:
      'Chiến dịch chuyển đổi cao trên mạng xã hội và tìm kiếm để mở rộng quy mô ngay lập tức.',
    color: 'bg-[#0f0f0f]',
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-lumina">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <p className="text-sm font-bold text-[#e11d48] uppercase tracking-widest mb-3">
            Dịch vụ của chúng tôi
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] leading-tight">
            Những gì chúng tôi làm tốt nhất
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Từ thiết kế giao diện đến chiến dịch marketing — mọi giải pháp đều được tuỳ chỉnh riêng cho thương hiệu của bạn.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`card-lumina p-8 animate-fade-in-up-delay-${i + 1}`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center text-white mb-5`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0f0f0f] mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/dich-vu" className="btn-secondary">
            Xem tất cả dịch vụ →
          </Link>
        </div>
      </div>
    </section>
  );
}
