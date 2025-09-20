"use client";

import React, { useEffect, useRef } from "react";

/**
 * OvalCarousel props (optional):
 *  - logos: string[] (paths to images in public/)
 *  - size: number (container size in px)
 *  - radiusX: number (horizontal radius in px)
 *  - radiusY: number (vertical radius in px)
 *  - rotationSpeed: number (radians per second)
 */

export default function OvalCarousel({
  logos = [{name: 'Example', src: '' },],
  size = 420,
  radiusX = 160,
  radiusY = 60,
  rotationSpeed = 0.35, // radians per second
}) {
  const containerRef = useRef(null);
  const reqRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const rotationRef = useRef(0);

  useEffect(() => {
    const n = logos.length;

    function step(
      timestamp: number,
    ) {
      if (!startRef.current) startRef.current = timestamp;
      const dt = (timestamp - (startRef.current ?? timestamp)) / 1000; // seconds elapsed
      // update rotation (continuous)
      rotationRef.current = (dt * rotationSpeed) % (Math.PI * 2);

      // compute positions
      const container = containerRef.current as HTMLDivElement | null;
      if (!container) {
        reqRef.current = requestAnimationFrame(step as FrameRequestCallback);
        return;
      }
      const centerX = size / 2;
      const centerY = size / 2;

      const children = container.children;
      for (let i = 0; i < n; i++) {
        const el = children[i] as HTMLElement | undefined;
        if (!el) continue;

        // base angle for item
        const base = (i / n) * Math.PI * 2;
        // current angle adds global rotation
        const angle = base + rotationRef.current;

        // elliptical coordinates
        const x = centerX + Math.cos(angle) * radiusX;
        const y = centerY + Math.sin(angle) * radiusY;
        // z factor (from -1..1), use sin(angle) to simulate near/far along path
        const z = Math.sin(angle);
        // scale from z (-1..1) -> (0.6 .. 1.05)
        const scale = 0.75 + (z + 1) * 0.25; // tweak range as desired
        // opacity from z
        const opacity = 0.5 + (z + 1) * 0.25; // 0.5 .. 1.0
        // zIndex higher when z larger
        const zIndex = Math.round(100 + z * 100);
        // update style: translate to position - center the item, apply scale
        const half = el.offsetWidth / 2;
        el.style.transform = `translate(${x - half}px, ${y - half}px) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      }
      reqRef.current = requestAnimationFrame(step as FrameRequestCallback);
    }

    reqRef.current = requestAnimationFrame(step);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
      reqRef.current = null;
      startRef.current = null;
    };
  }, [logos, size, radiusX, radiusY, rotationSpeed]);
  // inline style for container size
  const wrapperStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <div className="flex justify-center items-center py-12 select-none">
      <div
        style={wrapperStyle}
        className="relative rounded-full"
        aria-hidden="true"
      >
        {/* optional decorative ring */}
        <div
          className="absolute inset-0 rounded-full "
          style={{ boxShadow: "inset 0 0 40px rgba(255,255,255,0.02)" }}
        />

        {/* logos container: children will be absolutely positioned by JS */}
        <div
          ref={containerRef}
          className="absolute inset-0"
          style={{ position: "relative", transformStyle: "preserve-3d" }}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              // each logo wrapper has fixed size; center handled by JS using offsetWidth
              className="absolute w-16 h-18 rounded-full flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm"
              style={{
                left: 0,
                top: 0,
                transform: `translate(${size / 2}px, ${size / 2}px)`, // initial center
                transition: "transform 0.08s linear, opacity 0.08s linear",
                willChange: "transform, opacity",
                pointerEvents: "none",
              }}
            >
              {/* Use img for transform compatibility with next/image limitations in absolute layout */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={`logo-${index}`}
                className="w-10 h-10 object-contain"
                draggable={false}
                style={{ pointerEvents: "none" }}
              />
              {/* small label below the icon */}
              <span className="mt-1 text-xs text-gray-300 select-none" style={{ pointerEvents: "none" }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
