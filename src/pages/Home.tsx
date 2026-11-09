import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  Users,
  Compass,
  Headphones,
  Workflow,
  Search,
  Sliders,
  LifeBuoy,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { ServiceCard } from '../components/ServiceCard';
import { ProductCard } from '../components/ProductCard';
import { IndustryCard } from '../components/IndustryCard';
import { TechnologyPartnerSection } from '../components/TechnologyPartnerSection';
import { CTASection } from '../components/CTASection';
import { SERVICES_DATA } from '../data/services';
import { PRODUCTS_DATA } from '../data/products';
import { INDUSTRIES_DATA } from '../data/industries';

export const Home: React.FC = () => {
  return (
    <div className="w-100">
      <SEO
        title="Mindora Digital Solutions | Smart Technology. Natural Growth. — Mauritius"
        description="Mauritius-based digital solutions company connecting growing businesses with AI development, custom software, business automation, and enterprise digital products."
        canonicalPath="/"
      />

      {/* SECTION 1: HERO */}
      <Hero />

      {/* SECTION 2: INTRODUCTION */}
      <section className="py-5 bg-surface border-top border-bottom border-custom">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              ABOUT MINDORA
            </span>
            <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
              Technology That Moves Your Business Forward.
            </h2>
            <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
              Mindora connects businesses with modern digital technologies, software solutions, and
              expert services. We simplify the process of finding, implementing, and managing the
              right technology for your business.
            </p>
          </div>

          {/* Three Core Principles */}
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card card-growvia h-100 p-4 p-lg-5 bg-cream-main shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center mb-4 shadow-sm"
                  style={{ width: '48px', height: '48px' }}
                >
                  <Zap size={22} />
                </div>
                <h3 className="h5 fw-bold text-forest-dark mb-2">Smart Solutions</h3>
                <p className="text-body-custom text-opacity-80 fs-7 mb-0" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Applied AI automation and custom software designed around your real operational
                  challenges, eliminating bottlenecks without unnecessary bloat.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card card-growvia h-100 p-4 p-lg-5 bg-cream-main shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center mb-4 shadow-sm"
                  style={{ width: '48px', height: '48px' }}
                >
                  <ShieldCheck size={22} />
                </div>
                <h3 className="h5 fw-bold text-forest-dark mb-2">Reliable Technology</h3>
                <p className="text-body-custom text-opacity-80 fs-7 mb-0" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Enterprise-grade security, tested software architectures, and verified software
                  products backed by transparent service level guarantees.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card card-growvia h-100 p-4 p-lg-5 bg-cream-main shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center mb-4 shadow-sm"
                  style={{ width: '48px', height: '48px' }}
                >
                  <Target size={22} />
                </div>
                <h3 className="h5 fw-bold text-forest-dark mb-2">Sustainable Business Growth</h3>
                <p className="text-body-custom text-opacity-80 fs-7 mb-0" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Scalable digital assets that grow with your company, empowering leadership to
                  expand confidently across local and international markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: MAIN SERVICES */}
      <section className="py-5 bg-cream-main">
        <div className="container py-lg-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="text-uppercase text-forest fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                COMPREHENSIVE CAPABILITIES
              </span>
              <h2 className="display-6 fw-extrabold text-forest-dark mb-0">
                Explore Our Digital Services
              </h2>
            </div>
            <p className="text-body-custom text-opacity-80 mb-0" style={{ maxWidth: '420px', fontSize: '0.875rem' }}>
              From intelligent automation to custom software development, discover solutions
              designed around your business goals.
            </p>
          </div>

          {/* 8 Main Service Categories Grid */}
          <div className="row g-4">
            {SERVICES_DATA.map((service, index) => (
              <div key={service.id} className="col-12 col-md-6 col-lg-3">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link
              to="/services"
              className="btn btn-forest d-inline-flex align-items-center gap-2"
            >
              <span>View All 8 Service Disciplines & Deliverables</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PRODUCTS */}
      <section className="py-5 bg-surface border-top border-bottom border-custom">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              ENTERPRISE & ACCELERATOR PLATFORMS
            </span>
            <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
              Powerful Digital Products for Modern Businesses
            </h2>
            <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
              Discover ready-made, battle-tested software suites available through Mindora's
              authorized reseller and technology partner arrangements with Klyssel Labs.
            </p>
          </div>

          {/* Three Featured Products */}
          <div className="row g-4">
            {PRODUCTS_DATA.map((product, idx) => (
              <div key={product.id} className="col-12 col-lg-4">
                <ProductCard product={product} featured={idx === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE MINDORA? */}
      <section className="py-5 bg-cream-main">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <span className="text-uppercase text-forest fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              THE MINDORA ADVANTAGE
            </span>
            <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
              Your Partner in Digital Transformation
            </h2>
            <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
              We focus on understanding your business challenges and connecting you with the right
              digital solutions to achieve practical results.
            </p>
          </div>

          {/* 6 Feature Cards */}
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '45px', height: '45px' }}
                >
                  <Sliders size={22} />
                </div>
                <h3 className="h6 fw-bold text-forest-dark mb-2">Tailored Technology Solutions</h3>
                <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  No rigid cookie-cutter templates. Every system is scoped and calibrated to solve
                  your explicit commercial bottlenecks.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '45px', height: '45px' }}
                >
                  <Sparkles size={22} />
                </div>
                <h3 className="h6 fw-bold text-forest-dark mb-2">Access to Advanced Digital Products</h3>
                <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Immediate access to flagship platforms including Klyssel One ERP/CRM and Klyx
                  Chatbot AI with authorized deployment support.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '45px', height: '45px' }}
                >
                  <Users size={22} />
                </div>
                <h3 className="h6 fw-bold text-forest-dark mb-2">Professional Technical Expertise</h3>
                <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Seasoned solution architects and developers adhering to rigorous software
                  engineering, security, and data protection standards.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '45px', height: '45px' }}
                >
                  <Target size={22} />
                </div>
                <h3 className="h6 fw-bold text-forest-dark mb-2">Business-Focused Approach</h3>
                <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  We speak the language of commercial return, operational efficiency, and customer
                  retention rather than superficial technology jargon.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '45px', height: '45px' }}
                >
                  <Compass size={22} />
                </div>
                <h3 className="h6 fw-bold text-forest-dark mb-2">Flexible Engagement Models</h3>
                <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  From turnkey software product rollout to dedicated engineering squads and advisory
                  retainers tailored to your stage of maturity.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                <div
                  className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '45px', height: '45px' }}
                >
                  <Headphones size={22} />
                </div>
                <h3 className="h6 fw-bold text-forest-dark mb-2">Ongoing Client Support</h3>
                <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Dedicated regional contact and continuous maintenance ensure your systems remain
                  fast, secure, and aligned with market changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: INDUSTRIES WE SERVE */}
      <section className="py-5 bg-surface border-top border-bottom border-custom">
        <div className="container py-lg-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                VERTICAL SPECIALIZATION
              </span>
              <h2 className="display-6 fw-extrabold text-forest-dark mb-0">
                Industries We Serve
              </h2>
            </div>
            <p className="text-body-custom text-opacity-80 mb-0" style={{ maxWidth: '420px', fontSize: '0.875rem' }}>
              Tailored digital solutions engineered for the specific commercial realities of
              Mauritius, the Indian Ocean, and international markets.
            </p>
          </div>

          <div className="row g-4">
            {INDUSTRIES_DATA.map((industry) => (
              <div key={industry.id} className="col-12 col-sm-6 col-lg-3">
                <IndustryCard industry={industry} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW WE WORK */}
      <section className="py-5 bg-cream-main">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <span className="text-uppercase text-forest fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              STRUCTURED ENGAGEMENT
            </span>
            <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
              From Business Challenges to Digital Solutions
            </h2>
            <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
              Our transparent four-phase delivery methodology keeps your leadership in complete
              control from initial requirements through ongoing operations.
            </p>
          </div>

          {/* 4-Step Grid */}
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-forest text-opacity-25 fs-3 d-block mb-2">01</span>
                  <div
                    className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <Search size={20} />
                  </div>
                  <h3 className="h6 fw-bold text-forest-dark mb-2">Discover</h3>
                  <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    Understand your business needs, goals, and challenges through an in-depth
                    technical and operational consultation.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 1 • Requirements Scoping
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-forest text-opacity-25 fs-3 d-block mb-2">02</span>
                  <div
                    className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <Workflow size={20} />
                  </div>
                  <h3 className="h6 fw-bold text-forest-dark mb-2">Recommend</h3>
                  <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    Identify the most suitable digital services or products—comparing custom builds
                    against proven ecosystem platforms like Klyssel One.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 2 • Architecture & Proposal
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-forest text-opacity-25 fs-3 d-block mb-2">03</span>
                  <div
                    className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <Sliders size={20} />
                  </div>
                  <h3 className="h6 fw-bold text-forest-dark mb-2">Implement</h3>
                  <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    Coordinate the solution, setup, customization, and deployment with the relevant
                    technology team and authorized specialists.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 3 • Deployment & QA
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-soft-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-forest text-opacity-25 fs-3 d-block mb-2">04</span>
                  <div
                    className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <LifeBuoy size={20} />
                  </div>
                  <h3 className="h6 fw-bold text-forest-dark mb-2">Support</h3>
                  <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    Provide client communication, assistance, and ongoing coordination according to the
                    agreed service scope and SLA commitments.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 4 • Long-Term Partnership
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TECHNOLOGY PARTNERSHIP */}
      <TechnologyPartnerSection />

      {/* SECTION 9: FINAL CTA */}
      <CTASection
        headline="Let's Build Something That Moves Your Business Forward."
        description="Tell us about your business goals. Our team will help you explore the right digital solutions."
      />
    </div>
  );
};
