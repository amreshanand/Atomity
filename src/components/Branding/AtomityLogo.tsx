import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AtomityLogoProps {
  size?: number;
  showText?: boolean;
}

/**
 * Animated Atomity logo — an orbital atom symbol with glowing nucleus.
 * Represents Atomity's core mission: atomic-level orchestration of cloud workloads.
 */
export const AtomityLogo: React.FC<AtomityLogoProps> = ({ size = 40, showText = true }) => {
  const shouldReduce = useReducedMotion();

  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Atomity logo"
        role="img"
      >
        <defs>
          <radialGradient id="nucleus-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </radialGradient>
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Nucleus */}
        <circle cx="50" cy="50" r="8" fill="url(#nucleus-glow)" filter="url(#logo-glow)" />

        {/* Orbit 1 – horizontal ellipse */}
        <motion.ellipse
          cx="50" cy="50" rx="38" ry="14"
          stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" fill="none"
          animate={shouldReduce ? {} : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50px 50px' }}
        />
        {/* Electron on orbit 1 */}
        <motion.circle
          r="3" fill="#60a5fa" filter="url(#logo-glow)"
          animate={shouldReduce ? { cx: 88, cy: 50 } : {
            cx: [88, 50, 12, 50, 88],
            cy: [50, 36, 50, 64, 50],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbit 2 – tilted 60° */}
        <motion.ellipse
          cx="50" cy="50" rx="38" ry="14"
          stroke="rgba(139,92,246,0.35)" strokeWidth="1.5" fill="none"
          style={{ transformOrigin: '50px 50px', rotate: '60deg' }}
          animate={shouldReduce ? {} : { rotate: '420deg' }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        {/* Electron on orbit 2 */}
        <motion.circle
          r="3" fill="#8b5cf6" filter="url(#logo-glow)"
          animate={shouldReduce ? { cx: 69, cy: 17 } : {
            cx: [69, 31, 31, 69, 69],
            cy: [17, 17, 83, 83, 17],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Orbit 3 – tilted -60° */}
        <motion.ellipse
          cx="50" cy="50" rx="38" ry="14"
          stroke="rgba(34,197,94,0.3)" strokeWidth="1.5" fill="none"
          style={{ transformOrigin: '50px 50px', rotate: '-60deg' }}
          animate={shouldReduce ? {} : { rotate: '300deg' }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        {/* Electron on orbit 3 */}
        <motion.circle
          r="3" fill="#22c55e" filter="url(#logo-glow)"
          animate={shouldReduce ? { cx: 31, cy: 17 } : {
            cx: [31, 69, 69, 31, 31],
            cy: [17, 17, 83, 83, 17],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </svg>

      {showText && (
        <span
          className="text-xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #8b5cf6 50%, #22c55e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Atomity
        </span>
      )}
    </div>
  );
};
