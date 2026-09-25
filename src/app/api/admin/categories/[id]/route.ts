import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const category = await db.category.update({
      where: { id },
      data: {
        name: body.name !== undefined ? body.name.trim() : undefined,
        tajikName: body.tajikName !== undefined ? body.tajikName?.trim() : undefined,
        description: body.description !== undefined ? body.description?.trim() : undefined,
        image: body.image !== undefined ? body.image : undefined,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : undefined,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    // Check if category has active products
    const productCount = await db.product.count({
      where: {
        categoryId: id,
        status: { not: "ARCHIVED" },
      },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          error: `Дар ин категория ${productCount} маҳсулот мавҷуд аст. Барои нест кардан, аввал маҳсулотҳоро ба категорияи дигар гузаронед ё пинҳон кунед.`,
        },
        { status: 400 }
      );
    }

    await db.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Категория нест карда шуд" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
