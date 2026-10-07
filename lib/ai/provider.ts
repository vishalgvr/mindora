import { generateSmartMockResponse } from "./mock-stream";
import { getModelById } from "./models";

export interface ChatMessageInput {
  role: "user" | "assistant" | "system";
  content: string;
  attachments?: Array<{
    fileName: string;
    fileType: string;
    fileSize: number;
    storageUrl?: string;
  }>;
}

export interface StreamChatOptions {
  modelId: string;
  messages: ChatMessageInput[];
  customInstructions?: string | null;
  userId?: string;
}

export interface StreamChatResult {
  stream: ReadableStream<Uint8Array>;
  isDemo: boolean;
  modelUsed: string;
  providerName: string;
}

/**
 * Common interface for all Server-side AI Providers
 */
export interface AIProvider {
  readonly name: string;
  streamChat(options: StreamChatOptions): Promise<StreamChatResult>;
}

/**
 * 1. Demo / Simulated AI Provider
 * High-performance, domain-aware streaming simulator for offline/unkeyed setups.
 */
export class DemoProvider implements AIProvider {
  readonly name = "Mindora Demo Engine";

  async streamChat(options: StreamChatOptions): Promise<StreamChatResult> {
    const fullText = generateSmartMockResponse(
      options.messages,
      options.modelId,
      options.customInstructions
    );

    const encoder = new TextEncoder();
    const chunks = fullText.match(/\S+|\s+/g) || [fullText];

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (let i = 0; i < chunks.length; i++) {
          const chunk = chunks[i];
          controller.enqueue(encoder.encode(chunk));

          // Natural typing cadence: 15-35ms delay
          const delay = chunk.includes("\n") ? 35 : Math.random() * 20 + 10;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        controller.close();
      },
    });

    return {
      stream,
      isDemo: true,
      modelUsed: options.modelId,
      providerName: this.name,
    };
  }
}

/**
 * 2. OpenAI / Compatible Provider (supports OpenAI, Groq, DeepSeek, Ollama, OpenRouter, etc.)
 */
export class OpenAIProvider implements AIProvider {
  readonly name: string;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl?: string, name = "OpenAI") {
    this.apiKey = apiKey.trim();
    this.baseUrl = (baseUrl || process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
    this.name = name;
  }

  private mapModel(modelId: string): string {
    if (process.env.AI_MODEL?.trim()) {
      return process.env.AI_MODEL.trim();
    }

    if (this.name === "Groq") {
      if (modelId === "mindora-pro") return "llama-3.3-70b-versatile";
      if (modelId === "mindora-fast") return "llama-3.1-8b-instant";
      return "llama-3.3-70b-versatile";
    }

    if (this.name === "DeepSeek") {
      if (modelId === "mindora-pro") return "deepseek-reasoner";
      return "deepseek-chat";
    }

    // Default OpenAI mappings
    if (modelId === "mindora-pro") return "gpt-4o";
    if (modelId === "mindora-fast") return "gpt-4o-mini";
    return "gpt-4o";
  }

  async streamChat(options: StreamChatOptions): Promise<StreamChatResult> {
    const mappedModel = this.mapModel(options.modelId);

    const systemPrompt = options.customInstructions
      ? `You are Mindora, an intelligent AI workspace. User preferences & custom instructions: ${options.customInstructions}`
      : "You are Mindora, an intelligent, helpful, and concise AI workspace companion. Think. Create. Discover.";

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...options.messages.map((m) => {
        let textContent = m.content;
        if (m.attachments && m.attachments.length > 0) {
          const filesSummary = m.attachments
            .map((att) => `[Attachment: ${att.fileName} (${att.fileType})]`)
            .join("\n");
          textContent = `${filesSummary}\n\n${textContent}`;
        }
        return {
          role: m.role,
          content: textContent,
        };
      }),
    ];

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        model: mappedModel,
        messages: formattedMessages,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text().catch(() => "");
      throw new Error(`OpenAI Provider (${this.name}) responded with status ${response.status}: ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === "data: [DONE]") continue;
              if (trimmed.startsWith("data: ")) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const text = json.choices?.[0]?.delta?.content;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch {
                  // Ignore malformed SSE chunk
                }
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return {
      stream,
      isDemo: false,
      modelUsed: mappedModel,
      providerName: this.name,
    };
  }
}

/**
 * 3. Anthropic Provider (Claude 3.5 Sonnet / Haiku / Opus)
 */
export class AnthropicProvider implements AIProvider {
  readonly name = "Anthropic Claude";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey.trim();
  }

  private mapModel(modelId: string): string {
    if (process.env.AI_MODEL?.trim()) {
      return process.env.AI_MODEL.trim();
    }
    if (modelId === "mindora-pro") return "claude-3-5-sonnet-20241022";
    if (modelId === "mindora-fast") return "claude-3-5-haiku-20241022";
    return "claude-3-5-sonnet-20241022";
  }

  async streamChat(options: StreamChatOptions): Promise<StreamChatResult> {
    const mappedModel = this.mapModel(options.modelId);

    const systemPrompt = options.customInstructions
      ? `You are Mindora, an intelligent AI workspace. Custom instructions: ${options.customInstructions}`
      : "You are Mindora, an intelligent AI workspace. Think. Create. Discover.";

    const messages = options.messages.map((m) => {
      let textContent = m.content;
      if (m.attachments && m.attachments.length > 0) {
        const filesSummary = m.attachments
          .map((att) => `[Attachment: ${att.fileName} (${att.fileType})]`)
          .join("\n");
        textContent = `${filesSummary}\n\n${textContent}`;
      }
      return {
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: textContent,
      };
    });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        model: mappedModel,
        max_tokens: 4096,
        system: systemPrompt,
        messages,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errText = await response.text().catch(() => "");
      throw new Error(`Anthropic API error (${response.status}): ${errText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  if (
                    json.type === "content_block_delta" &&
                    json.delta?.type === "text_delta"
                  ) {
                    controller.enqueue(encoder.encode(json.delta.text));
                  }
                } catch {
                  // Ignore
                }
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return {
      stream,
      isDemo: false,
      modelUsed: mappedModel,
      providerName: this.name,
    };
  }
}

