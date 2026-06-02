import React from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { HexPod } from './HexPod';

type Provider = 'aws' | 'azure' | 'gcp' | 'onprem';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CloudNodeProps {
  provider: Provider;
  position: Position;
  interactionPulse?: number;
}

// Mapping provider to brand color token
const providerColors: Record<Provider, string> = {
  aws: 'var(--color-awsOrange)',
  azure: 'var(--color-azureBlue)',
  gcp: 'var(--color-gcpBlue)',
  onprem: 'var(--color-onPremGray)',
};

// Positioning in absolute container (corner offsets)
const positionStyles: Record<Position, React.CSSProperties> = {
  'top-left': { top: '15%', left: '10%' },
  'top-right': { top: '15%', right: '10%' },
  'bottom-left': { bottom: '20%', left: '10%' },
  'bottom-right': { bottom: '20%', right: '10%' },
};

export const CloudNode: React.FC<CloudNodeProps> = ({ provider, position, interactionPulse }) => {
  const controls = useAnimation();
  const shouldReduce = useReducedMotion();

  const handleHoverStart = () => {
    controls.start('hover');
  };
  const handleHoverEnd = () => {
    controls.start('idle');
  };

  const variants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.08, rotate: 4 },
  };

  return (
    <motion.div
      className="absolute z-20"
      style={positionStyles[position]}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      animate={controls}
      variants={variants}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      <motion.div
        key={interactionPulse}
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={shouldReduce ? {} : { opacity: [0, 0.42, 0], scale: [0.9, 1.08, 1.16] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: `radial-gradient(circle, ${providerColors[provider]} 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />

      {/* Heptagonal container with brand color */}
      <div
        className="relative w-32 h-32 flex items-center justify-center"
        style={{
          background: `color-mix(in srgb, ${providerColors[provider]} 15%, rgba(255,255,255,0.03))`,
          border: `1px solid color-mix(in srgb, ${providerColors[provider]} 30%, transparent)`,
          backdropFilter: 'blur(8px)',
          clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 95%, 25% 95%, 0% 60%, 10% 20%)',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))',
        }}
      >
        {/* Inner pods representing workloads */}
        <HexPod provider={provider} />
      </div>
    </motion.div>
  );
};
