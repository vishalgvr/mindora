"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
}

export function CodeBlock({ language = "text", code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const cleanLang = language.replace("language-", "");

  return (
    <div
      className={cn(
        "group relative my-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] text-slate-100 shadow-md",
        className
      )}
    >
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-1.5 text-xs text-slate-400">
        <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-400 font-semibold">
          {cleanLang || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <pre className="overflow-x-auto p-4 text-[13px] font-mono leading-relaxed selection:bg-indigo-500/30">
        <code>{code}</code>
      </pre>
    </div>
  );
}
