import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ConnectionLineProps {
  provider: 'aws' | 'azure' | 'gcp' | 'onprem';
  isOptimizing?: boolean;
  interactionPulse?: number;
}

// Simple SVG path from provider node (placeholder coordinates) to center
const getPath = (provider: ConnectionLineProps['provider']) => {
  switch (provider) {
    case 'aws':
      return 'M0 0 C150 200, 250 200, 300 0';
    case 'azure':
      return 'M600 0 C450 200, 350 200, 300 0';
    case 'gcp':
      return 'M0 600 C150 400, 250 400, 300 600';
    case 'onprem':
      return 'M600 600 C450 400, 350 400, 300 600';
    default:
      return '';
  }
};

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ provider, isOptimizing, interactionPulse }) => {
  const shouldReduce = useReducedMotion();

  const path = getPath(provider);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      viewBox="0 0 600 600"
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke={shouldReduce ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.12)'}
        strokeWidth={2}
        strokeDasharray="600"
        strokeDashoffset={shouldReduce ? 0 : 600}
        animate={shouldReduce ? {} : { strokeDashoffset: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        key={interactionPulse}
      />
      <motion.circle
        r="4"
        fill="rgba(255,255,255,0.8)"
        animate={shouldReduce ? {} : { offsetDistance: ['0%', '100%'] }}
        transition={{
          duration: isOptimizing ? 0.8 : 2.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        key={`${interactionPulse}-dot`}
        style={{ offsetPath: `path("${path}")` } as any}
      />
    </svg>
  );
};
