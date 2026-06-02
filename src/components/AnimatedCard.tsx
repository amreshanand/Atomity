import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { PlayPreview } from './PlayPreview';

type Props = {
  title: string;
  value: number;
  videoSrc?: string;
};

export const AnimatedCard: React.FC<Props> = ({ title, value, videoSrc }) => {
  const shouldReduce = useReducedMotion();
  const count = useCountUp(value, 1000 + Math.min(800, value * 2));

  return (
    <motion.li
      className="relative p-0 min-w-[180px]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={!shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <div className="transform-gpu will-change-transform bg-gradient-to-br from-white/3 to-white/6 rounded-[var(--radius-1)] p-4 shadow-lg" style={{ perspective: 800 }}>
        <div className="relative rounded-[var(--radius-1)] bg-[color:var(--color-bg-primary)]/45 p-4" style={{ transformStyle: 'preserve-3d' }}>
          <div className="text-sm text-white/70">{title}</div>
          <div className="mt-3 text-3xl font-semibold">{count.toLocaleString()}</div>
          <div className="mt-2 text-xs text-white/60">since last week</div>
          <PlayPreview src={videoSrc} poster={undefined} />
        </div>
      </div>
    </motion.li>
  );
};
