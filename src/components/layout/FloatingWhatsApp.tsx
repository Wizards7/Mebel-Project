"use client";

import { MessageCircle } from "lucide-react";
import { generateGeneralConsultationLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const whatsAppLink = generateGeneralConsultationLink();

  return (
    <aside aria-label="WhatsApp Floating Button" className="fixed bottom-6 right-6 z-30 hidden sm:block">
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-soft-lg hover:shadow-soft-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
        aria-label="Бо WhatsApp тамос гиред"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="text-sm font-semibold pr-1">Саволе доред? WhatsApp</span>
      </a>
    </aside>
  );
}
