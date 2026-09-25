"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { generateGeneralConsultationLink, generatePhoneCallLink } from "@/lib/whatsapp";
import { MessageCircle, Phone, Menu, X, Armchair } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/catalog", label: "Каталог" },
    { href: "/about", label: "Дар бораи мо" },
    { href: "/contact", label: "Тамос" },
  ];

  const whatsAppLink = generateGeneralConsultationLink();
  const phoneCallLink = generatePhoneCallLink(siteConfig.defaultPhone);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top micro bar with delivery info and direct phone */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 hidden sm:block">
        <Container className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{siteConfig.deliveryText}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-stone-400">{siteConfig.workingHours}</span>
            <a
              href={phoneCallLink}
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium text-stone-200"
            >
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{siteConfig.displayPhone}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <nav>
        <Container className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-stone-900 text-brand-400 flex items-center justify-center shadow-soft group-hover:bg-brand-600 group-hover:text-white transition-all">
              <Armchair className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold font-display text-stone-900 tracking-tight block leading-none">
                {siteConfig.siteName}
              </span>
              <span className="text-[11px] text-stone-500 font-medium tracking-wide">
                Мебели замонавӣ ва босифат
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors py-1 relative ${
                    isActive
                      ? "text-stone-950 font-bold"
                      : "text-stone-600 hover:text-stone-950"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={phoneCallLink}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors"
            >
              <Phone className="w-4 h-4 text-stone-500" />
              <span>{siteConfig.displayPhone}</span>
            </a>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-soft hover:shadow-soft-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Фармоиш додан</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-50" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-800" />}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-base font-semibold ${
                pathname === "/" ? "bg-stone-100 text-stone-900" : "text-stone-700"
              }`}
            >
              Асосӣ
            </Link>
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? "bg-stone-100 text-stone-900" : "text-stone-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="text-xs text-stone-500 font-medium px-3">
              {siteConfig.deliveryText}
            </div>

            <a
              href={phoneCallLink}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-stone-100 text-stone-800 font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-stone-600" />
              <span>Занг задан: {siteConfig.displayPhone}</span>
            </a>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-soft"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Фармоиш бо WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
