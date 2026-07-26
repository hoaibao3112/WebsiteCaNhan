'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 8) + 4,
  left: `${Math.floor(Math.random() * 90) + 5}%`,
  top: `${Math.floor(Math.random() * 90) + 5}%`,
  duration: Math.floor(Math.random() * 6) + 8,
  delay: Math.random() * 4,
  color: i % 3 === 0 ? '#fbe449' : i % 3 === 1 ? '#80c2cb' : '#38bdf8',
}));

export default function RichTechBackground() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      
      {/* 1. Main Artwork with Smooth Pan & Zoom Parallax Motion */}
      <motion.div
        className="relative w-full h-full"
        animate={shouldReduce ? {} : {
          scale: [1, 1.08, 1],
          x: [0, -20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/tech-stack-bg.png"
          alt="Technology Artwork Background"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* 2. Overlay Gradient Masks for High Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04131a]/90 via-[#004d56]/80 to-[#04131a]/95 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,19,26,0.65)_100%)]" />

      {/* 3. Glowing Tech Orbs & Rotating Energy Rings */}
      <motion.div
        className="absolute top-1/4 -left-20 size-[450px] rounded-full opacity-35 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #006672 0%, #80c2cb 50%, transparent 80%)' }}
        animate={shouldReduce ? {} : {
          scale: [1, 1.25, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-20 size-[500px] rounded-full opacity-30 blur-[110px]"
        style={{ background: 'radial-gradient(circle, #fbe449 0%, #006672 60%, transparent 80%)' }}
        animate={shouldReduce ? {} : {
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* 4. Rotating Energy Ring Ring Outline */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] sm:size-[850px] rounded-full border border-[#80c2cb]/15 pointer-events-none"
        animate={shouldReduce ? {} : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#fbe449] shadow-[0_0_15px_#fbe449]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#80c2cb] shadow-[0_0_15px_#80c2cb]" />
      </motion.div>

      {/* 5. Scanning Horizontal Laser Light Beam */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fbe449]/60 to-transparent shadow-[0_0_12px_#fbe449]"
        animate={shouldReduce ? {} : {
          top: ['10%', '90%', '10%'],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 6. Glowing Grid Dot Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

      {/* 7. Floating Light Particles (15 Dynamic Floating Nodes) */}
      {!shouldReduce &&
        PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full shadow-lg"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              backgroundColor: p.color,
              boxShadow: `0 0 12px ${p.color}`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}

    </div>
  );
}
