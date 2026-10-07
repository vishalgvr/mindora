"use client";

import React, { useState, useEffect, useCallback, createContext, useContext, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { ConversationSummary } from "@/components/sidebar/ConversationItem";
import { MindoraModel, DEFAULT_MODELS } from "@/lib/ai/models";

interface ChatContextType {
  conversations: ConversationSummary[];
  selectedModelId: string;
  setSelectedModelId: (id: string) => void;
  models: MindoraModel[];
  user: any;
  refreshConversations: () => Promise<void>;
  onFavoriteToggle: (id: string) => Promise<void>;
  onArchiveToggle: (id: string) => Promise<void>;
  onRename: (id: string, newTitle: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  activeConversation: any;
  setActiveConversation: (conv: any) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatLayout");
  }
  return context;
}

function ChatLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [models, setModels] = useState<MindoraModel[]>(DEFAULT_MODELS);
  const [selectedModelId, setSelectedModelId] = useState<string>("mindora-balanced");
  const [user, setUser] = useState<any>(null);
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<any>(null);

  // Determine active conversation ID from path `/chat/[id]`
  const activeConversationId = pathname?.startsWith("/chat/")
    ? pathname.replace("/chat/", "")
    : undefined;

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.user?.defaultModel) {
          setSelectedModelId(data.user.defaultModel);
        }
      }
    } catch {}
  }, []);

  const fetchModels = useCallback(async () => {
    try {
      const res = await fetch("/api/models");
      if (res.ok) {
        const data = await res.json();
        if (data.models && data.models.length > 0) {
          setModels(data.models);
        }
      }
    } catch {}
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.conversations || []);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchUser();
    fetchModels();
    fetchConversations();
  }, [fetchUser, fetchModels, fetchConversations]);

  const handleFavoriteToggle = async (id: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}/favorite`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isFavorite: data.conversation.isFavorite } : c))
        );
      }
    } catch {}
  };

  const handleArchiveToggle = async (id: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}/archive`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, archived: data.conversation.archived } : c))
        );
      }
    } catch {}
  };

  const handleRename = async (id: string, newTitle: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (res.ok) {
        setConversations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
        );
        if (activeConversation?.id === id) {
          setActiveConversation((prev: any) => ({ ...prev, title: newTitle }));
        }
      }
    } catch {}
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/conversations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (activeConversationId === id) {
          router.push("/chat");
        }
      }
    } catch {}
  };

  const handleNewChat = () => {
    router.push("/chat");
    setActiveConversation(null);
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        selectedModelId,
        setSelectedModelId,
        models,
        user,
        refreshConversations: fetchConversations,
        onFavoriteToggle: handleFavoriteToggle,
        onArchiveToggle: handleArchiveToggle,
        onRename: handleRename,
        onDelete: handleDelete,
        activeConversation,
        setActiveConversation,
      }}
    >
      <div className="flex h-screen w-screen overflow-hidden bg-white dark:bg-[#070a12] text-slate-900 dark:text-slate-100">
        {/* Responsive Sidebar */}
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onFavoriteToggle={handleFavoriteToggle}
          onArchiveToggle={handleArchiveToggle}
          onRename={handleRename}
          onDelete={handleDelete}
          onNewChat={handleNewChat}
          isOpenMobile={isSidebarMobileOpen}
          onCloseMobile={() => setIsSidebarMobileOpen(false)}
          user={user}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col h-full min-w-0 overflow-hidden">
          <Header
            onToggleSidebar={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
            selectedModelId={selectedModelId}
            onSelectModel={setSelectedModelId}
            models={models}
            conversation={activeConversation}
            onNewChat={handleNewChat}
          />

          <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            {children}
          </main>
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center bg-white dark:bg-[#070a12]">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
            <span className="text-xs">Loading Mindora...</span>
          </div>
        </div>
      }
    >
      <ChatLayoutInner>{children}</ChatLayoutInner>
    </Suspense>
  );
}
