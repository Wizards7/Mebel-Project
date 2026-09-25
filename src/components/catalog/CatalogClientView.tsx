"use client";

import { useState, useMemo } from "react";
import { Product, Category } from "@/types/product";
import ProductGrid from "@/components/catalog/ProductGrid";
import CategoryPills from "@/components/catalog/CategoryPills";
import Container from "@/components/ui/Container";
import { Search, SlidersHorizontal } from "lucide-react";

interface CatalogClientViewProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function CatalogClientView({
  initialProducts,
  categories,
}: CatalogClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.material && product.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (product.includedItems && product.includedItems.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (a.price || Infinity) - (b.price || Infinity);
        }
        if (sortBy === "price-desc") {
          return (b.price || -Infinity) - (a.price || -Infinity);
        }
        return 0;
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  const activeCategoryObject = categories.find((c) => c.slug === selectedCategory);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Page Header */}
        <div className="mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900">
                Каталоги мебел
              </h1>
              <p className="text-stone-500 text-sm sm:text-base mt-1">
                Ҳамаи моделҳои дастраси мебел бо нархҳо ва тавсифи мукаммал
              </p>
            </div>

            {/* Product count badge */}
            <div className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-xl self-start sm:self-auto border border-stone-200">
              Ёфт шуд: <span className="text-stone-950 font-bold">{filteredProducts.length}</span> маҳсулот
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <CategoryPills
            activeSlug={selectedCategory}
            onSelectCategory={setSelectedCategory}
            isClientFilter={true}
          />

          {/* Search input and sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ҷустуҷӯ аз рӯи ном, мавод ё андоза..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-stone-400"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="pl-3.5 pr-8 py-2.5 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 appearance-none cursor-pointer"
                >
                  <option value="default">Тартиби пешфарз</option>
                  <option value="price-asc">Аз арзон ба қимат</option>
                  <option value="price-desc">Аз қимат ба арзон</option>
                </select>
                <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Description if selected */}
        {activeCategoryObject && (
          <div className="mb-6 p-4 rounded-2xl bg-brand-50/50 border border-brand-200/60 text-sm text-stone-700">
            <span className="font-bold text-brand-900">{activeCategoryObject.name}:</span>{" "}
            {activeCategoryObject.description}
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage={
            searchQuery
              ? `Бо дархости «${searchQuery}» чизе ёфт нашуд. Лутфан, калимаи дигарро санҷед ё тавассути WhatsApp бо мо дар тамос шавед.`
              : "Дар ин категория ҳоло маҳсулот нест."
          }
        />
      </Container>
    </div>
  );
}
