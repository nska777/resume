"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MagneticButton from "@/components/MagneticButton";

const LINKS = [
  { href: "#home", label: "Главная" },
  { href: "#about", label: "Обо мне" },
  { href: "#skills", label: "Навыки" },
  { href: "#works", label: "Работы" },
  { href: "#contact", label: "Контакты" },
];

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function getScrollRoot(): HTMLElement | null {
  return document.getElementById("scroll-root");
}

function getInitialActive(): string {
  if (typeof window === "undefined") return "#home";

  const currentHash = window.location.hash;
  if (currentHash && LINKS.some((l) => l.href === currentHash)) {
    return currentHash;
  }

  return "#home";
}

export default function Header() {
  const [active, setActive] = useState<string>(getInitialActive);
  const ids = useMemo(() => LINKS.map((l) => l.href.replace("#", "")), []);

  useEffect(() => {
    const rootEl = getScrollRoot();
    if (!rootEl) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (vis?.target?.id) {
          setActive(`#${vis.target.id}`);
        }
      },
      {
        root: rootEl,
        threshold: [0.15, 0.3, 0.45, 0.6],
        rootMargin: "-12% 0px -55% 0px",
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  function go(href: string) {
    const rootEl = getScrollRoot();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!rootEl || !el) return;

    setActive(href);

    const headerOffset = 64;
    const top =
      el.getBoundingClientRect().top -
      rootEl.getBoundingClientRect().top +
      rootEl.scrollTop -
      headerOffset;

    rootEl.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <button
          onClick={() => go("#home")}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-white/40" />
          Портфолио
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-2 text-xs uppercase tracking-[0.14em] transition",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                {l.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/resume" className="inline-flex">
            <MagneticButton
              className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
              strength={0.6}
            >
              Резюме
            </MagneticButton>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
