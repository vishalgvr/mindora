export interface NavItem {
  name: string;
  href: string;
  description?: string;
  hasDropdown?: boolean;
  children?: {
    name: string;
    href: string;
    description: string;
    tag?: string;
  }[];
}

export const MAIN_NAV: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/services",
    hasDropdown: true,
    children: [
      {
        name: "AI Development & Automation",
        href: "/services#ai-automation",
        description: "Intelligent chatbots, LLM integration, and autonomous business workflows.",
        tag: "High Demand",
      },
      {
        name: "Data Analytics & BI",
        href: "/services#data-analytics",
        description: "Interactive executive dashboards, KPI modeling, and predictive analytics.",
      },
      {
        name: "Custom Software Development",
        href: "/services#custom-software",
        description: "Bespoke web apps, SaaS platforms, and enterprise business systems.",
      },
      {
        name: "Mobile App Development",
        href: "/services#mobile-development",
        description: "Flutter, iOS, and Android mobile applications for field and customer use.",
      },
      {
        name: "Data Engineering Services",
        href: "/services#data-engineering",
        description: "Resilient data pipelines, ETL architectures, and data lakehouse solutions.",
      },
      {
        name: "Digital Marketing & AI SEO",
        href: "/services#digital-marketing",
        description: "GEO, AI-assisted search optimization, PPC ads, and GA4 tracking.",
      },
      {
        name: "UI/UX Design Services",
        href: "/services#ui-ux-design",
        description: "Design systems, clickable prototypes, and usability testing.",
      },
      {
        name: "Technology Consulting",
        href: "/services#tech-consulting",
        description: "Digital transformation roadmaps, tech audits, and security reviews.",
      },
    ],
  },
  {
    name: "Products",
    href: "/products",
    hasDropdown: true,
    children: [
      {
        name: "Klyssel One",
        href: "/products#klyssel-one",
        description: "Flagship all-in-one ERP, CRM, HRMS, and operations platform.",
        tag: "Enterprise",
      },
      {
        name: "Klyssel One Lite",
        href: "/products#klyssel-one-lite",
        description: "Streamlined business management platform designed for growing SMEs.",
        tag: "Growth",
      },
      {
        name: "Klyx Chatbot v2.4 AI",
        href: "/products#klyx-chatbot",
        description: "Intelligent, multi-channel AI customer assistant with zero hallucination.",
        tag: "AI Solution",
      },
    ],
  },
  { name: "Industries", href: "/industries" },
  { name: "About Us", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];
