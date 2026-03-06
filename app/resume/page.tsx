import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Резюме — Роман Кузнецов",
  description:
    "Резюме Романа Кузнецова: веб-разработка, UX/UI, React, Next.js, Strapi, управление проектами.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
