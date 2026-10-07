import { getCurrentUser } from "@/lib/auth/session";
import { SettingsView } from "@/components/settings/SettingsView";
import { DEFAULT_MODELS } from "@/lib/ai/models";
import prisma from "@/lib/db/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let user: any = null;
  let models = DEFAULT_MODELS;

  try {
    user = await getCurrentUser();

    if (!user) {
      user = await prisma.user.findFirst({
        where: { email: "demo@mindora.ai" },
      });
    }

    const dbModels = await prisma.modelConfiguration.findMany({
      where: { isEnabled: true },
    });

    if (dbModels && dbModels.length > 0) {
      models = dbModels.map((m) => ({
        id: m.modelId,
        name: m.name,
        description: m.description,
        speedRating: m.speedRating as any,
        qualityRating: m.qualityRating as any,
        pricingInput: m.pricingInput,
        pricingOutput: m.pricingOutput,
        tagline: m.description,
        iconName: "Sparkles",
        contextWindow: "128k tokens",
        isEnabled: m.isEnabled,
      }));
    }
  } catch (err) {
    console.warn("SettingsPage database query fallback:", err);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070a12] text-slate-900 dark:text-slate-100">
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#070a12]/80 backdrop-blur-md px-4 py-3 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/chat"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workspace</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Mindora Preferences
          </span>
        </div>
      </div>

      <SettingsView initialUser={user} models={models} />
    </div>
  );
}
