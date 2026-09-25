import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.siteName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: "Каталоги мебели муосир ва зебо дар Тоҷикистон. Спальные гарнитуры, меҳмонхона, ошхона, шкафҳо ва диванҳо бо нархҳои дастрас ва таҳвил дар тамоми Тоҷикистон.",
  keywords: [
    "мебел дар тоҷикистон",
    "мебель таджикистан",
    "спальные гарнитуры душанбе",
    "диваны душанбе",
    "кухня таджикистан",
    "шкаф купе душанбе",
    "мебели тоҷикӣ",
    "доставка мебел тоҷикистон"
  ],
  authors: [{ name: siteConfig.siteName }],
  openGraph: {
    title: `${siteConfig.siteName} — Мебели замонавӣ дар Тоҷикистон`,
    description: "Каталоги мебели зебо ва босифат: Спальни, Диванҳо, Ошхона, Шкафҳо. Фармоиш бо як клик тавассути WhatsApp!",
    type: "website",
    locale: "tg_TJ",
    siteName: siteConfig.siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tg" className={`${inter.variable} ${outfit.variable}`}>
      <body className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
