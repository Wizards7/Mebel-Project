import { Truck, Wrench, ShieldCheck, MessageCircle, Sparkles, Clock } from "lucide-react";
import Container from "@/components/ui/Container";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: "Доставка дар тамоми Тоҷикистон",
      description: "Мо мебелро ба шаҳрҳои Душанбе, Хуҷанд, Кӯлоб, Бохтар ва тамоми минтақаҳои ҷумҳурӣ сари вақт мерасонем.",
      bg: "bg-emerald-50",
    },
    {
      icon: <Wrench className="w-6 h-6 text-brand-600" />,
      title: "Насб ва васли касбӣ",
      description: "Устоҳои ботаҷриба мебели шуморо бо камоли сифат ва беосеб дар хонаатон насб ва ҷобаҷо мекунанд.",
      bg: "bg-brand-50",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "Сифати боэътимод ва кафолат",
      description: "Истифодаи беҳтарин маводҳои MDF, чӯби табиӣ ва фурнитураи тобовар барои истифодаи тӯлонӣ.",
      bg: "bg-indigo-50",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-emerald-600" />,
      title: "Фармоиши зуд дар WhatsApp",
      description: "Ҳоҷат ба қайди тӯлонӣ нест. Танҳо модели писандидаро интихоб намуда, дар як клик ба фурӯшанда нависед.",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Афзалиятҳои мо</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-stone-900">
            Чаро муштариён моро интихоб мекунанд?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            Мо кӯшиш мекунем, ки хариди мебел барои шумо осон, боэътимод ва гуворо бошад.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${adv.bg} flex items-center justify-center`}>
                  {adv.icon}
                </div>
                <h3 className="font-bold text-lg text-stone-900 font-display">
                  {adv.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
