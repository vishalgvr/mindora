import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";


export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const conversationId = params.id;

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          include: {
            attachments: true,
          },
        },
      },
    });

    if (!conversation) {
      return NextResponse.json(
        { error: "Conversation not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ conversation });
  } catch (err: any) {
    console.error("Get conversation by id error:", err);
    return NextResponse.json(
      { error: "Failed to fetch conversation." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const conversationId = params.id;
    const body = await req.json();
    const { title, model, archived, isFavorite } = body;

    const updateData: any = {};
    if (typeof title === "string") updateData.title = title.trim();
    if (typeof model === "string") updateData.model = model;
    if (typeof archived === "boolean") updateData.archived = archived;
    if (typeof isFavorite === "boolean") updateData.isFavorite = isFavorite;

    const updated = await prisma.conversation.update({
      where: { id: conversationId },
      data: updateData,
    });

    return NextResponse.json({ conversation: updated });
  } catch (err: any) {
    console.error("Update conversation error:", err);
    return NextResponse.json(
      { error: "Failed to update conversation." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const conversationId = params.id;

    await prisma.conversation.delete({
      where: { id: conversationId },
    });

    return NextResponse.json({ success: true, id: conversationId });
  } catch (err: any) {
    console.error("Delete conversation error:", err);
    return NextResponse.json(
      { error: "Failed to delete conversation." },
      { status: 500 }
    );
  }
}
