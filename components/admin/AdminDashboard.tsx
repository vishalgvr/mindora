"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Cpu,
  DollarSign,
  Settings,
  Shield,
  Activity,
  Check,
  Search,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils/cn";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "models" | "system"
  >("overview");

  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [systemSettings, setSystemSettings] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes, modelsRes, sysRes] = await Promise.all([
        fetch("/api/admin/stats").then((r) => r.json()),
        fetch("/api/admin/users").then((r) => r.json()),
        fetch("/api/admin/models").then((r) => r.json()),
        fetch("/api/admin/system").then((r) => r.json()),
      ]);

      setStats(statsRes.stats || {});
      setUsers(usersRes.users || []);
      setModels(modelsRes.models || []);
      setSystemSettings(sysRes.settings || {});
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateModel = async (model: any) => {
    try {
      await fetch("/api/admin/models", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
      });
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleUserRole = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
    try {
      await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: nextRole }),
      });
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSystemSettings = async () => {
    try {
      await fetch("/api/admin/system", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: systemSettings }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Admin Console
              </h1>
              <Badge variant="primary">Master Control</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Monitor system performance, models, user accounts, and token economics.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 text-xs font-semibold">
          {[
            { id: "overview", label: "Overview", icon: <Activity className="w-3.5 h-3.5" /> },
            { id: "users", label: "Users", icon: <Users className="w-3.5 h-3.5" /> },
            { id: "models", label: "Models", icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: "system", label: "System", icon: <Settings className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-24 text-center text-sm text-slate-400 animate-pulse">
          Loading metrics and configuration...
        </div>
      ) : (
        <div className="pt-6 space-y-6">
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Total Users</span>
                    <Users className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats?.totalUsers || 0}
                  </div>
                  <div className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                    <span>100% active registered users</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Conversations</span>
                    <MessageSquare className="w-4 h-4 text-sky-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats?.totalConversations || 0}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {stats?.totalMessages || 0} total messages
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Token Throughput</span>
                    <Cpu className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats?.totalTokens?.toLocaleString() || 0}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    In: {stats?.totalInputTokens || 0} | Out: {stats?.totalOutputTokens || 0}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-medium">Estimated API Cost</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats?.estimatedCost || "$0.00"}
                  </div>
                  <div className="text-[11px] text-indigo-500 font-medium">
                    Optimized multi-tier routing
                  </div>
                </div>
              </div>

              {/* Models Quick Status */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Active Intelligence Engines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {models.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {m.name}
                        </span>
                        <Badge
                          variant={m.isEnabled ? "success" : "secondary"}
                          size="sm"
                        >
                          {m.isEnabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500">{m.description}</p>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                        <span>Speed: {m.speedRating}</span>
                        <span>In: ${m.pricingInput}/k</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: USERS */}
          {activeTab === "users" && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  User Accounts ({users.length})
                </h3>
                <div className="w-full sm:w-64">
                  <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    icon={<Search className="w-4 h-4" />}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                      <th className="pb-3 px-3">User</th>
                      <th className="pb-3 px-3">Role</th>
                      <th className="pb-3 px-3">Conversations</th>
                      <th className="pb-3 px-3">Joined</th>
                      <th className="pb-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900 dark:text-slate-100">
                            {u.name}
                          </div>
                          <div className="text-xs text-slate-400">{u.email}</div>
                        </td>
                        <td className="py-3 px-3">
                          <Badge
                            variant={u.role === "ADMIN" ? "purple" : "secondary"}
                          >
                            {u.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                          {u._count?.conversations || 0}
                        </td>
                        <td className="py-3 px-3 text-slate-400 text-xs">
                          {formatDate(u.createdAt)}
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => handleToggleUserRole(u.id, u.role)}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-colors"
                          >
                            {u.role === "ADMIN" ? "Demote" : "Make Admin"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: MODELS */}
          {activeTab === "models" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Model Routing & Pricing Engine
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enable models, set defaults, and configure token unit pricing.
                  </p>
                </div>

                <div className="space-y-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {model.name}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            ({model.modelId})
                          </span>
                          {model.isDefault && (
                            <Badge variant="primary">Default</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{model.description}</p>
                        <div className="text-[11px] text-slate-400">
                          Provider target: <span className="font-mono">{model.providerModel}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-400">Input $/1k:</label>
                          <input
                            type="number"
                            step="0.0001"
                            defaultValue={model.pricingInput}
                            onBlur={(e) =>
                              handleUpdateModel({
                                id: model.id,
                                pricingInput: parseFloat(e.target.value),
                              })
                            }
                            className="w-20 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-1 text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-400">Output $/1k:</label>
                          <input
                            type="number"
                            step="0.0001"
                            defaultValue={model.pricingOutput}
                            onBlur={(e) =>
                              handleUpdateModel({
                                id: model.id,
                                pricingOutput: parseFloat(e.target.value),
                              })
                            }
                            className="w-20 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-1 text-xs"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateModel({
                              id: model.id,
                              isEnabled: !model.isEnabled,
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            model.isEnabled
                              ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {model.isEnabled ? "Enabled" : "Disabled"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: SYSTEM */}
          {activeTab === "system" && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    System Configuration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage system guardrails, limits, and operational switches.
                  </p>
                </div>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={handleSaveSystemSettings}
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1" /> Saved
                    </>
                  ) : (
                    "Save Settings"
                  )}
                </Button>
              </div>

              <div className="space-y-4 pt-2">
                <Switch
                  id="regEnabled"
                  label="Allow Public Signups"
                  description="When disabled, only administrators can provision new accounts."
                  checked={systemSettings.registration_enabled === "true"}
                  onCheckedChange={(checked: boolean) =>
                    setSystemSettings({
                      ...systemSettings,
                      registration_enabled: checked ? "true" : "false",
                    })
                  }
                />

                <div className="border-t border-slate-100 dark:border-slate-800" />

                <Switch
                  id="maintMode"
                  label="Maintenance Mode"
                  description="Temporarily display maintenance banner to non-admin users."
                  checked={systemSettings.maintenance_mode === "true"}
                  onCheckedChange={(checked: boolean) =>
                    setSystemSettings({
                      ...systemSettings,
                      maintenance_mode: checked ? "true" : "false",
                    })
                  }
                />

                <div className="border-t border-slate-100 dark:border-slate-800" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input
                    label="Max Message Character Length"
                    type="number"
                    value={systemSettings.max_message_length || "8000"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSystemSettings({
                        ...systemSettings,
                        max_message_length: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="File Upload Size Limit (MB)"
                    type="number"
                    value={systemSettings.file_upload_limit_mb || "25"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSystemSettings({
                        ...systemSettings,
                        file_upload_limit_mb: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
