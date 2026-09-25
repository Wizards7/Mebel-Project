import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const ProductInputSchema = z.object({
  name: z.string().min(2, "Номи маҳсулот ҳатмист"),
  categoryId: z.string().min(1, "Категорияро интихоб кунед"),
  price: z.number().nullable().optional(),
  currency: z.string().default("сомонӣ"),
  size: z.string().optional().nullable(),
  material: z.string().optional().nullable(),
  includedItems: z.array(z.string()).default([]),
  deliveryAvailable: z.boolean().default(true),
  assemblyAvailable: z.boolean().default(true),
  phone: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(["ACTIVE", "HIDDEN", "ARCHIVED"]).default("ACTIVE"),
  description: z.string().optional().nullable(),
  images: z.array(
    z.object({
      url: z.string(),
      isMain: z.boolean().default(false),
      sortOrder: z.number().default(0),
    })
  ).default([]),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {
      status: status ? status : { not: "ARCHIVED" },
    };

    if (categoryId && categoryId !== "all") {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { material: { contains: search } },
        { size: { contains: search } },
      ];
    }

    const products = await db.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = ProductInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Маълумоти воридшуда нодуруст аст", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Generate unique slug from name
    const baseSlug = data.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product";

    let slug = baseSlug;
    let counter = 1;
    while (await db.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newProduct = await db.product.create({
      data: {
        slug,
        name: data.name.trim(),
        categoryId: data.categoryId,
        price: data.price ?? null,
        currency: data.currency,
        size: data.size?.trim() || null,
        material: data.material?.trim() || null,
        includedItems: JSON.stringify(data.includedItems),
        deliveryAvailable: data.deliveryAvailable,
        assemblyAvailable: data.assemblyAvailable,
        phone: data.phone?.trim() || null,
        featured: data.featured,
        status: data.status,
        description: data.description?.trim() || null,
        images: {
          create: data.images.map((img, idx) => ({
            url: img.url,
            isMain: img.isMain || idx === 0,
            sortOrder: img.sortOrder ?? idx,
          })),
        },
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
