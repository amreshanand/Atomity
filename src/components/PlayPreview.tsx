import React, { useState } from 'react';

type Props = { src?: string; poster?: string };

export const PlayPreview: React.FC<Props> = ({ src, poster }) => {
  const [active, setActive] = useState(false);

  if (!src) return null;

  return (
    <div className="mt-3 rounded overflow-hidden w-full max-w-[320px]">
      {!active ? (
        <button
          onMouseEnter={() => setActive(true)}
          onFocus={() => setActive(true)}
          className="w-full h-40 bg-black/20 flex items-center justify-center text-sm text-white/60"
        >
          Hover to load preview
        </button>
      ) : (
        <video src={src} poster={poster} muted playsInline autoPlay loop className="w-full h-40 object-cover" />
      )}
    </div>
  );
};
