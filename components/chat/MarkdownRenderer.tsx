"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { cn } from "@/lib/utils/cn";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  isStreaming?: boolean;
}

export function MarkdownRenderer({
  content,
  className,
  isStreaming = false,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none text-[15px] leading-relaxed break-words prose-mindora",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(children).replace(/\n$/, "");
            const isInline = !match && !codeString.includes("\n");

            if (isInline) {
              return (
                <code
                  className="rounded-md bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 text-[13px] font-mono font-medium text-indigo-600 dark:text-indigo-400 border border-slate-200/50 dark:border-slate-700/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                language={match ? match[1] : "text"}
                code={codeString}
              />
            );
          },
          table({ children }) {
            return (
              <div className="my-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/75 dark:bg-slate-800/75 px-4 py-2.5 font-semibold text-slate-900 dark:text-slate-100">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="border-b border-slate-100 dark:border-slate-800/60 px-4 py-2.5 text-slate-700 dark:text-slate-300">
                {children}
              </td>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-500"
              >
                {children}
              </a>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="my-3 border-l-4 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 py-2 pl-4 pr-3 rounded-r-xl text-slate-700 dark:text-slate-300 italic">
                {children}
              </blockquote>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
      {isStreaming && <span className="streaming-cursor" />}
    </div>
  );
}
