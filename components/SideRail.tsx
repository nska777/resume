"use client";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

const DOTS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#works", label: "Works" },
  { href: "#contact", label: "Contact" },
];

export default function SideRail() {
  function go(href: string) {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  }

  return (
    <div className="fixed bottom-8 left-6 z-[50] hidden md:flex">
      <div className="flex flex-col items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur">
        {DOTS.map((d, i) => (
          <button
            key={d.href}
            onClick={() => go(d.href)}
            aria-label={d.label}
            className={cn(
              "h-8 w-8 rounded-full grid place-items-center hover:bg-white/10 transition cursor-pointer",
            )}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-white/40"
              style={{ opacity: 0.55 + i * 0.06 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
