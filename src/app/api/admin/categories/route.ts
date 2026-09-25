import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const CategoryInputSchema = z.object({
  name: z.string().min(2, "Номи категория ҳатмист"),
  tajikName: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
});

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        _count: {
          select: { products: { where: { status: { not: "ARCHIVED" } } } },
        },
      },
    });

    return NextResponse.json({
      categories: categories.map((c) => ({
        ...c,
        productCount: c._count.products,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = CategoryInputSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Маълумоти нодуруст", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, tajikName, description, image, isActive } = result.data;

    // Generate slug
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "category";

    let slug = baseSlug;
    let counter = 1;
    while (await db.category.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const category = await db.category.create({
      data: {
        slug,
        name: name.trim(),
        tajikName: tajikName?.trim() || null,
        description: description?.trim() || null,
        image: image || null,
        isActive,
      },
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
