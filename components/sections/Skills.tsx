"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

type SkillItem = {
  title: string;
  text: string;
  meta: string;
  wide?: boolean;
  kind: "ux" | "next" | "gsap" | "ts" | "perf" | "handoff";
};

const ITEMS: SkillItem[] = [
  {
    title: "UX мышление",
    text: "Сетка, ритм, иерархия, micro-interaction.",
    meta: "01",
    wide: true,
    kind: "ux",
  },
  {
    title: "Next.js",
    text: "App Router, SEO, Server/Client компоненты.",
    meta: "02",
    kind: "next",
  },
  {
    title: "GSAP",
    text: "ScrollTrigger, pinned сцены, cinematic reveal.",
    meta: "03",
    kind: "gsap",
  },
  {
    title: "TypeScript",
    text: "Типобезопасность, guards, чистые модели.",
    meta: "04",
    kind: "ts",
  },
  {
    title: "Performance",
    text: "LCP/CLS, lazy, оптимизация ассетов.",
    meta: "05",
    kind: "perf",
  },
  {
    title: "Design handoff",
    text: "Figma, компоненты, токены, UI-kit.",
    meta: "06",
    wide: true,
    kind: "handoff",
  },
];

function OverlayUX() {
  return (
    <div
      data-overlay
      className="pointer-events-none absolute inset-0 z-[12] opacity-0"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-y-0 left-[28%] w-px bg-white/10" />
      <div className="absolute inset-y-0 left-[64%] w-px bg-white/10" />
      <div className="absolute inset-x-0 top-[42%] h-px bg-white/10" />

      <div
        data-float
        className="absolute left-[10%] top-[18%] rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100/85"
      >
        Grid
      </div>
      <div
        data-float
        className="absolute left-[56%] top-[24%] rounded-full border border-white/18 bg-white/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80"
      >
        Rhythm
      </div>
      <div
        data-float
        className="absolute left-[32%] top-[62%] rounded-full border border-white/18 bg-white/[0.06] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80"
      >
        Hierarchy
      </div>
    </div>
  );
}

function OverlayNext() {
  return (
    <div
      data-overlay
      className="pointer-events-none absolute inset-0 z-[12] opacity-0"
    >
      <div className="absolute left-[22%] top-[28%] h-2 w-2 rounded-full bg-white/70" />
      <div className="absolute left-[62%] top-[22%] h-2 w-2 rounded-full bg-white/70" />
      <div className="absolute left-[44%] top-[56%] h-2 w-2 rounded-full bg-white/70" />

      <div className="absolute left-[23%] top-[29%] h-px w-[40%] bg-white/18" />
      <div className="absolute left-[45%] top-[57%] h-px w-[18%] -rotate-[35deg] origin-left bg-white/18" />

      <div
        data-float
        className="absolute left-[12%] top-[18%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        server
      </div>
      <div
        data-float
        className="absolute left-[56%] top-[14%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        client
      </div>
      <div
        data-float
        className="absolute left-[34%] top-[64%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        route
      </div>
      <div
        data-float
        className="absolute right-[10%] bottom-[16%] rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100/85"
      >
        seo
      </div>
    </div>
  );
}

function OverlayGsap() {
  return (
    <div
      data-overlay
      className="pointer-events-none absolute inset-0 z-[12] opacity-0"
    >
      <div className="absolute left-[10%] top-[28%] h-px w-[72%] bg-white/18" />
      <div className="absolute left-[10%] top-[46%] h-px w-[58%] bg-white/16" />
      <div className="absolute left-[10%] top-[64%] h-px w-[82%] bg-white/16" />

      <div
        data-line
        className="absolute left-[16%] top-[25.5%] h-[6px] w-[24%] rounded-full bg-white/30"
      />
      <div
        data-line
        className="absolute left-[20%] top-[43.5%] h-[6px] w-[18%] rounded-full bg-white/24"
      />
      <div
        data-line
        className="absolute left-[14%] top-[61.5%] h-[6px] w-[34%] rounded-full bg-white/24"
      />

      <div
        data-dot
        className="absolute left-[12%] top-[24.5%] h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(120,220,255,0.7)]"
      />

      <div
        data-float
        className="absolute right-[12%] top-[18%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        timeline
      </div>
      <div
        data-float
        className="absolute right-[16%] bottom-[16%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        stagger
      </div>
    </div>
  );
}

