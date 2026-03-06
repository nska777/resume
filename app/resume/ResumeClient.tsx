"use client";

import Link from "next/link";

const RESUME = {
  name: "Роман Кузнецов",
  role: "Frontend Developer / UX UI Designer / Project Lead",
  location: "Ташкент, Узбекистан",
  salary: "от 15 000 000 so'm на руки",
  employment: "Полная занятость",
  workFormat: "На месте работодателя или Удаленный формат",
  travel: "Желательное время в пути: не имеет значения",
  experienceTotal: "Опыт работы — 10 лет 2 месяца",
  email: "kuznetsovroman212@gmail.com",
  telegram: "https://t.me/nska777",
  phone: "+998917980104",
  summary:
    "Разрабатываю современные веб-интерфейсы, сайты, CRM и цифровые продукты: от сбора требований и проектирования структуры до UI-дизайна, фронтенд-разработки и дальнейшего сопровождения. Сочетаю технический подход, продуктовое мышление и визуальную аккуратность. Работаю с React, Next.js, TypeScript, Tailwind, CMS Strapi, а также веду проекты и координирую командную работу.",
  skills: [
    "HTML5, CSS3, JavaScript (ES6+)",
    "React, Next.js, TypeScript",
    "Tailwind CSS",
    "GSAP + ScrollTrigger",
    "UI/UX design, прототипирование, wireframes",
    "Figma",
    "Adobe Photoshop",
    "Adobe After Effects",
    "CMS / Strapi",
    "SEO, Performance, Accessibility",
    "Проектное управление и постановка задач",
    "Jira, документация, коммуникация со стейкхолдерами",
  ],
  specialties: [
    "UX/UI дизайнер, разработчик",
    "Руководитель группы разработки",
    "Руководитель проектов",
  ],
  languages: ["Русский — родной", "Английский — B1", "Узбекский — B1"],
  experience: [
    {
      title: "UX/UI Designer / Web Developer — NEO INSURANCE CORP",
      period: "Октябрь 2025 — настоящее время",
      bullets: [
        "Создание интерфейсов и веб-решений: сайты, CRM, веб-приложения.",
        "Сбор требований, прототипирование, UI/UX-дизайн, фронтенд-разработка и сопровождение.",
        "Разработка современных интерфейсов с акцентом на удобство, адаптивность и визуальное качество.",
        "Участие в цифровом развитии проектов компании и улучшении пользовательского опыта.",
      ],
    },
    {
      title: "Web Developer / Motion / System Engineer — PROFI-SCAN",
      period: "Февраль 2024 — Июль 2025",
      bullets: [
        "Создание корпоративного сайта дочерней компании: от структуры и дизайна до полной реализации.",
        "Разработка визуальных материалов и цифровых решений для компании и дочерних проектов.",
        "Участие в комплексных проектах совместно с Министерством культуры.",
        "Создан корпоративный сайт, усиливший онлайн-присутствие компании и привлёкший новых партнёров.",
        "Сформирован масштабный цифровой архив: обработано более 50 000 музейных экспонатов.",
        "Подготовлены визуальные материалы для выставок и кампаний, что увеличило вовлечённость аудитории на 40%.",
      ],
    },
    {
      title: "Network Engineer — Start.moscow",
      period: "Февраль 2022 — Декабрь 2022",
      bullets: [
        "Подключение и настройка интернет-услуг для частных и корпоративных клиентов.",
        "Монтаж и настройка сетевого оборудования, диагностика и устранение неисправностей.",
        "Консультирование клиентов по эксплуатации оборудования и ПО.",
        "Участие в подключении более 500 клиентов с обеспечением стабильной работы сети.",
        "Оптимизация процессов монтажа, сократившая среднее время подключения на 20%.",
      ],
    },
    {
      title: "Service Manager — ERC Distribution Tashkent",
      period: "Декабрь 2020 — Декабрь 2021",
      bullets: [
        "Организация и развитие сети сервисных центров по всей республике.",
        "Внедрение стандартов обслуживания, контроль качества и оптимизация бизнес-процессов.",
        "Разработка и интеграция базы IMEI-кодов для контроля гарантийных случаев.",
        "Создание корпоративного веб-портала для партнёров и автоматизации документооборота.",
        "Построена сеть из 10 сервисных центров в регионах.",
        "Количество мошеннических обращений сокращено на 85% благодаря централизованной базе.",
        "Веб-портал позволил снизить время обработки заявок на 70%.",
      ],
    },
    {
      title: "Product Manager / Web Developer — ASAP SROCKY",
      period: "Сентябрь 2019 — Сентябрь 2020",
      bullets: [
        "Управление продуктом на всех этапах жизненного цикла: от идеи до релиза и масштабирования.",
        "Разработка продуктовой стратегии, roadmap, анализ рынка и потребностей аудитории.",
        "Постановка задач команде и координация разработки.",
        "Разработка и поддержка веб-приложений на HTML, CSS, JavaScript, React, Next.js.",
        "Участие в создании 5 полноценных веб-приложений, что увеличило клиентскую базу на 25%.",
      ],
    },
    {
      title: "Product Manager / Team Lead — JAHON SALTANATI GLOBAL",
      period: "Август 2014 — Август 2019",
      bullets: [
        "Управление командой, развитие сотрудников и организация рабочих процессов.",
        "Ведение продукта от идеи до релиза и поддержки.",
        "Планирование спринтов, контроль сроков и координация задач.",
        "Работа с партнёрами и стейкхолдерами, анализ метрик и обратной связи.",
        "Оптимизация бизнес-процессов и автоматизация рутинных операций.",
        "Вывод продукта на рынок с ростом выручки компании на 25% за год.",
        "Сокращение времени выполнения процессов с 4 часов до 1 часа.",
        "Формирование сильной команды из 5+ специалистов.",
      ],
    },
  ],
  projects: [
    {
      name: "Portfolio Website",
      desc: "Личное портфолио с современным UI, анимациями, адаптивом и презентацией навыков.",
      link: "#",
    },
    {
      name: "NEO Insurance",
      desc: "Интерфейсы и веб-решения для страховой компании: сайты, CRM, UX/UI и frontend.",
      link: "https://neoinsurance.uz/",
    },
    {
      name: "Power MT",
      desc: "Веб-проект с акцентом на структуру, интерфейс и качественную визуальную подачу.",
      link: "https://power-mt.uz/",
    },
    {
      name: "Textile La Casa",
      desc: "Коммерческий веб-проект с современным подходом к UX/UI и подаче бренда.",
      link: "https://textilelacasa.uz/",
    },
  ],
  education: [
    {
      name: "Ташкентский Университет Информационных Технологий",
      period: "2014",
      desc: "Компьютерный инжиниринг",
    },
    {
      name: "Ташкентский профессиональный колледж информационных технологий",
      period: "2010",
      desc: "ИКТ / электроника",
    },
  ],
  about:
    "Имею опыт в разработке и запуске цифровых решений: сайты, веб-приложения, CRM, интерфейсы и внутренние системы. Понимаю, как сочетать задачи бизнеса, удобство для пользователя и аккуратную реализацию. Могу работать как самостоятельно в разработке, так и в связке с командой, заказчиком и другими участниками проекта.",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="resume-chip inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
      {children}
    </h2>
  );
}

