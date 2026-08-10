'use client';

import { motion, useReducedMotion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const WORDS = ['nhanh chóng.', 'đột phá.', 'chuyên nghiệp.', 'tăng trưởng.'];

export function TypewriterWord() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = WORDS[idx];
    if (!deleting && text.length < word.length)
      t.current = setTimeout(() => setText(word.slice(0, text.length + 1)), 70);
    else if (!deleting && text.length === word.length)
      t.current = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text.length > 0)
      t.current = setTimeout(() => setText(word.slice(0, text.length - 1)), 40);
    else { setDeleting(false); setIdx(i => (i + 1) % WORDS.length); }
    return () => { if (t.current) clearTimeout(t.current); };
  }, [text, deleting, idx]);

  return (
    <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
      {text}<span className="animate-pulse text-[#6366f1]">|</span>
    </span>
  );
}

export function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!isInView || shouldReduce) return;
    const ctrl = animate(count, value, { duration: 1.8, ease: 'easeOut' });
    return ctrl.stop;
  }, [isInView, value, count, shouldReduce]);

  return <motion.span ref={ref}>{shouldReduce ? `${value}${suffix}` : rounded}</motion.span>;
}

const STATS = [
  { value: 120, suffix: '+', label: 'Dự án', color: '#6366f1' },
  { value: 98,  suffix: '%', label: 'Hài lòng',  color: '#10b981' },
  { value: 5,   suffix: '★', label: 'Đánh giá',  color: '#f59e0b' },
];

export function HeroStats() {
  return (
    <div className="flex gap-6">
      {STATS.map((s, i) => (
        <div key={i} className="flex flex-col gap-0.5 hover:-translate-y-0.5 transition-transform duration-200">
          <span className="text-[28px] font-black tabular-nums leading-none" style={{ color: s.color }}>
            <AnimatedCounter value={s.value} suffix={s.suffix} />
          </span>
          <span className="text-xs text-[#9ca3af] font-medium">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
