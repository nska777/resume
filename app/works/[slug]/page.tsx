"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { WORKS } from "@/app/data/works";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function WorkPage() {
  const params = useParams<{ slug: string }>();
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const work = useMemo(() => {
    const slug = typeof params?.slug === "string" ? params.slug : "";
    return WORKS.find((item) => item.slug === slug);
  }, [params?.slug]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!work) {
    notFound();
  }

  const isEcommerce = work.slug === "ecommerce";

  const hero = work.images[0];
  const sliderImages = isEcommerce ? work.images.slice(1, 11) : [];
  const restImages = isEcommerce ? work.images.slice(12) : work.images.slice(1);

  const lightboxImages = [
    ...(hero ? [hero] : []),
    ...sliderImages,
    ...restImages,
  ];

  const openLightbox = (src: string) => {
    const idx = lightboxImages.findIndex((img) => img === src);
    if (idx >= 0) setOpenIndex(idx);
  };

  const closeLightbox = () => setOpenIndex(null);

  const prevLightbox = () => {
    setOpenIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? lightboxImages.length - 1 : prev - 1;
    });
  };

  const nextLightbox = () => {
    setOpenIndex((prev) => {
      if (prev === null) return prev;
      return prev === lightboxImages.length - 1 ? 0 : prev + 1;
    });
  };

  const slide = (dir: "prev" | "next") => {
    const el = sliderRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-slide]");
    const step = firstCard ? firstCard.offsetWidth + 16 : 360;

    el.scrollBy({
      left: dir === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, lightboxImages.length]);

  return (
    <main className="min-h-screen bg-[#0b0c10] px-6 py-20 text-white">
      <div className="mx-auto max-w-[1200px]">
        <Link
          href="/#works"
          className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
        >
          ← Назад к работам
        </Link>

        <div className="mt-10 max-w-[760px]">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            {work.tag}
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            {work.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-white/62 md:text-lg">
            {work.desc}
          </p>
        </div>

        {hero ? (
          <section className="mt-14">
            <div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-white/35">
              Основной экран
            </div>

            <div className="mx-auto max-w-[980px]">
              <button
                type="button"
                onClick={() => openLightbox(hero)}
                className="group block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] text-left"
              >
                <img
                  src={hero}
                  alt={work.title}
                  className="w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                />
              </button>
            </div>
          </section>
        ) : null}

        {isEcommerce && sliderImages.length > 0 ? (
          <section className="mt-16">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Product cards
                </div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                  Карусель карточек товаров
                </h2>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <button
                  type="button"
                  onClick={() => slide("prev")}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => slide("next")}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  →
                </button>
              </div>
            </div>

            <div
              ref={sliderRef}
              className={cn(
                "flex gap-4 overflow-x-auto pb-2",
                "snap-x snap-mandatory scroll-smooth",
                "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {sliderImages.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  data-slide
                  onClick={() => openLightbox(img)}
                  className={cn(
                    "min-w-[84%] snap-start overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] text-left",
                    "sm:min-w-[62%] lg:min-w-[420px]",
                  )}
                >
                  <div className="flex h-[300px] items-center justify-center bg-[#111318] sm:h-[340px]">
                    <img
                      src={img}
                      alt={`${work.title} card ${idx + 1}`}
                      className="h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {restImages.length > 0 ? (
          <section className="mt-16">
            <div className="mb-5 text-[11px] uppercase tracking-[0.22em] text-white/35">
              Screens
            </div>

            <div className="space-y-6">
              {restImages.map((img, idx) => {
                const isPair =
                  idx % 3 === 1 && idx + 1 < restImages.length && !isEcommerce;

                if (isPair) {
                  const nextImg = restImages[idx + 1];
                  return (
                    <div
                      key={`${img}-${nextImg}`}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(img)}
                        className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] text-left"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full object-cover transition duration-300 hover:scale-[1.01]"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => openLightbox(nextImg)}
                        className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] text-left"
                      >
                        <img
                          src={nextImg}
                          alt=""
                          className="w-full object-cover transition duration-300 hover:scale-[1.01]"
                        />
                      </button>
                    </div>
                  );
                }

                if (!isEcommerce && idx > 0 && idx % 3 === 2) {
                  return null;
                }

                return (
                  <button
                    key={img}
                    type="button"
                    onClick={() => openLightbox(img)}
                    className="block w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] text-left"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full object-cover transition duration-300 hover:scale-[1.01]"
                    />
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>

      {openIndex !== null ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>

          {lightboxImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-lg text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-lg text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                →
              </button>
            </>
          ) : null}

          <div className="max-h-[92vh] w-full max-w-[1400px] overflow-hidden rounded-[24px] border border-white/10 bg-[#111318]">
            <img
              src={lightboxImages[openIndex]}
              alt=""
              className="max-h-[92vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
