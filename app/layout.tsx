import "./globals.css";
import type { Metadata } from "next";
import CursorGlow from "@/components/CursorGlow";

export const metadata: Metadata = {
  metadataBase: new URL("https://rframe.ru"),
  title: { default: "Roman — Portfolio", template: "%s — Portfolio" },
  description: "Портфолио. Next.js / React / GSAP. Проекты, навыки, контакты.",
  openGraph: {
    title: "Роман — Portfolio",
    description: "Проекты, навыки, контакты.",
    url: "https://rframe.ru",
    siteName: "Portfolio",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://rframe.ru" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
