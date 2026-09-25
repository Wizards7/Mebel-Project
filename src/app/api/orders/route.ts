import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const CreateOrderSchema = z.object({
  productId: z.string().min(1, "Маҳсулот интихоб нашудааст"),
  name: z.string().min(2, "Лутфан, номи худро ворид кунед"),
  phone: z.string().min(9, "Рақами дурусти телефонро ворид кунед"),
  city: z.string().min(2, "Шаҳр ё ноҳияро ворид кунед"),
  address: z.string().min(3, "Суроғаи худро пурра нависед"),
  quantity: z.number().int().min(1).default(1),
  comment: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = CreateOrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Маълумот нодуруст ворид карда шуд", details: result.error.format() },
        { status: 400 }
      );
    }

    const { productId, name, phone, city, address, quantity, comment } = result.data;

    // 1. Normalize phone (e.g. "+992 900 11 22 33" -> "992900112233")
    let normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length === 9) {
      normalizedPhone = `992${normalizedPhone}`;
    }

    // 2. Fetch product for historical price snapshot (by id or slug)
    const product = await db.product.findFirst({
      where: {
        OR: [
          { id: productId },
          { slug: productId },
        ],
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Маҳсулоти интихобшуда дар система ёфт нашуд" },
        { status: 404 }
      );
    }

    // Calculate total price if numeric price is available
    const unitPrice = product.price ?? null;
    const totalPrice = unitPrice !== null ? unitPrice * quantity : null;

    // 3. Find or create Client by phone number (Aggregation)
    let client = await db.client.findUnique({
      where: { phone: normalizedPhone },
    });

    if (client) {
      client = await db.client.update({
        where: { id: client.id },
        data: {
          name: name.trim(),
          city: city.trim(),
          address: address.trim(),
          totalOrders: { increment: 1 },
          lastOrderAt: new Date(),
        },
      });
    } else {
      client = await db.client.create({
        data: {
          phone: normalizedPhone,
          name: name.trim(),
          city: city.trim(),
          address: address.trim(),
          totalOrders: 1,
          lastOrderAt: new Date(),
        },
      });
    }

    // 4. Create Order + OrderItem with Historical Price Snapshot
    const order = await db.order.create({
      data: {
        clientId: client.id,
        status: "NEW",
        totalPrice,
        clientName: name.trim(),
        clientPhone: normalizedPhone,
        city: city.trim(),
        address: address.trim(),
        comment: comment?.trim() || null,
        items: {
          create: {
            productId: product.id,
            productName: product.name,
            productPrice: unitPrice,
            productSize: product.size,
            productMaterial: product.material,
            quantity,
          },
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        orderId: order.id,
        message: "Фармоиши шумо бомуваффақият қабул шуд!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Хатогӣ ҳангоми сабти фармоиш. Лутфан, дертар кӯшиш кунед ё бо WhatsApp тамос гиред." },
      { status: 500 }
    );
  }
}
