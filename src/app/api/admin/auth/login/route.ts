import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, signToken, COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const LoginSchema = z.object({
  identifier: z.string().min(1, "Почта ё рақами телефонро ворид кунед"),
  password: z.string().min(1, "Паролро ворид кунед"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Маълумоти воридшуда нодуруст аст", details: result.error.format() },
        { status: 400 }
      );
    }

    const { identifier, password } = result.data;

    // Find admin by email or phone
    const admin = await db.admin.findFirst({
      where: {
        OR: [
          { email: identifier.trim().toLowerCase() },
          { phone: identifier.trim().replace(/\D/g, "") },
        ],
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Почта/телефон ё пароли нодуруст" },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Почта/телефон ё пароли нодуруст" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = await signToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Хатогӣ ҳангоми воридшавӣ ба система" },
      { status: 500 }
    );
  }
}
