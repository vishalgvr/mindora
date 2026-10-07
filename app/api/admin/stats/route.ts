import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";


export async function GET() {
  try {
    const session = await getSessionUser();
    // Verify admin access
    if (session && session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized admin access." }, { status: 403 });
    }

    const [
      totalUsers,
      totalConversations,
      totalMessages,
      usageRecords,
      recentUsers,
      modelConfigs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.conversation.count(),
      prisma.message.count(),
      prisma.usageRecord.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      prisma.modelConfiguration.findMany(),
    ]);

    const totalInputTokens = usageRecords.reduce((acc, r) => acc + r.inputTokens, 0);
    const totalOutputTokens = usageRecords.reduce((acc, r) => acc + r.outputTokens, 0);
    const totalTokens = totalInputTokens + totalOutputTokens;

    // Estimate cost based on average $0.002 / 1k input and $0.01 / 1k output
    const estimatedCost = (
      (totalInputTokens / 1000) * 0.002 +
      (totalOutputTokens / 1000) * 0.01
    ).toFixed(4);

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers: totalUsers,
        totalConversations,
        totalMessages,
        totalTokens,
        totalInputTokens,
        totalOutputTokens,
        estimatedCost: `$${estimatedCost}`,
      },
      recentUsers,
      models: modelConfigs,
    });
  } catch (err: any) {
    console.error("Admin stats error:", err);
    return NextResponse.json({ error: "Failed to load admin stats." }, { status: 500 });
  }
}
