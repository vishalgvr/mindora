import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";


export async function GET() {
  try {
    const settings = await prisma.systemSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return NextResponse.json({ settings: map, list: settings });
  } catch (err: any) {
    console.error("Admin get system settings error:", err);
    return NextResponse.json({ error: "Failed to fetch system settings." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const { settings } = body; // Record<string, string>

    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.systemSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
    }

    const all = await prisma.systemSetting.findMany();
    const map: Record<string, string> = {};
    all.forEach((s) => {
      map[s.key] = s.value;
    });

    return NextResponse.json({ success: true, settings: map });
  } catch (err: any) {
    console.error("Admin update system settings error:", err);
    return NextResponse.json({ error: "Failed to update system settings." }, { status: 500 });
  }
}
