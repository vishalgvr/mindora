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

/**
 * Creates a ReadableStream for streaming AI responses.
 * Gracefully switches between Real AI Providers (OpenAI/Anthropic/Gemini) and the Mindora Simulated Demo Engine.
 */
export async function streamChatResponse(
  options: StreamChatOptions
): Promise<{ stream: ReadableStream<Uint8Array>; isDemo: boolean }> {
  const apiKey = process.env.AI_API_KEY?.trim();
  const provider = (process.env.AI_PROVIDER || "demo").toLowerCase();
  const modelConfig = getModelById(options.modelId);

  // If a valid API key is present and provider is not demo, try the live provider
  if (apiKey && apiKey.length > 5 && provider !== "demo") {
    try {
      if (provider === "openai" || provider === "custom") {
        return await streamOpenAIResponse(apiKey, options, modelConfig.id);
      }
      if (provider === "anthropic") {
        return await streamAnthropicResponse(apiKey, options, modelConfig.id);
      }
      if (provider === "gemini") {
        return await streamGeminiResponse(apiKey, options, modelConfig.id);
      }
    } catch (err) {
      console.warn("Error calling live AI provider, falling back to Mindora Demo Stream:", err);
      // Fall through to mock stream
    }
  }

  // Otherwise, use Mindora Smart Simulated Stream
  return {
    stream: createMockStream(options),
    isDemo: true,
  };
}

/**
 * Simulates a realistic token-by-token stream with natural pauses
 */
function createMockStream(options: StreamChatOptions): ReadableStream<Uint8Array> {
  const fullText = generateSmartMockResponse(
    options.messages,
    options.modelId,
    options.customInstructions
  );

  const encoder = new TextEncoder();
  // Split by words/whitespace to stream naturally
  const chunks = fullText.match(/\S+|\s+/g) || [fullText];

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        controller.enqueue(encoder.encode(chunk));

        // Variable delay for realistic typing cadence (15ms - 35ms)
        const delay = chunk.includes("\n") ? 35 : Math.random() * 20 + 10;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      controller.close();
    },
  });
}

/**
 * OpenAI / Compatible Streaming Provider
 */
async function streamOpenAIResponse(
  apiKey: string,
  options: StreamChatOptions,
  modelId: string
): Promise<{ stream: ReadableStream<Uint8Array>; isDemo: boolean }> {
  const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const mappedModel =
    modelId === "mindora-pro"
      ? "gpt-4o"
      : modelId === "mindora-fast"
      ? "gpt-4o-mini"
      : "gpt-4o";

  const systemPrompt = options.customInstructions
    ? `You are Mindora, an intelligent AI workspace. Custom instructions: ${options.customInstructions}`
    : "You are Mindora, an intelligent, helpful, and concise AI workspace companion. Think. Create. Discover.";

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: mappedModel,
      messages: [
        { role: "system", content: systemPrompt },
        ...options.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`OpenAI API responded with status ${response.status}`);
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
                // Ignore parse errors on malformed SSE chunks
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

  return { stream, isDemo: false };
}

/**
 * Anthropic Streaming Provider
 */
async function streamAnthropicResponse(
  apiKey: string,
  options: StreamChatOptions,
  modelId: string
): Promise<{ stream: ReadableStream<Uint8Array>; isDemo: boolean }> {
  const mappedModel =
    modelId === "mindora-pro"
      ? "claude-3-5-sonnet-20241022"
      : "claude-3-5-haiku-20241022";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: mappedModel,
      max_tokens: 4096,
      system: options.customInstructions || "You are Mindora, an intelligent AI workspace.",
      messages: options.messages.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      })),
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Anthropic API status: ${response.status}`);
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
                // Ignore parse errors
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

  return { stream, isDemo: false };
}

/**
 * Gemini Streaming Provider
 */
async function streamGeminiResponse(
  apiKey: string,
  options: StreamChatOptions,
  _modelId: string
): Promise<{ stream: ReadableStream<Uint8Array>; isDemo: boolean }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

  const contents = options.messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Gemini API status: ${response.status}`);
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

  return { stream, isDemo: false };
}
