"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  Settings,
  Palette,
  MessageSquare,
  Sparkles,
  Shield,
  Save,
  Trash2,
  Download,
  Check,
} from "lucide-react";
import { MindoraModel, DEFAULT_MODELS } from "@/lib/ai/models";

interface SettingsProps {
  initialUser: any;
  models?: MindoraModel[];
}

export function SettingsView({ initialUser, models = DEFAULT_MODELS }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<
    "general" | "appearance" | "chat" | "personalization" | "privacy"
  >("general");

  const [formData, setFormData] = useState({
    name: initialUser?.name || "",
    language: initialUser?.language || "en",
    defaultModel: initialUser?.defaultModel || "mindora-balanced",
    theme: initialUser?.theme || "system",
    enterToSend: initialUser?.enterToSend ?? true,
    showTimestamps: initialUser?.showTimestamps ?? true,
    compactMode: initialUser?.compactMode ?? false,
    occupation: initialUser?.occupation || "",
    responsePreferences: initialUser?.responsePreferences || "",
    customInstructions: initialUser?.customInstructions || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "chat", label: "Chat Preferences", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "personalization", label: "Personalization", icon: <Sparkles className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy & Data", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Customize your Mindora workspace, AI behavior, and appearance.
          </p>
        </div>

        <Button
          variant="gradient"
          size="md"
          isLoading={isSaving}
          onClick={handleSave}
          className="self-start sm:self-auto"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 mr-1.5" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-1.5" />
              <span>Save Changes</span>
            </>
          )}
        </Button>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
        {/* Navigation Sidebar */}
        <div className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm space-y-6">
          {/* GENERAL TAB */}
          {activeTab === "general" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  General Configuration
                </h3>
                <p className="text-xs text-slate-500">
                  Basic account information and default AI model.
                </p>
              </div>

              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your Name"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Default AI Model
                </label>
                <select
                  value={formData.defaultModel}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData({ ...formData, defaultModel: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  {models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Interface Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === "appearance" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Appearance & Theme
                </h3>
                <p className="text-xs text-slate-500">
                  Choose between Light, Dark, or System mode.
                </p>
              </div>

              <div className="pt-2">
                <ThemeToggle variant="segmented" className="w-full sm:w-auto" />
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-950/40 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Theme Tip
                </p>
                <p>
                  Mindora features custom OLED-optimized contrast for extended coding and research sessions.
                </p>
              </div>
            </div>
          )}

          {/* CHAT PREFERENCES TAB */}
          {activeTab === "chat" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Chat Preferences
                </h3>
                <p className="text-xs text-slate-500">
                  Configure keyboard behavior and message presentation.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Switch
                  id="enterToSend"
                  label="Enter to Send"
                  description="Press Enter to send message, Shift+Enter for new line"
                  checked={formData.enterToSend}
                  onCheckedChange={(val: boolean) =>
                    setFormData({ ...formData, enterToSend: val })
                  }
                />

                <div className="border-t border-slate-100 dark:border-slate-800" />

                <Switch
                  id="showTimestamps"
                  label="Show Timestamps"
                  description="Display time sent next to each message bubble"
                  checked={formData.showTimestamps}
                  onCheckedChange={(val: boolean) =>
                    setFormData({ ...formData, showTimestamps: val })
                  }
                />

                <div className="border-t border-slate-100 dark:border-slate-800" />

                <Switch
                  id="compactMode"
                  label="Compact Spacing"
                  description="Reduce vertical padding in conversation view"
                  checked={formData.compactMode}
                  onCheckedChange={(val: boolean) =>
                    setFormData({ ...formData, compactMode: val })
                  }
                />
              </div>
            </div>
          )}

          {/* PERSONALIZATION TAB */}
          {activeTab === "personalization" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Personalization & Custom Instructions
                </h3>
                <p className="text-xs text-slate-500">
                  Teach Mindora about you and how it should tailor its responses.
                </p>
              </div>

              <Input
                label="What is your occupation / role?"
                value={formData.occupation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
                placeholder="e.g. Senior Software Architect, Product Lead, Academic Researcher"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  How should Mindora respond?
                </label>
                <textarea
                  rows={3}
                  value={formData.responsePreferences}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      responsePreferences: e.target.value,
                    })
                  }
                  placeholder="e.g. Concise and direct, prioritize TypeScript code snippets, avoid fluff, use structured tables."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Custom System Instructions
                </label>
                <textarea
                  rows={4}
                  value={formData.customInstructions}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({
                      ...formData,
                      customInstructions: e.target.value,
                    })
                  }
                  placeholder="e.g. Always write production code with comprehensive TypeScript interfaces and unit test edge cases."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === "privacy" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Privacy & Data Management
                </h3>
                <p className="text-xs text-slate-500">
                  Export or purge your conversational data.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Export All Conversations
                    </h4>
                    <p className="text-xs text-slate-500">
                      Download a JSON archive containing all your chats.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.location.href = "/api/conversations";
                    }}
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Export Archive
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-200/60 dark:border-rose-950/60 bg-rose-50/40 dark:bg-rose-950/20">
                  <div>
                    <h4 className="text-sm font-semibold text-rose-700 dark:text-rose-400">
                      Delete Account & Data
                    </h4>
                    <p className="text-xs text-slate-500">
                      Permanently wipe all conversations, preferences, and user credentials.
                    </p>
                  </div>
                  <Button variant="danger" size="sm">
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
