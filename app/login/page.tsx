"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Mail, Lock, Sparkles, Shield, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to sign in.");
      } else {
        router.push("/chat");
        router.refresh();
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: "USER" | "ADMIN" = "USER") => {
    setDemoLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Demo login failed.");
      } else {
        router.push(role === "ADMIN" ? "/admin" : "/chat");
        router.refresh();
      }
    } catch {
      setError("Failed to sign in with demo account.");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070a12] p-4 text-slate-900 dark:text-slate-100">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/">
            <Logo size="lg" />
          </Link>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight pt-2">
            Welcome back to Mindora
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to continue to your intelligent AI workspace.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xl space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 p-3 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1-Click Fast Trial Demo Access Buttons */}
          <div className="space-y-2">
            <button
              type="button"
              disabled={demoLoading}
              onClick={() => handleDemoLogin("USER")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 px-4 py-2.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>1-Click Demo Login (Alex Morgan)</span>
            </button>

            <button
              type="button"
              disabled={demoLoading}
              onClick={() => handleDemoLogin("ADMIN")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/70 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-purple-500" />
              <span>1-Click Admin Console Login</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              or with email
            </span>
            <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="gradient"
              size="md"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-400">
          Mindora — Think. Create. Discover.
        </div>
      </div>
    </div>
  );
}
