import React, { useImperativeHandle, useRef, useState } from 'react';

type Props = { src?: string; poster?: string };

export type PlayPreviewHandle = {
  focusButton: () => void;
};

export const PlayPreview = React.forwardRef<PlayPreviewHandle, Props>(({ src, poster }, ref) => {
  const [active, setActive] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(ref, () => ({
    focusButton: () => btnRef.current?.focus(),
  }));

  if (!src) return null;

  return (
    <div className="mt-3 rounded overflow-hidden w-full max-w-[320px]">
      {!active ? (
        <button
          ref={btnRef}
          onMouseEnter={() => setActive(true)}
          onFocus={() => setActive(true)}
          aria-label="Load preview"
          className="w-full h-40 bg-black/20 flex items-center justify-center text-sm text-white/60"
        >
          Hover or focus to load preview
        </button>
      ) : (
        <video src={src} poster={poster} muted playsInline autoPlay loop className="w-full h-40 object-cover" />
      )}
    </div>
  );
});

PlayPreview.displayName = 'PlayPreview';
