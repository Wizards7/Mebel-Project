import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getDbProductBySlug, getDbProducts } from "@/lib/data-service";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyMobileOrderBar from "@/components/product/StickyMobileOrderBar";
import Container from "@/components/ui/Container";
import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getDbProductBySlug(slug);

  if (!product) {
    return {
      title: "Маҳсулот ёфт нашуд",
    };
  }

  const priceText = formatPrice(product.price, product.currency);
  const title = `${product.name} — ${priceText} | Харидан дар Тоҷикистон`;
  const description = product.description || `Харидани ${product.name} дар Тоҷикистон. ${priceText}. Доставка дар тамоми Тоҷикистон, насб ва васли касбӣ.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getDbProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryProducts = await getDbProducts({ categorySlug: product.category });
  const relatedProducts = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-8 sm:py-12 pb-24 sm:pb-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Роҳнамо" className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Асосӣ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link href="/catalog" className="hover:text-stone-900 transition-colors">
            Каталог
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <Link
            href={`/catalog/${product.category}`}
            className="hover:text-stone-900 transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <span className="text-stone-900 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Main Section: Gallery + Specs + Order Modal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Interactive Multi-image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info, Specs, Included Items & Order Action */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProducts products={relatedProducts} />
      </Container>

      {/* Mobile Sticky Order Bar */}
      <StickyMobileOrderBar product={product} />
    </div>
  );
}
