"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowUp, Square, Paperclip, Mic, Sparkles } from "lucide-react";
import { AttachmentPreview, AttachmentItem } from "./AttachmentPreview";
import { VoiceModal } from "./VoiceModal";
import { cn } from "@/lib/utils/cn";

interface ChatComposerProps {
  onSendMessage: (content: string, attachments: AttachmentItem[]) => void;
  onStopStreaming?: () => void;
  isStreaming?: boolean;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export function ChatComposer({
  onSendMessage,
  onStopStreaming,
  isStreaming = false,
  disabled = false,
  placeholder = "Message Mindora...",
  initialValue = "",
}: ChatComposerProps) {
  const [content, setContent] = useState(initialValue);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      setContent(initialValue);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [initialValue]);

  // Auto-grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [content]);

  const handleSend = () => {
    if ((!content.trim() && attachments.length === 0) || isStreaming || disabled) {
      return;
    }

    onSendMessage(content.trim(), attachments);
    setContent("");
    setAttachments([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.attachment) {
            setAttachments((prev) => [...prev, data.attachment]);
          }
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const hasContent = content.trim().length > 0 || attachments.length > 0;

  return (
    <div className="relative w-full max-w-4xl mx-auto px-3 sm:px-6 pb-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        className="hidden"
        accept=".pdf,.docx,.txt,.csv,.xlsx,.json,image/*"
      />

      <VoiceModal
        open={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onTranscribed={(text) => {
          setContent((prev) => (prev ? `${prev} ${text}` : text));
        }}
      />

      <div className="relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/90 shadow-lg shadow-indigo-500/5 focus-within:border-indigo-500/60 dark:focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all p-3">
        {/* Attachment chips */}
        {attachments.length > 0 && (
          <AttachmentPreview
            attachments={attachments}
            onRemove={removeAttachment}
          />
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          className="w-full resize-none border-0 bg-transparent p-1.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none max-h-48 leading-relaxed font-normal"
        />

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/50 mt-1">
          <div className="flex items-center gap-1 text-slate-400">
            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isStreaming}
              className="flex items-center justify-center h-8 w-8 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Attach document or image (PDF, DOCX, TXT, CSV, Images)"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={() => setIsVoiceOpen(true)}
              disabled={isStreaming}
              className="flex items-center justify-center h-8 w-8 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              title="Voice message"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline select-none">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
                Shift + Enter
              </kbd>{" "}
              newline
            </span>

            {isStreaming ? (
              <button
                type="button"
                onClick={onStopStreaming}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-slate-900 hover:opacity-90 shadow-sm transition-all"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!hasContent || disabled}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                  hasContent
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 active:scale-95"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                )}
                title="Send message (Enter)"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
