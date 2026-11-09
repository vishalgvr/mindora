# GROWVIA — Premium Digital Solutions Platform

> **Smart Technology. Natural Growth.**  
> Independent Digital Solutions Company based in Mauritius, operating in partnership with the Klyssel Labs technology ecosystem.

---

## 1. Architectural Overview

Growvia's digital platform is a modern, responsive, high-performance web application built entirely on the frontend with:
- **UI Framework**: **Bootstrap 5** with custom brand styling & responsive grid layouts
- **Core Stack**: React 18, TypeScript, Vite, and Lucide Icons
- **Backend Requirement**: **None**. The platform operates 100% independently on the client side with instant enquiry generation, localStorage persistence, and 1-click WhatsApp & corporate email dispatch.
- **Brand Palette**:
  - Primary Forest Green: `#265541`
  - Primary Warm Cream: `#FDF2DE`
  - Deep Forest: `#173B2C`
  - Muted Sage: `#9CAF88`
  - Soft Botanical Green: `#D8E2D0`
  - Warm White: `#FFFCF5`
  - Body Text: `#253B32`
  - Subtle Border: `#E5DDCB`

---

## 2. Project Directory Structure

```
growvia/
├── src/                           # Frontend Source
│   ├── assets/logo/               # SVG logo assets
│   ├── components/                # Reusable Bootstrap 5 components
│   │   ├── Navbar.tsx             # Sticky navigation with Services & Products dropdowns
│   │   ├── Footer.tsx             # Footer with ecosystem disclaimers & legal links
│   │   ├── Hero.tsx               # Animated visual composition & hero headlines
│   │   ├── ServiceCard.tsx        # Service category card with capabilities
│   │   ├── ProductCard.tsx        # Ecosystem product card with verified features
│   │   ├── IndustryCard.tsx       # Vertical industry showcases
│   │   ├── CTASection.tsx         # High-converting call to action
│   │   ├── ContactForm.tsx        # Client-side quotation workflow with WhatsApp/email dispatch
│   │   ├── WhatsAppButton.tsx     # Floating WhatsApp button with prefilled message
│   │   ├── Logo.tsx               # Scalable geometric architectural 'G' SVG logo
│   │   └── SEO.tsx                # Dynamic document metadata & canonical tags
│   ├── pages/                     # Full multi-page routes
│   │   ├── Home.tsx               # 10 comprehensive homepage sections
│   │   ├── Services.tsx           # All 8 digital service disciplines
│   │   ├── Products.tsx           # Klyssel One, Klyssel One Lite, Klyx Chatbot AI + Bootstrap Modal
│   │   ├── Industries.tsx         # 8 specialized industry verticals
│   │   ├── About.tsx              # Story, values & two directors governance
│   │   ├── Contact.tsx            # Quotation & enquiry workflow
│   │   ├── Insights.tsx           # Technology blog & executive briefings
│   │   ├── PrivacyPolicy.tsx      # Mauritius DPA 2017 & GDPR compliance
│   │   └── Terms.tsx              # Commercial engagement terms
│   ├── config/company.ts          # Centralized configuration (WhatsApp, phone, email, directors)
│   ├── data/                      # Centralized data files (services, products, industries, insights)
│   ├── styles/index.css           # Bootstrap 5 theme stylesheet & brand palette
│   └── services/api.ts            # Client-side lead service (reference generation & dispatch)
│
├── public/                        # Static assets (Favicon, SVG logos, robots.txt, sitemap.xml)
├── package.json                   # Frontend dependencies & scripts
└── dist/                          # Production compiled bundle
```

---

## 3. How to Run Locally

### Prerequisites
- Node.js (v18+)

### Development Server
```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the Vite development server
npm run dev
```

Visit **`http://localhost:5173/`** to view the live website.

---

## 4. Production Build

To build the static distribution for production:
```bash
npm run build
```

This compiles optimized production assets into `dist/`. You can preview the build with:
```bash
npm run preview
```

---

## 5. Deployment Options

Because this website has **no backend dependencies**, it can be deployed instantly to any static host or web server:
- **Vercel**: Import repository; build command `npm run build`, output directory `dist`.
- **Netlify**: Drag and drop the `dist/` folder, or link git repository.
- **GitHub Pages / Cloudflare Pages**: Connect branch and set publish directory to `dist/`.
- **Apache / Nginx / cPanel**: Upload the contents of `dist/` directly to `public_html`.

---

## 6. Configurable Placeholders

All company contact details, director information, and partnership notices are centralized in:
`src/config/company.ts`

- **WhatsApp Number**: update `COMPANY_CONFIG.contact.whatsappNumber`
- **Email Address**: update `COMPANY_CONFIG.contact.email`
- **Phone Line**: update `COMPANY_CONFIG.contact.phone`
- **Directors**: update `COMPANY_CONFIG.structure.directors`
- **Registered Office**: update `COMPANY_CONFIG.location.registeredOfficePlaceholder`
