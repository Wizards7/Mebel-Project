import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getDbProductBySlug, getDbCategories } from "@/lib/data-service";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  let product: any = null;
  let categories: any[] = [];

  try {
    const [p, cats] = await Promise.all([
      db.product.findUnique({
        where: { id },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
        },
      }),
      db.category.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
    ]);
    product = p;
    categories = cats;
  } catch (err) {
    console.error("Error fetching product for edit:", err);
  }

  if (!product) {
    // Try fallback by slug/id
    const fallbackProduct = await getDbProductBySlug(id);
    if (!fallbackProduct) {
      notFound();
    }
    const fallbackCategories = await getDbCategories();
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-soft-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 font-display">
              Таҳрири маҳсулот: {fallbackProduct.name}
            </h1>
          </div>
        </div>
        <ProductForm
          initialData={fallbackProduct}
          categories={fallbackCategories}
          isEdit={true}
        />
      </div>
    );
  }

  let includedItems: string[] = [];
  if (product.includedItems) {
    try {
      includedItems = JSON.parse(product.includedItems);
    } catch {
      includedItems = [];
    }
  }

  const initialData = {
    ...product,
    includedItems,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 shadow-soft-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-stone-900 font-display">
            Таҳрири маҳсулот: {product.name}
          </h1>
          <p className="text-xs text-stone-500">
            Шумо метавонед нарх, аксҳо ва маълумотро тағйир диҳед
          </p>
        </div>
      </div>

      <ProductForm
        initialData={initialData}
        categories={categories}
        isEdit={true}
      />
    </div>
  );
}
