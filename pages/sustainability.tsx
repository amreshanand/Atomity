import Head from 'next/head';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Header } from '../src/components/Branding/Header';
import { Footer } from '../src/components/Branding/Footer';
import { SandField } from '../src/components/Sustainability/SandField';
import { Sustainability3DScene } from '../src/components/Sustainability/Sustainability3DScene';
import { useCloudMetrics } from '../src/hooks/useCloudMetrics';

const sustainabilityPillars = [
  {
    title: 'Carbon-aware routing',
    value: '94%',
    body: 'Shift compute into lower-carbon regions and surface the gain instantly.',
  },
  {
    title: 'Sovereign-by-design',
    value: 'GDPR + SOC 2',
    body: 'Keep compliance visible while workloads rebalance across clouds.',
  },
  {
    title: 'Cost + sustainability',
    value: '$11.4K',
    body: 'Show the savings story alongside every optimization decision.',
  },
];

const metricsMap = [
  { label: 'AWS', tone: 'from-amber-300/30 to-amber-500/10' },
  { label: 'Azure', tone: 'from-sky-300/30 to-sky-500/10' },
  { label: 'GCP', tone: 'from-indigo-300/30 to-indigo-500/10' },
  { label: 'On-prem', tone: 'from-emerald-300/30 to-emerald-500/10' },
];

export default function SustainabilityPage() {
  const shouldReduce = useReducedMotion();
  const { data } = useCloudMetrics();
  const metrics = data?.metrics ?? [];
  const savings = data?.savings ?? 11435;

  return (
    <>
      <Head>
        <title>Atomity — Sustainability Preview</title>
        <meta
          name="description"
          content="A fresh animated sustainability page with a live video preview, 3D cards, and sand-style motion inspired by Atomity's cloud orchestration story."
        />
      </Head>

      <div className="min-h-screen bg-[var(--color-bg-primary)] text-white">
        <Header />

        <main className="relative overflow-hidden pt-28">
          <section className="relative px-6 pb-8">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute left-[-8%] top-[-8%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(234,179,8,0.16),transparent_66%)] blur-3xl" />
              <div className="absolute right-[-4%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_66%)] blur-3xl" />
              <div className="absolute bottom-[-10%] left-[20%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12),transparent_66%)] blur-3xl" />
            </div>

            <div className="container relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
                  Sustainability preview
                </div>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-6xl xl:text-7xl">
                  A fresh sustainability page with{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    sand, glass, and motion
                  </span>
                  .
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
                  Built from the same product story in the clip: carbon-aware orchestration, sovereign control,
                  live savings, and a design that feels tactile instead of flat.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/"
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Back to dashboard
                  </a>
                  <a
                    href="#impact"
                    className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/15"
                  >
                    Jump to impact
                  </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {sustainabilityPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      className="rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                      initial={{ opacity: 0, y: 16, rotateX: 10 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
                      whileHover={shouldReduce ? {} : { y: -6, rotateY: index % 2 === 0 ? 3 : -3, scale: 1.02 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="text-xs uppercase tracking-[0.28em] text-white/45">{pillar.title}</div>
                      <div className="mt-3 text-3xl font-semibold text-white">{pillar.value}</div>
                      <p className="mt-3 text-sm leading-6 text-white/62">{pillar.body}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="relative">
                <div className="absolute inset-0 translate-y-8 rounded-[36px] bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.18),transparent_65%)] blur-2xl" />
                <Sustainability3DScene />
              </div>
            </div>
          </section>

          <section className="relative px-6 py-10">
            <div className="container relative overflow-hidden rounded-[32px] border border-white/10 bg-white/4 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <SandField />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-amber-200/10 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              </div>

              <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                  <div className="inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
                    Dynamic sand field
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                    Energy moves like dunes.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/62 md:text-base">
                    The grain field reacts to your pointer like wind over sand. It turns the sustainability story into
                    motion without making the page feel noisy.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {metrics.map((metric, index) => {
                      const tone = metricsMap[index % metricsMap.length].tone;
                      return (
                        <motion.div
                          key={metric.provider}
                          className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${tone} p-4`}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{ delay: index * 0.08, duration: 0.55, ease: 'easeOut' }}
                          whileHover={shouldReduce ? {} : { y: -6, scale: 1.015 }}
                        >
                          <div className="text-xs uppercase tracking-[0.24em] text-white/45">{metric.provider}</div>
                          <div className="mt-2 text-3xl font-semibold text-white">{metric.utilization}%</div>
                          <div className="mt-1 text-sm text-white/65">live utilization from the orchestration flow</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="relative" id="impact">
                  <motion.div
                    className="rounded-[30px] border border-white/10 bg-black/25 p-5 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                    initial={{ opacity: 0, x: 24, rotateY: 10 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-white/45">Impact index</div>
                        <div className="mt-2 text-4xl font-semibold text-white">{savings.toLocaleString()}</div>
                      </div>
                      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-right text-xs text-emerald-100">
                        <div className="font-semibold">Carbon saved</div>
                        <div>Higher workload efficiency</div>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {[
                        'Reduced public-cloud pressure',
                        'Faster sovereign routing',
                        'Smooth live savings ticker',
                        '3D cards and glass controls',
                      ].map((item, index) => (
                        <motion.div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{ delay: index * 0.08, duration: 0.5 }}
                          whileHover={shouldReduce ? {} : { y: -4, scale: 1.01 }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
