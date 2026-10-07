export interface MindoraModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  speedRating: "Ultra Fast" | "Fast" | "Deliberate";
  qualityRating: "Standard" | "High" | "Maximum";
  contextWindow: string;
  pricingInput: number; // per 1k tokens
  pricingOutput: number;
  iconName: string;
  isDefault?: boolean;
  isEnabled: boolean;
}

export const DEFAULT_MODELS: MindoraModel[] = [
  {
    id: "mindora-fast",
    name: "Mindora Fast",
    tagline: "Ultra-fast response for everyday tasks",
    description: "Optimized for speed, quick summaries, proofreading, and general Q&A.",
    badge: "Speed",
    speedRating: "Ultra Fast",
    qualityRating: "Standard",
    contextWindow: "128k tokens",
    pricingInput: 0.0005,
    pricingOutput: 0.0015,
    iconName: "Zap",
    isEnabled: true,
  },
  {
    id: "mindora-balanced",
    name: "Mindora Balanced",
    tagline: "Great balance of speed and intelligence",
    description: "Our most versatile model for in-depth writing, coding, math, and data analysis.",
    badge: "Popular",
    speedRating: "Fast",
    qualityRating: "High",
    contextWindow: "128k tokens",
    pricingInput: 0.0025,
    pricingOutput: 0.01,
    iconName: "Sparkles",
    isDefault: true,
    isEnabled: true,
  },
  {
    id: "mindora-pro",
    name: "Mindora Pro",
    tagline: "Advanced reasoning for complex work & code",
    description: "Deep step-by-step thinking for architectural design, heavy research, and complex debugging.",
    badge: "Reasoning",
    speedRating: "Deliberate",
    qualityRating: "Maximum",
    contextWindow: "200k tokens",
    pricingInput: 0.015,
    pricingOutput: 0.06,
    iconName: "BrainCircuit",
    isEnabled: true,
  },
];

export function getModelById(modelId?: string): MindoraModel {
  const found = DEFAULT_MODELS.find((m) => m.id === modelId);
  return found || DEFAULT_MODELS[1]; // default to Balanced
}
