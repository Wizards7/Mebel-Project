import { db } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

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
