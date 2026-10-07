/**
 * Mindora Intelligent Simulated Streaming Engine
 * Produces realistic, domain-aware markdown responses with streaming simulation for development and demo mode.
 */

interface MockMessage {
  role: string;
  content: string;
}

export function generateSmartMockResponse(
  messages: MockMessage[],
  modelId: string = "mindora-balanced",
  customInstructions?: string | null
): string {
  const latestMessage = messages[messages.length - 1]?.content || "";
  const query = latestMessage.toLowerCase().trim();

  // Prefix based on custom instructions or model personality
  let introPrefix = "";
  if (modelId === "mindora-pro") {
    introPrefix = "> *Mindora Pro deep reasoning active: Evaluating multiple architectural pathways...*\n\n";
  }

  // 1. Coding & Tech queries
  if (
    query.includes("code") ||
    query.includes("react") ||
    query.includes("typescript") ||
    query.includes("next.js") ||
    query.includes("python") ||
    query.includes("function") ||
    query.includes("algorithm") ||
    query.includes("api") ||
    query.includes("bug")
  ) {
    return `${introPrefix}### Solution & Implementation

Here is a clean, modern, and production-ready solution in TypeScript:

\`\`\`typescript
import { useState, useEffect, useCallback } from "react";

interface StreamResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Custom hook for resilient real-time data streaming
 */
export function useStreamData<T>(endpoint: string): StreamResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(endpoint, {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
      const payload = await res.json();
      setData(payload);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}
\`\`\`

#### Key Highlights & Best Practices:
1. **Type Safety**: Strictly typed generic parameters ensure autocompletion and compile-time verification.
2. **Error Resiliency**: Graceful fallback states handle network drops and non-200 HTTP statuses.
3. **Memoization**: \`useCallback\` prevents unnecessary re-subscriptions on re-renders.

> **Tip**: For high-throughput scenarios, consider wrapping the stream consumer in an \`AbortController\` to cancel pending requests when components unmount.`;
  }

  // 2. Explain / Concept queries (e.g. "Explain artificial intelligence simply")
  if (
    query.includes("explain") ||
    query.includes("what is") ||
    query.includes("how does") ||
    query.includes("artificial intelligence") ||
    query.includes("ai")
  ) {
    return `${introPrefix}### Understanding Artificial Intelligence

**Artificial intelligence (AI)** is technology that enables computers and machines to perform tasks that traditionally required human cognition — such as understanding natural language, recognizing complex patterns, solving nuanced problems, and generating creative content.

---

### Core Pillars of Modern AI

| Pillar | How It Works | Real-World Example |
| :--- | :--- | :--- |
| **Machine Learning** | Learns statistical patterns from data rather than hardcoded rules | Recommendation systems (Spotify, Netflix) |
| **Neural Networks** | Layered mathematical networks inspired by biological neurons | Image recognition & Autonomous driving |
| **Large Language Models** | Predicts probabilistic token sequences across vast linguistic corpuses | Conversational assistants like Mindora |
| **Computer Vision** | Extracts spatial features from pixels and sensor frames | Medical imaging and facial verification |

---

### Why It Matters
AI transforms how we brainstorm, write, code, and solve problems by acting as an **interactive thought partner**, amplifying human creativity and productivity.`;
  }

  // 3. Writing / Email / Pitch queries
  if (
    query.includes("write") ||
    query.includes("email") ||
    query.includes("essay") ||
    query.includes("article") ||
    query.includes("blog") ||
    query.includes("pitch")
  ) {
    return `${introPrefix}### Polished Draft

Here is a compelling, high-impact draft tailored for clear communication:

---

**Subject:** Introducing Mindora: Elevating Our Intelligent Workflow

**Dear Team,**

I am excited to share a major enhancement to our daily productivity stack. We are adopting **Mindora**, a next-generation AI workspace designed to accelerate our research, engineering, and creative output.

**What this brings to our workflow:**
* **Instant Synthesis**: Summarize complex technical documents and datasets in seconds.
* **Intelligent Pair Programming**: High-fidelity code generation and architectural reviews.
* **Structured Brainstorming**: Rapidly iterate on concepts with nuanced, multi-turn reasoning.

Let's schedule a brief 15-minute walkthrough this Thursday to explore team prompts and best practices.

Warm regards,  
**Alex Morgan**  
*Lead Product Strategist*

---

> *Feel free to adjust the tone or let me know if you would like to expand specific sections!*`;
  }

  // 4. Brainstorm / Ideas queries
  if (
    query.includes("brainstorm") ||
    query.includes("ideas") ||
    query.includes("suggest") ||
    query.includes("create")
  ) {
    return `${introPrefix}### 5 High-Impact Innovation Concepts

Here are five structured concepts tailored for execution:

1. **Autonomous Knowledge Synthesizer**
   * *Concept*: An AI agent that ingests team Slack threads, GitHub PRs, and Notion docs to generate automated weekly executive briefings.
   * *Target Value*: Eliminates 4+ hours of manual status syncing per team lead.

2. **Context-Aware Visual Code Reviewer**
   * *Concept*: An automated CI/CD bot that generates visual diffs and architectural impact maps for every pull request.
   * *Target Value*: Catches performance regressions before staging deployment.

3. **Hyper-Personalized Learning Companion**
   * *Concept*: Dynamic curriculum generator that adapts quizzes and code exercises based on real-time comprehension telemetry.
   * *Target Value*: 3x faster onboarding for new engineering hires.

4. **Multi-Modal Research Assistant**
   * *Concept*: Real-time cross-referencing between financial charts, PDF whitepapers, and earnings call transcripts.
   * *Target Value*: Delivers institutional-grade investment memos in minutes.

5. **Voice-Driven Interactive Ideation Canvas**
   * *Concept*: Converts conversational voice notes into structured mind maps and executable Jira tickets automatically.
   * *Target Value*: Bridges the gap between spontaneous meetings and structured roadmaps.

Which of these directions would you like to explore or blueprint further?`;
  }

  // 5. Research / Analysis / Document queries
  if (
    query.includes("research") ||
    query.includes("analyze") ||
    query.includes("document") ||
    query.includes("summary") ||
    query.includes("data")
  ) {
    return `${introPrefix}### Executive Research & Analysis Report

#### 1. Strategic Overview
Based on modern computational intelligence metrics, cross-functional AI adoption has accelerated by **240% year-over-year**. Key drivers include integrated streaming interfaces, local privacy-first sandboxing, and multimodal context retention.

#### 2. Key Findings & Breakdown

\`\`\`
[Data Ingestion] ──► [Semantic Chunking] ──► [Vector Embeddings] ──► [Stream Synthesis]
\`\`\`

* **Performance Velocity**: Sub-100ms time-to-first-token provides an immediate conversational feedback loop.
* **Accuracy & Grounding**: Structured markdown and citations reduce cognitive friction.
* **Operational Cost**: Multi-tier model routing (Fast vs. Balanced vs. Pro) reduces token expenditure by up to **65%**.

#### 3. Actionable Next Steps
1. Establish automated guardrails for user queries.
2. Monitor latency metrics across geographically distributed edge nodes.
3. Configure model failover triggers for uninterrupted reliability.`;
  }

  // Default response
  return `${introPrefix}### Mindora Assistant

Thank you for reaching out! I'm here to assist you with your inquiry: **"${latestMessage.trim()}"**.

#### How I can help:
* **Deep Analysis & Research**: Breaking down complex concepts, data synthesis, and comparative evaluations.
* **Engineering & Architecture**: Code implementation in TypeScript, Python, Next.js, and database design.
* **Content & Strategy**: Drafting high-impact documents, technical specifications, and brainstorming solutions.

Please let me know if you would like me to drill down into specifics, write executable code, or create a step-by-step roadmap!`;
}
