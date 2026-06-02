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
  const innerRef = useRef<HTMLDivElement | null>(null);

  function handlePointerMove(e: React.PointerEvent) {
    if (!innerRef.current || shouldReduce) return;
    const rect = innerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10; // degrees
    const rotateX = (0.5 - py) * 8; // degrees
    const translateZ = 8;
    innerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
  }

  function handlePointerLeave() {
    if (!innerRef.current) return;
    innerRef.current.style.transform = '';
  }

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
        <div
          ref={innerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative rounded-[var(--radius-1)] bg-[color:var(--color-bg-primary)]/45 p-4"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 180ms ease-out' }}
        >
          <div className="text-sm text-white/70">{title}</div>
          <div className="mt-3 text-3xl font-semibold" aria-live="polite">{count.toLocaleString()}</div>
          <div className="mt-2 text-xs text-white/60">since last week</div>
          <PlayPreview ref={previewRef} src={videoSrc} poster={undefined} />
        </div>
      </motion.div>
    </motion.li>
  );
};
