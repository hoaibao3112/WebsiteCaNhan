'use client';

import { useState } from 'react';
import { Gift, RotateCcw, X } from 'lucide-react';

interface Props {
  imageInit?: string;
  imageResult?: string;
  columnCount?: number;
  rowCount?: number;
  allowEdit?: boolean;
}

const DEFAULT_INIT = 'https://lh3.googleusercontent.com/XbzR09ahNpQkaBwPtQw_qczWoE1Z-elFICE1xjXBQ6iCSZt6ObefcN-ne9sabC1nFrYsJUswOM4bgaVkJBu1y4pme-wCfxloug=rw-w160';
const DEFAULT_RESULT = 'https://lh3.googleusercontent.com/tLxFKF1rUzAXGhboyowtD3XJH_Y6X_pD_kV-E4KBh-mi0wBApr-VcK1hA8gIBUiT8jqA9BGBnjsPkA_qaqpPUNpS2qZY_3js=rw-w160';

const PRIZES = [
  'Voucher giảm 50% gói Thiết kế Web Premium',
  'Mã giảm giá 1.000.000đ khi làm website',
  'Tặng kèm tên miền .com/.vn miễn phí 1 năm',
  'Tặng gói Hosting Premium 12 tháng',
  'Voucher giảm giá 30% dịch vụ SEO',
  'Chúc bạn may mắn lần sau!',
];

export default function PotSmashingGame({
  imageInit = DEFAULT_INIT,
  imageResult = DEFAULT_RESULT,
  columnCount = 6,
  rowCount = 2,
  allowEdit = false,
}: Props) {
  const totalPots = Math.min(columnCount * rowCount, 12); // Cap at 12 for clean display
  const [smashed, setSmashed] = useState<Record<number, boolean>>({});
  const [activeHammer, setActiveHammer] = useState<number | null>(null);
  const [prizeModal, setPrizeModal] = useState<string | null>(null);

  const handleSmash = (index: number) => {
    if (allowEdit) return; // Prevent playing inside editor click mode
    if (smashed[index]) return; // Already smashed

    // Trigger hammer swing animation
    setActiveHammer(index);
    
    setTimeout(() => {
      setSmashed((prev) => ({ ...prev, [index]: true }));
      setActiveHammer(null);
      
      // Determine random prize
      const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
      setTimeout(() => {
        setPrizeModal(randomPrize);
      }, 300);
    }, 500);
  };

  const handleReset = () => {
    setSmashed({});
    setPrizeModal(null);
  };

  return (
    <div className="py-8 px-4 bg-amber-50/30 rounded-3xl border border-amber-200/50 max-w-4xl mx-auto text-center relative select-none">
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-amber-900 flex items-center justify-center gap-2">
          🔨 ĐẬP NIÊU ĐẤT — NHẬN QUÀ KHỦNG 🎁
        </h3>
        <p className="text-amber-800/70 text-xs sm:text-sm mt-1">
          Hãy click vào một chiếc niêu đất bên dưới để thử vận may của bạn!
        </p>
      </div>

      {/* Grid of Pots */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-center items-center my-6">
        {Array.from({ length: totalPots }).map((_, i) => {
          const isSmashed = smashed[i];
          const isActive = activeHammer === i;
          return (
            <div
              key={i}
              onClick={() => handleSmash(i)}
              className={`relative cursor-pointer transition-all duration-300 transform ${
                isSmashed ? 'scale-95 opacity-90' : 'hover:scale-105 hover:-translate-y-1'
              }`}
            >
              {/* Ceramic Pot Image */}
              <img
                src={isSmashed ? imageResult : imageInit}
                alt={`Niêu đất ${i + 1}`}
                className="w-24 h-24 object-contain mx-auto select-none pointer-events-none"
              />

              {/* Hammer Overlay Swing Animation */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <span
                    className="text-4xl animate-wiggle inline-block"
                    style={{
                      transformOrigin: 'bottom right',
                      animation: 'hammerSwing 0.5s ease-in-out forwards',
                    }}
                  >
                    🔨
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      {Object.keys(smashed).length > 0 && (
        <button
          onClick={handleReset}
          className="mt-2 inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-full shadow-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Chơi lại từ đầu
        </button>
      )}

      {/* Styled CSS animation for hammer swing */}
      <style jsx global>{`
        @keyframes hammerSwing {
          0% { transform: rotate(0deg) translate(10px, -20px); }
          50% { transform: rotate(-45deg) translate(0px, -10px); }
          100% { transform: rotate(15deg) translate(-5px, 5px); }
        }
      `}</style>

      {/* Prize Modal Dialog */}
      {prizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center relative border border-amber-100 shadow-2xl animate-scale-up">
            <button
              onClick={() => setPrizeModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-700">
              <Gift className="h-8 w-8 animate-pulse" />
            </div>

            <h4 className="text-xl font-black text-[#0f0f0f] mb-2">
              🎉 XIN CHÚC MỪNG! 🎉
            </h4>
            
            <p className="text-sm text-gray-500 mb-6">
              Bạn đã đập trúng phần thưởng độc quyền dưới đây:
            </p>

            <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 mb-6">
              <span className="font-extrabold text-amber-900 text-base leading-relaxed block">
                {prizeModal}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPrizeModal(null)}
                className="w-full bg-[#006672] hover:bg-[#004d56] text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-sm shadow-md"
              >
                Nhận quà ngay
              </button>
              <button
                onClick={() => setPrizeModal(null)}
                className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 py-2.5 px-6 rounded-xl transition-colors cursor-pointer text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
