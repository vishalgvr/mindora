"use client";

import React, { useState } from "react";
import {
  Menu,
  Share2,
  FileCode,
  FileText,
  Plus,
  Check,
} from "lucide-react";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MindoraModel } from "@/lib/ai/models";
import {
  exportToMarkdown,
  exportToJson,
  downloadFile,
  ExportableConversation,
} from "@/lib/utils/export";

interface HeaderProps {
  onToggleSidebar: () => void;
  selectedModelId: string;
  onSelectModel: (modelId: string) => void;
  models?: MindoraModel[];
  conversation?: ExportableConversation | null;
  onNewChat?: () => void;
}

export function Header({
  onToggleSidebar,
  selectedModelId,
  onSelectModel,
  models,
  conversation,
  onNewChat,
}: HeaderProps) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleExportMd = () => {
    if (!conversation) return;
    const content = exportToMarkdown(conversation);
    const safeTitle = conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    downloadFile(content, `${safeTitle || "mindora_chat"}.md`, "text/markdown");
    setIsExportOpen(false);
  };

  const handleExportJson = () => {
    if (!conversation) return;
    const content = exportToJson(conversation);
    const safeTitle = conversation.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    downloadFile(content, `${safeTitle || "mindora_chat"}.json`, "application/json");
    setIsExportOpen(false);
  };

  const handleShareLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {}
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#070a12]/80 backdrop-blur-md px-3 sm:px-4">
      {/* Left section: Mobile menu toggle + Model selector */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          title="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <ModelSelector
          selectedModelId={selectedModelId}
          onSelectModel={onSelectModel}
          models={models}
        />
      </div>

      {/* Middle section: Conversation Title */}
      <div className="hidden md:flex items-center justify-center flex-1 px-4">
        {conversation?.title && (
          <span className="truncate max-w-sm text-xs font-semibold text-slate-600 dark:text-slate-300">
            {conversation.title}
          </span>
        )}
      </div>

      {/* Right section: Export, New Chat, Theme Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {conversation && conversation.messages?.length > 0 && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
              title="Export or share conversation"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {isExportOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsExportOpen(false)}
                />
                <div className="absolute right-0 mt-2 z-50 w-52 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl animate-in fade-in zoom-in-95">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Export Conversation
                  </div>

                  <button
                    type="button"
                    onClick={handleExportMd}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Download Markdown (.md)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FileCode className="w-4 h-4 text-emerald-500" />
                    <span>Download JSON (.json)</span>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  <button
                    type="button"
                    onClick={handleShareLink}
                    className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-slate-400" />
                        <span>Copy Share Link</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {onNewChat && (
          <button
            type="button"
            onClick={onNewChat}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Start new chat"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}
