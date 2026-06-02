import React, { useEffect, useRef } from 'react';

export const SandField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grains: Array<{ x: number; y: number; vx: number; vy: number; r: number; a: number }> = [];
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      grains.length = 0;
      const count = Math.round((canvas.clientWidth * canvas.clientHeight) / 1800);
      for (let i = 0; i < Math.max(120, count); i += 1) {
        grains.push({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: (Math.random() - 0.48) * 0.18,
          vy: (Math.random() - 0.5) * 0.08,
          r: 0.5 + Math.random() * 1.7,
          a: 0.18 + Math.random() * 0.55,
        });
      }
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Soft dune haze
      const haze = ctx.createLinearGradient(0, 0, 0, height);
      haze.addColorStop(0, 'rgba(251, 191, 36, 0.04)');
      haze.addColorStop(0.45, 'rgba(245, 158, 11, 0.03)');
      haze.addColorStop(1, 'rgba(11, 18, 32, 0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      for (const grain of grains) {
        const wave = Math.sin((grain.x + grain.y) * 0.012 + performance.now() * 0.0012) * 0.15;
        grain.x += grain.vx + wave;
        grain.y += grain.vy + Math.cos(grain.x * 0.01) * 0.03;

        if (pointer) {
          const dx = grain.x - pointer.x;
          const dy = grain.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulseRadius = 110;
          if (dist < repulseRadius && dist > 0.2) {
            const force = (repulseRadius - dist) / repulseRadius;
            grain.x += (dx / dist) * force * 5.2;
            grain.y += (dy / dist) * force * 5.2;
          }
        }

        if (grain.x < -4) grain.x = width + 4;
        if (grain.x > width + 4) grain.x = -4;
        if (grain.y < -4) grain.y = height + 4;
        if (grain.y > height + 4) grain.y = -4;

        ctx.beginPath();
        ctx.fillStyle = `rgba(251, 191, 36, ${grain.a})`;
        ctx.arc(grain.x, grain.y, grain.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onLeave = () => {
      pointer = null;
    };

    resize();
    seed();
    draw();

    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true" />;
};
