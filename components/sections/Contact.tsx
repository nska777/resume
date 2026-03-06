"use client";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-[1200px] px-6 py-24">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/8 to-transparent p-10">
        {/* glow background */}
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_50%_35%,black,transparent_70%)]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(42,127,255,0.22),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.10),transparent_55%)]" />
        </div>

        <div className="relative">
          <p className="text-sm text-white/60">Заказы / сотрудничество</p>

          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Готов присоединиться к команде и усиливать существующие продукты
          </h2>

          <p className="mt-4 max-w-[650px] text-sm leading-relaxed text-white/70">
            Я занимаюсь проектированием UX/UI и разработкой современных
            интерфейсов на React / Next.js. Если вам нужен разработчик, UI/UX
            дизайнер или человек, который может сделать продукт **от идеи до
            готового интерфейса** — напишите мне. Открыт для работы в команде,
            контрактных проектов и долгосрочного сотрудничества.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Email */}
            <a
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90 transition"
              href="mailto:kuznetsovroman212@gmail.com"
            >
              Email
            </a>

            {/* Telegram */}
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              href="https://t.me/nska777"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>

            {/* Phone */}
            <a
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              href="tel:+998917980104"
            >
              Позвонить
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Roman Kuznetsov
      </div>
    </section>
  );
}
