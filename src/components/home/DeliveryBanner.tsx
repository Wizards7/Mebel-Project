import { siteConfig } from "@/data/siteConfig";
import { Truck, MapPin, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";

export default function DeliveryBanner() {
  const regions = [
    "Душанбе",
    "Хуҷанд",
    "Кӯлоб",
    "Бохтар",
    "Истаравшан",
    "Турсунзода",
    "Ваҳдат",
    "ва дигар ноҳияҳо",
  ];

  return (
    <section className="py-12 bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative subtle ambient pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d6c0a6_1px,transparent_1px)] [background-size:16px_16px]" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider block mb-1">
                Хизматрасонии таҳвил
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                {siteConfig.deliveryText}
              </h3>
              <p className="text-sm text-stone-300 mt-1">
                Мо кафолат медиҳем, ки мебели шумо дар ҳолати комил ва бе харошида расонида мешавад.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-md">
            {regions.map((region, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-stone-200 text-xs font-semibold backdrop-blur-md border border-white/10"
              >
                <MapPin className="w-3 h-3 text-brand-400" />
                {region}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
