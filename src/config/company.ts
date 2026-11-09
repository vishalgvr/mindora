export interface DirectorProfile {
  id: string;
  role: string;
  title: string;
  bioPlaceholder: string;
  focusAreas: string[];
}

export interface CompanyConfig {
  name: string;
  brandName: string;
  tagline: string;
  heroHeadline: string;
  heroDescription: string;
  location: {
    country: string;
    region: string;
    registeredOfficePlaceholder: string;
  };
  structure: {
    type: string;
    directorsCount: number;
    directors: DirectorProfile[];
  };
  contact: {
    email: string;
    phone: string;
    whatsappNumber: string;
    whatsappPrefillMessage: string;
    supportEmail: string;
    consultationHours: string;
  };
  partner: {
    name: string;
    role: string;
    website: string;
    servicesUrl: string;
    productsUrl: string;
    relationshipDisclaimer: string;
    partnershipStatusBadge: string;
  };
  markets: string[];
  targetAudience: string[];
  values: {
    title: string;
    description: string;
  }[];
}

export const COMPANY_CONFIG: CompanyConfig = {
  name: "Mindora",
  brandName: "Mindora Digital Solutions",
  tagline: "Smart Technology. Natural Growth.",
  heroHeadline: "Smart Technology. Natural Growth.",
  heroDescription:
    "Empowering businesses with intelligent technology, innovative digital solutions, and software designed to simplify operations and accelerate growth.",
  location: {
    country: "Mauritius",
    region: "Indian Ocean & International",
    registeredOfficePlaceholder:
      "Registered Office: Ebène / Port Louis, Mauritius (Official company registration details to be inserted upon formal gazetting)",
  },
  structure: {
    type: "Private Company with Two Directors",
    directorsCount: 2,
    directors: [
      {
        id: "dir-01",
        role: "Director 01",
        title: "Executive Director & Technology Solutions Lead",
        bioPlaceholder:
          "Responsible for strategic direction, client technology consultation, and partnership coordination for Mauritius and international markets.",
        focusAreas: ["Enterprise Technology", "Client Solutions", "Strategic Growth"],
      },
      {
        id: "dir-02",
        role: "Director 02",
        title: "Executive Director & Operations Lead",
        bioPlaceholder:
          "Oversees corporate governance, client service delivery operations, business development, and market expansion across regional territories.",
        focusAreas: ["Operations Management", "Regional Expansion", "Client Governance"],
      },
    ],
  },
  contact: {
    email: "contact@mindora.mu",
    phone: "+230 5000 0000 (Configurable Line)",
    whatsappNumber: "23050000000",
    whatsappPrefillMessage:
      "Hello Mindora, I am interested in your digital solutions. I would like to know more about your services and products.",
    supportEmail: "support@mindora.mu",
    consultationHours: "Monday – Friday: 09:00 – 18:00 (MUT / GMT+4)",
  },
  partner: {
    name: "Klyssel Labs",
    role: "Technology Partner & Software Solutions Provider",
    website: "https://klyssel.com",
    servicesUrl: "https://klyssel.com/services",
    productsUrl: "https://klyssel.com/products",
    relationshipDisclaimer:
      "Mindora works with businesses in Mauritius and international markets, providing access to professional technology services and digital products through its technology partnership and authorized reseller arrangements with Klyssel Labs. Mindora is an independent brand; all partner software products remain the proprietary intellectual property of Klyssel Labs.",
    partnershipStatusBadge: "Technology Ecosystem & Reseller Partner",
  },
  markets: [
    "Mauritius",
    "Reunion Island",
    "Seychelles",
    "South Africa",
    "India",
    "International Businesses",
  ],
  targetAudience: [
    "Small and Medium-Sized Businesses",
    "High-Growth Startups",
    "Hotels and Luxury Resorts",
    "Healthcare & Medical Businesses",
    "Retail & E-commerce Companies",
    "Restaurants & Hospitality Venues",
    "Educational Institutions",
    "Professional Service Providers",
    "Growing Enterprises",
  ],
  values: [
    {
      title: "Innovation",
      description:
        "Applying modern AI and software engineering that solve concrete business challenges rather than pursuing hype.",
    },
    {
      title: "Transparency",
      description:
        "Clear communication on technical architecture, delivery mechanisms, reseller arrangements, and project timelines.",
    },
    {
      title: "Trust",
      description:
        "Long-term client relationships built on data privacy, ethical consulting, and dependable ongoing support.",
    },
    {
      title: "Customer Focus",
      description:
        "Every digital recommendation is engineered around your commercial objectives and local market dynamics.",
    },
    {
      title: "Practical Solutions",
      description:
        "Technology that integrates smoothly with current workflows and delivers measurable return on investment.",
    },
    {
      title: "Continuous Improvement",
      description:
        "Ongoing optimization, system maintenance, and iterative enhancement as your organization expands.",
    },
  ],
};
