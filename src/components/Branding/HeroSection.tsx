import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const stats = [
  { label: 'Active Workloads', value: '2,847', icon: '⚡' },
  { label: 'Cloud Regions', value: '24', icon: '🌍' },
  { label: 'Cost Saved (MTD)', value: '$127K', icon: '💰' },
  { label: 'Carbon Offset', value: '94%', icon: '🌱' },
];

/**
 * Hero section — full-width banner with tagline, stats, and CTA.
 * This is the "wow" section above the dashboard.
 */
export const HeroSection: React.FC = () => {
  const shouldReduce = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative pt-28 pb-16 px-6 overflow-hidden" id="dashboard">
      {/* Gradient orbs background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
            top: '-200px',
            left: '-100px',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
            top: '-100px',
            right: '-50px',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)',
            bottom: '-150px',
            left: '40%',
          }}
        />
      </div>

      <div className="container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={shouldReduce ? 'visible' : 'visible'}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.2)',
                color: '#60a5fa',
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
              </span>
              Live Multi-Cloud Orchestration
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-3xl"
          >
            <span className="text-white">Orchestrate.</span>{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 40%, #22c55e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Optimize.
            </span>{' '}
            <span className="text-white">Sustain.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/60 max-w-xl mb-10 leading-relaxed"
          >
            Atomity provides sovereign, compliance-first AI workload orchestration across AWS, Azure, GCP
            and on-premise — with real-time cost optimization and carbon-aware scheduling.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 mb-16">
            <motion.button
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                boxShadow: '0 4px 24px rgba(59,130,246,0.3)',
              }}
              whileHover={shouldReduce ? {} : { scale: 1.04, boxShadow: '0 8px 32px rgba(59,130,246,0.45)' }}
              whileTap={{ scale: 0.97 }}
            >
              Open Dashboard →
            </motion.button>
            <motion.button
              className="px-6 py-3 rounded-lg text-sm font-medium text-white/80"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={shouldReduce ? {} : { scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
            >
              View Documentation
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl p-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={shouldReduce ? {} : { scale: 1.03, background: 'rgba(255,255,255,0.06)' }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