function OverlayTs() {
  return (
    <div
      data-overlay
      className="pointer-events-none absolute inset-0 z-[12] opacity-0"
    >
      <div
        data-float
        className="absolute left-[10%] top-[18%] rounded-full border border-blue-300/30 bg-blue-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-blue-100/85"
      >
        type
      </div>
      <div
        data-float
        className="absolute left-[54%] top-[22%] rounded-full border border-white/18 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        interface
      </div>
      <div
        data-float
        className="absolute left-[22%] top-[56%] rounded-full border border-white/18 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        guard
      </div>
      <div
        data-float
        className="absolute right-[14%] bottom-[18%] rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100/85"
      >
        &lt;T&gt;
      </div>

      <div className="absolute left-[18%] top-[38%] h-px w-[56%] bg-white/14" />
      <div className="absolute left-[18%] top-[38%] h-2 w-2 rounded-full bg-white/60" />
      <div className="absolute left-[72%] top-[38%] h-2 w-2 rounded-full bg-white/35" />
    </div>
  );
}

function OverlayPerf() {
  return (
    <div
      data-overlay
      className="pointer-events-none absolute inset-0 z-[12] opacity-0"
    >
      <div
        data-meter
        className="absolute left-[12%] top-[28%] h-2 w-[54%] overflow-hidden rounded-full bg-white/10"
      >
        <div data-fill className="h-full w-[74%] rounded-full bg-white/28" />
      </div>

      <div
        data-meter
        className="absolute left-[12%] top-[46%] h-2 w-[42%] overflow-hidden rounded-full bg-white/10"
      >
        <div data-fill className="h-full w-[58%] rounded-full bg-white/22" />
      </div>

      <div
        data-meter
        className="absolute left-[12%] top-[64%] h-2 w-[66%] overflow-hidden rounded-full bg-white/10"
      >
        <div data-fill className="h-full w-[82%] rounded-full bg-cyan-200/35" />
      </div>

      <div
        data-float
        className="absolute right-[12%] top-[18%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        LCP
      </div>
      <div
        data-float
        className="absolute right-[16%] top-[40%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        CLS
      </div>
      <div
        data-float
        className="absolute right-[10%] bottom-[14%] rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100/85"
      >
        lazy
      </div>
    </div>
  );
}

function OverlayHandoff() {
  return (
    <div
      data-overlay
      className="pointer-events-none absolute inset-0 z-[12] opacity-0"
    >
      <div className="absolute left-[10%] top-[20%] h-12 w-12 rounded-xl border border-white/14 bg-white/[0.04]" />
      <div className="absolute left-[24%] top-[20%] h-12 w-12 rounded-xl border border-white/14 bg-white/[0.04]" />
      <div className="absolute left-[38%] top-[20%] h-12 w-12 rounded-xl border border-white/14 bg-white/[0.04]" />

      <div className="absolute left-[12.5%] top-[24.5%] h-3 w-3 rounded-full bg-[#d8d1c2]" />
      <div className="absolute left-[26.5%] top-[24.5%] h-3 w-3 rounded-full bg-[#8996a8]" />
      <div className="absolute left-[40.5%] top-[24.5%] h-3 w-3 rounded-full bg-[#cce7ff]" />

      <div
        data-float
        className="absolute left-[10%] top-[58%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        8
      </div>
      <div
        data-float
        className="absolute left-[18%] top-[58%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        16
      </div>
      <div
        data-float
        className="absolute left-[28%] top-[58%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        24
      </div>

      <div
        data-float
        className="absolute right-[12%] top-[24%] rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100/85"
      >
        tokens
      </div>
      <div
        data-float
        className="absolute right-[14%] bottom-[18%] rounded-full border border-white/18 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80"
      >
        figma
      </div>
    </div>
  );
}

