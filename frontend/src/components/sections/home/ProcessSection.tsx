const steps = [
  {
    number: '01',
    title: 'Tư vấn',
    description: 'Lắng nghe mục tiêu, phân tích thị trường và xác định hướng phát triển phù hợp nhất cho thương hiệu.',
  },
  {
    number: '02',
    title: 'Thiết kế',
    description: 'Tạo wireframe, mockup và prototype với trải nghiệm người dùng được đặt lên hàng đầu.',
  },
  {
    number: '03',
    title: 'Phát triển',
    description: 'Lập trình với code clean, tốc độ tải trang tối ưu và khả năng mở rộng cao.',
  },
  {
    number: '04',
    title: 'Bàn giao',
    description: 'Kiểm thử kỹ lưỡng, deploy production và hỗ trợ sau bàn giao 30 ngày.',
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-lumina">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#e11d48] uppercase tracking-widest mb-3">
            Cách chúng tôi làm việc
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
            Quy trình làm việc
          </h2>
          <p className="mt-4 text-[#6b7280] max-w-xl mx-auto text-sm leading-relaxed">
            Một quy trình được tinh chỉnh qua hàng trăm dự án để đảm bảo kết quả tốt nhất.
          </p>
        </div>

        {/* Relative wrapper for the vertical line */}
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Line */}
          <div
            className="absolute left-[28px] top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #e11d48 0%, #fda4af 70%, transparent 100%)' }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-10">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex gap-6 items-start animate-fade-in-up-delay-${index + 1}`}>
                {/* Dot */}
                <div className="process-dot shrink-0">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pb-4">
                  <h3 className="text-lg font-bold text-[#0f0f0f] mb-1">{step.title}</h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
