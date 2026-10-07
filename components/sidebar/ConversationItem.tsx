"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Star,
  MoreHorizontal,
  Edit2,
  Archive,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { Dialog } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface ConversationSummary {
  id: string;
  title: string;
  model: string;
  isFavorite: boolean;
  archived: boolean;
  updatedAt: string | Date;
  messages?: Array<{ content: string }>;
  _count?: { messages: number };
}

interface ConversationItemProps {
  conversation: ConversationSummary;
  isActive: boolean;
  onFavoriteToggle: (id: string) => void;
  onArchiveToggle: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onFavoriteToggle,
  onArchiveToggle,
  onRename,
  onDelete,
}: ConversationItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(conversation.title);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveRename = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (renameValue.trim() && renameValue !== conversation.title) {
      onRename(conversation.id, renameValue.trim());
    }
    setIsRenaming(false);
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs sm:text-sm font-medium transition-colors select-none",
          isActive
            ? "bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
        )}
      >
        <MessageSquare
          className={cn(
            "w-4 h-4 shrink-0 transition-colors",
            isActive
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
          )}
        />

        {isRenaming ? (
          <form
            onSubmit={handleSaveRename}
            className="flex items-center gap-1 flex-1 min-w-0"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              autoFocus
              onBlur={() => handleSaveRename()}
              className="w-full bg-white dark:bg-slate-900 border border-indigo-500 rounded px-1.5 py-0.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSaveRename()}
              className="p-1 hover:text-emerald-500"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setRenameValue(conversation.title);
                setIsRenaming(false);
              }}
              className="p-1 hover:text-rose-500"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <Link
            href={`/chat/${conversation.id}`}
            className="flex-1 truncate"
            title={conversation.title}
          >
            {conversation.title}
          </Link>
        )}

        {/* Favorite Icon */}
        {conversation.isFavorite && !isRenaming && (
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
        )}

        {/* Action Menu Trigger */}
        {!isRenaming && (
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className={cn(
                "p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-opacity",
                isMenuOpen || isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 top-6 z-50 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-xl animate-in fade-in zoom-in-95">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onFavoriteToggle(conversation.id);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Star
                      className={cn(
                        "w-3.5 h-3.5",
                        conversation.isFavorite && "fill-amber-400 text-amber-400"
                      )}
                    />
                    <span>
                      {conversation.isFavorite ? "Unstar Chat" : "Star Chat"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsRenaming(true);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Rename</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onArchiveToggle(conversation.id);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>{conversation.archived ? "Unarchive" : "Archive"}</span>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowDeleteConfirm(true);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Delete conversation?"
        description="This will permanently delete this conversation and its messages. This action cannot be undone."
        maxWidth="sm"
      >
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setShowDeleteConfirm(false);
              onDelete(conversation.id);
            }}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
}
