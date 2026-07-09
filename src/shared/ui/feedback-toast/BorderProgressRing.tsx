import { useLayoutEffect, useRef, useState } from 'react';
import { Box, GlobalStyles } from '@mui/material';

const DEPLETE_KEYFRAMES_NAME = 'feedback-toast-border-deplete';

interface BorderProgressRingProps {
  color: string;
  strokeWidth?: number;
  durationMs: number;
  paused: boolean;
  onComplete?: () => void;
}

export function BorderProgressRing({
  color,
  strokeWidth = 1,
  durationMs,
  paused,
  onComplete,
}: BorderProgressRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      // Round to whole device pixels so the stroke's centerline lands on a
      // half-pixel boundary — matching fractional measurements here causes a
      // visible double-edge against the Paper's own (independently rounded)
      // border-radius curve.
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width, height } = size;
  const inset = strokeWidth / 2;
  const radius = height / 2 - inset;

  return (
    <Box ref={containerRef} sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <GlobalStyles
        styles={{
          [`@keyframes ${DEPLETE_KEYFRAMES_NAME}`]: {
            from: { strokeDashoffset: 0 },
            to: { strokeDashoffset: 1 },
          },
        }}
      />
      {width > 0 && height > 0 && (
        <svg width={width} height={height} style={{ display: 'block', shapeRendering: 'geometricPrecision' }}>
          <rect
            x={inset}
            y={inset}
            width={Math.max(width - strokeWidth, 0)}
            height={Math.max(height - strokeWidth, 0)}
            rx={radius}
            ry={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            pathLength={1}
            strokeDasharray={1}
            onAnimationEnd={onComplete}
            style={{
              animationName: DEPLETE_KEYFRAMES_NAME,
              animationDuration: `${durationMs}ms`,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          />
        </svg>
      )}
    </Box>
  );
}
