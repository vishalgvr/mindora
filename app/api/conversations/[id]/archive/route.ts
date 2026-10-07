import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const conversationId = params.id;

    const conv = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conv) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const updated = await prisma.conversation.update({
      where: { id: conversationId },
      data: { archived: !conv.archived },
    });

    return NextResponse.json({ conversation: updated });
  } catch (err: any) {
    console.error("Archive toggle error:", err);
    return NextResponse.json({ error: "Failed to toggle archive" }, { status: 500 });
  }
}
