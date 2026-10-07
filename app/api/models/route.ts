import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { DEFAULT_MODELS } from "@/lib/ai/models";
import { getAIBackendStatus } from "@/lib/ai/provider";

export async function GET() {
  try {
    const backendStatus = getAIBackendStatus();
    const dbModels = await prisma.modelConfiguration.findMany({
      where: { isEnabled: true },
      orderBy: { createdAt: "asc" },
    });

    if (dbModels && dbModels.length > 0) {
      const models = dbModels.map((m) => {
        const defaultDef = DEFAULT_MODELS.find((def) => def.id === m.modelId);
        return {
          id: m.modelId,
          name: m.name,
          description: m.description,
          speedRating: m.speedRating,
          qualityRating: m.qualityRating,
          pricingInput: m.pricingInput,
          pricingOutput: m.pricingOutput,
          isDefault: m.isDefault,
          isEnabled: m.isEnabled,
          tagline: defaultDef?.tagline || m.description,
          badge: defaultDef?.badge,
          iconName: defaultDef?.iconName || "Sparkles",
          contextWindow: defaultDef?.contextWindow || "128k tokens",
        };
      });
      return NextResponse.json({ models, backendStatus });
    }

    return NextResponse.json({ models: DEFAULT_MODELS, backendStatus });
  } catch (err: any) {
    console.error("Fetch models error:", err);
    return NextResponse.json({
      models: DEFAULT_MODELS,
      backendStatus: { isConfigured: false, provider: "demo", defaultModel: "mindora-balanced" },
    });
  }
}
