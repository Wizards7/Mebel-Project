import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/product";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/20 shadow-soft hover:shadow-soft-xl transition-all duration-500 block aspect-[4/3] sm:aspect-[16/11]"
    >
      {/* Background Image with zoom */}
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent transition-opacity duration-300" />

      {/* Badge if available */}
      {category.badge && (
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-500 text-white shadow-soft">
            {category.badge}
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-10">
        <div>
          {category.tajikName && (
            <span className="text-xs font-medium text-brand-300 block mb-0.5 tracking-wide">
              {category.tajikName}
            </span>
          )}
          <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white mb-1.5 group-hover:text-brand-200 transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-stone-300 line-clamp-2 mb-3 leading-relaxed hidden sm:block">
            {category.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-semibold">
          <span className="text-stone-300">
            {productCount !== undefined ? `${productCount} маҳсулот` : "Дидани моделҳо"}
          </span>
          <span className="flex items-center gap-1 text-brand-300 group-hover:translate-x-1 transition-transform">
            Гузариш <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
