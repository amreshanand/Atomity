import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const storyCards = [
  {
    title: 'Orchestrate',
    eyebrow: 'Multi-cloud control',
    body: 'The clip opens with a command layer that coordinates AWS, Azure, GCP, and sovereign environments.',
    accent: 'from-sky-300/25 to-blue-500/10',
  },
  {
    title: 'Optimize',
    eyebrow: 'Live savings',
    body: 'As workloads rebalance, the story becomes cost reduction, utilization change, and faster routing.',
    accent: 'from-emerald-300/25 to-emerald-500/10',
  },
  {
    title: 'Sustain',
    eyebrow: 'Carbon-aware',
    body: 'The sustainability angle is not decorative here. It is tied to measurable routing decisions.',
    accent: 'from-amber-300/25 to-amber-500/10',
  },
];

export const Sustainability3DScene: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const sceneStyle = useMemo(
    () => ({
      perspective: 1500,
      transformStyle: 'preserve-3d' as const,
      transform: shouldReduce
        ? 'none'
        : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      transition: shouldReduce ? 'none' : 'transform 180ms ease-out',
    }),
    [shouldReduce, tilt.x, tilt.y],
  );

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 10, y: px * 14 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      className="relative h-full min-h-[680px] overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_32px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      initial={{ opacity: 0, y: 28, rotateX: 12 }}
      whileInView={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 110, damping: 18 }}
      style={sceneStyle}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />
        <div className="absolute left-[-10%] top-[12%] h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.18),transparent_65%)] blur-3xl" />
        <div className="absolute right-[-8%] top-[22%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-[-12%] left-[18%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.14),transparent_65%)] blur-3xl" />
      </div>

      <div className="absolute inset-0 [transform-style:preserve-3d] overflow-visible">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ transform: 'translate(-50%, -50%) translateZ(-120px)' }}
          animate={shouldReduce ? {} : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.65)]" />
          <div className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.65)]" />
          <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.65)]" />
          <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_24px_rgba(196,181,253,0.65)]" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-[40px] border border-white/15 bg-[linear-gradient(180deg,rgba(7,17,29,0.76),rgba(7,17,29,0.95))] shadow-[0_0_80px_rgba(0,0,0,0.3)]"
          style={{ transform: 'translate(-50%, -50%) translateZ(40px)' }}
          animate={shouldReduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <video
            src="/micro-preview.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full rounded-[40px] object-cover opacity-80"
          />
          <div className="absolute inset-0 rounded-[40px] bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.22),transparent_40%),linear-gradient(180deg,rgba(6,17,38,0.08),rgba(6,17,38,0.74))]" />
        </motion.div>

        {storyCards.map((card, index) => {
          const positions = [
            { x: -360, y: -160, z: 100, rotateY: 18, rotateX: 8 },
            { x: 360, y: -160, z: 110, rotateY: -18, rotateX: 10 },
            { x: 0, y: 290, z: 140, rotateY: 0, rotateX: -14 },
          ];
          const position = positions[index];

          return (
            <motion.div
              key={card.title}
              className={`absolute left-1/2 top-1/2 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] border border-white/10 bg-gradient-to-br ${card.accent} p-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl`}
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${position.rotateY}deg) rotateX(${position.rotateX}deg)`,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.18 * index, duration: 0.7, ease: 'easeOut' }}
              animate={shouldReduce ? {} : { y: [position.y, position.y - 8, position.y] }}
              whileHover={shouldReduce ? {} : { scale: 1.04, zIndex: 40 }}
            >
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/50">{card.eyebrow}</div>
              <div className="mt-2 text-xl font-semibold text-white">{card.title}</div>
              <p className="mt-2 text-xs leading-5 text-white/72">{card.body}</p>
            </motion.div>
          );
        })}
      </div>

    </motion.div>
  );
};
