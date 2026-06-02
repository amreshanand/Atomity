import React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

export const AnimatedPipeline: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

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
          strokeDashoffset="600"
          variants={{
            visible: { strokeDashoffset: 0, transition: { duration: 1.2, ease: 'easeOut' } },
            hidden: { strokeDashoffset: 600 },
          }}
          initial="hidden"
          animate={controls}
        />

        <motion.circle
          r={8}
          fill="var(--color-accent-primary)"
          cx={20}
          cy={80}
          variants={{
            visible: { translateX: 500, transition: { duration: 1.4, ease: 'easeOut' } },
            hidden: { translateX: 0 },
          }}
          initial="hidden"
          animate={controls}
        />
      </svg>
    </div>
  );
};
