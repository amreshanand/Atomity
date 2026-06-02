import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  isOptimizing: boolean;
  onOptimize: () => void;
  interactionPulse?: number;
}

export const AutoOptimizeButton: React.FC<Props> = ({ isOptimizing, onOptimize, interactionPulse }) => {
  const shouldReduce = useReducedMotion();
  const statusText = isOptimizing ? 'Rebalancing live workloads' : 'One-click auto-optimize';

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
      <motion.button
        onClick={onOptimize}
        disabled={isOptimizing}
        className="relative min-w-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(135deg, rgba(30,58,138,0.98), rgba(49,46,129,0.94))',
        }}
        whileHover={shouldReduce || isOptimizing ? {} : { scale: 1.04, y: -2 }}
        whileTap={shouldReduce || isOptimizing ? {} : { scale: 0.98 }}
        aria-label="Auto-optimize workloads"
        aria-live="polite"
        aria-busy={isOptimizing}
        aria-pressed={isOptimizing}
      >
        <motion.div
          key={interactionPulse}
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={shouldReduce ? {} : { opacity: [0, 0.28, 0], scale: [0.98, 1.04, 1.08] }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.4), transparent 68%)' }}
        />

        {/* Ambient glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={shouldReduce ? {} : { opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(120px 60px at 50% 0%, rgba(255,255,255,0.18), transparent 70%), radial-gradient(180px 90px at 80% 120%, rgba(59,130,246,0.28), transparent 65%)',
          }}
        />

        {/* Shimmer sweep */}
        {!isOptimizing && (
          <motion.div
            className="pointer-events-none absolute inset-0 w-[220%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[28deg]"
            initial={{ x: '-150%' }}
            animate={shouldReduce ? {} : { x: '150%' }}
            transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="relative flex items-center gap-4 text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            {isOptimizing ? (
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-white"
                animate={shouldReduce ? {} : { rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
                <path d="M20 12a8 8 0 01-8 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" opacity="0.35" />
              </motion.svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-[0.18em] uppercase text-white/90">
                {isOptimizing ? 'Optimizing' : 'Auto-optimize'}
              </span>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] uppercase ${isOptimizing ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100' : 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100'}`}>
                Live
              </span>
            </div>

            <p className="mt-1 text-xs leading-snug text-white/72">
              {statusText}
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400"
                initial={false}
                animate={isOptimizing ? { x: ['-20%', '110%'] } : { x: '0%' }}
                transition={isOptimizing ? { duration: 1.25, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
                style={{ width: isOptimizing ? '45%' : '100%', transformOrigin: 'left center' }}
              />
            </div>
          </div>
        </div>
      </motion.button>
    </div>
  );
};
