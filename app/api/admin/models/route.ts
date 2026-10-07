import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";


export async function GET() {
  try {
    const models = await prisma.modelConfiguration.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ models });
  } catch (err: any) {
    console.error("Admin get models error:", err);
    return NextResponse.json({ error: "Failed to fetch model configs." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required." }, { status: 403 });
    }

    const body = await req.json();
    const { id, isEnabled, isDefault, pricingInput, pricingOutput, name, description } =
      body;

    if (!id) {
      return NextResponse.json({ error: "Model ID is required." }, { status: 400 });
    }

    if (isDefault) {
      // Unset previous defaults
      await prisma.modelConfiguration.updateMany({
        data: { isDefault: false },
      });
    }

    const updated = await prisma.modelConfiguration.update({
      where: { id },
      data: {
        ...(isEnabled !== undefined && { isEnabled }),
        ...(isDefault !== undefined && { isDefault }),
        ...(pricingInput !== undefined && { pricingInput: parseFloat(pricingInput) }),
        ...(pricingOutput !== undefined && {
          pricingOutput: parseFloat(pricingOutput),
        }),
        ...(name && { name }),
        ...(description && { description }),
      },
    });

    return NextResponse.json({ model: updated });
  } catch (err: any) {
    console.error("Admin update model error:", err);
    return NextResponse.json({ error: "Failed to update model." }, { status: 500 });
  }
}
