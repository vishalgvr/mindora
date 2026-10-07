"use client";

import React from "react";
import { PenTool, BookOpen, FileSearch, Code2, Lightbulb, Compass } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SuggestedPromptsProps {
  onSelectPrompt: (promptText: string) => void;
  className?: string;
}

export function SuggestedPrompts({
  onSelectPrompt,
  className,
}: SuggestedPromptsProps) {
  const suggestions = [
    {
      title: "Write something for me",
      description: "Draft an email, blog post, or project summary",
      prompt: "Draft an executive summary and introduction for a modern AI application called Mindora.",
      icon: <PenTool className="w-5 h-5 text-indigo-500" />,
      tag: "Writing",
    },
    {
      title: "Help me understand a topic",
      description: "Explain quantum computing or neural networks simply",
      prompt: "Explain how large language models and neural networks work in simple terms with real-world analogies.",
      icon: <BookOpen className="w-5 h-5 text-sky-500" />,
      tag: "Learning",
    },
    {
      title: "Analyze a document",
      description: "Extract insights, key takeaways, and bullet points",
      prompt: "Analyze the core advantages of multi-tier AI model routing vs single-model architecture.",
      icon: <FileSearch className="w-5 h-5 text-emerald-500" />,
      tag: "Research",
    },
    {
      title: "Help me code",
      description: "Write TypeScript functions, debug errors, or review PRs",
      prompt: "Write a production-ready TypeScript utility for streaming real-time Server-Sent Events with error retry logic.",
      icon: <Code2 className="w-5 h-5 text-purple-500" />,
      tag: "Coding",
    },
    {
      title: "Brainstorm ideas",
      description: "Generate creative concepts and product feature roadmaps",
      prompt: "Brainstorm 5 innovative product features for an enterprise AI workspace platform.",
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      tag: "Ideation",
    },
    {
      title: "Discover insights",
      description: "Compare modern tech stacks, frameworks, and architecture",
      prompt: "Compare Next.js App Router vs traditional client SPA architecture for high-performance AI chat applications.",
      icon: <Compass className="w-5 h-5 text-pink-500" />,
      tag: "Analysis",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl mx-auto", className)}>
      {suggestions.map((item, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectPrompt(item.prompt)}
          className="group relative flex flex-col items-start p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-left hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/80 transition-colors">
              {item.icon}
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/60">
              {item.tag}
            </span>
          </div>
          <h4 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h4>
          <p className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {item.description}
          </p>
        </button>
      ))}
    </div>
  );
}
