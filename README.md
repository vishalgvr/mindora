# Mindora — AI Chat Web Portal
> **"Think. Create. Discover."**

Mindora is an independent, production-ready AI workspace designed for high-velocity conversations, creative ideation, deep research, and production code engineering.

---

## 🌟 Key Features

### 1. Multi-Tier AI Intelligence Engine
- **Mindora Fast**: Optimized for speed, quick summaries, proofreading, and general Q&A.
- **Mindora Balanced**: Versatile intelligence for nuanced writing, full-stack programming, and data analysis.
- **Mindora Pro**: Deliberate step-by-step reasoning for architectural design, complex math, and deep research.
- **Zero-Crash Smart Demo Mode**: Works instantly out of the box with simulated streaming when no external AI API key is configured.
- **Provider Abstraction**: Switchable backend supporting OpenAI, Anthropic Claude, Google Gemini, or local models.

### 2. Conversational Workspace
- **Real-Time Streaming**: Progressive response generation with low latency and streaming cursor.
- **Rich Markdown & Code**: Fenced syntax highlighting, language badges, and one-click code copy.
- **Composer Controls**: Expanding multiline textarea, Stop streaming button, prompt suggestion pills.
- **Document & Image Attachments**: Support for PDF, DOCX, TXT, CSV, XLSX, and image previews.
- **Voice UI**: Microphone input with speech waveform and browser SpeechRecognition / transcription.
- **Message Actions**: Copy response, Edit user prompt, and Regenerate responses.

### 3. Conversation Management
- Grouped chronological history (Today, Yesterday, Previous 7 Days, Older).
- Instant Search (shortcut `Ctrl + K` / `Cmd + K`).
- Star/Favorite conversations & Archive tabs.
- Inline rename & deletion confirmation dialogs.
- Export chats to **Markdown (`.md`)** or **JSON (`.json`)** with one click.

### 4. Authentication & Personalization
- Email & password authentication with bcrypt hashing and JWT session cookies.
- **1-Click Demo Logins** (Alex Morgan & Admin Console) for friction-free evaluation.
- Personalized settings: Occupation, Response style preferences, and Custom System Instructions.
- Theme switching: **Light**, **Dark**, and **System** mode with OLED-optimized contrast.

### 5. Master Admin Console (`/admin`)
- **Overview Metrics**: Total users, active conversations, token throughput, and estimated API costs.
- **User Management**: Search users, toggle Administrator privileges, and delete accounts.
- **Model Engine**: Configure model pricing ($ per 1k input/output tokens), enable/disable models, and set defaults.
- **System Settings**: Toggle public registration, maintenance mode, character limits, and upload size caps.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or yarn

### 1. Installation
```bash
npm install
```

### 2. Configure Environment
A default `.env` file is already created for instant zero-config local runs:
```env
# Database (SQLite default for instant local run, PostgreSQL supported)
DATABASE_URL="file:./dev.db"

# Authentication Secret
AUTH_SECRET="mindora_super_secret_session_token_key_change_in_prod_82947192"

# AI Provider (Leave as demo or configure live provider)
AI_PROVIDER="demo"
AI_API_KEY=""
AI_MODEL="mindora-balanced"

# App Branding
NEXT_PUBLIC_APP_NAME="Mindora"
NEXT_PUBLIC_APP_TAGLINE="Think. Create. Discover."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize & Seed Database
```bash
npx prisma generate
npx prisma db push
npx tsx lib/db/seed.ts
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001`) in your browser.

---

## 🔑 Demo Accounts

| Account Type | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Demo User** | `demo@mindora.ai` | `password123` | Full Chat Workspace & Settings |
| **Administrator** | `admin@mindora.ai` | `admin123` | Full Access + `/admin` Console |

*You can also use the **1-Click Demo Login** buttons on the `/login` page.*

---

## 🛠️ Tech Stack & Architecture

```
/app
  ├── page.tsx               # Main Landing Page (Hero, Live Demo, Features)
  ├── chat/layout.tsx        # Persistent responsive chat shell
  ├── chat/page.tsx          # New chat workspace
  ├── chat/[id]/page.tsx     # Loaded conversation thread
  ├── login/page.tsx         # Sign in & 1-click trial access
  ├── signup/page.tsx        # Account registration
  ├── settings/page.tsx      # User preferences & personalization
  ├── admin/page.tsx         # Master control dashboard
  └── api/                   # Server-side API & streaming routes

/components
  ├── chat/                  # ChatArea, ChatMessage, ChatComposer, ModelSelector, VoiceModal
  ├── sidebar/               # Sidebar, ConversationItem, SearchModal
  ├── header/                # Header, ThemeToggle, Export controls
  ├── settings/              # SettingsView (General, Appearance, Privacy)
  ├── admin/                 # AdminDashboard (Overview, Users, Models, System)
  └── ui/                    # Logo, Button, Input, Card, Badge, Switch, Dialog

/lib
  ├── ai/                    # Unified AI provider, models, smart streaming simulation
  ├── auth/                  # JWT tokens, server cookies, session helpers
  ├── db/                    # Prisma client singleton and seeder
  └── utils/                 # Class names, formatters, export utilities

/prisma
  └── schema.prisma          # Database schema (User, Conversation, Message, UsageRecord, etc.)
```

---

## 🌐 Deploying to Vercel or Cloud Hosting

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Set your PostgreSQL database connection string in `DATABASE_URL` (e.g. Supabase, Neon, or Railway).
3. Update `prisma/schema.prisma` datasource provider from `"sqlite"` to `"postgresql"`.
4. Add `AUTH_SECRET` and your AI provider credentials (`AI_API_KEY`, `AI_PROVIDER`).
5. Deploy!
