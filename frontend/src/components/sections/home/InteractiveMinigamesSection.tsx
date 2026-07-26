'use client';

import { Sparkles, Dices, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import PotSmashingGame from '@/components/sections/builder/PotSmashingGame';
import PopupLuckyWheel from '@/components/sections/builder/PopupLuckyWheel';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function InteractiveMinigamesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-b from-white via-[#f0f7f8] to-white">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 size-96 rounded-full bg-[#006672]/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 size-96 rounded-full bg-[#ca8a04]/5 blur-3xl" />
      </div>

      <div className="container-lumina relative z-10">

        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center mb-16 max-w-2xl mx-auto">
          <div className="section-label mx-auto mb-4">
            <Sparkles className="size-3.5 text-[#006672]" />
            Minigame Tương Tác Tặng Quà
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0f0f] leading-tight">
            Thử vận may — <br />
            <span className="gradient-text-primary">Nhận ngay ưu đãi khủng</span>
          </h2>
          <p className="mt-4 text-[#6b7280] text-sm leading-relaxed">
            Chơi minigame độc quyền của KABO Agency để nhận Voucher giảm giá trực tiếp đến 2.000.000đ và quà tặng tên miền/hosting miễn phí!
          </p>
        </ScrollReveal>

        {/* Interactive Minigames Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pot Smashing Game - 7 cols */}
          <ScrollReveal direction="left" className="lg:col-span-7 h-full">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#e2ecec] h-full flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4 text-[#006672]">
                <Gift className="size-5" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Game 01 · Đập Niêu Đất</span>
              </div>
              <PotSmashingGame columnCount={6} rowCount={2} allowEdit={false} />
            </motion.div>
          </ScrollReveal>

          {/* Lucky Wheel Game - 5 cols */}
          <ScrollReveal direction="right" className="lg:col-span-5 h-full">
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#e2ecec] h-full flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-4 text-[#006672]">
                <Dices className="size-5" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Game 02 · Vòng Quay May Mắn</span>
              </div>
              <PopupLuckyWheel allowEdit={false} />
            </motion.div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
