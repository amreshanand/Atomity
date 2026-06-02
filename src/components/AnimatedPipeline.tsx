import React from 'react';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect } from 'react';

export const AnimatedPipeline: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  const shouldReduce = useReducedMotion();

  const path = 'M20 80 C200 0, 340 160, 520 80';

  return (
    <div ref={ref} className="mb-8 overflow-visible">
      <svg viewBox="0 0 560 160" className="w-full h-auto" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <motion.path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={2}
          strokeDasharray="600"
          strokeDashoffset={shouldReduce ? 0 : 600}
          variants={shouldReduce ? undefined : {
            visible: { strokeDashoffset: 0, transition: { duration: 1.2, ease: 'easeOut' } },
            hidden: { strokeDashoffset: 600 },
          }}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : controls}
        />

        <motion.circle
          r={8}
          fill="var(--color-accent-primary)"
          cx={20}
          cy={80}
          initial={shouldReduce ? { translateX: 0 } : undefined}
          animate={shouldReduce ? { translateX: 0 } : controls}
          variants={shouldReduce ? undefined : {
            visible: { translateX: 500, transition: { duration: 1.4, ease: 'easeOut' } },
            hidden: { translateX: 0 },
          }}
        />
      </svg>
    </div>
  );
};
