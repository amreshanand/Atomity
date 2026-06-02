import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Provider = 'aws' | 'azure' | 'gcp' | 'onprem';

export const HexPod: React.FC<{ provider: Provider }> = ({ provider }) => {
  const [hover, setHover] = useState(false);

  const colors: Record<Provider, string> = {
    aws: 'var(--color-awsOrange)',
    azure: 'var(--color-azureBlue)',
    gcp: 'var(--color-gcpBlue)',
    onprem: 'var(--color-onPremGray)',
  };

  const tooltipMap: Record<Provider, string> = {
    aws: 'AWS – Public Cloud',
    azure: 'Azure – Public Cloud',
    gcp: 'GCP – Public Cloud',
    onprem: 'On‑Premise – Sovereign',
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.12 }}
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-medium text-white shadow-lg"
        style={{
          background: colors[provider],
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
        }}
        aria-label={tooltipMap[provider]}
      >
        {provider.toUpperCase()}
      </div>
      {hover && (
        <motion.div
          className="absolute top-full mt-1 px-2 py-1 bg-black/70 text-white text-xs rounded"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
        >
          {tooltipMap[provider]}
        </motion.div>
      )}
    </motion.div>
  );
};
