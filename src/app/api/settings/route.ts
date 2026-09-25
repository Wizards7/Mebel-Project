import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const setting = await db.setting.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json(setting || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}
