"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { ChatMessage, MessageData } from "./ChatMessage";
import { ChatComposer } from "./ChatComposer";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { Logo } from "@/components/ui/Logo";
import { AttachmentItem } from "./AttachmentPreview";

interface ChatAreaProps {
  messages: MessageData[];
  isStreaming: boolean;
  onSendMessage: (content: string, attachments: AttachmentItem[]) => void;
  onStopStreaming: () => void;
  onRegenerate: () => void;
  onEditMessage: (content: string) => void;
  selectedModelName?: string;
  isDemoMode?: boolean;
}

export function ChatArea({
  messages,
  isStreaming,
  onSendMessage,
  onStopStreaming,
  onRegenerate,
  onEditMessage,
  selectedModelName = "Mindora Balanced",
  isDemoMode = false,
}: ChatAreaProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState("");

  const scrollToBottom = (smooth = true) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  useEffect(() => {
    scrollToBottom(false);
  }, [messages.length]);

  useEffect(() => {
    if (isStreaming) {
      scrollToBottom(true);
    }
  }, [messages, isStreaming]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
    setShowScrollBottom(!isNearBottom);
  };

  const handleEdit = (content: string) => {
    setEditingPrompt(content);
    onEditMessage(content);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="relative flex flex-1 flex-col h-full overflow-hidden bg-white dark:bg-[#070a12]">
      {/* Demo Mode Notice Banner if in Demo mode */}
      {isDemoMode && (
        <div className="bg-indigo-50/90 dark:bg-indigo-950/40 border-b border-indigo-100 dark:border-indigo-900/40 px-4 py-1.5 text-center text-xs text-indigo-700 dark:text-indigo-300 font-medium select-none flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mindora Demo Mode — Simulated intelligent streaming response active</span>
        </div>
      )}

      {/* Main Messages Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {!hasMessages ? (
          /* Welcome State */
          <div className="flex flex-col items-center justify-center min-h-full px-4 py-12 text-center">
            <div className="mb-6 flex flex-col items-center">
              <Logo size="xl" showText={false} className="mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                How can I help you today?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md">
                Your intelligent workspace for writing, coding, research, and creative discovery.
              </p>
            </div>

            {/* Quick Prompt Suggestions */}
            <SuggestedPrompts
              onSelectPrompt={(prompt) => onSendMessage(prompt, [])}
            />
          </div>
        ) : (
          /* Messages List */
          <div className="py-4 space-y-1">
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id || index}
                message={msg}
                isLast={index === messages.length - 1}
                isStreaming={isStreaming}
                onRegenerate={onRegenerate}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Scroll to Bottom Floating Button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom(true)}
          className="absolute bottom-28 right-8 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
          title="Scroll to bottom"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}

      {/* Composer at Bottom */}
      <div className="shrink-0 bg-gradient-to-t from-white via-white dark:from-[#070a12] dark:via-[#070a12] to-transparent pt-3">
        <ChatComposer
          onSendMessage={onSendMessage}
          onStopStreaming={onStopStreaming}
          isStreaming={isStreaming}
          initialValue={editingPrompt}
        />
      </div>
    </div>
  );
}
