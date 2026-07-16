import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-16">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(225,29,72,0.08) 0%, transparent 70%), linear-gradient(to bottom, #fdf5f5 0%, #ffffff 100%)',
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full -z-10 blur-3xl"
        style={{ background: 'rgba(225,29,72,0.06)' }}
      />
      <div
        className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full -z-10 blur-3xl"
        style={{ background: 'rgba(245,158,11,0.06)' }}
      />

      <div className="container-lumina w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 md:py-28">
          {/* Left — Content */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            {/* Badge */}
            <div className="section-label w-fit">
              <Sparkles className="h-3 w-3" />
              Sáng Tạo, Đột Phá, Trải Nghiệm Đỉnh Cao
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              <span className="text-[#e11d48]">Thiết kế Website</span>
              <br />
              May đo,
              <br />
              <span className="text-[#0f0f0f]">Bứt phá Tăng trưởng</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-xl">
              Chúng tôi kiến tạo trải nghiệm kỹ thuật số thúc đẩy thương hiệu tiến lên. Từ website chuyên đổi cao đến các nền tảng thương mại điện tử phức tạp.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/quy-trinh#contact" className="btn-primary">
                Bắt đầu dự án <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/du-an" className="btn-secondary">
                Xem portfolio
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#f0e8e8]">
              {[
                { value: '150+', label: 'Dự án hoàn thành' },
                { value: '98%', label: 'Khách hàng hài lòng' },
                { value: '<1.2s', label: 'Tốc độ tải trang' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl font-black text-[#e11d48]">{stat.value}</p>
                  <p className="text-xs text-[#9ca3af] font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative animate-fade-in-up-delay-2 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Browser mockup */}
              <div className="bg-[#f8f8f8] px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-gray-400 font-mono">
                  lumina.agency/portfolio
                </div>
              </div>
              {/* Screenshot */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#fdf5f5] to-white flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=720&q=80"
                  alt="LUMINA Agency portfolio showcase"
                  className="w-full h-full object-cover"
                  width={720}
                  height={540}
                  loading="eager"
                />
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-8 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 border border-[#f0e8e8]">
              <div className="w-10 h-10 rounded-lg bg-[#fff1f2] flex items-center justify-center text-[#e11d48] text-lg">
                ✦
              </div>
              <div>
                <p className="text-xs font-bold text-[#0f0f0f]">Lighthouse Score</p>
                <p className="text-2xl font-black text-[#e11d48] leading-none">98</p>
              </div>
            </div>

            {/* Second floating card */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-[#f0e8e8]">
              <p className="text-xs font-bold text-[#0f0f0f]">New project</p>
              <p className="text-xs text-[#6b7280]">TechStart SaaS</p>
              <div className="mt-2 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
