import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getDbCategories, getDbProducts } from "@/lib/data-service";
import ProductGrid from "@/components/catalog/ProductGrid";
import CategoryPills from "@/components/catalog/CategoryPills";
import Container from "@/components/ui/Container";
import { ChevronRight, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const categories = await getDbCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Категория ёфт нашуд",
    };
  }

  return {
    title: `${category.name} — Каталоги мебел`,
    description: `${category.description} Доставка дар тамоми Тоҷикистон. Фармоиш тавассути сомона ё WhatsApp!`,
    openGraph: {
      title: `${category.name} — Мебели Тоҷикистон`,
      description: category.description,
      images: [category.image],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const categories = await getDbCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getDbProducts({ categorySlug: slug });

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Роҳнамо" className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Асосӣ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <Link href="/catalog" className="hover:text-stone-900 transition-colors">
            Каталог
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-10 shadow-soft">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{category.tajikName}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="mb-8">
          <CategoryPills activeSlug={category.slug} />
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={products}
          emptyMessage={`Дар категорияи «${category.name}» ҳоло маҳсулоти нав омода шуда истодаанд. Лутфан, барои фармоиши инфиродӣ бо мо тамос гиред.`}
        />
      </Container>
    </div>
  );
}
