"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  const prefersReduced = useReducedMotion();

  const isCoarse = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  // измеряем высоту контента -> задаём "реальную" высоту страницы
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollY } = useScroll();

  // 1) плавная инерция
  const smoothY = useSpring(scrollY, {
    stiffness: 120,
    damping: 22,
    mass: 0.9,
  });

  // 2) скорость скролла -> blur / slight scale
  const v = useVelocity(scrollY);
  const vSmooth = useSpring(v, { stiffness: 120, damping: 30, mass: 0.6 });

  // blur value (number)
  const blurPx = useTransform(vSmooth, (val) => {
    const b = Math.abs(val) / 1800;
    return clamp(b, 0, 10);
  });

  // filter string (ВАЖНО: через useTransform, не через .to)
  const blurFilter = useTransform(blurPx, (b) => `blur(${b}px)`);

  const scale = useTransform(vSmooth, (val) => {
    const s = Math.abs(val) / 12000;
    return 1 + clamp(s, 0, 0.02);
  });

  // основной сдвиг контента
  const y = useTransform(smoothY, (val) => -val);

  // 3) параллакс слоёв
  const pSlow = useTransform(smoothY, (val) => -val * 0.06);
  const pFast = useTransform(smoothY, (val) => -val * 0.12);

  // отключаем на мобилке / reduced motion
  const enable = !prefersReduced && !isCoarse;

  return (
    <>
      {/* "высота страницы" */}
      <div style={{ height }} />

      {/* фиксируем сцену и двигаем её */}
      <motion.div
        className="fixed left-0 top-0 w-full will-change-transform"
        style={enable ? { y } : undefined}
      >
        {/* параллакс-слои */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={enable ? { y: pSlow } : undefined}
        >
          <div className="absolute -left-24 top-32 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-28 top-[220px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={enable ? { y: pFast } : undefined}
        >
          <div className="absolute left-[18%] top-[62%] h-2 w-2 rounded-full bg-white/25 shadow-[0_0_24px_rgba(255,255,255,0.18)]" />
          <div className="absolute left-[64%] top-[34%] h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="absolute left-[78%] top-[72%] h-1 w-1 rounded-full bg-white/18" />
        </motion.div>

        {/* контент: blur+scale от скорости */}
        <motion.div
          ref={contentRef}
          style={enable ? { filter: blurFilter, scale } : undefined}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}
