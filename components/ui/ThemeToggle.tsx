"use client";

import React from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils/cn";

interface ThemeToggleProps {
  className?: string;
  variant?: "icon" | "segmented";
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-medium",
          className
        )}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all",
            theme === "light"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Light</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all",
            theme === "dark"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Moon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Dark</span>
        </button>
        <button
          type="button"
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all",
            theme === "system"
              ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          )}
        >
          <Laptop className="w-3.5 h-3.5 text-slate-400" />
          <span>System</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
        className
      )}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
