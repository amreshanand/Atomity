import React, { useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { CloudNode } from './CloudNode';
import { CentralPanel } from './CentralPanel';
import { AutoOptimizeButton } from './AutoOptimizeButton';
import { ConnectionLine } from './ConnectionLine';
import { CloudMetrics, optimizeCloudMetrics } from '../../hooks/useCloudMetrics';

// Container for the whole orchestration visual
// Provides 3D perspective and mouse‑parallax tilt
const DashboardCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [interactionPulse, setInteractionPulse] = useState(0);

  const triggerPulse = () => {
    setInteractionPulse((value) => value + 1);
  };

  const handleOptimize = () => {
    if (isOptimizing) return;
    triggerPulse();
    setIsOptimizing(true);

    const current = queryClient.getQueryData<CloudMetrics>(['cloudMetrics']);
    if (current) {
      // Simulate a staged optimization pass so the dashboard visibly improves.
      queryClient.setQueryData<CloudMetrics>(['cloudMetrics'], {
        ...current,
        metrics: current.metrics.map((metric) => ({
          ...metric,
          utilization: metric.provider === 'onprem'
            ? Math.min(100, metric.utilization + 2)
            : Math.max(10, Math.round(metric.utilization * 0.92)),
        })),
        savings: Math.max(current.savings, Math.round(current.savings * 1.02)),
      });

      window.setTimeout(() => {
        const latest = queryClient.getQueryData<CloudMetrics>(['cloudMetrics']);
        if (latest) {
          queryClient.setQueryData<CloudMetrics>(['cloudMetrics'], optimizeCloudMetrics(latest));
        }
      }, 900);
    }

    setTimeout(() => {
      setIsOptimizing(false);
    }, 2600);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Map to ±10° tilt
    rotateY.set(x * 20);
    rotateX.set(-y * 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // Apply smooth spring easing to the tilt
  const spring = { type: 'spring', stiffness: 200, damping: 30 };

  return (
    <motion.div
      ref={canvasRef}
      className="relative w-full h-[800px] max-h-screen mx-auto overflow-hidden bg-[var(--color-bg-primary)]"
      style={{
        perspective: 1200,
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDownCapture={triggerPulse}
      transition={spring}
    >
      {/* Connection lines connecting corners to center */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ConnectionLine provider="aws" isOptimizing={isOptimizing} interactionPulse={interactionPulse} />
        <ConnectionLine provider="azure" isOptimizing={isOptimizing} interactionPulse={interactionPulse} />
        <ConnectionLine provider="gcp" isOptimizing={isOptimizing} interactionPulse={interactionPulse} />
        <ConnectionLine provider="onprem" isOptimizing={isOptimizing} interactionPulse={interactionPulse} />
      </div>

      {/* Cloud provider nodes placed at four corners */}
      <CloudNode provider="aws" position="top-left" interactionPulse={interactionPulse} />
      <CloudNode provider="azure" position="top-right" interactionPulse={interactionPulse} />
      <CloudNode provider="gcp" position="bottom-left" interactionPulse={interactionPulse} />
      <CloudNode provider="onprem" position="bottom-right" interactionPulse={interactionPulse} />

      {/* Central metrics panel */}
      <CentralPanel isOptimizing={isOptimizing} interactionPulse={interactionPulse} />

      {/* Auto-optimize trigger */}
      <AutoOptimizeButton isOptimizing={isOptimizing} onOptimize={handleOptimize} interactionPulse={interactionPulse} />
    </motion.div>
  );
};

export default DashboardCanvas;
