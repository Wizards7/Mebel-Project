import { getDbProducts, getDbCategories } from "@/lib/data-service";
import CatalogClientView from "@/components/catalog/CatalogClientView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Каталоги мебел — Спальни, Диванҳо, Ошхона, Шкафҳо",
  description: "Каталоги пурраи мебел дар Тоҷикистон. Ҳамаи моделҳои замонавӣ бо нархҳо ва таҳвили мустақим.",
};

export default async function CatalogPage() {
  const [products, categories] = await Promise.all([
    getDbProducts(),
    getDbCategories(),
  ]);

  return <CatalogClientView initialProducts={products} categories={categories} />;
}
