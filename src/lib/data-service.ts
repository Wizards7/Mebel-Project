import { db } from "@/lib/db";
import { Product, Category, CategorySlug } from "@/types/product";

// Helper to map DB product to frontend Product interface
export function formatDbProduct(p: any): Product {
  let parsedIncludedItems: string[] = [];
  if (p.includedItems) {
    try {
      parsedIncludedItems = JSON.parse(p.includedItems);
    } catch {
      parsedIncludedItems = [];
    }
  }

  const sortedImages = p.images && p.images.length > 0
    ? [...p.images].sort((a: any, b: any) => {
        if (a.isMain && !b.isMain) return -1;
        if (!a.isMain && b.isMain) return 1;
        return (a.sortOrder || 0) - (b.sortOrder || 0);
      }).map((img: any) => img.url)
    : ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200"];

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: (p.category?.slug || "spalnye-garnitury") as CategorySlug,
    categoryName: p.category?.name || "Мебел",
    tajikCategoryName: p.category?.tajikName || undefined,
    price: p.price ?? undefined,
    currency: p.currency || "сомонӣ",
    images: sortedImages,
    size: p.size ?? undefined,
    material: p.material ?? undefined,
    includedItems: parsedIncludedItems,
    deliveryAvailable: p.deliveryAvailable,
    assemblyAvailable: p.assemblyAvailable,
    phone: p.phone ?? undefined,
    featured: p.featured,
    description: p.description ?? undefined,
  };
}

export async function getDbProducts(filter?: { categorySlug?: string; featuredOnly?: boolean }): Promise<Product[]> {
  try {
    const where: any = {
      status: "ACTIVE",
    };

    if (filter?.featuredOnly) {
      where.featured = true;
    }

    if (filter?.categorySlug && filter.categorySlug !== "all") {
      where.category = {
        slug: filter.categorySlug,
      };
    }

    const items = await db.product.findMany({
      where,
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return items.map(formatDbProduct);
  } catch (error) {
    console.error("Error fetching products from db:", error);
    return [];
  }
}

export async function getDbProductBySlug(slug: string): Promise<Product | null> {
  try {
    const item = await db.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: true,
      },
    });

    if (!item || item.status === "ARCHIVED") return null;
    return formatDbProduct(item);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

export async function getDbCategories(): Promise<Category[]> {
  try {
    const cats = await db.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: "ACTIVE" } } },
        },
      },
    });

    return cats.map((c) => ({
      id: c.id,
      slug: c.slug as CategorySlug,
      name: c.name,
      tajikName: c.tajikName || c.name,
      description: c.description || "",
      image: c.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200",
      itemCount: c._count.products,
    }));
  } catch (error) {
    console.error("Error fetching categories from db:", error);
    return [];
  }
}

export async function getDbSettings() {
  try {
    const setting = await db.setting.findUnique({
      where: { id: "default" },
    });
    return setting;
  } catch (error) {
    console.error("Error fetching settings from db:", error);
    return null;
  }
}
