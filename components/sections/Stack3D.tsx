"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

const AREAS = [
  {
    title: "Проектирование интерфейсов",
    text: "UX-структура, пользовательские сценарии, композиция, визуальная иерархия и логика экранов.",
  },
  {
    title: "Motion и интерактивность",
    text: "Micro-interaction, анимация состояний, плавные переходы и живое поведение интерфейса.",
  },
  {
    title: "Контент и системы",
    text: "Работа с CMS, структурой карточек, административными панелями и наполнением продукта.",
  },
  {
    title: "Качество продукта",
    text: "SEO, производительность, accessibility и аккуратная работа с деталями интерфейса.",
  },
];

const TOOLS = [
  "Figma",
  "Photoshop",
  "GSAP",
  "Strapi",
  "Git",
  "UI systems",
  "Responsive",
  "Performance",
  "React / Next / TypeScript",
];

export default function Stack3D() {
  const wrapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const gsap = ensureGsap();
    const el = wrapRef.current;
    if (!el || !gsap) return;

    const cards = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal-card]"),
    );
    const panel = el.querySelector<HTMLElement>("[data-tilt]");
    const chips = Array.from(el.querySelectorAll<HTMLElement>("[data-chip]"));

    gsap.set(cards, { y: 22, opacity: 0 });
    if (panel) {
      gsap.set(panel, {
        rotateX: 12,
        rotateY: -14,
        y: 26,
        opacity: 0,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      });
    }
    if (chips.length) gsap.set(chips, { y: 12, opacity: 0, scale: 0.96 });

    const scrollRoot = document.querySelector(
      "#scroll-root",
    ) as HTMLElement | null;

    let played = false;

    const play = () => {
      if (played) return;
      played = true;

      if (cards.length) {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      if (panel) {
        gsap.to(panel, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      if (chips.length) {
        gsap.to(chips, {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.04,
          duration: 0.55,
          delay: 0.18,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      {
        root: scrollRoot ?? null,
        threshold: 0.15,
        rootMargin: "0px 0px -15% 0px",
      },
    );

    io.observe(el);

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();

      if (scrollRoot) {
        const sr = scrollRoot.getBoundingClientRect();
        const isVisible = rect.top < sr.bottom * 0.9 && rect.bottom > sr.top;
        if (isVisible) {
          play();
          io.disconnect();
        }
      } else {
        const vh = window.innerHeight;
        const isVisible = rect.top < vh * 0.9 && rect.bottom > 0;
        if (isVisible) {
          play();
          io.disconnect();
        }
      }
    });

    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    let resetTween: gsap.core.Tween | null = null;

    if (panel && !isCoarse) {
      const glow = panel.querySelector<HTMLElement>("[data-glow]");

      if (glow) gsap.set(glow, { opacity: 0, scale: 0.9 });

      const onMove = (e: MouseEvent) => {
        const r = panel.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;

        const ry = (px - 0.5) * 10;
        const rx = (0.5 - py) * 8;

        gsap.to(panel, {
          rotateY: ry,
          rotateX: rx,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });

        if (glow) {
          gsap.to(glow, {
            opacity: 1,
            scale: 1,
            x: e.clientX - r.left - r.width / 2,
            y: e.clientY - r.top - r.height / 2,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          });
        }
      };

      const onLeave = () => {
        resetTween?.kill();

        resetTween = gsap.to(panel, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "power3.out",
        });

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            scale: 0.9,
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          });
        }
      };

      panel.addEventListener("mousemove", onMove);
      panel.addEventListener("mouseleave", onLeave);

      return () => {
        io.disconnect();
        resetTween?.kill();
        panel.removeEventListener("mousemove", onMove);
        panel.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(panel);
        gsap.killTweensOf(cards);
        gsap.killTweensOf(chips);
      };
    }

    return () => {
      io.disconnect();
      gsap.killTweensOf(cards);
      gsap.killTweensOf(panel);
      gsap.killTweensOf(chips);
    };
  }, []);

  return (
    <section
      id="stack"
      ref={wrapRef}
      className="mx-auto w-full max-w-[1200px] px-6 py-24"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.26em] text-white/35">
            Approach
          </div>
          <h2 className="max-w-[760px] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Подход, инструменты и среда,
            <br />в которой я собираю цифровой продукт
          </h2>
        </div>

        <p className="max-w-[340px] text-sm leading-relaxed text-white/50 md:text-right">
          Не только визуальный слой, но и логика, интерактивность, контент и
          аккуратная техническая реализация.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-[1.05fr_0.95fr]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AREAS.map((item) => (
            <article
              key={item.title}
              data-reveal-card
              className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            >
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                Area
              </div>

              <h3 className="mt-4 text-lg font-medium tracking-[-0.02em]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div className="perspective-[900px]">
          <div
            data-tilt
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-7"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_42%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

            <div
              data-glow
              className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/12 blur-3xl"
            />

            <div className="relative z-10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                Tools / Workflow
              </div>

              <h3 className="mt-4 max-w-[440px] text-[28px] font-medium tracking-[-0.03em] leading-[1.1]">
                Интерфейсы, motion и системный подход к продукту
              </h3>

              <p className="mt-4 max-w-[520px] text-sm leading-relaxed text-white/58">
                Я работаю на стыке UX/UI, визуальной подачи, анимации,
                контентной структуры и аккуратной реализации. Технологии
                использую как инструмент, а не как центр внимания.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {TOOLS.map((tool) => (
                  <div
                    key={tool}
                    data-chip
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12px] tracking-[0.02em] text-white/72"
                  >
                    {tool}
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/48">
                <div className="rounded-[18px] border border-white/8 bg-white/[0.025] p-4">
                  UX / UI
                </div>
                <div className="rounded-[18px] border border-white/8 bg-white/[0.025] p-4">
                  Motion
                </div>
                <div className="rounded-[18px] border border-white/8 bg-white/[0.025] p-4">
                  CMS / Content
                </div>
                <div className="rounded-[18px] border border-white/8 bg-white/[0.025] p-4">
                  Performance
                </div>
              </div>
            </div>

            <div
              className="pointer-events-none absolute -inset-2 rounded-[32px] opacity-60"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.05), 0 30px 90px -40px rgba(42,127,255,0.32)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
