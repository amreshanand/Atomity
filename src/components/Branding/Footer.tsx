import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AtomityLogo } from './AtomityLogo';

const footerLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
  { label: 'Documentation', href: '#' },
  { label: 'Support', href: '#' },
];

/**
 * Footer with Atomity branding, ESG badges, and links.
 */
export const Footer: React.FC = () => {
  const shouldReduce = useReducedMotion();

  return (
    <footer
      className="relative py-8 px-6 mt-auto"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(6, 17, 38, 0.8)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="container flex flex-wrap items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <AtomityLogo size={28} showText />
          <p className="text-xs text-white/40 max-w-xs leading-relaxed">
            Sovereign AI workload orchestration — compliance-first, carbon-aware, multi-cloud.
          </p>
        </div>

        {/* ESG Badges */}
        <div className="flex items-center gap-4">
          {/* Carbon neutral badge */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.25)',
              color: '#22c55e',
            }}
            whileHover={shouldReduce ? {} : { scale: 1.05 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M8 12l3 3 5-5" />
            </svg>
            Carbon Neutral
          </motion.div>

          {/* GDPR badge */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(59,130,246,0.25)',
              color: '#60a5fa',
            }}
            whileHover={shouldReduce ? {} : { scale: 1.05 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            GDPR Compliant
          </motion.div>

          {/* SOC2 badge */}
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.25)',
              color: '#a78bfa',
            }}
            whileHover={shouldReduce ? {} : { scale: 1.05 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            SOC 2 Type II
          </motion.div>
        </div>

        {/* Links */}
        <nav aria-label="Footer links">
          <ul className="flex gap-4">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Copyright */}
      <div className="container mt-6 pt-4 border-t border-white/5">
        <p className="text-xs text-white/25 text-center">
          © {new Date().getFullYear()} Atomity. All rights reserved. Built for sovereign cloud orchestration.
        </p>
      </div>
    </footer>
  );
};
