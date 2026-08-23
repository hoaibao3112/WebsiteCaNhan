import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import HeroImageSlider from './HeroImageSlider';
import { TypewriterWord, HeroStats } from './HeroTypewriter';

export default function HeroSection() {
  return (
    <section className="hero-home relative overflow-hidden min-h-[680px] lg:min-h-[760px] flex flex-col justify-center pt-24 pb-16 bg-white">

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#006672]/10 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#ca8a04]/10 blur-3xl animate-breathe" />
        <div className="hero-orbit hero-orbit-one animate-[spin_26s_linear_infinite]" />
        <div className="hero-orbit hero-orbit-two animate-[spin_34s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8 w-full z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ══ LEFT (Server Rendered Static Content) ══ */}
          <div className="flex flex-col gap-8 max-w-[520px]">

            {/* Headline */}
            <div>
              <p className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-widest uppercase text-[#006672] bg-[#006672]/10 px-3.5 py-1.5 rounded-full mb-4 badge-glow">
                <span className="size-1.5 rounded-full bg-[#006672] animate-pulse inline-block" />
                Thiết kế Website · KABO Agency
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-black leading-[1.12] sm:leading-[1.06] tracking-tight text-balance">
                <span className="block text-[#0f0f0f]">Tạo Website &amp;</span>
                <span className="block text-[#0f0f0f]">Landing Page</span>
                <span className="block min-h-[1.12em]">
                  <TypewriterWord />
                </span>
              </h1>
              <div className="mt-4 sm:mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#006672] to-[#ca8a04]" />
            </div>

            {/* Short description */}
            <p className="text-[#6b7280] text-[15px] leading-[1.75] max-w-[400px]">
              Kéo thả dễ dàng, giao diện đẹp chuẩn —{' '}
              <span className="font-semibold text-[#0f0f0f]">không cần biết code</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div>
                <Link
                  href="/quy-trinh#contact"
                  className="btn-shine flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#006672] to-[#004d56] text-white font-extrabold py-4 px-8 rounded-2xl text-sm shadow-lg shadow-[#006672]/25 hover:shadow-xl hover:shadow-[#006672]/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Dùng thử miễn phí
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div>
                <Link
                  href="/giao-dien-mau"
                  className="flex items-center justify-center gap-2 border-2 border-[#e5e7eb] hover:border-[#006672]/40 text-[#374151] hover:text-[#006672] font-extrabold py-4 px-7 rounded-2xl text-sm bg-white hover:bg-[#f0f7f8] transition-all duration-200"
                >
                  <Play className="size-3.5 fill-current" />
                  Xem mẫu
                </Link>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#e5e7eb] via-[#6366f1]/20 to-transparent" />

            {/* Stats */}
            <HeroStats />

          </div>

          {/* ══ RIGHT — Interactive image slideshow ══ */}
          <div className="relative h-[320px] sm:h-[440px] lg:h-[540px] w-full">
            <HeroImageSlider />
          </div>

        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#94a3b8] sm:flex">
        <span>Cuộn để khám phá</span>
        <span className="h-8 w-px bg-gradient-to-b from-[#006672] to-transparent" />
      </div>
    </section>
  );
}
