"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Settings,
  ShieldAlert,
  LogOut,
  Star,
  Archive,
  MessageSquare,
  X,
  ChevronUp,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ConversationItem, ConversationSummary } from "./ConversationItem";
import { SearchModal } from "./SearchModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn, getInitials } from "@/lib/utils/cn";

interface SidebarProps {
  conversations: ConversationSummary[];
  activeConversationId?: string;
  onFavoriteToggle: (id: string) => void;
  onArchiveToggle: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onFavoriteToggle,
  onArchiveToggle,
  onRename,
  onDelete,
  onNewChat,
  isOpenMobile,
  onCloseMobile,
  user,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "archived">("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {}
  };

  const filteredConversations = conversations.filter((c) => {
    if (activeTab === "favorites") return c.isFavorite && !c.archived;
    if (activeTab === "archived") return c.archived;
    return !c.archived;
  });

  // Safe grouping
  const groups = useMemo(() => {
    const res = {
      today: [] as ConversationSummary[],
      yesterday: [] as ConversationSummary[],
      lastWeek: [] as ConversationSummary[],
      older: [] as ConversationSummary[],
    };

    if (!mounted) {
      res.today = filteredConversations;
      return res;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    filteredConversations.forEach((conv) => {
      const date = new Date(conv.updatedAt);
      if (date >= today) {
        res.today.push(conv);
      } else if (date >= yesterday) {
        res.yesterday.push(conv);
      } else if (date >= sevenDaysAgo) {
        res.lastWeek.push(conv);
      } else {
        res.older.push(conv);
      }
    });

    return res;
  }, [filteredConversations, mounted]);

  const renderGroup = (title: string, list: ConversationSummary[]) => {
    if (list.length === 0) return null;
    return (
      <div className="space-y-1 mb-4" key={title}>
        <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </div>
        {list.map((conv) => (
          <ConversationItem
            key={conv.id}
            conversation={conv}
            isActive={conv.id === activeConversationId}
            onFavoriteToggle={onFavoriteToggle}
            onArchiveToggle={onArchiveToggle}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={onCloseMobile}
        />
      )}

      <SearchModal
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        conversations={conversations}
      />

      {/* Main Sidebar Container */}
      <aside
        className={cn(
          "fixed lg:static top-0 bottom-0 left-0 z-40 flex flex-col w-72 bg-slate-50 dark:bg-[#070a12] border-r border-slate-200/80 dark:border-slate-800/80 transition-transform duration-200 ease-in-out select-none",
          isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Top Header with Logo and Mobile Close */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-slate-800/60">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls: New Chat & Search */}
        <div className="p-3 space-y-2">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              onCloseMobile();
            }}
            className="flex w-full items-center justify-between rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Chat</span>
            </div>
            <kbd className="hidden sm:inline-block rounded bg-indigo-700/60 px-1.5 py-0.5 text-[10px] font-mono">
              /
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 px-3 py-2 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search chats...</span>
            </div>
            <kbd className="rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1 py-0.5 text-[10px] font-mono">
              Ctrl K
            </kbd>
          </button>

          {/* Filter Tabs */}
          <div className="flex items-center rounded-xl bg-slate-200/60 dark:bg-slate-900/80 p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "flex-1 py-1 rounded-lg transition-all",
                activeTab === "all"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("favorites")}
              className={cn(
                "flex-1 py-1 rounded-lg transition-all flex items-center justify-center gap-1",
                activeTab === "favorites"
                  ? "bg-white dark:bg-slate-800 text-amber-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Starred</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("archived")}
              className={cn(
                "flex-1 py-1 rounded-lg transition-all flex items-center justify-center gap-1",
                activeTab === "archived"
                  ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Archive className="w-3 h-3" />
              <span>Archive</span>
            </button>
          </div>
        </div>

        {/* Conversation List / Empty States */}
        <div className="flex-1 overflow-y-auto px-3 py-1">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-400 mb-2">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {activeTab === "favorites"
                  ? "No starred conversations yet"
                  : activeTab === "archived"
                  ? "No archived conversations"
                  : "Your conversations will appear here"}
              </p>
            </div>
          ) : (
            <>
              {renderGroup("Today", groups.today)}
              {renderGroup("Yesterday", groups.yesterday)}
              {renderGroup("Previous 7 Days", groups.lastWeek)}
              {renderGroup("Older", groups.older)}
            </>
          )}
        </div>

        {/* User Footer Profile & Settings */}
        <div className="relative p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/50 dark:bg-slate-900/30">
          {/* User popup dropdown */}
          {isProfileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              <div className="absolute bottom-16 left-3 right-3 z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-2xl animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                    {user?.name || "Mindora User"}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {user?.email || "user@mindora.ai"}
                  </div>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Settings & Preferences</span>
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>

                <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 mt-1 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Theme</span>
                  <ThemeToggle />
                </div>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}

          {/* User Button */}
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex w-full items-center justify-between rounded-xl p-2 text-left hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold text-xs shadow-sm">
                {getInitials(user?.name || "Mindora User")}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {user?.name || "Mindora User"}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {user?.role === "ADMIN" ? "Administrator" : "Pro Workspace"}
                </span>
              </div>
            </div>
            <ChevronUp
              className={cn(
                "w-4 h-4 text-slate-400 transition-transform",
                isProfileMenuOpen && "rotate-180"
              )}
            />
          </button>
        </div>
      </aside>
    </>
  );
}
