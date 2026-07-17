'use client';

import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInView({ children, delay = 0, className }: Props) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: shouldReduce ? 0 : 0.5, delay: shouldReduce ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
