import { generateGeneralConsultationLink, generatePhoneCallLink } from "@/lib/whatsapp";
import { siteConfig } from "@/data/siteConfig";
import { MessageCircle, Phone, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";

export default function ConsultationCta() {
  const whatsAppLink = generateGeneralConsultationLink("Салом! Ман мехоҳам оид ба фармоиши мебел маслиҳат гирам.");
  const phoneCallLink = generatePhoneCallLink(siteConfig.defaultPhone);

  return (
    <section className="py-16 sm:py-20 bg-stone-100">
      <Container>
        <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center relative overflow-hidden shadow-soft-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Маслиҳати ройгон ва интихоби мебел</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Дар интихоби мебел ба кӯмак ниёз доред?
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Мутахассиси мо омода аст ба ҳамаи саволҳои шумо посух дода, андоза ва модели мувофиқро барои хонаи шумо пешниҳод кунад.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-soft-lg hover:shadow-soft-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Навиштан дар WhatsApp</span>
              </a>

              <a
                href={phoneCallLink}
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base transition-colors border border-white/15"
              >
                <Phone className="w-4 h-4 text-stone-300" />
                <span>Занг задан: {siteConfig.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
