import { Product } from "@/types/product";
import ProductCard from "@/components/catalog/ProductCard";
import Container from "@/components/ui/Container";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-stone-200">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
              Маҳсулоти дигар дар ин категория
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Моделҳои дигари ба ин монандро бубинед
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
