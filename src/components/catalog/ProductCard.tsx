import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { generateWhatsAppOrderLink } from "@/lib/whatsapp";
import { MessageCircle, ArrowUpRight, Truck, Wrench } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsAppLink = generateWhatsAppOrderLink(product);
  const primaryImage = product.images[0] || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800";
  const hasMultipleImages = product.images.length > 1;

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-soft-sm hover:shadow-soft-lg transition-all duration-300 flex flex-col h-full hover:border-stone-300">
      {/* Image container */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 block"
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Pill on top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-900/80 text-white backdrop-blur-md">
            {product.categoryName}
          </span>
        </div>

        {/* Photo count indicator */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
              📷 {product.images.length} акс
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Title */}
          <Link
            href={`/product/${product.slug}`}
            className="block group-hover:text-brand-700 transition-colors"
          >
            <h3 className="font-bold text-base sm:text-lg text-stone-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Key Specs: Size & Material */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
            {product.size && (
              <span className="bg-stone-100 px-2 py-0.5 rounded-md font-medium text-stone-700">
                Андоза: <span className="font-bold text-stone-900">{product.size}</span>
              </span>
            )}
            {product.material && (
              <span className="bg-stone-100 px-2 py-0.5 rounded-md font-medium text-stone-700 truncate max-w-[150px]">
                {product.material}
              </span>
            )}
          </div>

          {/* Delivery & Assembly indicator badges */}
          <div className="flex items-center gap-3 pt-1 text-[11px] text-stone-500">
            {product.deliveryAvailable && (
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <Truck className="w-3 h-3 text-emerald-600" />
                Доставка
              </span>
            )}
            {product.assemblyAvailable && (
              <span className="flex items-center gap-1 text-stone-600 font-medium">
                <Wrench className="w-3 h-3 text-stone-500" />
                Насб
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-stone-500 block uppercase font-medium">Нарх:</span>
            <div className={`font-bold ${product.price ? "text-base sm:text-lg text-stone-950" : "text-sm text-brand-700"}`}>
              {formatPrice(product.price, product.currency)}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/product/${product.slug}`}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-stone-100 text-xs font-semibold transition-colors flex items-center gap-1"
              title="Муфассал дидан"
            >
              <span className="hidden sm:inline">Муфассал</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-soft hover:shadow-soft-lg transition-all active:scale-95"
              title="Фармоиш тавассути WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
              <span>Фармоиш</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