/**
 * 4. Google Gemini Provider
 */
export class GeminiProvider implements AIProvider {
  readonly name = "Google Gemini";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey.trim();
  }

  private mapModel(modelId: string): string {
    if (process.env.AI_MODEL?.trim()) {
      return process.env.AI_MODEL.trim();
    }
    if (modelId === "mindora-pro") return "gemini-1.5-pro";
    if (modelId === "mindora-fast") return "gemini-1.5-flash";
    return "gemini-1.5-flash";
  }

  async streamChat(options: StreamChatOptions): Promise<StreamChatResult> {
    const mappedModel = this.mapModel(options.modelId);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${mappedModel}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    const contents = options.messages.map((m) => {
      let textContent = m.content;
      if (m.attachments && m.attachments.length > 0) {
        const filesSummary = m.attachments
          .map((att) => `[Attachment: ${att.fileName} (${att.fileType})]`)
          .join("\n");
        textContent = `${filesSummary}\n\n${textContent}`;
      }
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: textContent }],
      };
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        contents,
        systemInstruction: options.customInstructions
          ? { parts: [{ text: options.customInstructions }] }
          : undefined,
      }),
    });

    if (!response.ok || !response.body) {
      const errText = await response.text().catch(() => "");
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (text) {
                    controller.enqueue(encoder.encode(text));
                  }
                } catch {
                  // Ignore
                }
              }
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return {
      stream,
      isDemo: false,
      modelUsed: mappedModel,
      providerName: this.name,
    };
  }
}

/**
 * Provider Factory: Selects the appropriate AI Provider based on server environment.
 * Gracefully defaults to DemoProvider if no valid API key is present.
 */
export function getAIProvider(): AIProvider {
  const apiKey = (
    process.env.AI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.DEEPSEEK_API_KEY ||
    ""
  ).trim();

  const providerType = (process.env.AI_PROVIDER || "demo").toLowerCase().trim();

  // If no API key or explicitly set to demo, return DemoProvider
  if (!apiKey || apiKey.length < 4 || providerType === "demo") {
    return new DemoProvider();
  }

  if (providerType === "anthropic") {
    return new AnthropicProvider(apiKey);
  }

  if (providerType === "gemini") {
    return new GeminiProvider(apiKey);
  }

  if (providerType === "groq") {
    return new OpenAIProvider(apiKey, process.env.AI_BASE_URL || "https://api.groq.com/openai/v1", "Groq");
  }

  if (providerType === "deepseek") {
    return new OpenAIProvider(apiKey, process.env.AI_BASE_URL || "https://api.deepseek.com/v1", "DeepSeek");
  }

  // Default to OpenAI or custom OpenAI-compatible endpoint
  return new OpenAIProvider(apiKey, process.env.AI_BASE_URL, providerType === "custom" ? "Custom AI" : "OpenAI");
}

/**
 * Helper to check AI backend status safely (for client/admin consumption without exposing keys).
 */
export function getAIBackendStatus(): {
  isConfigured: boolean;
  provider: string;
  defaultModel: string;
} {
  const provider = (process.env.AI_PROVIDER || "demo").toLowerCase();
  const apiKey = process.env.AI_API_KEY?.trim() || "";
  const isConfigured = Boolean(apiKey && apiKey.length > 5 && provider !== "demo");

  return {
    isConfigured,
    provider: isConfigured ? provider : "demo (Mindora Intelligent Engine)",
    defaultModel: process.env.AI_MODEL || "mindora-balanced",
  };
}

/**
 * Main entry point to stream chat responses.
 * Will attempt the live provider and automatically fall back to Demo Mode if live provider fails.
 */
export async function streamChatResponse(
  options: StreamChatOptions
): Promise<StreamChatResult> {
  const provider = getAIProvider();

  // If already demo provider, run directly
  if (provider instanceof DemoProvider) {
    return provider.streamChat(options);
  }

  // Attempt live provider with auto-fallback to Demo mode on failure
  try {
    return await provider.streamChat(options);
  } catch (err: any) {
    console.warn(
      `[Mindora AI Provider] Live provider (${provider.name}) call failed. Falling back to Demo Mode:`,
      err?.message || err
    );
    const demo = new DemoProvider();
    return await demo.streamChat(options);
  }
}
