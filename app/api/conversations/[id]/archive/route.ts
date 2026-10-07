import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";

export async function POST(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionUser();
    if (!session?.userId) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const params = await props.params;
    const conversationId = params.id;

    const conv = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conv || conv.userId !== session.userId) {
      return NextResponse.json(
        { error: "Conversation not found or access denied" },
        { status: 404 }
      );
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
