import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const setting = await db.setting.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json({ setting });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const setting = await db.setting.upsert({
      where: { id: "default" },
      update: {
        siteName: body.siteName !== undefined ? body.siteName.trim() : undefined,
        tagline: body.tagline !== undefined ? body.tagline.trim() : undefined,
        phone: body.phone !== undefined ? body.phone.trim() : undefined,
        displayPhone: body.displayPhone !== undefined ? body.displayPhone.trim() : undefined,
        whatsAppPhone: body.whatsAppPhone !== undefined ? body.whatsAppPhone.trim() : undefined,
        address: body.address !== undefined ? body.address.trim() : undefined,
        workingHours: body.workingHours !== undefined ? body.workingHours.trim() : undefined,
        deliveryText: body.deliveryText !== undefined ? body.deliveryText.trim() : undefined,
        assemblyText: body.assemblyText !== undefined ? body.assemblyText.trim() : undefined,
      },
      create: {
        id: "default",
        siteName: body.siteName || "Мебели Тоҷикистон",
        tagline: body.tagline || "",
        phone: body.phone || "111225554",
        displayPhone: body.displayPhone || "+992 (11) 122-55-54",
        whatsAppPhone: body.whatsAppPhone || "992111225554",
        address: body.address || "",
        workingHours: body.workingHours || "",
        deliveryText: body.deliveryText || "Доставка дар тамоми Тоҷикистон",
        assemblyText: body.assemblyText || "Насб ва васли касбӣ дастрас аст",
      },
    });

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
