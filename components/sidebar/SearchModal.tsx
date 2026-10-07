"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, ArrowRight, X } from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { ConversationSummary } from "./ConversationItem";
import { formatDate } from "@/lib/utils/cn";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  conversations: ConversationSummary[];
}

export function SearchModal({ open, onClose, conversations }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filtered = query.trim()
    ? conversations.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.messages?.some((m) =>
            m.content.toLowerCase().includes(query.toLowerCase())
          )
      )
    : conversations.slice(0, 8);

  const handleSelect = (id: string) => {
    router.push(`/chat/${id}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" className="p-0 overflow-hidden">
      <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search conversations by title or topic..."
          autoFocus
          className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No conversations found for &ldquo;{query}&rdquo;
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map((conv) => (
              <button
                key={conv.id}
                type="button"
                onClick={() => handleSelect(conv.id)}
                className="group flex w-full items-center justify-between rounded-xl p-2.5 text-left text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {conv.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {formatDate(conv.updatedAt)} • {conv.model}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 transition-transform group-hover:translate-x-0.5 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  );
}
