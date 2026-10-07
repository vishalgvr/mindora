import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { signToken } from "@/lib/auth/jwt";
import { AUTH_COOKIE_NAME } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { role = "USER" } = await req.json().catch(() => ({ role: "USER" }));
    const targetEmail = role === "ADMIN" ? "admin@mindora.ai" : "demo@mindora.ai";
    const targetName = role === "ADMIN" ? "Mindora Administrator" : "Alex Morgan";

    let user: any = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: targetEmail },
      });

      if (!user) {
        user = await prisma.user.findFirst();
      }
    } catch (dbErr) {
      // Database offline fallback
    }

    // Fallback virtual demo user if DB is cold or offline
    if (!user) {
      user = {
        id: role === "ADMIN" ? "admin-user-01" : "demo-user-alex-01",
        name: targetName,
        email: targetEmail,
        role: role,
        avatar: "",
        theme: "dark",
        defaultModel: "mindora-balanced",
      };
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        theme: user.theme || "dark",
        defaultModel: user.defaultModel || "mindora-balanced",
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    console.error("Demo login error:", err);
    return NextResponse.json({ error: "Failed to authenticate demo user." }, { status: 500 });
  }
}
