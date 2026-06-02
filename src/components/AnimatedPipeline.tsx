import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView, useReducedMotion } from 'framer-motion';

export const AnimatedPipeline: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const controls = useAnimation();
  const shouldReduce = useReducedMotion();
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (inView && !shouldReduce) controls.start('visible');
  }, [inView, controls, shouldReduce]);

  useEffect(() => {
    const svg = svgRef.current;
    const pathEl = pathRef.current;
    if (!svg || !pathEl || shouldReduce) return;

    const length = pathEl.getTotalLength();
    const nodeCount = 6;
    const nodes: { el: SVGCircleElement; pos: number; speed: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGCircleElement;
      c.setAttribute('r', String(6));
      c.setAttribute('fill', 'url(#nodeGradient)');
      c.setAttribute('filter', 'url(#glow)');
      c.setAttribute('opacity', '0.95');
      svg.appendChild(c);
      nodes.push({ el: c, pos: (i / nodeCount) * length, speed: 0.03 + Math.random() * 0.02 });
    }

    let last = performance.now();
    let raf = 0;

    function frame(now: number) {
      const dt = now - last;
      last = now;

      for (const n of nodes) {
        n.pos = (n.pos + n.speed * dt) % length;
        const p = pathEl.getPointAtLength(n.pos);
        let nx = p.x;
        let ny = p.y;

        if (mouse) {
          const rect = svg.getBoundingClientRect();
          const mx = mouse.x - rect.left;
          const my = mouse.y - rect.top;
          const dx = nx - mx;
          const dy = ny - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const min = 70;
          if (dist < min && dist > 0.1) {
            const repel = (min - dist) / min;
            nx += (dx / dist) * repel * 30;
            ny += (dy / dist) * repel * 30;
          }
        }

        n.el.setAttribute('cx', String(nx));
        n.el.setAttribute('cy', String(ny));
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    function onMove(e: MouseEvent) {
      setMouse({ x: e.clientX, y: e.clientY });
    }
    function onLeave() {
      setMouse(null);
    }

    svg.addEventListener('mousemove', onMove);
    svg.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener('mousemove', onMove);
      svg.removeEventListener('mouseleave', onLeave);
      for (const n of nodes) n.el.remove();
    };
  }, [mouse, shouldReduce]);

  const path = 'M20 80 C200 0, 340 160, 520 80';

  return (
    <div ref={ref} className="mb-8 overflow-visible">
      <svg ref={svgRef} viewBox="0 0 560 160" className="w-full h-auto" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--color-accent-primary)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0.08" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={2}
          strokeDasharray="600"
          strokeDashoffset={shouldReduce ? 0 : 600}
          variants={shouldReduce ? undefined : {
            visible: { strokeDashoffset: 0, transition: { duration: 1.2, ease: 'easeOut' } },
            hidden: { strokeDashoffset: 600 },
          }}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : controls}
        />
      </svg>
    </div>
  );
};
