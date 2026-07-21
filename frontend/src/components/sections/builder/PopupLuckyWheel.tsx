'use client';

import { useState, useEffect, useRef } from 'react';
import { Gift, HelpCircle, RotateCw, X } from 'lucide-react';

interface Props {
  allowEdit?: boolean;
}

const SEGMENTS = [
  { text: 'Voucher 50%', color: '#ff6f00' },
  { text: 'Chúc may mắn', color: '#ffb300' },
  { text: 'Giảm 1.000.000đ', color: '#00897b' },
  { text: 'Thử lại sau', color: '#00acc1' },
  { text: 'Tặng Domain', color: '#3949ab' },
  { text: 'Hosting 12 thg', color: '#8e24aa' },
];

export default function PopupLuckyWheel({ allowEdit = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [prizeModal, setPrizeModal] = useState<string | null>(null);
  const [currentAngle, setCurrentAngle] = useState(0);

  // Animation values
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const spinningRef = useRef(false);

  // Draw the wheel on canvas
  const drawWheel = (ctx: CanvasRenderingContext2D, center: number, radius: number) => {
    ctx.clearRect(0, 0, center * 2, center * 2);
    const numSegments = SEGMENTS.length;
    const arcSize = (2 * Math.PI) / numSegments;

    // Save context state
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angleRef.current);

    for (let i = 0; i < numSegments; i++) {
      const angle = i * arcSize;
      ctx.beginPath();
      ctx.fillStyle = SEGMENTS[i].color;
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arcSize);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.stroke();

      // Text drawing
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'right';
      ctx.rotate(angle + arcSize / 2);
      ctx.fillText(SEGMENTS[i].text, radius - 15, 5);
      ctx.restore();
    }

    ctx.restore();

    // Center peg/pin drawing
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.arc(center, center, 18, 0, 2 * Math.PI);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow

    // Inner circle ring
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#006672';
    ctx.arc(center, center, 14, 0, 2 * Math.PI);
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawWheel(ctx, 150, 140);
  }, [currentAngle]);

  const spin = () => {
    if (allowEdit || spinningRef.current) return;

    setSpinning(true);
    spinningRef.current = true;

    // Start with a high rotation velocity
    speedRef.current = Math.random() * 0.3 + 0.4; // Initial speed
    const friction = 0.985; // Deceleration rate

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      angleRef.current += speedRef.current;
      speedRef.current *= friction;

      drawWheel(ctx, 150, 140);

      if (speedRef.current < 0.002) {
        // Stopped rotating
        spinningRef.current = false;
        setSpinning(false);
        speedRef.current = 0;

        // Calculate which segment stopped at the top needle (which is at angle = 1.5 * Math.PI or -Math.PI/2)
        const numSegments = SEGMENTS.length;
        const arcSize = (2 * Math.PI) / numSegments;
        
        // Normalize angle to 0 - 2*Math.PI
        let normalizedAngle = angleRef.current % (2 * Math.PI);
        if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;

        // The needle points vertically UP (at index location offset)
        // Offset rotation math to map the stopping section
        const stoppingSegmentIndex = Math.floor(
          (numSegments - (normalizedAngle / arcSize)) % numSegments
        );

        const wonPrize = SEGMENTS[stoppingSegmentIndex].text;
        setPrizeModal(wonPrize);
      } else {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <div className="py-8 px-4 bg-teal-50/20 rounded-3xl border border-teal-100 max-w-sm mx-auto text-center select-none relative">
      <div className="mb-4">
        <h4 className="text-lg font-black text-teal-950 flex items-center justify-center gap-1.5">
          🎯 VÒNG QUAY MAY MẮN 🎯
        </h4>
        <p className="text-teal-900/60 text-xs mt-1">
          Quay để trúng quà tặng bất ngờ từ KABO Agency!
        </p>
      </div>

      {/* The Wheel Canvas */}
      <div className="relative w-[300px] h-[300px] mx-auto my-4">
        {/* Top Indicator Needle */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '24px solid #ef4444',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
          }}
        />
        
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="mx-auto rounded-full bg-white shadow-xl border-4 border-[#006672]"
        />
      </div>

      {/* Spin Button */}
      <button
        onClick={spin}
        disabled={spinning}
        className={`mt-2 font-black text-xs uppercase px-7 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto cursor-pointer ${
          spinning
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed scale-95'
            : 'bg-[#006672] hover:bg-[#004d56] text-white hover:scale-105 active:scale-95'
        }`}
      >
        <RotateCw className={`h-4 w-4 ${spinning ? 'animate-spin' : ''}`} />
        {spinning ? 'Đang quay...' : 'QUAY NGAY'}
      </button>

      {/* Result Dialog Modal */}
      {prizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative border border-teal-50 shadow-2xl animate-scale-up">
            <button
              onClick={() => setPrizeModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-700">
              <Gift className="h-8 w-8 animate-bounce" />
            </div>

            <h5 className="text-lg font-black text-[#0f0f0f] mb-1">
              {prizeModal.includes('Chúc') || prizeModal.includes('Thử') ? 'Ôi, tiếc quá!' : 'XIN CHÚC MỪNG! 🎉'}
            </h5>
            
            <p className="text-xs text-gray-400 mb-5">
              {prizeModal.includes('Chúc') || prizeModal.includes('Thử') 
                ? 'Hãy thử vận may của bạn ở lượt quay tiếp theo.' 
                : 'Bạn đã quay trúng phần quà hấp dẫn sau:'}
            </p>

            <div className="bg-teal-50/50 border border-teal-200/50 rounded-xl p-4 mb-5">
              <span className="font-extrabold text-teal-900 text-sm block">
                {prizeModal}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setPrizeModal(null)}
                className="w-full bg-[#006672] hover:bg-[#004d56] text-white font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer text-xs"
              >
                {prizeModal.includes('Chúc') || prizeModal.includes('Thử') ? 'Quay lại' : 'Nhận mã quà tặng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
