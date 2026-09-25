import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Маҳсулот ёфт нашуд" }, { status: 404 });
    }

    let includedItems: string[] = [];
    if (product.includedItems) {
      try {
        includedItems = JSON.parse(product.includedItems);
      } catch {
        includedItems = [];
      }
    }

    return NextResponse.json({
      product: {
        ...product,
        includedItems,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const existing = await db.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Маҳсулот ёфт нашуд" }, { status: 404 });
    }

    // Update main fields
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.categoryId !== undefined) updateData.categoryId = body.categoryId;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.currency !== undefined) updateData.currency = body.currency;
    if (body.size !== undefined) updateData.size = body.size?.trim() || null;
    if (body.material !== undefined) updateData.material = body.material?.trim() || null;
    if (body.includedItems !== undefined) updateData.includedItems = JSON.stringify(body.includedItems);
    if (body.deliveryAvailable !== undefined) updateData.deliveryAvailable = body.deliveryAvailable;
    if (body.assemblyAvailable !== undefined) updateData.assemblyAvailable = body.assemblyAvailable;
    if (body.phone !== undefined) updateData.phone = body.phone?.trim() || null;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.description !== undefined) updateData.description = body.description?.trim() || null;

    // Handle images update if provided
    if (Array.isArray(body.images)) {
      await db.productImage.deleteMany({
        where: { productId: id },
      });

      if (body.images.length > 0) {
        await db.productImage.createMany({
          data: body.images.map((img: any, idx: number) => ({
            productId: id,
            url: img.url,
            isMain: Boolean(img.isMain),
            sortOrder: img.sortOrder ?? idx,
          })),
        });
      }
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    
    // Soft delete to protect relational order history
    await db.product.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });

    return NextResponse.json({ success: true, message: "Маҳсулот бомуваффақият бойгонӣ шуд" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to archive product" }, { status: 500 });
  }
}
