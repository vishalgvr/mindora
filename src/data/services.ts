export interface SubService {
  name: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  businessValue: string;
  iconName: string;
  subServices: SubService[];
  deliverables: string[];
  deliveryModelNotice: string;
  recommendedFor: string[];
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "ai-automation",
    slug: "ai-development-automation",
    number: "01",
    title: "AI Development & Automation",
    shortDescription:
      "Transform operational bottlenecks into autonomous workflows using cutting-edge generative AI, tailored LLMs, and intelligent document processing.",
    businessValue:
      "Drastically reduce repetitive manual hours, eliminate human data entry errors, and deliver instant 24/7 intelligent responsiveness across customer communication and back-office pipelines.",
    iconName: "Bot",
    subServices: [
      {
        name: "AI Chatbot Development",
        description:
          "Domain-specific conversational assistants trained on enterprise knowledge bases to handle customer questions, bookings, and support tickets automatically.",
      },
      {
        name: "LLM Integration & AI Development",
        description:
          "Seamless integration of state-of-the-art Large Language Models (OpenAI, Gemini, Claude, and local open-source models) into proprietary software.",
      },
      {
        name: "AI Automation Services",
        description:
          "End-to-end robotic process automation combined with cognitive decision-making to automate complex multi-app workflows.",
      },
      {
        name: "Document AI Solutions",
        description:
          "Automated ingestion, OCR, parsing, and categorization of invoices, contracts, receipts, identity documents, and compliance records.",
      },
      {
        name: "Computer Vision Solutions",
        description:
          "Visual inspection, object detection, facial verification, and automated image/video tagging for hospitality, security, and retail.",
      },
      {
        name: "Voice AI Development",
        description:
          "Speech-to-text, natural voice synthesis, and interactive voice response (IVR) assistants tailored for call centres and customer helplines.",
      },
      {
        name: "AI Agent Development",
        description:
          "Multi-agent autonomous systems that execute research, orchestrate tool calls, verify task completion, and report actionable outcomes.",
      },
    ],
    deliverables: [
      "Custom conversational AI model or agent orchestration",
      "API integrations with existing CRM, ERP, and messaging channels",
      "Zero-hallucination vector database setup & retrieval pipeline (RAG)",
      "Admin monitoring dashboard with performance and token metrics",
      "Staff handover, prompt engineering playbook, and SLA maintenance",
    ],
    deliveryModelNotice:
      "Delivered in partnership with specialized engineering teams and technology partners (including Klyssel Labs ecosystem). Exact delivery and support arrangement clarified during your technical discovery call.",
    recommendedFor: ["Customer Support", "Hospitality Venues", "Legal & Accounting", "Healthcare Clinics"],
  },
  {
    id: "data-analytics",
    slug: "data-analytics-bi",
    number: "02",
    title: "Data Analytics & Business Intelligence",
    shortDescription:
      "Convert fragmented commercial records into interactive executive dashboards, predictive trends, and clear decision intelligence.",
    businessValue:
      "Replace guesswork with empirical clarity. Uncover hidden operational leaks, anticipate customer demand shifts, and empower leadership with real-time KPI visibility.",
    iconName: "BarChart3",
    subServices: [
      {
        name: "Business Intelligence Services",
        description:
          "Centralized data modeling and BI infrastructure connecting sales, inventory, finance, and marketing data sources.",
      },
      {
        name: "Data Analytics Services",
        description:
          "Exploratory and diagnostic analysis to uncover historical performance root causes and efficiency bottlenecks.",
      },
      {
        name: "Predictive Analytics",
        description:
          "Statistical modeling and time-series forecasting for revenue, inventory restock cycles, customer churn, and seasonal demand.",
      },
      {
        name: "Customer Analytics",
        description:
          "Cohort retention, lifetime value (LTV) calculation, segmentation matrices, and behavioral funnel optimization.",
      },
      {
        name: "Machine Learning Development",
        description:
          "Custom algorithmic models for classification, anomaly detection, scoring, and automated recommendation engines.",
      },
      {
        name: "Executive Dashboards & KPI Reporting",
        description:
          "Tailored visual cockpits built in Power BI, Tableau, Looker, or custom React interfaces with automated scheduled briefings.",
      },
      {
        name: "Cloud Data Analytics",
        description:
          "Scalable cloud data warehousing on BigQuery, Snowflake, and AWS Redshift with optimized query performance and security.",
      },
    ],
    deliverables: [
      "Unified executive BI dashboard suite with mobile responsiveness",
      "Automated weekly/monthly KPI reporting pipelines",
      "Clean semantic data dictionary and data transformation schemas",
      "Predictive modeling forecasts with documented accuracy tolerances",
      "User permission matrix and executive training sessions",
    ],
    deliveryModelNotice:
      "Delivered through our data architecture consultants with technical execution supported by ecosystem engineering specialists.",
    recommendedFor: ["Retail & E-commerce", "Hotels & Resorts", "Financial Institutions", "Corporate Enterprises"],
  },
  {
    id: "custom-software",
    slug: "custom-software-development",
    number: "03",
    title: "Custom Software Development",
    shortDescription:
      "Tailor-made web applications, enterprise platforms, and scalable digital systems built precisely around your proprietary business workflows.",
    businessValue:
      "Eliminate restrictive per-seat SaaS costs and clunky workarounds. Own a tailored digital asset that scales smoothly, enforces compliance, and sharpens your competitive advantage.",
    iconName: "Code2",
    subServices: [
      {
        name: "Custom Software Development",
        description:
          "Bespoke software engineered to solve exact operational bottlenecks that off-the-shelf software cannot address.",
      },
      {
        name: "SaaS Development",
        description:
          "Multi-tenant cloud applications featuring subscription billing, role-based access control, high availability, and self-service onboarding.",
      },
      {
        name: "Enterprise Software Development",
        description:
          "Robust internal management systems, ERP extensions, supply chain monitors, and intranet portals engineered for high concurrent usage.",
      },
      {
        name: "Web Application Development",
        description:
          "Fast, modern, reactive single-page applications and progressive web apps crafted with React, Next.js, Node.js, and Python.",
      },
      {
        name: "Corporate Website Development",
        description:
          "High-converting, SEO-optimized, multilingual digital showcases presenting your enterprise brand with international sophistication.",
      },
      {
        name: "E-commerce Development",
        description:
          "Custom online stores, marketplace architectures, payment gateway integrations (local MUR cards, MCB Juice, Stripe, PayPal), and inventory sync.",
      },
      {
        name: "API Development & Integration",
        description:
          "RESTful and GraphQL APIs connecting legacy platforms, third-party services, banking interfaces, and partner software.",
      },
    ],
    deliverables: [
      "Complete source code repository with documented architecture",
      "Production deployment on cloud infrastructure (AWS, Google Cloud, Azure)",
      "Automated CI/CD pipeline and automated security testing",
      "Interactive staging environment and client acceptance documentation",
      "Comprehensive API documentation and developer handbook",
    ],
    deliveryModelNotice:
      "Architected and managed by Mindora's digital solutions leads; engineering executed via vetted technology ecosystem and authorized development partner teams.",
    recommendedFor: ["Growing Enterprises", "SaaS Startups", "Logistics & Distribution", "Professional Firms"],
  },
  {
    id: "mobile-development",
    slug: "mobile-app-development",
    number: "04",
    title: "Mobile App Development",
    shortDescription:
      "Fluid, responsive native and cross-platform mobile apps for iOS and Android that delight end-users and streamline field operations.",
    businessValue:
      "Engage your customers directly in their pockets, drive higher retention via push notifications, and empower on-the-ground staff with real-time mobile capabilities.",
    iconName: "Smartphone",
    subServices: [
      {
        name: "Flutter App Development",
        description:
          "High-performance cross-platform applications with native 60fps animations, single codebase efficiency, and rapid deployment.",
      },
      {
        name: "iOS App Development",
        description:
          "Swift and SwiftUI native apps crafted to meet Apple’s stringent Human Interface Guidelines and hardware integrations.",
      },
      {
        name: "Android App Development",
        description:
          "Modern Kotlin native applications optimized across thousands of Android device form factors, tablets, and POS devices.",
      },
      {
        name: "Cross-Platform App Development",
        description:
          "Cost-effective React Native and Flutter builds enabling parallel launch across the Apple App Store and Google Play Store.",
      },
      {
        name: "Mobile Backend Development",
        description:
          "Scalable cloud backends, real-time WebSockets, push notification microservices, and offline sync architectures.",
      },
    ],
    deliverables: [
      "Compiled iOS and Android production application bundles",
      "App Store & Google Play Store submission and approval management",
      "Cloud backend infrastructure and admin moderation panel",
      "Analytics and crash-reporting integration (Firebase, Sentry)",
      "Ongoing maintenance package for OS updates and security patches",
    ],
    deliveryModelNotice:
      "Coordinated by Mindora with specialized mobile engineering partners ensuring store compliance and hardware optimization.",
    recommendedFor: ["Hotels & Concierge Apps", "Food Delivery & Restaurants", "Healthcare Patient Portals", "Retail Loyalty"],
  },
  {
    id: "data-engineering",
    slug: "data-engineering-services",
    number: "05",
    title: "Data Engineering Services",
    shortDescription:
      "Resilient data pipelines, lakehouses, and governance frameworks that transform messy operational data into clean, compliant pipelines.",
    businessValue:
      "Prevent data silos, eradicate broken synchronization between systems, and build the dependable foundation required for machine learning and real-time business intelligence.",
    iconName: "Database",
    subServices: [
      {
        name: "Modern Data Engineering",
        description:
          "Scalable data ingestion architectures handling structured and semi-structured payloads with minimal latency.",
      },
      {
        name: "Data Lakehouse Solutions",
        description:
          "Unified lakehouse storage architectures (Delta Lake, Apache Iceberg) balancing data warehouse governance with data lake agility.",
      },
      {
        name: "ETL & Data Pipeline Development",
        description:
          "Automated pipelines using Airflow, dbt, and Kafka to extract, cleanse, enrich, and deliver enterprise data securely.",
      },
      {
        name: "Apache Spark Development",
        description:
          "Distributed data processing workflows capable of crunching multi-gigabyte and multi-terabyte transactional logs effortlessly.",
      },
      {
        name: "Data Governance & Data Quality",
        description:
          "Automated schema validation, duplicate detection, audit trails, and compliance adherence with the Mauritius Data Protection Act and GDPR.",
      },
    ],
    deliverables: [
      "Robust automated ETL/ELT pipelines with alerting and failover",
      "Centralized cloud data lakehouse repository with access controls",
      "Data lineage documentation and data quality verification tests",
      "Data compliance mapping and anonymization routines",
      "Infrastructure-as-Code scripts for repeatable cloud deployment",
    ],
    deliveryModelNotice:
      "Delivered in coordination with cloud data infrastructure engineers and authorized technical specialists.",
    recommendedFor: ["Financial Services", "Retail Chains", "Telecom & ISP", "Government & Parastatal Agencies"],
  },
  {
    id: "digital-marketing",
    slug: "digital-marketing-ai-seo",
    number: "06",
    title: "Digital Marketing & AI SEO",
    shortDescription:
      "Strategic search optimization, Generative Engine Optimization (GEO), performance paid advertising, and conversion-focused growth marketing.",
    businessValue:
      "Capture high-intent buyers in Mauritius and international markets when they search on Google, ChatGPT, Perplexity, and social channels, maximizing qualified sales leads.",
    iconName: "TrendingUp",
    subServices: [
      {
        name: "AI SEO, GEO & AEO Services",
        description:
          "Next-generation search optimization ranking your brand both in traditional Google search and modern AI answer engines (ChatGPT, Copilot, Perplexity).",
      },
      {
        name: "PPC & Paid Search Advertising",
        description:
          "High-ROI Google Ads, Meta Ads, and LinkedIn campaign management targeting specific industries, regions, and executive titles.",
      },
      {
        name: "Content Marketing & AI Content",
        description:
          "Authoritative, technically rigorous industry articles, whitepapers, and guides written for executive audiences and search algorithms.",
      },
      {
        name: "Social Media Marketing",
        description:
          "Corporate B2B brand presence and high-engagement social strategies for LinkedIn, Instagram, and regional platforms.",
      },
      {
        name: "Conversion Rate Optimization (CRO)",
        description:
          "Heatmap analysis, user session recordings, and A/B testing designed to systematically increase the percentage of visitors who enquire.",
      },
      {
        name: "Marketing Analytics & GA4",
        description:
          "Accurate Google Analytics 4 tracking, server-side tagging, UTM campaign attribution, and executive ROI dashboards.",
      },
    ],
    deliverables: [
      "Comprehensive technical SEO and GEO audit with prioritized action plan",
      "Keyword & AI search query mapping for Mauritius and export markets",
      "Configured Google Ads / Meta Ads accounts with conversion tracking",
      "High-converting landing page layouts and copywriting guidelines",
      "Monthly transparent performance reports detailing leads generated",
    ],
    deliveryModelNotice:
      "Managed directly by Mindora's digital growth strategists with creative and content asset production.",
    recommendedFor: ["Real Estate & Luxury Resorts", "Professional Services", "E-commerce Brands", "B2B Software"],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design-services",
    number: "07",
    title: "UI/UX Design Services",
    shortDescription:
      "Human-centred product design, intuitive interface systems, and rigorous usability research that turn complex software into effortless experiences.",
    businessValue:
      "Eliminate customer frustration, reduce customer onboarding drop-offs, and elevate your brand perception to world-class international standards.",
    iconName: "Palette",
    subServices: [
      {
        name: "UI Design & Design Systems",
        description:
          "Pixel-perfect interface components, cohesive typography scales, micro-interactions, and reusable Figma design token libraries.",
      },
      {
        name: "UX Research & Usability Testing",
        description:
          "In-depth customer interviews, task completion analysis, heatmapping, and empirical testing to identify points of friction.",
      },
      {
        name: "Product Design",
        description:
          "End-to-end digital product design from initial napkin sketch to interactive high-fidelity user workflows and developer handoff.",
      },
      {
        name: "Wireframing & UX Architecture",
        description:
          "Information architecture, user journey maps, screen hierarchy, and low-fidelity prototypes establishing flawless app logic.",
      },
      {
        name: "UI/UX Prototyping",
        description:
          "Interactive clickable prototypes replicating real app transitions for stakeholder presentations, investor pitches, and user testing.",
      },
    ],
    deliverables: [
      "Full Figma design system with components, variants, and auto-layout",
      "High-fidelity clickable prototypes for desktop, tablet, and mobile",
      "User research synthesis report with actionable recommendations",
      "Developer-ready design tokens and asset export packages",
      "Accessibility audit (WCAG 2.1 AA compliance standards)",
    ],
    deliveryModelNotice:
      "Delivered by Mindora's digital design leads with collaborative client workshops and prototype iteration cycles.",
    recommendedFor: ["Fintech Platforms", "SaaS Applications", "Enterprise Portals", "E-commerce Redesigns"],
  },
  {
    id: "tech-consulting",
    slug: "technology-consulting-services",
    number: "08",
    title: "Technology Consulting Services",
    shortDescription:
      "Pragmatic digital transformation roadmaps, software architecture reviews, and cybersecurity code audits tailored to your commercial reality.",
    businessValue:
      "Avoid costly technology missteps, vendor lock-in, and fragile architectures. Invest capital with certainty, knowing your digital infrastructure is secure and future-proof.",
    iconName: "ShieldCheck",
    subServices: [
      {
        name: "AI Consulting & Strategy",
        description:
          "Evaluating enterprise feasibility, compliance implications, ROI calculations, and practical deployment roadmaps for AI solutions.",
      },
      {
        name: "Digital Transformation Consulting",
        description:
          "Phased modernizations guiding traditional businesses from paper and fragmented spreadsheets to connected digital ecosystems.",
      },
      {
        name: "Software & Solution Architecture",
        description:
          "Independent review of software blueprints, database models, microservices vs monolith tradeoffs, and cloud provider selections.",
      },
      {
        name: "Software Security & Code Audits",
        description:
          "Static and dynamic code analysis, vulnerability assessments, OWASP compliance verification, and third-party library risk reviews.",
      },
    ],
    deliverables: [
      "Executive digital transformation strategy blueprint",
      "Vendor and technology evaluation matrix with ROI scoring",
      "System architecture diagram and risk mitigation protocol",
      "Security audit report with categorized vulnerability remediation steps",
      "Quarterly advisory sessions with senior technology consultants",
    ],
    deliveryModelNotice:
      "Led by Mindora's executive directors and senior technology advisors with independent analysis and partner ecosystem support.",
    recommendedFor: ["C-Suite Executives", "Board Members", "Companies Modernizing Legacy Systems", "Startups Seeking Investment"],
  },
];
