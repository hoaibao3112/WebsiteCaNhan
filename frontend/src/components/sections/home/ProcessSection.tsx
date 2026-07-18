import { MessageCircle, Palette, Zap, Search, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Tư vấn & Khám phá',
    description: 'Tiếp nhận yêu cầu, phân tích đối thủ, định hướng chiến lược phù hợp mục tiêu của bạn.',
    Icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Thiết kế giao diện',
    description: 'Thiết kế wireframe, prototype và UI chuẩn UX, demo trực tiếp để bạn góp ý trước khi code.',
    Icon: Palette,
  },
  {
    number: '03',
    title: 'Phát triển & Tích hợp',
    description: 'Lập trình responsive, tích hợp hệ thống backend, payment, CRM theo yêu cầu.',
    Icon: Zap,
  },
  {
    number: '04',
    title: 'Kiểm tra & Tối ưu',
    description: 'Test đa thiết bị, tối ưu Core Web Vitals, bảo mật và SEO On-page.',
    Icon: Search,
  },
  {
    number: '05',
    title: 'Bàn giao & Hỗ trợ',
    description: 'Triển khai live, hướng dẫn sử dụng, hỗ trợ 3 tháng miễn phí sau bàn giao.',
    Icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-lumina">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="section-label w-fit mx-auto mb-4">
            Quy trình làm việc
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] leading-tight">
            5 bước đơn giản
            <br />
            <span className="gradient-text-primary">đến sản phẩm hoàn hảo</span>
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Quy trình minh bạch, cộng tác chặt chẽ — bạn luôn biết chúng tôi đang làm gì.
          </p>
        </div>

        {/* Steps — alternating layout on desktop */}
        <div className="relative max-w-4xl mx-auto">

          {/* Center vertical line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #006672 0%, #80c2cb 60%, transparent 100%)' }}
          />

          <div className="flex flex-col gap-10">
            {steps.map((step, index) => {
              const isRight = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex items-center gap-0 md:gap-8 animate-fade-in-up-delay-${index + 1} ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isRight ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-16 md:pl-0`}>
                    <div
                      className={`inline-block group bg-white border border-[#e2ecec] rounded-2xl p-6 shadow-sm hover:shadow-[0_12px_40px_rgba(0,102,114,0.10)] hover:-translate-y-1 transition-all duration-400 text-left`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-1.5 rounded-lg bg-[#f0f7f8] text-[#006672]">
                          <step.Icon className="size-5" />
                        </div>
                        <span className="text-xs font-black text-[#006672] tracking-widest">BƯỚC {step.number}</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0f0f0f] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-0 md:static md:flex md:shrink-0 z-10">
                    <div className="size-12 rounded-full border-2 border-[#006672] bg-white flex items-center justify-center text-[#006672] font-black text-sm shadow-[0_0_0_6px_rgba(0,102,114,0.08)]">
                      {step.number}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
