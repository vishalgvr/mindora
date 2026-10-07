import React from "react";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeMap = {
    sm: { icon: "w-6 h-6", text: "text-lg", dot: "w-1.5 h-1.5" },
    md: { icon: "w-8 h-8", text: "text-xl", dot: "w-2 h-2" },
    lg: { icon: "w-10 h-10", text: "text-2xl", dot: "w-2.5 h-2.5" },
    xl: { icon: "w-14 h-14", text: "text-3xl", dot: "w-3 h-3" },
  };

  const current = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2.5 select-none font-semibold tracking-tight", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-500 shadow-md shadow-indigo-500/20 text-white transition-transform hover:scale-105",
          current.icon
        )}
      >
        {/* Mindora Abstract Geometric 'M' SVG */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          <path
            d="M6 24V11L12 17L16 13L20 17L26 11V24"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="7.5" r="2.2" fill="#38bdf8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent", current.text)}>
            Mindora
          </span>
        </div>
      )}
    </div>
  );
}