export default function ResumeClient() {
  return (
    <main className="resume-page min-h-screen bg-[#0b0c10] text-white">
      <header className="resume-toolbar sticky top-0 z-10 border-b border-white/10 bg-[#0b0c10]/70 backdrop-blur print:hidden">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
          <Link
            href="/#home"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 transition hover:bg-white/10"
          >
            ← Назад
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:opacity-90"
            >
              Скачать PDF
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1100px] px-6 py-10">
        <div className="resume-grid grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="resume-card rounded-[28px] border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold md:text-4xl">
                  {RESUME.name}
                </h1>
                <p className="mt-2 text-sm text-white/65">{RESUME.role}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>{RESUME.location}</Chip>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-sm text-white/70">
                <a
                  className="transition hover:text-white"
                  href={`mailto:${RESUME.email}`}
                >
                  Почта
                </a>

                <a
                  className="transition hover:text-white"
                  href={RESUME.telegram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Telegram ↗
                </a>

                <a
                  className="transition hover:text-white"
                  href={`tel:${RESUME.phone}`}
                >
                  Позвонить
                </a>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-white/70">
              {RESUME.summary}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="resume-inner-card rounded-[18px] border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">
                  Доход
                </div>
                <div className="mt-2 font-medium text-white">
                  {RESUME.salary}
                </div>
              </div>

              <div className="resume-inner-card rounded-[18px] border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">
                  Занятость
                </div>
                <div className="mt-2 font-medium text-white">
                  {RESUME.employment}
                </div>
              </div>

              <div className="resume-inner-card rounded-[18px] border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">
                  Формат работы
                </div>
                <div className="mt-2 font-medium text-white">
                  {RESUME.workFormat}
                </div>
              </div>

              <div className="resume-inner-card rounded-[18px] border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                <div className="text-xs uppercase tracking-[0.12em] text-white/45">
                  Опыт
                </div>
                <div className="mt-2 font-medium text-white">
                  {RESUME.experienceTotal}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <SectionTitle>Опыт</SectionTitle>
              <div className="mt-5 space-y-5">
                {RESUME.experience.map((job) => (
                  <div
                    key={job.title}
                    className="resume-inner-card rounded-[18px] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-base font-semibold">{job.title}</div>
                      <div className="text-xs text-white/55">{job.period}</div>
                    </div>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                      {job.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <SectionTitle>Проекты</SectionTitle>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {RESUME.projects.map((p) => (
                  <a
                    key={p.name}
                    href={p.link}
                    target={p.link.startsWith("http") ? "_blank" : undefined}
                    rel={p.link.startsWith("http") ? "noreferrer" : undefined}
                    className="resume-inner-card group rounded-[18px] border border-white/10 bg-black/20 p-5 transition hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{p.name}</div>
                      <span className="text-white/40 transition group-hover:text-white/70">
                        ↗
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/70">{p.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="resume-card rounded-[28px] border border-white/10 bg-white/5 p-7">
              <SectionTitle>Ключевые роли</SectionTitle>
              <div className="mt-4 flex flex-wrap gap-2">
                {RESUME.specialties.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <div className="resume-card rounded-[28px] border border-white/10 bg-white/5 p-7">
              <SectionTitle>Навыки</SectionTitle>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {RESUME.skills.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="resume-card rounded-[28px] border border-white/10 bg-white/5 p-7">
              <SectionTitle>Образование</SectionTitle>
              <div className="mt-4 space-y-4">
                {RESUME.education.map((e) => (
                  <div
                    key={e.name}
                    className="resume-inner-card rounded-[18px] border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold">{e.name}</div>
                      <div className="text-xs text-white/55">{e.period}</div>
                    </div>
                    <p className="mt-2 text-sm text-white/70">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="resume-card rounded-[28px] border border-white/10 bg-white/5 p-7">
              <SectionTitle>Языки</SectionTitle>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {RESUME.languages.map((l) => (
                  <li key={l}>• {l}</li>
                ))}
              </ul>
            </div>

            <div className="resume-card rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-7">
              <SectionTitle>Обо мне</SectionTitle>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {RESUME.about}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Chip>Frontend</Chip>
                <Chip>UX/UI</Chip>
                <Chip>Project Management</Chip>
                <Chip>Web Products</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
