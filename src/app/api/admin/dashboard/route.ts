import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [totalProducts, activeProducts, totalCategories, newOrdersCount, totalClients, recentOrders] =
      await Promise.all([
        db.product.count({ where: { status: { not: "ARCHIVED" } } }),
        db.product.count({ where: { status: "ACTIVE" } }),
        db.category.count({ where: { isActive: true } }),
        db.order.count({ where: { status: "NEW" } }),
        db.client.count(),
        db.order.findMany({
          take: 6,
          orderBy: { createdAt: "desc" },
          include: {
            items: true,
          },
        }),
      ]);

    return NextResponse.json({
      metrics: {
        totalProducts,
        activeProducts,
        totalCategories,
        newOrdersCount,
        totalClients,
      },
      recentOrders,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