function SkillOverlay({ kind }: { kind: SkillItem["kind"] }) {
  if (kind === "ux") return <OverlayUX />;
  if (kind === "next") return <OverlayNext />;
  if (kind === "gsap") return <OverlayGsap />;
  if (kind === "ts") return <OverlayTs />;
  if (kind === "perf") return <OverlayPerf />;
  return <OverlayHandoff />;
}

export default function Skills() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const gsap = ensureGsap();
    if (!gsap) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    if (!cards.length) return;

    gsap.set(cards, {
      y: 28,
      opacity: 0,
      scale: 0.985,
    });

    const scrollRoot = document.querySelector(
      "#scroll-root",
    ) as HTMLElement | null;

    let played = false;

    const play = () => {
      if (played) return;
      played = true;

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.85,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
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

    io.observe(root);

    requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();

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

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const inner = card.querySelector<HTMLElement>("[data-inner]");
      const overlay = card.querySelector<HTMLElement>("[data-overlay]");
      const glow = card.querySelector<HTMLElement>("[data-glow]");
      const dim = card.querySelector<HTMLElement>("[data-dim]");
      const title = card.querySelector<HTMLElement>("[data-title]");
      const desc = card.querySelector<HTMLElement>("[data-desc]");
      const metaItems = Array.from(
        card.querySelectorAll<HTMLElement>("[data-meta], [data-badge]"),
      );
      const floats = Array.from(
        card.querySelectorAll<HTMLElement>("[data-float]"),
      );
      const lines = Array.from(
        card.querySelectorAll<HTMLElement>("[data-line]"),
      );
      const meters = Array.from(
        card.querySelectorAll<HTMLElement>("[data-fill]"),
      );
      const dot = card.querySelector<HTMLElement>("[data-dot]");

      if (overlay) gsap.set(overlay, { opacity: 0 });
      if (glow) gsap.set(glow, { opacity: 0, scale: 0.86 });
      if (dim) gsap.set(dim, { opacity: 0 });
      if (floats.length) gsap.set(floats, { opacity: 0, y: 10, scale: 0.96 });
      if (lines.length) {
        gsap.set(lines, {
          scaleX: 0.7,
          opacity: 0.4,
          transformOrigin: "left center",
        });
      }
      if (meters.length) {
        gsap.set(meters, {
          scaleX: 0.72,
          transformOrigin: "left center",
        });
      }
      if (dot) gsap.set(dot, { x: 0, opacity: 0 });

      let dotTween: gsap.core.Tween | null = null;
      let floatTween: gsap.core.Tween | null = null;

      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;

        const ry = (x / r.width - 0.5) * 8;
        const rx = (y / r.height - 0.5) * -6;

        if (inner) {
          gsap.to(inner, {
            rotateX: rx,
            rotateY: ry,
            y: -4,
            duration: 0.35,
            ease: "power3.out",
            transformPerspective: 1000,
            transformOrigin: "center",
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: 1,
            scale: 1,
            x: x - r.width / 2,
            y: y - r.height / 2,
            duration: 0.35,
            ease: "power3.out",
          });
        }
      };

      const onEnter = () => {
        if (overlay) {
          gsap.to(overlay, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        }

        if (dim) {
          gsap.to(dim, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (title) {
          gsap.to(title, {
            y: -4,
            opacity: 0.8,
            duration: 0.35,
            ease: "power3.out",
          });
        }

        if (desc) {
          gsap.to(desc, {
            opacity: 0.14,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (metaItems.length) {
          gsap.to(metaItems, {
            opacity: 0.16,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (floats.length) {
          gsap.to(floats, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.04,
            duration: 0.45,
            ease: "power3.out",
          });

          floatTween = gsap.to(floats, {
            y: "-=4",
            duration: 1.8,
            ease: "sine.inOut",
            stagger: 0.08,
            repeat: -1,
            yoyo: true,
          });
        }

        if (lines.length) {
          gsap.to(lines, {
            scaleX: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (meters.length) {
          gsap.to(meters, {
            scaleX: 1,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
          });
        }

        if (dot) {
          gsap.to(dot, {
            opacity: 1,
            duration: 0.2,
            ease: "none",
          });

          dotTween = gsap.to(dot, {
            x: 120,
            duration: 1.1,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        gsap.to(card, {
          borderColor: "rgba(255,255,255,0.12)",
          backgroundColor: "rgba(255,255,255,0.03)",
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.28,
            ease: "power2.out",
          });
        }

        if (dim) {
          gsap.to(dim, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (inner) {
          gsap.to(inner, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        }

        if (title) {
          gsap.to(title, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        if (desc) {
          gsap.to(desc, {
            opacity: 0.6,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (metaItems.length) {
          gsap.to(metaItems, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            scale: 0.86,
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        }

        if (floats.length) {
          if (floatTween) {
            floatTween.kill();
            floatTween = null;
          }

          gsap.to(floats, {
            opacity: 0,
            y: 10,
            scale: 0.96,
            stagger: 0.02,
            duration: 0.25,
            ease: "power2.out",
          });
        }

        if (lines.length) {
          gsap.to(lines, {
            opacity: 0.4,
            scaleX: 0.7,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (meters.length) {
          gsap.to(meters, {
            scaleX: 0.72,
            duration: 0.3,
            ease: "power2.out",
          });
        }

        if (dot) {
          if (dotTween) {
            dotTween.kill();
            dotTween = null;
          }

          gsap.to(dot, {
            opacity: 0,
            x: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        }

        gsap.to(card, {
          borderColor: "rgba(255,255,255,0.10)",
          backgroundColor: "rgba(255,255,255,0.04)",
          duration: 0.35,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        if (dotTween) dotTween.kill();
        if (floatTween) floatTween.kill();
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      io.disconnect();
      gsap.killTweensOf(cards);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className="mx-auto w-full max-w-[1200px] px-6 py-24"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 text-[11px] uppercase tracking-[0.26em] text-white/35">
            Capabilities
          </div>
          <h2 className="max-w-[720px] text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Компетенции, которые превращают интерфейс в ощущение продукта
          </h2>
        </div>

        <p className="max-w-[340px] text-sm leading-relaxed text-white/50 md:text-right">
          Не просто стек. Архитектура, визуальная система, motion и точность в
          деталях.
        </p>
      </div>

      <div className="mt-14 grid auto-rows-[190px] grid-cols-1 gap-4 md:grid-cols-6">
        {ITEMS.map((it) => (
          <article
            key={it.title}
            data-card
            className={[
              "group relative overflow-hidden rounded-[28px]",
              "border border-white/10 bg-white/[0.04]",
              "backdrop-blur-xl transition-colors duration-300",
              it.wide ? "md:col-span-3" : "md:col-span-2",
            ].join(" ")}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_42%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

            <div
              data-dim
              className="pointer-events-none absolute inset-0 z-[11] bg-[rgba(0,0,0,0.48)] opacity-0"
            />

            <div
              data-glow
              className="pointer-events-none absolute left-1/2 top-1/2 z-[13] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/16 blur-3xl"
            />

            <SkillOverlay kind={it.kind} />

            <div
              data-inner
              className="relative z-20 flex h-full flex-col justify-between p-6 md:p-7 will-change-transform"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  data-meta
                  className="text-[11px] uppercase tracking-[0.22em] text-white/35"
                >
                  {it.meta}
                </div>

                <div
                  data-badge
                  className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/40"
                >
                  Skill
                </div>
              </div>

              <div>
                <h3
                  data-title
                  className="text-xl font-medium tracking-[-0.03em] md:text-[26px]"
                >
                  {it.title}
                </h3>

                <p
                  data-desc
                  className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/60 md:text-[15px]"
                >
                  {it.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
