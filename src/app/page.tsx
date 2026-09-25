import Link from "next/link";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/catalog/CategoryCard";
import ProductCard from "@/components/catalog/ProductCard";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import DeliveryBanner from "@/components/home/DeliveryBanner";
import ConsultationCta from "@/components/home/ConsultationCta";
import Container from "@/components/ui/Container";
import { getDbCategories, getDbProducts } from "@/lib/data-service";
import { ArrowRight, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getDbProducts({ featuredOnly: true }),
    getDbCategories(),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Furniture Categories (6 Categories) */}
      <section>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-brand-600" />
                <span>Интихоби мебел</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-stone-900">
                Категорияҳои асосӣ
              </h2>
              <p className="text-sm sm:text-base text-stone-500 mt-1">
                Категорияи дилхоҳатонро интихоб кунед ва моделҳои навро бубинед
              </p>
            </div>

            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800 transition-colors group self-start sm:self-auto"
            >
              <span>Ҳамаи маҳсулот</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={category.itemCount}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Featured / Popular Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-stone-100/70 py-16 sm:py-20 border-y border-stone-200">
          <Container>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>⭐ Маҳсулоти серхаридор</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-stone-900">
                  Моделҳои маъмул ва тавсияшуда
                </h2>
                <p className="text-sm sm:text-base text-stone-500 mt-1">
                  Мебелҳое, ки бештар аз ҷониби харидорони мо писандида шудаанд
                </p>
              </div>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800 transition-colors group self-start sm:self-auto"
              >
                <span>Дидани ҳама</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Delivery Information Banner */}
      <DeliveryBanner />

      {/* 6. Direct WhatsApp Consultation CTA */}
      <ConsultationCta />
    </div>
  );
}
