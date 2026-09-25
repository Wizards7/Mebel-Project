import { db } from "@/lib/db";
import { getDbCategories } from "@/lib/data-service";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  let categories: any[] = [];
  try {
    categories = await db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (err) {
    console.error("Error loading categories in admin new product page:", err);
    categories = (await getDbCategories()).map((c) => ({
      id: c.id,
      name: c.name,
      tajikName: c.tajikName,
      slug: c.slug,
      isActive: true,
      sortOrder: 0,
      description: c.description,
      image: c.image,
    }));
  }

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
            Иловаи маҳсулоти нав
          </h1>
          <p className="text-xs text-stone-500">
            Маълумот ва аксҳои мебели навро ворид намоед
          </p>
        </div>
      </div>

      <ProductForm categories={categories} isEdit={false} />
    </div>
  );
}
