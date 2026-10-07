"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  PenTool,
  Search,
  FileText,
  Lightbulb,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function LandingPage() {
  const [activeDemoTab, setActiveDemoTab] = useState<"coding" | "writing" | "research">("coding");

  const demoContent = {
    coding: {
      prompt: "Write a high-performance Next.js API route for streaming LLM responses with fallback.",
      response: `export async function POST(req: Request) {
  const { messages, modelId } = await req.json();
  const { stream, isDemo } = await streamChatResponse({ messages, modelId });
  
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Mindora-Engine": isDemo ? "simulated" : "live",
    }
  });
}`,
      lang: "typescript",
    },
    writing: {
      prompt: "Draft a concise product launch email for our enterprise customers.",
      response: `Subject: Introducing Mindora Enterprise Workspace 🚀

Dear Partner,

We are thrilled to unveil Mindora — our next-generation AI workspace engineered for deep research, high-velocity engineering, and strategic writing. 

Key advantages:
• Multi-tier reasoning engines (Fast, Balanced, Pro)
• Zero data-retention sandboxes for document analysis
• Real-time token economics telemetry

Start your complimentary team pilot today: mindora.ai/enterprise`,
      lang: "markdown",
    },
    research: {
      prompt: "Synthesize the performance benefits of multi-model routing in AI applications.",
      response: `### Executive Analysis: Multi-Tier Model Routing

1. **Latency Optimization**: Directing lightweight queries to Mindora Fast reduces Time-To-First-Token by **74%**.
2. **Cost Efficiency**: High-reasoning models (Mindora Pro) are allocated only for complex code & proofs, reducing overall token expenditure by **62%**.
3. **Resilience**: Dynamic failover prevents downtime during upstream provider outages.`,
      lang: "markdown",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-indigo-500/20 selection:text-indigo-600">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#070a12]/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Capabilities
            </a>
            <a href="#models" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Models
            </a>
            <a href="#architecture" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="gradient" size="sm">
                <span>Start Chatting</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-28 lg:pb-32">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-purple-500/15 dark:bg-purple-600/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/70 dark:bg-indigo-950/50 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 backdrop-blur-sm shadow-sm animate-in fade-in zoom-in-95 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Think. Create. Discover.</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Your intelligent AI workspace for{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              everything you imagine.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Your intelligent AI workspace for conversations, ideas, research, writing, coding, and more. Built with multi-model intelligence and fluid streaming.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/chat" className="w-full sm:w-auto">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-500/25">
                <span>Start Chatting</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <a href="#features" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                Explore Mindora
              </Button>
            </a>
          </div>

          {/* Interactive Live Demo Preview Box */}
          <div className="pt-12">
            <div className="relative mx-auto max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/90 shadow-2xl backdrop-blur-md overflow-hidden text-left">
              {/* Window Bar */}
              <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-100/70 dark:bg-slate-950/60 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">mindora-interactive-preview</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-800/60 rounded-lg p-0.5 text-xs font-medium">
                  <button
                    onClick={() => setActiveDemoTab("coding")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeDemoTab === "coding"
                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-semibold"
                        : "text-slate-500"
                    }`}
                  >
                    Coding
                  </button>
                  <button
                    onClick={() => setActiveDemoTab("writing")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeDemoTab === "writing"
                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-semibold"
                        : "text-slate-500"
                    }`}
                  >
                    Writing
                  </button>
                  <button
                    onClick={() => setActiveDemoTab("research")}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeDemoTab === "research"
                        ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-semibold"
                        : "text-slate-500"
                    }`}
                  >
                    Research
                  </button>
                </div>
              </div>

              {/* Demo Conversation Content */}
              <div className="p-5 space-y-4 font-sans">
                {/* User Bubble */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-2 text-xs sm:text-sm text-white max-w-[85%] shadow-sm">
                    {demoContent[activeDemoTab].prompt}
                  </div>
                </div>

                {/* AI Bubble */}
                <div className="flex items-start gap-3">
                  <Logo size="sm" showText={false} />
                  <div className="flex-1 min-w-0 rounded-2xl bg-slate-50 dark:bg-slate-950 p-4 border border-slate-200/60 dark:border-slate-800/60 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {demoContent[activeDemoTab].response}
                  </div>
                </div>
              </div>

              {/* CTA Footer in Demo Box */}
              <div className="bg-slate-100/60 dark:bg-slate-950/80 px-4 py-2.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-slate-500">Experience low latency real-time streaming</span>
                <Link
                  href="/chat"
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Try live workspace <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section id="features" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-[#070a12]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Core Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineered for every creative and technical discipline.
            </h3>
            <p className="text-sm text-slate-500">
              Mindora pairs advanced neural models with fine-tuned domain reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: AI Conversations */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-lg transition-all space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Conversations
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Fluid multi-turn dialogue with continuous context retention, rich markdown, tables, and personalized memory.
              </p>
            </div>

            {/* Card 2: Writing & Drafting */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-lg transition-all space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400">
                <PenTool className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Writing & Synthesis
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Compose high-impact essays, executive memos, technical specifications, and press releases with tone calibration.
              </p>
            </div>

            {/* Card 3: Production Coding */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-lg transition-all space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Coding & Architecture
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Full-stack generation in TypeScript, Python, React, Next.js, and SQL with syntax highlighting and unit tests.
              </p>
            </div>

            {/* Card 4: Deep Research */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-lg transition-all space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Deep Research
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Synthesize massive domains of knowledge, break down academic theories, and contrast market trends in minutes.
              </p>
            </div>

            {/* Card 5: File Analysis */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-lg transition-all space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                File & Document Analysis
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Attach PDFs, CSVs, Word documents, and spreadsheets to extract immediate data summaries and actionable insights.
              </p>
            </div>

            {/* Card 6: Creative Thinking */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-sm hover:border-indigo-500/40 hover:shadow-lg transition-all space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Creative Thinking
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Brainstorm novel venture concepts, design campaign hooks, formulate storylines, and break creative blocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Model Tier Breakdown Section */}
      <section id="models" className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="primary">Multi-Tier Engine</Badge>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Tailored intelligence for every workload.
          </h3>
          <p className="text-sm text-slate-500">
            Switch models on the fly to balance lightning velocity and profound reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fast */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  Mindora Fast
                </span>
                <Badge variant="secondary">Ultra Fast</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Optimized for quick answers, proofreading, summaries, and casual Q&A.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sub-80ms first token latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>128k token context window</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Cost efficient for high volume</span>
                </div>
              </div>
            </div>
          </div>

          {/* Balanced */}
          <div className="relative rounded-2xl border-2 border-indigo-500 dark:border-indigo-500 bg-white dark:bg-slate-900 p-6 space-y-4 flex flex-col justify-between shadow-xl shadow-indigo-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-[10px] font-bold uppercase tracking-wider text-white">
              Most Popular
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  Mindora Balanced
                </span>
                <Badge variant="primary">High Intelligence</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Our most versatile engine for complex writing, programming, and data analysis.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>Balanced speed & deep reasoning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>Advanced coding & refactoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  <span>Nuanced document analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  Mindora Pro
                </span>
                <Badge variant="purple">Deliberate Reasoning</Badge>
              </div>
              <p className="text-xs text-slate-500">
                Heavyweight multi-step reasoning for intricate system design, math proofs, and research.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span>Step-by-step chain of thought</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span>200k token deep context</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span>Enterprise code review grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 sm:p-12 text-center text-white shadow-2xl space-y-6">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to experience the next evolution of AI chat?
          </h3>
          <p className="max-w-xl mx-auto text-indigo-100 text-sm sm:text-base">
            Join developers, researchers, and creators using Mindora to think, create, and discover.
          </p>
          <div className="pt-2">
            <Link href="/chat">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-slate-100 font-bold shadow-lg"
              >
                <span>Launch Mindora Workspace</span>
                <ArrowRight className="w-4 h-4 ml-2 text-indigo-600" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#070a12]/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xs text-slate-400">
              © 2025 Mindora. Think. Create. Discover.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/chat" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Workspace
            </Link>
            <Link href="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Settings
            </Link>
            <Link href="/admin" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Admin
            </Link>
            <Link href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
