"use client";

import { useEffect, useMemo, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

type El = HTMLElement;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

function pickUnique<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  const n = Math.min(count, copy.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function About() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const gsap = ensureGsap();
    const items = Array.from(root.querySelectorAll("[data-a]")) as El[];
    const head = root.querySelector("[data-head]") as El | null;
    const rgbA = root.querySelector("[data-rgb-a]") as El | null;
    const rgbB = root.querySelector("[data-rgb-b]") as El | null;
    const letters = Array.from(root.querySelectorAll("[data-k]")) as El[];

    if (!items.length || !head || !rgbA || !rgbB || !letters.length) return;

    const scrollRoot = document.querySelector(
      "#scroll-root",
    ) as HTMLElement | null;
    const reduce = prefersReducedMotion();

    let played = false;
    let visible = false;
    let startDelay: gsap.core.Tween | null = null;
    let scheduled: gsap.core.Tween | null = null;
    let running = false;

    gsap.set(items, { y: 18, opacity: 0, filter: "blur(6px)" });
    gsap.set([rgbA, rgbB], { autoAlpha: 0, x: 0, y: 0 });
    gsap.set(head, { filter: "saturate(1) contrast(1)" });

    const playReveal = () => {
      if (played) return;
      played = true;

      gsap.to(items, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "transform,opacity,filter",
      });
    };

    const glitchSoft = () => {
      if (reduce || running || !visible) return;
      running = true;

      const solid = letters.filter((l) => (l.textContent ?? "").trim());
      const chunk = pickUnique(solid, Math.max(10, Math.min(18, solid.length)));

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          running = false;
          scheduleNext();
        },
      });

      tl.to([rgbA, rgbB], { duration: 0.18, autoAlpha: 0.45 }, 0);
      tl.to(rgbA, { duration: 0.5, x: -3, y: 0.4, ease: "power2.out" }, 0.02);
      tl.to(rgbB, { duration: 0.5, x: 3, y: -0.4, ease: "power2.out" }, 0.02);

      tl.to(
        head,
        { duration: 0.3, filter: "saturate(1.12) contrast(1.03)" },
        0,
      );

      tl.to(
        chunk,
        {
          duration: 0.35,
          x: () => rand(-2, 2),
          y: () => rand(-1.2, 1.2),
          rotate: () => rand(-1.4, 1.4),
          ease: "power2.out",
          stagger: { each: 0.006, from: "random" },
        },
        0.08,
      );

      tl.to(
        head,
        { duration: 0.2, filter: "blur(0.45px) saturate(1.1) contrast(1.02)" },
        0.22,
      );
      tl.to(
        head,
        { duration: 0.32, filter: "blur(0px) saturate(1.04) contrast(1.01)" },
        0.42,
      );

      tl.to(
        chunk,
        {
          duration: 0.45,
          x: 0,
          y: 0,
          rotate: 0,
          ease: "power3.out",
          stagger: { each: 0.004, from: "random" },
        },
        0.52,
      );

      tl.to([rgbA, rgbB], { duration: 0.3, autoAlpha: 0, x: 0, y: 0 }, 0.7);
      tl.to(head, { duration: 0.4, filter: "saturate(1) contrast(1)" }, 0.72);
    };

    const scheduleNext = () => {
      scheduled?.kill();
      if (!visible || reduce) return;
      const wait = rand(4.5, 10);
      scheduled = gsap.delayedCall(wait, () => {
        if (!visible) return;
        glitchSoft();
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          visible = true;
          playReveal();

          startDelay?.kill();
          if (!reduce) {
            startDelay = gsap.delayedCall(3, () => {
              if (!visible) return;
              scheduleNext();
            });
          }
        } else {
          visible = false;
          startDelay?.kill();
          scheduled?.kill();
        }
      },
      {
        root: scrollRoot ?? null,
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    io.observe(root);

    requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();

      if (scrollRoot) {
        const sr = scrollRoot.getBoundingClientRect();
        const isVisible = rect.top < sr.bottom * 0.9 && rect.bottom > sr.top;
        if (isVisible) {
          visible = true;
          playReveal();
          if (!reduce) {
            startDelay?.kill();
            startDelay = gsap.delayedCall(3, () => {
              if (!visible) return;
              scheduleNext();
            });
          }
        }
      } else {
        const vh = window.innerHeight;
        const isVisible = rect.top < vh * 0.9 && rect.bottom > 0;
        if (isVisible) {
          visible = true;
          playReveal();
          if (!reduce) {
            startDelay?.kill();
            startDelay = gsap.delayedCall(3, () => {
              if (!visible) return;
              scheduleNext();
            });
          }
        }
      }
    });

    return () => {
      io.disconnect();
      startDelay?.kill();
      scheduled?.kill();
      gsap.killTweensOf(items);
      gsap.killTweensOf(letters);
      gsap.killTweensOf([rgbA, rgbB, head]);
    };
  }, []);

  return (
    <section id="about" ref={ref} className="w-full">
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/about/about-bg.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/90" />
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_45%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay">
          <GridNoise />
        </div>

        <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:py-28">
          <p
            data-a
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-white/60"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-cyan-400/80" />
            Про меня
          </p>

          <div className="relative mt-6">
            <h2
              data-a
              data-head
              className="relative text-[34px] leading-[1.05] font-semibold tracking-[-0.03em] text-white sm:text-[44px] md:text-[54px]"
            >
              <span className="relative z-[2] inline-block">
                <Letters text="Проектирую UX/UI и разрабатываю" />
                <br />
                <Letters text="современные веб-интерфейсы." />
              </span>

              <span
                data-rgb-a
                className="pointer-events-none absolute left-0 top-0 z-[1] inline-block opacity-0"
                style={{
                  color: "rgba(56,189,248,0.75)",
                  textShadow: "0 0 14px rgba(56,189,248,0.28)",
                  mixBlendMode: "screen",
                }}
              >
                <Letters text="Проектирую UX/UI и разрабатываю" />
                <br />
                <Letters text="современные веб-интерфейсы." />
              </span>

              <span
                data-rgb-b
                className="pointer-events-none absolute left-0 top-0 z-[1] inline-block opacity-0"
                style={{
                  color: "rgba(236,72,153,0.7)",
                  textShadow: "0 0 14px rgba(236,72,153,0.26)",
                  mixBlendMode: "screen",
                }}
              >
                <Letters text="Проектирую UX/UI и разрабатываю" />
                <br />
                <Letters text="современные веб-интерфейсы." />
              </span>
            </h2>
          </div>

          <p
            data-a
            className="mt-6 max-w-[760px] text-sm leading-relaxed text-white/70 md:text-[15px]"
          >
            Создаю интерфейсы для продуктов и бизнеса: витрины, лендинги,
            админ-панели и портфолио. Фокус — чистая типографика, micro-UX и
            анимации.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Chip label="Опыт" value="6+ лет" />
            <Chip label="Фокус" value="UX/UI / Motion" />
            <Chip label="Стек" value="Frontend Architecture" />
            <Chip label="Качество" value="Performance / SEO" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Feature
              title="Верстка макетов"
              desc="Аккуратно переношу дизайн в код: семантика, сетка, типографика."
            />
            <Feature
              title="Адаптив"
              desc="Mobile-first подход — интерфейс работает на любых экранах."
            />
            <Feature
              title="UX/UI"
              desc="Структура, сценарии, состояния и micro-interaction."
            />
            <Feature
              title="Оптимизация"
              desc="Скорость, SEO и доступность. Довожу до production-уровня."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Letters({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((ch, i) => (
        <span key={i} data-k className="inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div
      data-a
      className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur"
    >
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-white">{value}</span>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      data-a
      className="group rounded-[22px] border border-white/12 bg-black/25 p-5 backdrop-blur transition hover:bg-black/35"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/12 bg-white/[0.06]">
          <span className="h-2 w-2 rounded-full bg-cyan-300/90 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
        </div>

        <div>
          <div className="text-[15px] font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-white/70">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridNoise() {
  const dots = useMemo(() => Array.from({ length: 360 }, (_, i) => i), []);
  return (
    <div className="relative h-full w-full">
      {dots.map((i) => (
        <span
          key={i}
          className="absolute block h-[2px] w-[2px] rounded-full bg-white/30"
          style={{
            left: `${(i * 29) % 100}%`,
            top: `${(i * 47) % 100}%`,
            opacity: ((i * 13) % 10) / 18 + 0.06,
          }}
        />
      ))}
    </div>
  );
}
