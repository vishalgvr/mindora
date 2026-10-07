import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";

export async function GET(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to view your conversations." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const archived = searchParams.get("archived") === "true";
    const favoritesOnly = searchParams.get("favorites") === "true";

    const whereClause: any = {
      userId: session.userId,
      archived,
    };

    if (favoritesOnly) {
      whereClause.isFavorite = true;
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        {
          messages: {
            some: {
              content: { contains: search, mode: "insensitive" },
            },
          },
        },
      ];
    }

    const conversations = await prisma.conversation.findMany({
      where: whereClause,
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
          select: { content: true, createdAt: true, role: true },
        },
        _count: {
          select: { messages: true },
        },
      },
    });

    return NextResponse.json({ conversations });
  } catch (err: any) {
    console.error("Fetch conversations error:", err);
    return NextResponse.json(
      { error: "Failed to fetch conversations." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    if (!session?.userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to create a conversation." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { title = "New Chat", model = "mindora-balanced" } = body;

    const conversation = await prisma.conversation.create({
      data: {
        userId: session.userId,
        title,
        model,
      },
    });

    return NextResponse.json({ conversation });
  } catch (err: any) {
    console.error("Create conversation error:", err);
    return NextResponse.json(
      { error: "Failed to create conversation." },
      { status: 500 }
    );
  }
}
