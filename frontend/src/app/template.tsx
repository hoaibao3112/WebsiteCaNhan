'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: shouldReduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: shouldReduce ? 1 : 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
