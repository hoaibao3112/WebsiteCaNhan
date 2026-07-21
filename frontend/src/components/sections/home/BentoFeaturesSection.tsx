'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Sparkles, Globe, Type, Image as ImageIcon, LayoutGrid } from 'lucide-react';

/* ── Typewriter ── */
const WORDS = ['Nhanh hơn.', 'Đẹp hơn.', 'Dễ hơn.', 'Mạnh hơn.'];

function TypewriterText() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && displayed.length < word.length)
      ref.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === word.length)
      ref.current = setTimeout(() => setDeleting(true), 1600);
    else if (deleting && displayed.length > 0)
      ref.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 45);
    else { setDeleting(false); setWordIdx(i => (i + 1) % WORDS.length); }
    return () => { if (ref.current) clearTimeout(ref.current); };
  }, [displayed, deleting, wordIdx]);

  return (
    <span className="text-[1.7rem] font-black leading-tight text-[#3730a3]">
      {displayed}<span className="animate-pulse text-[#6366f1]">|</span>
    </span>
  );
}

function Pill({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
      style={{ background: `${color}33`, color }}>
      <Icon className="h-3 w-3" />{label}
    </span>
  );
}

/* ── Cell wrapper: forces equal width in grid ── */
function Cell({ children, style, className = '' }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden group min-w-0 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function BentoFeaturesSection() {
  const ROW_H = 260;

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-[#6366f1] mb-3">Tính năng nổi bật</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#0f0f0f] leading-tight">
            Mọi thứ bạn cần để <span className="text-[#6366f1]">bứt phá</span> trên nền tảng số
          </h2>
          <p className="mt-4 text-[#6b7280] text-sm max-w-xl mx-auto leading-relaxed">
            Từ thiết kế đến bán hàng, từ AI đến xuất bản — tất cả trong một nền tảng duy nhất.
          </p>
        </div>

        {/* ── ROW 1: flex row, 4 equal cells ── */}
        <div className="flex gap-3 mb-3" style={{ height: ROW_H }}>

          {/* 1 — Ecommerce */}
          <Cell className="flex-1 bg-[#e8f4f8]">
            <div className="absolute top-3 left-3 z-10"><Pill icon={ShoppingCart} label="Sản phẩm" color="#0891b2" /></div>
            <Image src="/bento-ecommerce.png" alt="Giao diện cửa hàng online KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e8f4f8]/50 via-transparent to-transparent" />
          </Cell>

          {/* 2 — Checkout */}
          <Cell className="flex-1 bg-[#f0eeff]">
            <Image src="/bento-checkout.png" alt="Giỏ hàng và thanh toán KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
          </Cell>

          {/* 3 — AI */}
          <Cell className="flex-1 bg-[#312e81]">
            <div className="absolute top-3 left-3 z-10"><Pill icon={Sparkles} label="Tùy chỉnh với AI" color="#a5b4fc" /></div>
            <Image src="/bento-ai.png" alt="Tùy chỉnh website với AI" fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#312e81]/40 via-transparent to-[#312e81]/20" />
          </Cell>

          {/* 4 — Domain */}
          <Cell className="flex-1 bg-[#14532d]">
            <div className="absolute top-3 left-3 z-10"><Pill icon={Globe} label="Tên miền" color="#86efac" /></div>
            <Image src="/bento-domain.png" alt="Kết nối tên miền KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#14532d]/40 via-transparent to-transparent" />
          </Cell>
        </div>

        {/* ── ROW 2: flex row ── */}
        <div className="flex gap-3" style={{ height: ROW_H }}>

          {/* 5 — Typewriter (1/4) */}
          <div className="flex-1 relative rounded-2xl bg-gradient-to-br from-[#e0e7ff] via-[#ede9fe] to-[#fce7f3] p-5 flex flex-col overflow-hidden min-w-0">
            <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1.5 w-fit mb-3">
              <Type className="h-3.5 w-3.5 text-[#6366f1]" />
              <span className="text-xs font-bold text-[#6366f1]">Văn bản</span>
            </div>
            <div className="flex-1 bg-white/50 backdrop-blur-sm rounded-xl border border-white/80 p-4 flex items-center">
              <TypewriterText />
            </div>
            <div className="absolute bottom-4 right-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#6366f1" className="drop-shadow-md">
                <path d="M4 0l16 12-7 2-4 8z" />
              </svg>
            </div>
          </div>

          {/* 6 — Model (1/4) */}
          <Cell className="flex-1">
            <Image src="/bento-model.png" alt="Giao diện website đẹp KABO Agency" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/30 via-transparent to-transparent" />
          </Cell>

          {/* 7 — Portfolio (2/4 = 50%) */}
          <Cell className="bg-[#a3e635]" style={{ flex: 2 }}>
            <div className="absolute top-3 left-3 z-10"><Pill icon={LayoutGrid} label="Thư viện mẫu" color="#365314" /></div>
            <Image src="/bento-portfolio.png" alt="Thư viện giao diện mẫu KABO" fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-4 py-2.5 flex justify-around items-center">
              {[
                { icon: ImageIcon, label: 'Thư viện ảnh' },
                { icon: LayoutGrid, label: 'Slideshow' },
                { icon: LayoutGrid, label: 'Slideshow+' },
                { icon: LayoutGrid, label: 'Danh sách' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} type="button"
                  className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-[#374151] hover:text-[#6366f1] transition-colors">
                  <Icon className="h-4 w-4" />{label}
                </button>
              ))}
            </div>
          </Cell>

        </div>
      </div>
    </section>
  );
}
