import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { DEFAULT_MODELS } from "../ai/models";

export async function seedDatabase() {
  try {
    // 1. Seed Models
    for (const m of DEFAULT_MODELS) {
      await prisma.modelConfiguration.upsert({
        where: { modelId: m.id },
        update: {
          name: m.name,
          description: m.description,
          speedRating: m.speedRating,
          qualityRating: m.qualityRating,
          pricingInput: m.pricingInput,
          pricingOutput: m.pricingOutput,
          isDefault: !!m.isDefault,
          isEnabled: m.isEnabled,
        },
        create: {
          modelId: m.id,
          name: m.name,
          description: m.description,
          speedRating: m.speedRating,
          qualityRating: m.qualityRating,
          providerModel: m.id === "mindora-pro" ? "gpt-4o" : "gpt-4o-mini",
          pricingInput: m.pricingInput,
          pricingOutput: m.pricingOutput,
          isDefault: !!m.isDefault,
          isEnabled: m.isEnabled,
        },
      });
    }

    // 2. Seed Default User
    const existingDemoUser = await prisma.user.findUnique({
      where: { email: "demo@mindora.ai" },
    });

    if (!existingDemoUser) {
      const hashedPassword = await bcrypt.hash("password123", 10);
      const demoUser = await prisma.user.create({
        data: {
          name: "Alex Morgan",
          email: "demo@mindora.ai",
          password: hashedPassword,
          role: "USER",
          occupation: "Product Strategist & Developer",
          customInstructions:
            "Provide clean code with TypeScript, clear markdown tables, and actionable insights.",
          theme: "dark",
          defaultModel: "mindora-balanced",
        },
      });

      // Add a sample conversation
      const sampleConv = await prisma.conversation.create({
        data: {
          userId: demoUser.id,
          title: "Introduction to Mindora Architecture",
          model: "mindora-balanced",
          isFavorite: true,
        },
      });

      await prisma.message.createMany({
        data: [
          {
            conversationId: sampleConv.id,
            role: "user",
            content: "Explain what makes Mindora an intelligent AI workspace.",
          },
          {
            conversationId: sampleConv.id,
            role: "assistant",
            content: `### Welcome to Mindora

**Mindora** is an intelligent AI workspace designed for **high-velocity conversations, creative ideation, deep research, and production code engineering**.

#### Key Capabilities:
1. **Multi-Tier Model Intelligence**: Seamlessly switch between Fast, Balanced, and Pro reasoning models.
2. **Interactive Code Sandbox**: Formatted syntax highlighting with one-click copy and error explanations.
3. **Document & File Synthesis**: Attach PDFs, CSVs, and technical documents for instant context extraction.
4. **Resilient Streaming**: Low latency, progressive streaming interface with token efficiency telemetry.

> **Mindora Tagline**: *"Think. Create. Discover."*

How can I assist you with your projects today?`,
          },
        ],
      });
    }

    // 3. Seed Admin User
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@mindora.ai" },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await prisma.user.create({
        data: {
          name: "Mindora Administrator",
          email: "admin@mindora.ai",
          password: hashedPassword,
          role: "ADMIN",
          occupation: "System Operations",
          theme: "dark",
          defaultModel: "mindora-pro",
        },
      });
    }

    // 4. Seed System Settings
    const defaultSettings = [
      { key: "maintenance_mode", value: "false", description: "Toggle maintenance mode on or off" },
      { key: "registration_enabled", value: "true", description: "Allow new users to sign up" },
      { key: "max_message_length", value: "8000", description: "Maximum character length per message" },
      { key: "file_upload_limit_mb", value: "25", description: "Maximum file upload size in MB" },
    ];

    for (const s of defaultSettings) {
      await prisma.systemSetting.upsert({
        where: { key: s.key },
        update: {},
        create: s,
      });
    }

    console.log("✅ Mindora database seeded successfully!");
  } catch (err) {
    console.error("Database seed error:", err);
  }
}

// Execute if run directly via ts-node / node
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}
