import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getSessionUser } from "@/lib/auth/session";
import { streamChatResponse } from "@/lib/ai/provider";

export async function POST(req: Request) {
  try {
    const session = await getSessionUser();
    let userId = session?.userId;

    // Fallback to demo user if unauthenticated
    if (!userId) {
      try {
        const demoUser = await prisma.user.findFirst({
          where: { email: "demo@mindora.ai" },
        });
        userId = demoUser?.id;
      } catch (dbErr) {
        userId = "demo-user-fallback-id";
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to chat." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      conversationId: incomingConvId,
      messages,
      modelId = "mindora-balanced",
      attachments = [],
    } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    // Get user personalization settings safely
    let user: any = null;
    try {
      if (!userId.startsWith("demo-user-fallback")) {
        user = await prisma.user.findUnique({
          where: { id: userId },
          select: { customInstructions: true, responsePreferences: true },
        });
      }
    } catch {}

    const latestUserMessage = messages[messages.length - 1];

    let conversationId = incomingConvId || `conv_${Date.now()}`;
    let isNewConversation = !incomingConvId;

    // 1. Validate ownership or create new conversation
    try {
      if (!incomingConvId) {
        const rawTitle = latestUserMessage.content.trim() || "New Discussion";
        const cleanTitle =
          rawTitle.length > 36 ? rawTitle.substring(0, 36) + "..." : rawTitle;

        if (!userId.startsWith("demo-user-fallback")) {
          const newConv = await prisma.conversation.create({
            data: {
              userId,
              title: cleanTitle,
              model: modelId,
            },
          });
          conversationId = newConv.id;
        }
      } else {
        if (!userId.startsWith("demo-user-fallback")) {
          const existingConv = await prisma.conversation.findUnique({
            where: { id: conversationId },
          });

          if (existingConv && existingConv.userId !== userId) {
            return NextResponse.json(
              { error: "Forbidden: You do not have access to this conversation." },
              { status: 403 }
            );
          }

          if (!existingConv) {
            const newConv = await prisma.conversation.create({
              data: {
                id: conversationId,
                userId,
                title: latestUserMessage.content.substring(0, 36) || "New Discussion",
                model: modelId,
              },
            });
            conversationId = newConv.id;
          }
        }
      }
    } catch (convDbErr) {
      // Non-blocking fallback for offline db
    }

    // 2. Persist the user message to database
    try {
      if (!userId.startsWith("demo-user-fallback")) {
        const savedUserMsg = await prisma.message.create({
          data: {
            conversationId,
            role: "user",
            content: latestUserMessage.content,
          },
        });

        // If attachments present, link them
        if (attachments && attachments.length > 0) {
          for (const att of attachments) {
            await prisma.attachment.create({
              data: {
                messageId: savedUserMsg.id,
                fileName: att.fileName || "file",
                fileType: att.fileType || "application/octet-stream",
                fileSize: att.fileSize || 0,
                storageUrl: att.storageUrl || "",
              },
            });
          }
        }
      }
    } catch (msgDbErr) {
      // Non-blocking fallback
    }

    // 3. Initiate AI Stream
    const { stream, isDemo, modelUsed, providerName } = await streamChatResponse({
      modelId,
      messages,
      customInstructions: user?.customInstructions || user?.responsePreferences,
      userId,
    });

    // 4. Transform Stream to accumulate full assistant text and save to DB on finish
    const decoder = new TextDecoder();
    let accumulatedText = "";

    const transformStream = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        accumulatedText += decoder.decode(chunk, { stream: true });
        controller.enqueue(chunk);
      },
      async flush() {
        try {
          if (accumulatedText.trim() && !userId.startsWith("demo-user-fallback")) {
            await prisma.message.create({
              data: {
                conversationId,
                role: "assistant",
                content: accumulatedText,
                metadata: JSON.stringify({
                  model: modelId,
                  modelUsed,
                  provider: providerName,
                  isDemo,
                  tokensEstimated: Math.ceil(accumulatedText.length / 4),
                }),
              },
            });

            // Update conversation timestamp
            await prisma.conversation.update({
              where: { id: conversationId },
              data: { updatedAt: new Date() },
            });

            // Log usage record
            const inputTokens = Math.ceil(
              messages.reduce((acc: number, m: any) => acc + (m.content?.length || 0), 0) / 4
            );
            const outputTokens = Math.ceil(accumulatedText.length / 4);

            await prisma.usageRecord.create({
              data: {
                userId,
                model: modelId,
                inputTokens,
                outputTokens,
              },
            });
          }
        } catch (dbErr) {
          // Log non-fatal DB write failure
        }
      },
    });

    const outputStream = stream.pipeThrough(transformStream);

    return new Response(outputStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Conversation-Id": conversationId,
        "X-Is-New-Conversation": isNewConversation ? "true" : "false",
        "X-Mindora-Demo": isDemo ? "true" : "false",
        "X-Model-Used": modelUsed || modelId,
        "X-Provider-Name": providerName || "Mindora",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err: any) {
    console.error("Chat API route error:", err);
    return NextResponse.json(
      { error: "Failed to generate AI response. " + (err?.message || "") },
      { status: 500 }
    );
  }
}
