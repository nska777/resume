"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { ensureGsap } from "@/lib/gsap";
import CodeTyper from "@/components/CodeTyper";
import MagneticButton from "@/components/MagneticButton";
import GlitchTitle from "@/components/GlitchTitle";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      root.querySelectorAll("[data-hero]"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.8 },
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const gsap = ensureGsap();
    const wrap = rightRef.current;
    if (!wrap) return;

    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (isCoarse) return;

    const inner = wrap.querySelector(
      "[data-parallax-inner]",
    ) as HTMLElement | null;
    if (!inner) return;

    const setX = gsap.quickTo(inner, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const setY = gsap.quickTo(inner, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const setR = gsap.quickTo(inner, "rotate", {
      duration: 0.7,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);

      const max = 10;
      setX(dx * max);
      setY(dy * max);
      setR(dx * 1.2);
    };

    const onLeave = () => {
      setX(0);
      setY(0);
      setR(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  function go(href: string) {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  }

  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 900], [0, 60]);
  const orbY2 = useTransform(scrollY, [0, 900], [0, -40]);

  return (
    <section
      id="home"
      ref={rootRef}
      className="snap-section relative mx-auto flex min-h-screen w-full max-w-[1200px] items-center px-6 pt-16"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl"
        style={{ y: orbY1 }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-44 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl"
        style={{ y: orbY2 }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#0b0c10]/70 to-[#0b0c10]" />

      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p data-hero className="text-white/60">
            UX/UI Engineer & Frontend Developer
          </p>

          <h1
            data-hero
            className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl"
          >
            <GlitchTitle text="Hello, world!" />
          </h1>

          <p
            data-hero
            className="mt-5 max-w-[520px] leading-relaxed text-white/70"
          >
            Проектирую и разрабатываю современные веб-интерфейсы. Создаю
            анимации, адаптивную верстку и SEO-оптимизированные сайты. Делаю
            витрины продуктов, админ-панели, лендинги и интерфейсы сервисов.
          </p>

          <div data-hero className="mt-8 flex flex-wrap gap-3">
            <MagneticButton
              as="a"
              href="#works"
              strength={0.62}
              className="rounded-full bg-[#2a7fff] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              onClick={(e) => {
                e.preventDefault();
                go("#works");
              }}
            >
              Мои работы
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#contact"
              strength={0.58}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
            >
              Связаться
            </MagneticButton>
          </div>
        </div>

        <div ref={rightRef} className="relative hidden md:block">
          <div data-parallax-inner className="relative will-change-transform">
            <CodeTyper
              speedMs={34}
              startDelayMs={600}
              lines={[
                `<img`,
                `  height="400px" width="300px"`,
                `  loading="lazy" decoding="async"`,
                `  src="foto.jpg" alt="фото"`,
                `/>`,
              ]}
            />

            <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent" />

            <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_55%_45%,black,transparent_70%)]">
              <DotsField />
            </div>

            <div className="pointer-events-none absolute -right-10 top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DotsField() {
  const dots = Array.from({ length: 220 }, (_, i) => i);

  return (
    <div className="relative h-full w-full">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute block h-[2px] w-[2px] rounded-full bg-white/35"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
}
