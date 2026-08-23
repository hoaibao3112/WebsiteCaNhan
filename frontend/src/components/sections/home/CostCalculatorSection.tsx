'use client';

import { useState } from 'react';
import { Calculator, Check, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';

const WEBSITE_TYPES = [
  { id: 'landing', label: 'Landing Page Bán Hàng', basePrice: 2990000, time: '2 ngày' },
  { id: 'company', label: 'Website Doanh Nghiệp', basePrice: 5990000, time: '3-5 ngày' },
  { id: 'shop', label: 'Shop Bán Hàng E-Commerce', basePrice: 9990000, time: '5-7 ngày' },
  { id: 'custom', label: 'Web App / Nền Tảng Theo Yêu Cầu', basePrice: 19900000, time: '7-14 ngày' },
];

const ADDONS = [
  { id: 'payment', label: 'Thanh toán Online (MoMo/VNPAY/VietQR)', price: 1000000 },
  { id: 'seo', label: 'Tối ưu SEO On-page VIP & Schema', price: 1000000 },
  { id: 'multilang', label: 'Hỗ trợ Đa ngôn ngữ (Anh/Việt)', price: 1500000 },
  { id: 'crm', label: 'Đồng bộ đơn CRM / Nhanh.vn / Pancake', price: 1500000 },
  { id: 'domain', label: 'Tặng Tên miền quốc tế & SSL 1 năm', price: 0 },
];

export default function CostCalculatorSection() {
  const [selectedType, setSelectedType] = useState(WEBSITE_TYPES[1]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['domain', 'seo']);
  const shouldReduce = useReducedMotion();

  const toggleAddon = (id: string) => {
    if (id === 'domain') return; // Always included free
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const addonsTotal = ADDONS.filter((addon) => selectedAddons.includes(addon.id)).reduce(
      (acc, addon) => acc + addon.price,
      0
    );
    return selectedType.basePrice + addonsTotal;
  };

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <section className="section-padding bg-[#f4f9f9] relative overflow-hidden">
      <div className="container-lumina max-w-[1280px]">

        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16 max-w-2xl mx-auto">
          <div className="section-label mx-auto mb-4">
            <Calculator className="size-3.5 text-[#006672]" />
            Tính Chi Phí Dự Kiến
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] leading-tight">
            Ước tính ngân sách <br />
            <span className="gradient-text-primary">minh bạch & nhanh chóng</span>
          </h2>
          <p className="mt-4 text-[#6b7280] text-sm leading-relaxed">
            Tùy chọn cấu hình website mong muốn để biết ngay mức giá dự kiến và thời gian hoàn thành.
          </p>
        </ScrollReveal>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* Options Column - 7 cols */}
          <ScrollReveal direction="up" className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Website Type */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#e2ecec] shadow-sm">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0f0f0f] uppercase tracking-wider mb-6 flex items-center gap-2.5">
                <span className="size-6.5 rounded-full bg-[#006672] text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
                Chọn Loại Hình Website
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WEBSITE_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#006672] bg-[#f0f7f8] shadow-md ring-2 ring-[#006672]/20'
                          : 'border-[#e2ecec] bg-white hover:border-[#80c2cb]'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-[#0f0f0f] text-sm sm:text-base mb-1.5 leading-snug">{type.label}</div>
                        <div className="text-sm text-[#006672] font-black">{formatVND(type.basePrice)}</div>
                      </div>
                      <div className="text-xs text-[#6b7280] mt-3 pt-2.5 border-t border-black/5 flex items-center gap-1.5 font-medium">
                        <Clock className="size-3.5 text-[#006672]" /> {type.time}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Addon Features */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#e2ecec] shadow-sm">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0f0f0f] uppercase tracking-wider mb-6 flex items-center gap-2.5">
                <span className="size-6.5 rounded-full bg-[#006672] text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
                Tính Năng Bổ Sung
              </h3>

              <div className="space-y-3.5">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const isFree = addon.price === 0;
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 gap-4 ${
                        isChecked
                          ? 'border-[#006672] bg-[#f0f7f8] shadow-sm'
                          : 'border-[#e2ecec] bg-white hover:border-[#80c2cb]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`size-5.5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                            isChecked ? 'bg-[#006672] border-[#006672] text-white' : 'border-[#d1d5db] bg-white'
                          }`}
                        >
                          {isChecked && <Check className="size-4" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#374151] truncate">{addon.label}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-[#006672] shrink-0">
                        {isFree ? 'Miễn phí' : `+${formatVND(addon.price)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </ScrollReveal>

          {/* Summary Box Column - 5 cols with Generated Background Artwork */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5 sticky top-24">
            <div className="bg-[#004d56] text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px] border border-[#80c2cb]/30">
              
              {/* Artwork Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                <motion.div
                  className="relative w-full h-full"
                  animate={shouldReduce ? {} : {
                    scale: [1, 1.08, 1],
                    x: [0, -10, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/calculator-summary-bg.png"
                    alt="Summary Card Background Artwork"
                    fill
                    className="object-cover object-center"
                  />
                </motion.div>

                {/* Dark Gradient Overlay for 100% Crisp Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#004d56]/90 via-[#006672]/85 to-[#04131a]/95 backdrop-blur-[2px]" />
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-wider mb-6 pb-4 border-b border-white/20">
                  <Sparkles className="size-4 text-[#fbe449]" />
                  Tổng Thể Báo Giá
                </div>

                <div className="mb-6 pb-5 border-b border-white/20">
                  <span className="text-xs text-white/70 block mb-1 font-medium">Loại hình đã chọn:</span>
                  <h4 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-sm">{selectedType.label}</h4>
                  <p className="text-xs text-[#fbe449] font-bold mt-1.5 flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Thời gian làm: {selectedType.time}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-xs text-white/70 block mb-2 font-medium">
                    Tính năng chọn thêm ({selectedAddons.length}):
                  </span>
                  {ADDONS.filter((a) => selectedAddons.includes(a.id)).map((a) => (
                    <div key={a.id} className="flex justify-between items-center text-xs sm:text-sm text-white/95 gap-3">
                      <span className="truncate">✓ {a.label}</span>
                      <span className="font-extrabold text-[#fbe449] shrink-0">{a.price === 0 ? 'Free' : formatVND(a.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Price Display */}
              <div className="relative z-10 pt-6 border-t border-white/20">
                <span className="text-xs text-white/70 block mb-1 font-medium">Tổng chi phí ước tính:</span>
                <div className="text-3xl sm:text-4xl font-black text-[#fbe449] tracking-tight mb-6 drop-shadow-md">
                  {formatVND(calculateTotal())}
                </div>

                <a
                  href={`https://zalo.me/0374170367?text=Tôi%20muốn%20tư%20vấn%20gói%20${encodeURIComponent(selectedType.label)}%20(Dự%20toán:%20${encodeURIComponent(formatVND(calculateTotal()))})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white hover:bg-[#f0f7f8] text-[#006672] font-black text-center py-4 px-6 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-sm"
                >
                  Tư vấn cấu hình này qua Zalo →
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/80 mt-4">
                  <ShieldCheck className="size-3.5 text-[#fbe449]" /> Giá cố định, không phát sinh chi phí ẩn
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
