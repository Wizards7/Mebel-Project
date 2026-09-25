"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

interface CategoryPillsProps {
  activeSlug?: string;
  onSelectCategory?: (slug: string) => void;
  isClientFilter?: boolean;
}

export default function CategoryPills({
  activeSlug = "all",
  onSelectCategory,
  isClientFilter = false,
}: CategoryPillsProps) {
  const pathname = usePathname();

  const allCategories = [
    { slug: "all", name: "Ҳамаи категорияҳо" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  if (isClientFilter && onSelectCategory) {
    return (
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {allCategories.map((cat) => {
          const isSelected = activeSlug === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isSelected
                  ? "bg-stone-900 text-white shadow-soft"
                  : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
      <Link
        href="/catalog"
        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
          pathname === "/catalog" && (!activeSlug || activeSlug === "all")
            ? "bg-stone-900 text-white shadow-soft"
            : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
        }`}
      >
        Ҳамаи маҳсулот
      </Link>
      {categories.map((cat) => {
        const isSelected = activeSlug === cat.slug || pathname === `/catalog/${cat.slug}`;
        return (
          <Link
            key={cat.slug}
            href={`/catalog/${cat.slug}`}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              isSelected
                ? "bg-stone-900 text-white shadow-soft"
                : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
