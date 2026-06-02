import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { PlayPreview, PlayPreviewHandle } from './PlayPreview';
import { useRef } from 'react';

type Props = {
  title: string;
  value: number;
  videoSrc?: string;
};

export const AnimatedCard: React.FC<Props> = ({ title, value, videoSrc }) => {
  const shouldReduce = useReducedMotion();
  const count = useCountUp(value, 1000 + Math.min(800, value * 2));

  const previewRef = useRef<PlayPreviewHandle | null>(null);

  return (
    <motion.li
      className="relative p-0 min-w-[180px]"
      initial={{ opacity: 0, y: 18 }}
      whileInView={!shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18 }}
    >
      <motion.div
        className="transform-gpu will-change-transform bg-gradient-to-br from-white/3 to-white/6 rounded-[var(--radius-1)] p-4 shadow-lg"
        style={{ perspective: 800 }}
        whileHover={!shouldReduce ? { scale: 1.02, translateY: -6 } : undefined}
        whileFocus={!shouldReduce ? { scale: 1.02, translateY: -6 } : undefined}
        tabIndex={0}
        role="group"
        aria-label={`KPI card: ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            previewRef.current?.focusButton();
          }
        }}
      >
        <div className="relative rounded-[var(--radius-1)] bg-[color:var(--color-bg-primary)]/45 p-4" style={{ transformStyle: 'preserve-3d' }}>
          <div className="text-sm text-white/70">{title}</div>
          <div className="mt-3 text-3xl font-semibold" aria-live="polite">{count.toLocaleString()}</div>
          <div className="mt-2 text-xs text-white/60">since last week</div>
          <PlayPreview ref={previewRef} src={videoSrc} poster={undefined} />
        </div>
      </motion.div>
    </motion.li>
  );
};
