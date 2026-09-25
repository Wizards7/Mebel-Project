import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { MessageCircle, PackageSearch } from "lucide-react";
import { generateGeneralConsultationLink } from "@/lib/whatsapp";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "Дар ин категория ҳоло маҳсулот ёфт нашуд.",
}: ProductGridProps) {
  if (products.length === 0) {
    const whatsAppLink = generateGeneralConsultationLink("Салом! Мехостам донам, оё шумо мебели фармоишӣ месозед?");
    return (
      <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-soft my-8">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
          <PackageSearch className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-stone-900 mb-2">Маҳсулот ёфт нашуд</h3>
        <p className="text-sm text-stone-500 mb-6">{emptyMessage}</p>
        <a
          href={whatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-soft transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>Фармоиши инфиродӣ дар WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
