"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (isCoarse) {
      wrap.style.display = "none";
      return;
    }

    const setX = gsap.quickTo(wrap, "x", {
      duration: 0.25,
      ease: "power3.out",
    });

    const setY = gsap.quickTo(wrap, "y", {
      duration: 0.25,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed left-0 top-0 z-[3]"
      style={{
        width: 0,
        height: 0,
      }}
    >
      {/* glow */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "90px",
          height: "90px",
          filter: "blur(14px)",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.25), rgba(16,185,129,0.15), transparent 70%)",
        }}
      />

      {/* центр точка */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "6px",
          height: "6px",
          background: "rgba(56,189,248,0.9)",
          boxShadow: "0 0 12px rgba(56,189,248,0.6)",
        }}
      />
    </div>
  );
}
