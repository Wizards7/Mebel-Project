import { siteConfig } from "@/data/siteConfig";
import { generateGeneralConsultationLink, generatePhoneCallLink } from "@/lib/whatsapp";
import Container from "@/components/ui/Container";
import { Phone, MessageCircle, MapPin, Clock, Truck, ShieldCheck, Send } from "lucide-react";

export const metadata = {
  title: "Тамос ва суроға — Мебели Тоҷикистон",
  description: "Рақамҳои тамос, WhatsApp ва суроғаи маркази мебели мо. Доставка дар тамоми Тоҷикистон.",
};

export default function ContactPage() {
  const whatsAppLink = generateGeneralConsultationLink();
  const phoneCallLink = generatePhoneCallLink(siteConfig.defaultPhone);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
            Тамос бо мо
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Барои гирифтани маълумоти бештар оид ба нархҳо, андозаҳо, таҳвил ва фармоиши мебел шумо метавонед бо мо тавассути WhatsApp ё телефон дар тамос шавед.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: WhatsApp (Primary) */}
          <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 shadow-soft-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-soft">
                <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-950 font-display">
                Чат дар WhatsApp
              </h3>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Посухи зуд дар давоми чанд дақиқа. Аксҳо, видео ва маълумоти муфассалро мефиристем.
              </p>
            </div>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-soft transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Навиштан дар WhatsApp</span>
            </a>
          </div>

          {/* Card 2: Phone call */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-soft-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-brand-400 flex items-center justify-center shadow-soft">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Занги мустақим
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Шумо метавонед мустақиман бо фурӯшанда ва мутахассиси мо гуфтугӯ намоед.
              </p>
              <div className="text-lg font-bold text-stone-900 pt-1">
                {siteConfig.displayPhone}
              </div>
            </div>

            <a
              href={phoneCallLink}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold shadow-soft transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Занг задан ҳозир</span>
            </a>
          </div>

          {/* Card 3: Working Hours & Location */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200 shadow-soft-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shadow-soft">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                Суроға ва соатҳои корӣ
              </h3>
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                  <span>{siteConfig.addressFull}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>{siteConfig.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
              Ташриф пешакӣ бо мувофиқаи телефонӣ қабул карда мешавад.
            </div>
          </div>
        </div>

        {/* Delivery Policy Note */}
        <div className="bg-stone-100 rounded-3xl p-8 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-soft flex-shrink-0 border border-stone-200">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-900 font-display">
                {siteConfig.deliveryText}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Маълумоти бештар дар бораи нарх ва мӯҳлати таҳвилро ҳангоми суҳбат дар WhatsApp метавонед дақиқ намоед.
              </p>
            </div>
          </div>

          <a
            href={whatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold whitespace-nowrap shadow-soft transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Маълумоти таҳвил дар WhatsApp</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
