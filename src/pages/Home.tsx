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
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              ABOUT MINDORA
            </span>
            <h2 className="display-6 fw-extrabold text-gradient-luxury mb-3">
              Technology That Moves Business Forward.
            </h2>
            <p className="fs-6 text-secondary mb-0" style={{ lineHeight: '1.6', color: '#94A3B8' }}>
              We design, build, and deploy intelligent software ecosystems that eliminate operational friction and accelerate growth.
            </p>
          </div>

          {/* Three Core Principles */}
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{ width: '44px', height: '44px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Zap size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Smart Solutions</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Applied AI automation and custom software tailored to your workflows, eliminating manual bottlenecks without bloat.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{ width: '44px', height: '44px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <ShieldCheck size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Reliable Technology</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Enterprise-grade security, tested architectures, and verified software products backed by transparent service guarantees.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{ width: '44px', height: '44px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Target size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Sustainable Growth</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Scalable digital assets designed to expand with your company across local and international markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 6 CORE SERVICES */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                CORE CAPABILITIES
              </span>
              <h2 className="display-6 fw-extrabold text-white mb-0">
                Digital Services
              </h2>
            </div>
            <p className="text-secondary mb-0" style={{ maxWidth: '380px', fontSize: '0.85rem', color: '#94A3B8' }}>
              Autonomous AI workflows, custom engineering, and scalable data intelligence built for modern enterprises.
            </p>
          </div>

          {/* 6 Main Services Grid (2x3 perfectly balanced) */}
          <div className="row g-4">
            {SERVICES_DATA.map((service, index) => (
              <div key={service.id} className="col-12 col-md-6 col-lg-4">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link
              to="/services"
              className="btn btn-forest d-inline-flex align-items-center gap-2"
            >
              <span>Explore All 6 Solutions</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PRODUCTS */}
      <section className="py-5 bg-surface border-top border-bottom border-custom">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              PLATFORMS & ACCELERATORS
            </span>
            <h2 className="display-6 fw-extrabold text-gradient-luxury mb-3">
              Enterprise Digital Products
            </h2>
            <p className="fs-6 text-secondary mb-0" style={{ lineHeight: '1.6', color: '#94A3B8' }}>
              Ready-to-deploy software platforms delivered via our technology partnership with Klyssel Labs.
            </p>
          </div>

          {/* Featured Products Grid */}
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
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              THE MINDORA ADVANTAGE
            </span>
            <h2 className="display-6 fw-extrabold text-white mb-3">
              Engineered for Precision & Impact
            </h2>
            <p className="fs-6 text-secondary mb-0" style={{ lineHeight: '1.6', color: '#94A3B8' }}>
              Focused on delivering measurable commercial return through reliable, modern engineering.
            </p>
          </div>

          {/* 6 Feature Cards */}
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Sliders size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Tailored Architectures</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  No rigid templates. Every system is scoped and calibrated to resolve your specific commercial bottlenecks.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Sparkles size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Advanced AI Integrations</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Direct access to enterprise AI suites, including Klyx Chatbot AI and autonomous process agents.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Users size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Technical Leadership</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Experienced solution architects adhering to strict software security and international data governance.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Target size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Business-First Approach</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  We focus on commercial return, operational velocity, and customer retention rather than buzzwords.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Compass size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Agile Engagements</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Flexible models ranging from turnkey product rollouts to dedicated engineering sprints and advisory.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card card-growvia h-100 p-4 shadow-card-custom">
                <div
                  className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <Headphones size={20} />
                </div>
                <h3 className="h6 fw-bold text-white mb-2">Dedicated Support</h3>
                <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                  Regional contact and continuous maintenance guarantee your systems remain fast, secure, and resilient.
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
              <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                VERTICAL SPECIALIZATION
              </span>
              <h2 className="display-6 fw-extrabold text-white mb-0">
                Industries We Serve
              </h2>
            </div>
            <p className="text-secondary mb-0" style={{ maxWidth: '380px', fontSize: '0.85rem', color: '#94A3B8' }}>
              Engineered for the commercial realities of Mauritius, the Indian Ocean, and global markets.
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

      {/* SECTION 7: HOW WE WORK (MINIMALIST 4-STEP) */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              STRUCTURED ENGAGEMENT
            </span>
            <h2 className="display-6 fw-extrabold text-gradient-luxury mb-3">
              Delivery Methodology
            </h2>
            <p className="fs-6 text-secondary mb-0" style={{ lineHeight: '1.6', color: '#94A3B8' }}>
              Transparent four-phase execution keeping leadership in complete control.
            </p>
          </div>

          {/* 4-Step Minimalist Grid */}
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-card-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-gradient-accent fs-4 d-block mb-2">01</span>
                  <div
                    className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '38px', height: '38px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    <Search size={18} />
                  </div>
                  <h3 className="h6 fw-bold text-white mb-2">Discover</h3>
                  <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                    Evaluate requirements, workflows, and commercial bottlenecks through structured technical discovery.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 1 • Scoping
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-card-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-gradient-accent fs-4 d-block mb-2">02</span>
                  <div
                    className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '38px', height: '38px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    <Workflow size={18} />
                  </div>
                  <h3 className="h6 fw-bold text-white mb-2">Recommend</h3>
                  <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                    Identify the optimal architectural roadmap, comparing bespoke builds against proven platforms.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 2 • Architecture
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-card-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-gradient-accent fs-4 d-block mb-2">03</span>
                  <div
                    className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '38px', height: '38px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    <Sliders size={18} />
                  </div>
                  <h3 className="h6 fw-bold text-white mb-2">Implement</h3>
                  <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                    Deploy, calibrate, and integrate the solution with authorized specialists and rigorous QA testing.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 3 • Deployment
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <div className="card card-growvia h-100 p-4 shadow-card-custom d-flex flex-column justify-content-between">
                <div>
                  <span className="font-monospace fw-extrabold text-gradient-accent fs-4 d-block mb-2">04</span>
                  <div
                    className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '38px', height: '38px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  >
                    <LifeBuoy size={18} />
                  </div>
                  <h3 className="h6 fw-bold text-white mb-2">Support</h3>
                  <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#94A3B8' }}>
                    Continuous maintenance, system monitoring, and SLA-backed support to guarantee uninterrupted operation.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-top border-custom text-sage fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  Phase 4 • Long-Term SLA
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
        headline="Ready to Elevate Your Digital Operations?"
        description="Discuss your project with our solutions architects. Clear roadmaps, zero sales pressure."
      />
    </div>
  );
};
