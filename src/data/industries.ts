export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  keyChallenges: string[];
  tailoredSolutions: string[];
  recommendedProducts: string[];
  iconName: string;
  imageUrl: string;
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "hospitality-tourism",
    slug: "hospitality-tourism",
    title: "Hospitality & Tourism",
    subtitle: "Resorts, Hotels, Tour Operators & Villa Collections",
    description:
      "Mauritius and the Indian Ocean region host some of the world’s most prestigious luxury resorts. We help hospitality brands automate guest communication, coordinate booking channels, and deliver personalized digital concierge services.",
    keyChallenges: [
      "High volume of repetitive guest inquiries across WhatsApp and email",
      "Manual room and excursion booking coordination causing delays",
      "Language barriers with international tourists from Europe, India, and Asia",
      "Difficulty managing guest preference profiles across repeat stays",
    ],
    tailoredSolutions: [
      "24/7 Multilingual AI Concierge (English, French, Creole, German, etc.)",
      "Integrated direct booking and guest inquiry capture",
      "Unified operational dashboards for housekeeping and maintenance staff",
      "Automated guest feedback and TripAdvisor review acceleration",
    ],
    recommendedProducts: ["Klyx Chatbot v2.4 AI", "Custom Mobile Concierge", "Klyssel One"],
    iconName: "Palmtree",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "healthcare-wellness",
    slug: "healthcare-wellness",
    title: "Healthcare & Wellness",
    subtitle: "Clinics, Diagnostic Labs, Pharmacies & Wellness Centers",
    description:
      "Secure digital health solutions that streamline patient appointments, automate document intake, and protect sensitive medical data under strict regional privacy guidelines.",
    keyChallenges: [
      "Missed appointments and telephone line congestion during peak morning hours",
      "Manual patient intake paperwork causing lobby queues and data errors",
      "Strict data protection compliance (Mauritius Data Protection Act & GDPR)",
      "Fragmented lab test notification workflows",
    ],
    tailoredSolutions: [
      "Automated appointment scheduling via WhatsApp and Web",
      "Secure, encrypted digital patient intake and Document AI parsing",
      "Automated SMS/WhatsApp lab report readiness notifications",
      "Teleconsultation portals and physician schedule management",
    ],
    recommendedProducts: ["Klyx Chatbot v2.4 AI", "Custom Software Development", "Document AI"],
    iconName: "HeartPulse",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "retail-ecommerce",
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    subtitle: "Merchants, Supermarket Chains, Fashion & Online Brands",
    description:
      "Connect brick-and-mortar storefronts with frictionless omnichannel e-commerce, real-time stock sync, and localized payment gateways like MCB Juice and credit cards.",
    keyChallenges: [
      "Stock discrepancies between physical shops and online storefronts",
      "High cart abandonment rates due to lack of local payment preferences",
      "Manual stock replenishment calculations leading to stockouts",
      "Slow customer support response during peak promotional sales",
    ],
    tailoredSolutions: [
      "Omnichannel inventory synchronization and multi-warehouse control",
      "Localized checkout with MCB Juice, Blink, Visa, and Mastercard",
      "Automated cart recovery and conversational WhatsApp shopping bots",
      "Predictive restock alerts based on historical sales velocity",
    ],
    recommendedProducts: ["Klyssel One", "Klyssel One Lite", "Custom E-commerce"],
    iconName: "ShoppingBag",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "education",
    slug: "education",
    title: "Education & Academies",
    subtitle: "Private Schools, Universities, Training Institutes & EdTech",
    description:
      "Modernize student administration, online course delivery, and parent communication with intuitive educational portals and automated enrollment workflows.",
    keyChallenges: [
      "Paper-heavy admissions cycles and disorganized applicant records",
      "Fragmented parent-teacher communication across email and informal chats",
      "Manual tuition fee invoicing and payment reconciliation",
      "Lack of centralized performance analytics for curriculum development",
    ],
    tailoredSolutions: [
      "Digital student enrollment and automated Document AI verification",
      "Unified Student Information System (SIS) and Parent Portals",
      "Automated fee collection reminders with online payment links",
      "Interactive Learning Management Systems (LMS) with progress tracking",
    ],
    recommendedProducts: ["Custom Web Application", "Klyx Chatbot v2.4 AI", "Klyssel One Lite"],
    iconName: "GraduationCap",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "finance-professional",
    slug: "finance-professional-services",
    title: "Finance & Professional Services",
    subtitle: "Legal Practices, Accounting Firms, Offshore & Advisory",
    description:
      "Empower professional advisory firms with bank-grade security, automated compliance checklists, client portals, and streamlined billing.",
    keyChallenges: [
      "Cumbersome KYC/AML document verification processes",
      "Billable hours lost to manual calendar management and status updates",
      "Client data confidentiality concerns with generic cloud tools",
      "Complex multi-jurisdictional reporting requirements",
    ],
    tailoredSolutions: [
      "Encrypted client collaboration vaults with granular permission control",
      "Automated KYC document extraction and compliance verification",
      "Automated billing, retainer tracking, and milestone disbursements",
      "Secure executive dashboards for firm-wide performance tracking",
    ],
    recommendedProducts: ["Custom Software Development", "Document AI", "Data Lakehouse"],
    iconName: "Briefcase",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "restaurants-food",
    slug: "restaurants-food-businesses",
    title: "Restaurants & Food Businesses",
    subtitle: "Fine Dining, Cafes, Cloud Kitchens & Multi-Unit Operators",
    description:
      "Delight patrons with smart digital menus, instant WhatsApp table reservations, kitchen display coordination, and automated recipe costing.",
    keyChallenges: [
      "High third-party delivery commission fees cutting into profit margins",
      "Overbooked Friday and Saturday tables while weekday covers lag",
      "Food waste due to inaccurate ingredient procurement estimates",
      "Staff turnover requiring constant re-training on order POS software",
    ],
    tailoredSolutions: [
      "Direct commission-free online ordering and contactless QR menus",
      "Automated WhatsApp table reservation assistant with deposit collection",
      "Recipe cost tracking and automated kitchen inventory deduction",
      "Customer loyalty rewards triggering automated return incentives",
    ],
    recommendedProducts: ["Klyx Chatbot v2.4 AI", "Klyssel One Lite", "Mobile App Development"],
    iconName: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "startups-entrepreneurs",
    slug: "startups-entrepreneurs",
    title: "Startups & Entrepreneurs",
    subtitle: "Venture-Backed Founders, Bootstrappers & Innovators",
    description:
      "Move from concept to scalable MVP in weeks, not quarters. We architect production-ready software, launch investor-ready UI/UX, and advise on tech stacks.",
    keyChallenges: [
      "Limited runway requiring high-speed execution without technical debt",
      "Finding dependable senior engineers in the Indian Ocean region",
      "Balancing feature scope with time-to-market priorities",
      "Establishing investor credibility with enterprise-grade UI/UX",
    ],
    tailoredSolutions: [
      "Rapid MVP development with modern modular React/Node stacks",
      "World-class UI/UX design systems and interactive pitch prototypes",
      "Fractional CTO advisory and solution architecture guidance",
      "Scalable cloud deployment on Google Cloud or AWS with CI/CD",
    ],
    recommendedProducts: ["Klyssel One Lite", "Custom Software Development", "UI/UX Design"],
    iconName: "Rocket",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "corporate-enterprises",
    slug: "corporate-enterprises",
    title: "Corporate Enterprises",
    subtitle: "Conglomerates, Parastatals & Regional Holding Groups",
    description:
      "Large-scale system integration, enterprise data lakehouses, robotic process automation, and technology ecosystem upgrades designed for longevity.",
    keyChallenges: [
      "Entrenched legacy mainframe software with zero API documentation",
      "Data locked in isolated business unit silos preventing enterprise visibility",
      "Complex organizational hierarchies requiring strict access governance",
      "Lengthy procurement and compliance review procedures",
    ],
    tailoredSolutions: [
      "Enterprise software integration and modernization roadmaps",
      "Enterprise Data Lakehouse & Apache Spark analytics pipelines",
      "Multi-tenant ERP/HRMS consolidation via Klyssel One",
      "Independent cybersecurity audits and compliance code reviews",
    ],
    recommendedProducts: ["Klyssel One", "Data Engineering Services", "Technology Consulting"],
    iconName: "Building2",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
  },
];
