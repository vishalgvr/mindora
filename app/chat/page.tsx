"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatArea } from "@/components/chat/ChatArea";
import { MessageData } from "@/components/chat/ChatMessage";
import { AttachmentItem } from "@/components/chat/AttachmentPreview";
import { useChat } from "./layout";

export default function NewChatPage() {
  const router = useRouter();
  const { selectedModelId, refreshConversations } = useChat();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSendMessage = async (
    content: string,
    attachments: AttachmentItem[]
  ) => {
    if (isStreaming) return;

    const userMessage: MessageData = {
      role: "user",
      content,
      createdAt: new Date(),
      attachments,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Placeholder for assistant streaming response
    const assistantMessage: MessageData = {
      role: "assistant",
      content: "",
      createdAt: new Date(),
      metadata: JSON.stringify({ model: selectedModelId }),
    };

    setMessages([...newMessages, assistantMessage]);
    setIsStreaming(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
            attachments: m.attachments,
          })),
          modelId: selectedModelId,
        }),
      });

      if (!response.ok) {
        let errMsg = `Server returned ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson?.error) errMsg = errJson.error;
        } catch {}
        throw new Error(errMsg);
      }

      const conversationId = response.headers.get("X-Conversation-Id");
      const isDemoHeader = response.headers.get("X-Mindora-Demo") === "true";
      const modelUsed = response.headers.get("X-Model-Used") || selectedModelId;
      const providerName = response.headers.get("X-Provider-Name") || "Mindora";
      setIsDemoMode(isDemoHeader);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.role === "assistant") {
              last.content = fullText;
              last.metadata = JSON.stringify({
                model: selectedModelId,
                modelUsed,
                provider: providerName,
                isDemo: isDemoHeader,
              });
            }
            return updated;
          });
        }
      }

      await refreshConversations();

      if (conversationId) {
        window.history.replaceState(null, "", `/chat/${conversationId}`);
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            last.content =
              err?.message || "Mindora couldn't complete that request. Something went wrong. Please try again.";
            last.isError = true;
          }
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const handleRegenerate = () => {
    if (messages.length < 2 || isStreaming) return;
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMsg) {
      // Remove trailing assistant/error message
      const messagesWithoutLastAi = messages.filter((_, idx) => idx < messages.length - 1);
      setMessages(messagesWithoutLastAi);
      handleSendMessage(lastUserMsg.content, lastUserMsg.attachments || []);
    }
  };

  const handleEditMessage = (_newContent: string) => {
    // Content is placed into composer by ChatArea
  };

  return (
    <ChatArea
      messages={messages}
      isStreaming={isStreaming}
      onSendMessage={handleSendMessage}
      onStopStreaming={handleStopStreaming}
      onRegenerate={handleRegenerate}
      onEditMessage={handleEditMessage}
      selectedModelName={selectedModelId}
      isDemoMode={isDemoMode}
    />
  );
}
