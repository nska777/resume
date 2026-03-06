"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";
import { WORKS } from "@/app/data/works";

export default function Works() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const gsap = ensureGsap();
    if (!gsap) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-w]"));
    if (!cards.length) return;

    gsap.set(cards, { y: 22, opacity: 0 });

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
        stagger: 0.07,
        duration: 0.75,
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

    const checkVisible = () => {
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
    };

    requestAnimationFrame(checkVisible);

    const timeoutId = window.setTimeout(checkVisible, 80);
    window.addEventListener("resize", checkVisible);

    return () => {
      io.disconnect();
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", checkVisible);
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section
      id="works"
      ref={ref}
      className="mx-auto w-full max-w-[1200px] px-6 py-20"
    >
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-2xl font-semibold md:text-3xl">Несколько Работ</h2>
        <p className="text-sm text-white/55">кейсы / демо</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {WORKS.map((w) => (
          <Link
            key={w.slug}
            data-w
            href={`/works/${w.slug}`}
            className="group cursor-pointer rounded-[22px] border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-white/60">{w.tag}</div>
              <span className="text-white/40 transition group-hover:text-white/70">
                ↗
              </span>
            </div>

            <div className="mt-3 text-lg font-semibold">{w.title}</div>

            <div className="mt-2 text-sm leading-relaxed text-white/65">
              {w.desc}
            </div>

            {/* preview image */}
            <div className="mt-6 overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03]">
              <div className="relative h-[120px] w-full">
                <img
                  src={w.images[0]}
                  alt={w.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* glow effect */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
                  <div className="absolute -bottom-10 left-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
