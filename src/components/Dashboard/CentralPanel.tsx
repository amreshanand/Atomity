import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCloudMetrics } from '../../hooks/useCloudMetrics';

// Bar component for each cloud provider metric
const Bar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const shouldReduce = useReducedMotion();
  const heightPercent = Math.min(value / 100, 1) * 100; // assuming value out of 100
  return (
    <div className="flex flex-col items-center justify-end w-16 h-32">
      <motion.div
        className="w-8 rounded-t bg-current"
        style={{ backgroundColor: color, height: `${heightPercent}%` }}
        initial={{ height: 0 }}
        animate={shouldReduce ? {} : { height: `${heightPercent}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        aria-label={`${label} utilization ${value}%`}
      />
      <span className="mt-2 text-xs font-semibold text-white/80">{label}</span>
    </div>
  );
};

// Savings ticker – live updating number
const SavingsTicker = ({ isOptimizing, interactionPulse }: { isOptimizing?: boolean; interactionPulse?: number }) => {
  const { data } = useCloudMetrics();
  const savings = data?.savings ?? 0;
  const shouldReduce = useReducedMotion();
  
  if (isOptimizing) {
    return (
      <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-2 text-xl font-bold text-blue-400 mt-2 pointer-events-auto">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Rebalancing Workloads...
      </div>
    );
  }

  return (
    <motion.div
      key={interactionPulse}
      className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-2xl font-bold text-white mt-2 pointer-events-auto"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={shouldReduce ? {} : { opacity: 1, scale: [1, 1.02, 1] }}
      transition={{ duration: 0.35 }}
      aria-live="polite"
    >
      ${savings.toLocaleString()} <span className="text-sm font-medium text-white/70">saved today</span>
    </motion.div>
  );
};

interface CentralPanelProps {
  isOptimizing?: boolean;
  interactionPulse?: number;
}

export const CentralPanel: React.FC<CentralPanelProps> = ({ isOptimizing, interactionPulse }) => {
  const { data } = useCloudMetrics();
  const shouldReduce = useReducedMotion();
  const metrics = data?.metrics ?? [];
  const colors = {
    aws: 'var(--color-awsOrange)',
    azure: 'var(--color-azureBlue)',
    gcp: 'var(--color-gcpBlue)',
    onprem: 'var(--color-onPremGray)',
  } as const;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
      <motion.div
        key={interactionPulse}
        className="mb-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-[0.2em] uppercase text-white/70 backdrop-blur-sm"
        initial={{ opacity: 0.55, scale: 0.98 }}
        animate={shouldReduce ? {} : { opacity: [0.65, 1, 0.65], scale: [0.98, 1.02, 1] }}
        transition={{ duration: 0.35 }}
      >
        {isOptimizing ? 'Rebalancing workloads' : 'System ready'}
      </motion.div>
      <div className="flex items-end gap-6 mb-6">
        {metrics.map((m) => (
          <Bar
            key={m.provider}
            label={m.provider.toUpperCase()}
            value={m.utilization}
            color={colors[m.provider as keyof typeof colors]}
          />
        ))}
      </div>
      <SavingsTicker isOptimizing={isOptimizing} interactionPulse={interactionPulse} />
    </div>
  );
};
