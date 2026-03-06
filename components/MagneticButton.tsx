"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0..1
};

type AnchorProps = CommonProps & {
  as: "a";
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = CommonProps & {
  as?: "button";
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type Props = AnchorProps | ButtonProps;

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function MagneticButton(props: Props) {
  const { children, className, strength = 0.55 } = props;

  const elRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const node = elRef.current;
    if (!node) return;

    const el = node as HTMLElement;

    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    if (isCoarse) return;

    const max = 18 * strength;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const nx = dx / (r.width / 2);
      const ny = dy / (r.height / 2);

      gsap.to(el, {
        x: nx * max,
        y: ny * max,
        duration: 0.22,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onDown = () => {
      gsap.to(el, {
        scale: 0.985,
        duration: 0.12,
        ease: "power2.out",
      });
    };

    const onUp = () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.18,
        ease: "power2.out",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
    };
  }, [strength]);

  const common =
    "relative inline-flex items-center justify-center cursor-pointer select-none transition will-change-transform";

  if (props.as === "a") {
    return (
      <a
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        onClick={props.onClick}
        className={cn(common, className)}
      >
        {children}

        <span
          className="pointer-events-none absolute -inset-4 -z-10 opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18), rgba(16,185,129,0.10), transparent 60%)",
            filter: "blur(18px)",
          }}
        />
        <style jsx>{`
          a:hover > span,
          button:hover > span {
            opacity: 1;
          }
        `}</style>
      </a>
    );
  }

  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={props.onClick}
      className={cn(common, className)}
    >
      {children}

      <span
        className="pointer-events-none absolute -inset-4 -z-10 opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18), rgba(16,185,129,0.10), transparent 60%)",
          filter: "blur(18px)",
        }}
      />
      <style jsx>{`
        a:hover > span,
        button:hover > span {
          opacity: 1;
        }
      `}</style>
    </button>
  );
}
