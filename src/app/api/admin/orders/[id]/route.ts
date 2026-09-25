import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: {
        client: {
          include: {
            orders: {
              where: { id: { not: orderId } },
              take: 5,
              orderBy: { createdAt: "desc" },
            },
          },
        },
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Фармоиш ёфт нашуд" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order details" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);
    const body = await req.json();

    const updateData: any = {};
    if (body.status) {
      updateData.status = body.status;
    }
    if (body.adminNotes !== undefined) {
      updateData.adminNotes = body.adminNotes;
    }

    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: updateData,
      include: {
        client: true,
        items: true,
      },
    });

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
