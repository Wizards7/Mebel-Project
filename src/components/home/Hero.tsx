import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { generateGeneralConsultationLink } from "@/lib/whatsapp";
import { MessageCircle, ArrowRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Hero() {
  const whatsAppLink = generateGeneralConsultationLink();

  return (
    <div className="relative overflow-hidden bg-stone-900 text-white py-16 sm:py-24 lg:py-28">
      {/* Background Image with warm overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Мебели муосир ва зебо"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/40" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          {/* Trust badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-brand-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Каталоги мебели навтарини соли 2026</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.15]">
            Мебели зебо ва бароҳат барои хонаи шумо
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
            Интихоби васеи гарнитурҳои хоб, меҳмонхона, ошхона, шкафҳо ва диванҳо бо сифати баланд ва нархи дастрас. {siteConfig.deliveryText}.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-base font-bold shadow-soft-lg hover:shadow-soft-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Дидани каталог</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-soft transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
              <span>Тамос дар WhatsApp</span>
            </a>
          </div>

          {/* Quick micro stats / Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-stone-300">
              <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Доставка дар тамоми Тоҷикистон</span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>Сифати баланд ва кафолат</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 text-stone-300">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span>Маслиҳати ройгон дар WhatsApp</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
