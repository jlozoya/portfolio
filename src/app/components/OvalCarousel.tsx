'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

type Logo = { name: string; src: string };

type Props = {
  logos?: Logo[];
  size?: number; // container diameter (px)
  radiusX?: number; // horizontal radius (px)
  radiusY?: number; // vertical radius (px)
  rotationSpeed?: number; // radians per second (+ clockwise, - counter)
  itemSize?: number; // square size of each logo card (px)
  pauseOnHover?: boolean;
};

export default function OvalCarousel({
  logos = [{ name: 'Example', src: '' }],
  size = 420,
  radiusX = 160,
  radiusY = 60,
  rotationSpeed = 0.35,
  itemSize = 64,
  pauseOnHover = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const [hovered, setHovered] = useState(false);

  const n = logos.length;
  const half = itemSize / 2;
  const center = size / 2;

  // Precompute item base angles once (stable across frames)
  const baseAngles = useMemo(() => {
    const arr = new Float32Array(n);
    for (let i = 0; i < n; i++) arr[i] = (i / Math.max(1, n)) * Math.PI * 2;
    return arr;
  }, [n]);

  // Honor user preferences for reduced motion
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    if (!containerRef.current || n === 0) return;

    // Attach or trim item refs to match logos length
    itemRefs.current.length = n;

    const step = (ts: number) => {
      const children = itemRefs.current;

      // compute dt (seconds)
      const last = lastTsRef.current ?? ts;
      const dt = (ts - last) / 1000;
      lastTsRef.current = ts;

      // pause or reduced-motion → skip rotation but keep one paint for correct positioning
      const speed = hovered || prefersReducedMotion ? 0 : rotationSpeed;
      rotationRef.current += dt * speed;
      if (rotationRef.current > Math.PI * 2 || rotationRef.current < -Math.PI * 2) {
        rotationRef.current %= Math.PI * 2;
      }

      const rot = rotationRef.current;

      // Update all items
      for (let i = 0; i < n; i++) {
        const el = children[i];
        if (!el) continue;

        const angle = baseAngles[i] + rot;

        // Ellipse position
        const x = center + Math.cos(angle) * radiusX;
        const y = center + Math.sin(angle) * radiusY;

        // Depth cue with sin(angle)
        const z = Math.sin(angle); // -1..1
        const scale = 0.75 + (z + 1) * 0.25; // 0.75..1.25
        const opacity = 0.5 + (z + 1) * 0.25; // 0.5..1.0
        const zIndex = 100 + Math.round(z * 100);

        // Position from the center using known half-size (no layout reads)
        const tx = x - half;
        const ty = y - half;

        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // Kick off a frame to place elements immediately
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
    // Re-run only when geometry/speed or count changes
  }, [
    n,
    radiusX,
    radiusY,
    size,
    itemSize,
    rotationSpeed,
    baseAngles,
    hovered,
    prefersReducedMotion,
    center,
    half,
  ]);

  // styles
  const wrapperStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div className="flex items-center justify-center py-12 select-none">
      <div
        style={wrapperStyle}
        className="relative rounded-full"
        aria-hidden="true"
        onMouseEnter={() => pauseOnHover && setHovered(true)}
        onMouseLeave={() => pauseOnHover && setHovered(false)}
      >
        {/* subtle inner ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.05)' }}
        />

        {/* positioned by JS */}
        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{ position: 'relative', transformStyle: 'preserve-3d' }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="absolute flex flex-col items-center justify-center rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                width: itemSize,
                height: itemSize,
                left: 0,
                top: 0,
                transform: `translate3d(${center - half}px, ${center - half}px, 0)`, // initial center
                transition: 'opacity 80ms linear', // transform is animated via rAF; keep opacity light
                willChange: 'transform, opacity',
                pointerEvents: 'none',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name || `logo-${i}`}
                className="object-contain"
                draggable={false}
                style={{ width: itemSize * 0.65, height: itemSize * 0.65, pointerEvents: 'none' }}
              />
              <span
                className="mt-1 text-xs text-gray-300"
                style={{ lineHeight: 1, pointerEvents: 'none' }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
