"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCw, Edit3, User, AlertCircle } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { AttachmentPreview, AttachmentItem } from "./AttachmentPreview";
import { Logo } from "@/components/ui/Logo";
import { formatDate } from "@/lib/utils/cn";
import { cn } from "@/lib/utils/cn";

export interface MessageData {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date | string;
  metadata?: string;
  attachments?: AttachmentItem[];
  isStreaming?: boolean;
  isError?: boolean;
}

interface ChatMessageProps {
  message: MessageData;
  onRegenerate?: () => void;
  onEdit?: (content: string) => void;
  isLast?: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({
  message,
  onRegenerate,
  onEdit,
  isLast = false,
  isStreaming = false,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  let metaObj: any = null;
  if (message.metadata) {
    try {
      metaObj = JSON.parse(message.metadata);
    } catch {}
  }

  return (
    <div
      className={cn(
        "group relative flex w-full gap-3 sm:gap-4 py-4 px-3 sm:px-6 transition-colors",
        isUser
          ? "bg-transparent justify-end"
          : "bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100/80 dark:border-slate-800/40"
      )}
    >
      <div
        className={cn(
          "flex gap-3 sm:gap-4 w-full max-w-4xl mx-auto",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 dark:bg-slate-700 text-white shadow-sm font-semibold text-xs">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <Logo size="sm" showText={false} />
          )}
        </div>

        {/* Message Bubble & Content */}
        <div
          className={cn(
            "flex flex-col min-w-0 space-y-1.5",
            isUser ? "items-end max-w-[85%] sm:max-w-[75%]" : "items-start w-full"
          )}
        >
          {/* Header info */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isUser ? "You" : "Mindora"}
            </span>
            {metaObj?.model && (
              <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-indigo-500 font-mono">
                {metaObj.model}
              </span>
            )}
            {message.createdAt && (
              <span>{formatDate(message.createdAt)}</span>
            )}
          </div>

          {/* Attachments if any */}
          {message.attachments && message.attachments.length > 0 && (
            <AttachmentPreview
              attachments={message.attachments}
              isReadOnly
            />
          )}

          {/* Body */}
          {isUser ? (
            <div className="rounded-2xl rounded-tr-sm bg-indigo-600 dark:bg-indigo-600 px-4 py-2.5 text-sm text-white shadow-sm whitespace-pre-wrap leading-relaxed">
              {message.content}
            </div>
          ) : message.isError ? (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 p-3 text-sm text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message.content}</span>
            </div>
          ) : (
            <div className="w-full text-slate-800 dark:text-slate-200">
              <MarkdownRenderer
                content={message.content}
                isStreaming={isStreaming && isLast}
              />
            </div>
          )}

          {/* Action Toolbar */}
          {!isStreaming && (
            <div
              className={cn(
                "flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity text-slate-400",
                isUser ? "justify-end" : "justify-start"
              )}
            >
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-lg p-1.5 text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Copy message"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px] hidden sm:inline">Copy</span>
                  </>
                )}
              </button>

              {isUser && onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(message.content)}
                  className="flex items-center gap-1 rounded-lg p-1.5 text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="Edit prompt"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Edit</span>
                </button>
              )}

              {!isUser && isLast && onRegenerate && (
                <button
                  type="button"
                  onClick={onRegenerate}
                  className="flex items-center gap-1 rounded-lg p-1.5 text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="Regenerate response"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Regenerate</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
