"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);

  const text = "Проектирую UX/UI и разрабатываю современные веб-интерфейсы.";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const letters = el.querySelectorAll(".letter");

    gsap.fromTo(
      letters,
      {
        y: 40,
        opacity: 0,
        rotate: () => gsap.utils.random(-40, 40),
      },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <h1 ref={ref} className="text-4xl md:text-6xl font-semibold leading-tight">
      {text.split("").map((char, i) => (
        <span key={i} className="letter inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
