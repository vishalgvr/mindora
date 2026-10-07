import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSessionUser();
    let userId = session?.userId;

    if (!userId) {
      try {
        const demoUser = await prisma.user.findFirst({
          where: { email: "demo@mindora.ai" },
        });
        userId = demoUser?.id;
      } catch {}
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        occupation: true,
        responsePreferences: true,
        customInstructions: true,
        theme: true,
        language: true,
        defaultModel: true,
        enterToSend: true,
        showTimestamps: true,
        compactMode: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err: any) {
    console.error("Get settings error:", err);
    return NextResponse.json({ error: "Failed to load settings." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSessionUser();
    let userId = session?.userId;

    if (!userId) {
      try {
        const demoUser = await prisma.user.findFirst({
          where: { email: "demo@mindora.ai" },
        });
        userId = demoUser?.id;
      } catch {}
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      avatar,
      occupation,
      responsePreferences,
      customInstructions,
      theme,
      language,
      defaultModel,
      enterToSend,
      showTimestamps,
      compactMode,
    } = body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(avatar !== undefined && { avatar }),
        ...(occupation !== undefined && { occupation }),
        ...(responsePreferences !== undefined && { responsePreferences }),
        ...(customInstructions !== undefined && { customInstructions }),
        ...(theme !== undefined && { theme }),
        ...(language !== undefined && { language }),
        ...(defaultModel !== undefined && { defaultModel }),
        ...(enterToSend !== undefined && { enterToSend }),
        ...(showTimestamps !== undefined && { showTimestamps }),
        ...(compactMode !== undefined && { compactMode }),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        avatar: updated.avatar,
        occupation: updated.occupation,
        responsePreferences: updated.responsePreferences,
        customInstructions: updated.customInstructions,
        theme: updated.theme,
        language: updated.language,
        defaultModel: updated.defaultModel,
        enterToSend: updated.enterToSend,
        showTimestamps: updated.showTimestamps,
        compactMode: updated.compactMode,
      },
    });
  } catch (err: any) {
    console.error("Update settings error:", err);
    return NextResponse.json({ error: "Failed to update settings." }, { status: 500 });
  }
}
