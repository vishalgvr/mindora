export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  officialSource: string;
  ownership: string;
  resellerRole: string;
  statusBadge: string;
  requiresVerification: boolean;
  shortDescription: string;
  overview: string;
  verifiedFeatures: string[];
  placeholderNotice?: string;
  suitableBusinessTypes: string[];
  businessBenefits: string[];
  verifiedIntegrations: string[];
  deploymentOptions: string[];
}

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "klyssel-one",
    slug: "klyssel-one",
    name: "Klyssel One",
    tagline: "The Unified All-in-One Enterprise Digital Operations Platform",
    category: "Flagship Digital Product",
    officialSource: "https://klyssel.com/products",
    ownership: "Proprietary software developed and owned by Klyssel Labs.",
    resellerRole: "Offered by Mindora through authorized technology reseller and client consultation arrangements.",
    statusBadge: "Enterprise Suite",
    requiresVerification: true,
    placeholderNotice:
      "Product details and specification matrices are sourced from official Klyssel Labs documentation. Final module configurations and commercial terms are confirmed during your consultation.",
    shortDescription:
      "A complete enterprise business management platform that connects HRMS, CRM, ERP, finance, operations, projects, and analytics into a single cohesive ecosystem.",
    overview:
      "Klyssel One is engineered for forward-thinking organizations requiring unified operational visibility, automated cross-departmental handoffs, and scalable workflows without juggling disconnected software tools.",
    verifiedFeatures: [
      "Unified Core: Single source of truth across operations, finance, and people management",
      "Enterprise CRM & Pipeline Tracking: Comprehensive lead-to-revenue lifecycle control",
      "Integrated HRMS: Attendance, payroll processing, leave management, and staff performance records",
      "Supply Chain & Inventory Management: Multi-warehouse tracking, stock alerts, and automated purchase orders",
      "Financial Ledger & Invoicing: Real-time bookkeeping, localized multi-currency support, and billing reconciliation",
      "Executive Analytics & Insights: Centralized operational reporting with customizable visual metrics",
      "Role-Based Security: Granular permissions, multi-factor authentication, and comprehensive audit logs",
    ],
    suitableBusinessTypes: [
      "Mid-sized to Large Enterprises",
      "Hotel Chains & Multi-Property Resorts",
      "Wholesale Distributors & Retail Groups",
      "Healthcare Groups & Medical Centers",
      "Regional Professional Service Firms",
    ],
    businessBenefits: [
      "Eliminate software fragmentation and redundant licensing expenses",
      "Real-time executive oversight across every department",
      "Automated compliance tracking and audit trails",
      "Fast onboarding with standardized data migration paths",
    ],
    verifiedIntegrations: [
      "Cloud Storage & Document Repositories",
      "Banking & Standard Payment Gateways",
      "Email & Corporate Communication Channels",
      "Custom REST APIs for legacy system connectivity",
    ],
    deploymentOptions: [
      "Dedicated Secure Cloud Instance",
      "Private Enterprise Tenant",
      "Hybrid On-Premises (Subject to Technical Feasibility & Authorization)",
    ],
  },
  {
    id: "klyssel-one-lite",
    slug: "klyssel-one-lite",
    name: "Klyssel One Lite",
    tagline: "Streamlined Business Management for Rapidly Growing Companies",
    category: "Digital Product",
    officialSource: "https://klyssel.com/products",
    ownership: "Proprietary software developed and owned by Klyssel Labs.",
    resellerRole: "Distributed and supported by Mindora for businesses in Mauritius and international markets.",
    statusBadge: "Growth Edition",
    requiresVerification: true,
    placeholderNotice:
      "Module availability and deployment timelines are configurable. Consult with Mindora for customized sizing tailored to your business stage.",
    shortDescription:
      "A tailored, lightweight version of the Klyssel One operations platform designed specifically for fast-moving startups and expanding SMEs.",
    overview:
      "Klyssel One Lite delivers the essential core capabilities of an enterprise ERP/CRM suite without the overhead complexity or lengthy setup cycles, allowing growing businesses to digitize essential operations quickly.",
    verifiedFeatures: [
      "Core Business Management: Centralized client and project administration",
      "Essential CRM: Deal stages, contact history, and follow-up reminders",
      "Smart Invoicing & Quotations: Quick digital quotes with instant client approval",
      "Team Task & Work Tracking: Collaborative project boards and milestone timelines",
      "Lightweight Inventory: Real-time stock counts and low-inventory alerts",
      "Quick-Start Setup: Streamlined onboarding designed to go live in days, not months",
    ],
    suitableBusinessTypes: [
      "Growing Startups & Scaleups",
      "Boutique Retailers & Specialized Merchants",
      "Independent Restaurants & Cafes",
      "Consulting Agencies & Creative Studios",
      "Local Service Contractors",
    ],
    businessBenefits: [
      "Low initial complexity with immediate operational clarity",
      "Scales seamlessly into full Klyssel One as your headcount and revenue grow",
      "Affordable pricing structure tailored for regional businesses",
      "Local setup and onboarding assistance provided by Mindora",
    ],
    verifiedIntegrations: [
      "Common Office & Accounting Tools",
      "Direct WhatsApp & Email Alerts",
      "Regional Payment Methods & Bank Transfer Sync",
    ],
    deploymentOptions: [
      "Managed Cloud Hosting (Fast Setup)",
      "Dedicated Regional Server Option",
    ],
  },
  {
    id: "klyx-chatbot",
    slug: "klyx-chatbot-ai",
    name: "Klyx Chatbot v2.4 AI",
    tagline: "Next-Generation Autonomous AI Assistant & Multi-Channel Support Platform",
    category: "AI Chatbot Solution",
    officialSource: "https://klyssel.com/products",
    ownership: "Proprietary AI platform developed and owned by Klyssel Labs.",
    resellerRole: "Consulted, deployed, and configured by Mindora under authorized technology partner arrangements.",
    statusBadge: "AI Platform v2.4",
    requiresVerification: true,
    placeholderNotice:
      "AI knowledge base capacities, token allotments, and supported channels subject to official Klyssel Labs technical specifications and current version releases.",
    shortDescription:
      "An intelligent, multi-channel conversational AI assistant engineered for 24/7 customer support, instant lead qualification, and zero-hallucination knowledge retrieval.",
    overview:
      "Klyx Chatbot v2.4 AI is built with modern Retrieval-Augmented Generation (RAG) technology, ensuring accurate, contextual, and human-like interactions across websites, WhatsApp, and social messaging channels.",
    verifiedFeatures: [
      "Zero-Hallucination Guardrails: Strict knowledge-base boundary enforcement to guarantee accurate answers",
      "Multi-Channel Omnipresence: Web widget, WhatsApp Business, Facebook Messenger, and Instagram Direct integration",
      "Instant Lead Qualification: Gathers key prospect details and books meetings directly into your CRM",
      "Human-in-the-Loop Handover: Smooth live-agent escalation when complex human assistance is required",
      "Multilingual Intelligence: Fluent support for English, French, Mauritian Creole, Hindi, and 40+ international languages",
      "Knowledge Synchronization: Ingests PDFs, FAQs, website URLs, and internal docs with automated periodic re-indexing",
      "Analytics & Sentiment Tracking: Real-time conversation scoring, unresolved query flags, and topic trends",
    ],
    suitableBusinessTypes: [
      "Hotels, Resorts & Tour Operators (Guest inquiries & booking assistance)",
      "Healthcare Clinics & Diagnostic Centers (Appointments & service information)",
      "E-commerce & Online Stores (Order tracking & product recommendations)",
      "Real Estate Agencies (Property inquiries & lead screening)",
      "Financial Services & Insurance Brokers (Policy FAQs & preliminary checks)",
    ],
    businessBenefits: [
      "Instantaneous response time 24 hours a day, 365 days a year",
      "Reduces customer support inquiry backlog by up to 70%",
      "Increases website lead conversion rates through proactive engagement",
      "Consistent, polite, and brand-aligned customer experiences across every channel",
    ],
    verifiedIntegrations: [
      "WhatsApp Business Cloud API",
      "Website Embeddable Script & React SDK",
      "HubSpot, Salesforce, and Klyssel One CRM",
      "Google Sheets & Webhook Automations (Zapier, Make, n8n)",
    ],
    deploymentOptions: [
      "Cloud SaaS with Dedicated Vector Knowledge Store",
      "Custom Enterprise Tenant with Private Model Hosting",
    ],
  },
];
