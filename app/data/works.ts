export type Work = {
  slug: string;
  title: string;
  tag: string;
  desc: string;
  images: string[];
};

export const WORKS: Work[] = [
  {
    slug: "ecommerce",
    title: "E-commerce витрина",
    tag: "UX/UI / Next.js React, Typescript",
    desc: "Каталог, карточка товара, фильтры.",
    images: [
      "/works/ecommerce/1.jpg",
      "/works/ecommerce/2.jpg",
      "/works/ecommerce/3.jpg",
			"/works/ecommerce/4.jpg",
			"/works/ecommerce/5.jpg",
			"/works/ecommerce/6.jpg",
			"/works/ecommerce/7.jpg",
			"/works/ecommerce/8.jpg",
			"/works/ecommerce/9.jpg",
			"/works/ecommerce/10.jpg",
			
    ],
  },
  {
    slug: "dashboard",
    title: "Admin Dashboard",
    tag: "UX / UI ",
    desc: "Таблицы, роли, статусы.",
    images: [
			"/works/dashboard/1.jpg", 
			"/works/dashboard/2.jpg",
			"/works/dashboard/3.jpg",
		],
  },
  {
    slug: "landing",
    title: "Landing + GSAP",
    tag: "Motion",
    desc: "Pinned сцены, reveal анимации.",
    images: [
			"/works/landing/1.jpg", 
			"/works/landing/2.jpg",
			"/works/landing/3.jpg",
			"/works/landing/4.jpg",
			"/works/landing/5.jpg",
			"/works/landing/6.jpg",
			"/works/landing/7.jpg",
			"/works/landing/8.jpg",
			"/works/landing/9.jpg",
			"/works/landing/10.jpg",
			"/works/landing/11.jpg",
		],
  },
	{
  slug: "insurance",
  title: "Insurance Platform",
  tag: "UX / UI",
  desc: "Сервис оформления страховых полисов. Калькулятор, формы, UX сценарии.",
  images: [
    "/works/insurance/1.jpg",
    "/works/insurance/2.jpg",
    "/works/insurance/3.jpg",
		"/works/insurance/4.jpg",
		"/works/insurance/5.jpg",
		"/works/insurance/6.jpg",
		"/works/insurance/7.jpg",
  ],
},
{
  slug: "esports",
  title: "Esports Platform",
  tag: "UX / UI",
  desc: "Киберспортивный портал: турниры, команды, статистика матчей.",
  images: [
    "/works/esports/1.jpg",
    "/works/esports/2.jpg",
    "/works/esports/3.jpg",
    "/works/esports/4.jpg",
		"/works/esports/5.jpg"
  ],
},
{
  slug: "figma",
  title: "Figma",
  tag: "UX / UI",
  desc: "В скором времени оформлю нормально.",
  images: [
    "/works/figma/1.jpg",
    "/works/figma/2.jpg",
    "/works/figma/3.jpg",
    "/works/figma/4.jpg",
		"/works/figma/5.jpg",
		"/works/figma/6.jpg",
		"/works/figma/7.jpg",
		"/works/figma/8.jpg",

  ],
},
];

export function getWork(slug: string) {
  return WORKS.find((w) => w.slug === slug);
}