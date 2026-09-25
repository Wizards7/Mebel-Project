import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppOrderLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

interface StickyMobileOrderBarProps {
  product: Product;
}

export default function StickyMobileOrderBar({ product }: StickyMobileOrderBarProps) {
  const whatsAppLink = generateWhatsAppOrderLink(product);
  const primaryImage = product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 sm:hidden shadow-2xl safe-area-pb">
      <div className="flex items-center justify-between gap-3">
        {/* Product thumb & price */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="44px"
              className="object-cover object-center"
            />
          </div>
          <div className="min-w-0">
            <div className="text-xs text-stone-600 truncate font-medium">
              {product.name}
            </div>
            <div className="text-sm font-extrabold text-stone-950 font-display">
              {formatPrice(product.price, product.currency)}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-soft flex-shrink-0 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>Фармоиш</span>
        </a>
      </div>
    </div>
  );
}
