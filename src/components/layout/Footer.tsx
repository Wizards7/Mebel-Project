import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { categories } from "@/data/categories";
import { generateGeneralConsultationLink, generatePhoneCallLink } from "@/lib/whatsapp";
import { Armchair, MessageCircle, Phone, MapPin, Clock, Truck, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Footer() {
  const whatsAppLink = generateGeneralConsultationLink();
  const phoneCallLink = generatePhoneCallLink(siteConfig.defaultPhone);

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                <Armchair className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white">
                {siteConfig.siteName}
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              {siteConfig.tagline}. Мебели босифат ва зебо бо нархҳои дастрас ва таҳвили мустақим ба хонаи шумо.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-400 bg-stone-800/80 px-3 py-2 rounded-lg border border-stone-700/50">
              <Truck className="w-4 h-4 flex-shrink-0" />
              <span>{siteConfig.deliveryText}</span>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Категорияҳои мебел
            </h3>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/catalog/${cat.slug}`}
                    className="text-stone-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Trust */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Маълумот
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/catalog" className="text-stone-400 hover:text-white transition-colors">
                  Каталоги пурра
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-400 hover:text-white transition-colors">
                  Дар бораи мо
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-white transition-colors">
                  Тамос ва суроға
                </Link>
              </li>
            </ul>
            <div className="pt-2 flex items-center gap-2 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Сифати кафолатнок ва маводи аъло</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-display">
              Тамос ва суроға
            </h3>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span>{siteConfig.addressFull}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>{siteConfig.workingHours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href={phoneCallLink} className="hover:text-white transition-colors">
                  {siteConfig.displayPhone}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-soft"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                <span>Фармоиш тавассути WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.siteName}. Ҳамаи ҳуқуқҳо маҳфузанд.</p>
          <p className="text-stone-400">Тарҳрезишуда барои харидорони Тоҷикистон</p>
        </div>
      </Container>
    </footer>
  );
}
