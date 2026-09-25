import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { generateGeneralConsultationLink } from "@/lib/whatsapp";
import Container from "@/components/ui/Container";
import { ShieldCheck, Truck, Wrench, HeartHandshake, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Дар бораи мо — Мебели Тоҷикистон",
  description: "Дар бораи ширкати мебели мо. Сифати баланд, тарҳи замонавӣ, доставка дар тамоми Тоҷикистон ва хизматрасонии касбӣ.",
};

export default function AboutPage() {
  const whatsAppLink = generateGeneralConsultationLink();

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Hero Intro */}
      <Container>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Дар бораи фаъолияти мо</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-stone-900 tracking-tight">
            Мо ба хонаи шумо гармӣ, зебоӣ ва бароҳатӣ мебахшем
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            «{siteConfig.siteName}» — яке аз марказҳои пешсафи пешниҳоди мебели муосир ва классикӣ дар Тоҷикистон мебошад. Мақсади асосии мо пешниҳоди мебели хушсифат бо нархҳои дастрас ва таҳвили мустақим ба дари хонаи шумост.
          </p>
        </div>
      </Container>

      {/* Visual Image & Story Banner */}
      <Container>
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] max-h-[450px] shadow-soft-lg">
          <Image
            src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1600&auto=format&fit=crop"
            alt="Шоурум ва мебели тоҷикистон"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white max-w-xl">
              <span className="text-brand-300 text-xs font-bold uppercase tracking-wider block mb-1">
                Сифати кафолатнок
              </span>
              <p className="text-sm sm:text-base text-stone-200">
                Ҳар як маҳсулот пеш аз фиристодан санҷида шуда, бо бастабандии бехатар ба муштарӣ расонида мешавад.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Core Principles */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-soft-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              Маводи сифатнок ва тобовар
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Мо танҳо аз MDF-и зичии баланд, чӯби табиии хушкшуда ва фурнитураҳои устувор истифода мебарем, то мебел солҳои тӯлонӣ хидмат кунад.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-soft-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              Доставка дар тамоми Тоҷикистон
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Новобаста аз он ки шумо дар Душанбе, Хуҷанд, Кӯлоб, Бохтар ё дигар ноҳия ҳастед, фармоиши шумо сари вақт дастрас мегардад.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-soft-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">
              Муносибати самимӣ бо муштарӣ
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Мо дар WhatsApp ҳамеша омодаи посухгӯӣ ҳастем, аксу видеоҳои иловагиро мефиристем ва дар интихоби андозаву ранг ёрӣ мерасонем.
            </p>
          </div>
        </div>
      </Container>

      {/* CTA Box */}
      <Container>
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-display text-white">
              Мехоҳед мебели мувофиқро пайдо кунед?
            </h3>
            <p className="text-stone-400 text-sm max-w-md">
              Каталоги моро аз назар гузаронед ё бо мутахассиси мо дар WhatsApp тамос гиред.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-all"
            >
              <span>Ба каталог гузаштан</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Тамос дар WhatsApp</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
