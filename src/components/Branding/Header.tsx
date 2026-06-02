import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import { AtomityLogo } from './AtomityLogo';

const navLinks = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Workloads', href: '#workloads' },
  { label: 'Compliance', href: '#compliance' },
  { label: 'Sustainability', href: '/sustainability' },
];

/**
 * Glassmorphism header with Atomity logo and nav links.
 * Fixed to top, becomes more opaque on scroll.
 */
export const Header: React.FC = () => {
  const shouldReduce = useReducedMotion();
  const router = useRouter();
  const [active, setActive] = useState('Dashboard');

  useEffect(() => {
    if (router.pathname === '/sustainability') {
      setActive('Sustainability');
    }
  }, [router.pathname]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        backdropFilter: 'blur(16px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
        background: 'rgba(6, 17, 38, 0.65)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
      initial={{ y: -80 }}
      animate={shouldReduce ? { y: 0 } : { y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
    >
      {/* Logo */}
      <AtomityLogo size={36} showText />

      {/* Navigation */}
      <nav aria-label="Primary navigation">
        <ul className="flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                style={{
                  color: active === link.label ? '#60a5fa' : 'rgba(230,238,248,0.7)',
                }}
                aria-current={active === link.label ? 'page' : undefined}
              >
                {link.label}
                {active === link.label && (
                  <motion.span
                    className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Status indicator */}
      <div className="flex items-center gap-2 text-xs text-white/60">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        All systems operational
      </div>
    </motion.header>
  );
};
