import React from 'react';
import { motion } from 'framer-motion';
import { useKpiData } from '../hooks/useKpiData';
import { AnimatedCard } from './AnimatedCard';
import { AnimatedPipeline } from './AnimatedPipeline';
import { Particles } from './Particles';

export const FeatureSection: React.FC = () => {
  const { data, isLoading, isError, refetch } = useKpiData();

  return (
    <section aria-labelledby="feature-heading" className="py-20 relative overflow-hidden">
      <Particles />
      <div className="container">
        <h2 id="feature-heading" className="text-3xl font-bold mb-6">Cloud optimization — Live insights</h2>

        <AnimatedPipeline />

        <motion.div
          className="grid gap-4 kpi-grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12 }}
        >
          {isLoading && <div className="text-white/60">Loading metrics…</div>}
          {isError && (
            <div>
              <div className="text-red-300">Failed to load</div>
              <button onClick={() => refetch()} className="mt-2 px-3 py-1 bg-white/6 rounded">Retry</button>
            </div>
          )}
          {!isLoading && data && (
            <ul className="flex gap-4" role="list">
              {data.map((kpi) => (
                <AnimatedCard
                  key={kpi.id}
                  title={kpi.title}
                  value={kpi.value}
                  videoSrc={'/micro-preview.mp4'}
                />
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </section>
  );
};
