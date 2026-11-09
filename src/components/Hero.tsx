import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Bot,
  Activity,
  Layers,
  CheckCircle,
} from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="py-5 bg-mesh-pattern position-relative overflow-hidden">
      <div className="container py-lg-4">
        <div className="row align-items-center g-5">
          {/* Left Column: Headlines & CTA (7 cols) */}
          <div className="col-12 col-lg-7">
            {/* Introductory Label */}
            <div className="badge-growvia mb-3 shadow-sm">
              <span className="rounded-circle bg-forest d-inline-block" style={{ width: '6px', height: '6px' }} />
              <span>DIGITAL SOLUTIONS FOR GROWING BUSINESSES</span>
            </div>

            {/* Main Headline */}
            <h1
              className="display-4 fw-extrabold text-forest-dark mb-3 lh-sm"
              style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
              Smart Technology. <br />
              <span className="text-forest position-relative d-inline-block">
                Natural Growth.
                <svg
                  className="position-absolute start-0 w-100"
                  style={{ bottom: '-6px' }}
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5C45 2 155 2 199 5.5"
                    stroke="#38BDF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="fs-5 text-body-custom mb-4 pe-lg-4" style={{ lineHeight: '1.6', fontWeight: 400 }}>
              Empowering businesses with intelligent technology, innovative digital solutions, and
              software designed to simplify operations and accelerate growth.
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-3 pt-2 mb-4">
              <Link
                to="/services"
                className="btn btn-forest d-inline-flex align-items-center justify-content-center gap-2"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="btn btn-light-growvia d-inline-flex align-items-center justify-content-center"
              >
                Talk to Our Team
              </Link>
            </div>

            {/* Trust Reassurance Badges */}
            <div className="pt-4 border-top border-custom d-flex flex-wrap align-items-center gap-4 text-muted-custom fs-8" style={{ fontSize: '0.8rem' }}>
              <div className="d-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-forest" />
                <span>Mauritius-Based Leadership</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Cpu size={16} className="text-forest" />
                <span>Enterprise Technology Ecosystem</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <CheckCircle size={16} className="text-forest" />
                <span>Indian Ocean & Global Reach</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition (5 cols) */}
          <div className="col-12 col-lg-5">
            <div className="position-relative mx-auto" style={{ maxWidth: '440px' }}>
              {/* Main Card: Software Dashboard Mockup */}
              <div className="card-growvia p-4 shadow-card-custom position-relative bg-surface">
                {/* Simulated Header */}
                <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-custom">
                  <div className="d-flex align-items-center gap-2">
                    <div className="w-8 h-8 rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                      <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                        <rect width="100" height="100" rx="28" fill="#7533FB" />
                        <circle cx="50" cy="33.5" r="4.8" fill="#38BDF8" />
                        <polyline
                          points="28.5,69.5 28.5,41.5 41.5,53.5 50,45.0 58.5,53.5 71.5,41.5 71.5,69.5"
                          fill="none"
                          stroke="#FFFFFF"
                          strokeWidth="5.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="fw-bold fs-7 text-forest-dark d-block lh-1" style={{ fontSize: '0.82rem' }}>
                        Mindora Digital Console
                      </span>
                      <span className="text-sage fs-8 fw-semibold" style={{ fontSize: '0.68rem' }}>
                        Unified Operations Hub
                      </span>
                    </div>
                  </div>
                  <span className="badge bg-success-subtle text-success fw-bold rounded-pill px-2.5 py-1" style={{ fontSize: '0.65rem' }}>
                    Live
                  </span>
                </div>

                {/* Dashboard Metrics Row */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="p-3 rounded-3 bg-cream-main border border-custom">
                      <span className="text-uppercase fw-bold text-muted-custom d-block mb-1" style={{ fontSize: '0.65rem' }}>
                        System Automation
                      </span>
                      <div className="d-flex align-items-baseline gap-1">
                        <span className="fs-4 fw-extrabold text-forest-dark">94.8%</span>
                        <span className="text-success fw-bold fs-8 d-flex align-items-center" style={{ fontSize: '0.7rem' }}>
                          <TrendingUp size={10} className="me-0.5" /> +18%
                        </span>
                      </div>
                      <span className="text-muted-custom fs-8 d-block" style={{ fontSize: '0.68rem' }}>Manual hours saved</span>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="p-3 rounded-3 bg-cream-main border border-custom">
                      <span className="text-uppercase fw-bold text-muted-custom d-block mb-1" style={{ fontSize: '0.65rem' }}>
                        Autonomous AI Desk
                      </span>
                      <div className="d-flex align-items-baseline gap-1">
                        <span className="fs-4 fw-extrabold text-forest-dark">24 / 7</span>
                        <span className="text-forest fw-bold fs-8" style={{ fontSize: '0.7rem' }}>0ms wait</span>
                      </div>
                      <span className="text-muted-custom fs-8 d-block" style={{ fontSize: '0.68rem' }}>Omnichannel response</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Chart Visual */}
                <div className="p-3 rounded-3 bg-forest-dark text-cream-light mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fs-8 fw-semibold text-cream d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                      <Activity size={13} className="text-sage" />
                      Client Operations Velocity
                    </span>
                    <span className="text-sage font-monospace" style={{ fontSize: '0.68rem' }}>Q4 Mauritius & Global</span>
                  </div>
                  <svg className="w-100" height="55" viewBox="0 0 300 70" fill="none">
                    <path
                      d="M0 55 C 40 50, 70 35, 110 40 C 150 45, 180 20, 220 25 C 260 30, 280 10, 300 8"
                      stroke="#38BDF8"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 55 C 40 50, 70 35, 110 40 C 150 45, 180 20, 220 25 C 260 30, 280 10, 300 8 L 300 70 L 0 70 Z"
                      fill="url(#hero-chart-grad)"
                      opacity="0.3"
                    />
                    <defs>
                      <linearGradient id="hero-chart-grad" x1="0" y1="0" x2="0" y2="70" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38BDF8" />
                        <stop offset="1" stopColor="#7533FB" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Ecosystem Notice Strip */}
                <div className="p-2.5 rounded-3 bg-botanical-subtle d-flex align-items-center justify-content-between fs-8" style={{ fontSize: '0.75rem' }}>
                  <div className="d-flex align-items-center gap-2">
                    <Layers size={14} className="text-forest" />
                    <span className="fw-semibold text-forest-dark">Klyssel One & Klyx v2.4 AI</span>
                  </div>
                  <span className="text-uppercase fw-bold text-forest" style={{ fontSize: '0.65rem' }}>
                    Integrated
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: AI Desk */}
              <div
                className="position-absolute bg-surface p-2.5 rounded-4-custom shadow-hover-custom border border-custom d-flex align-items-center gap-2"
                style={{ top: '-18px', left: '-18px', zIndex: 2 }}
              >
                <div className="rounded-3 bg-forest text-cream p-2 d-flex align-items-center justify-content-center">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-1">
                    <span className="fw-bold fs-8 text-forest-dark" style={{ fontSize: '0.75rem' }}>Klyx Chatbot AI</span>
                    <span className="rounded-circle bg-success d-inline-block" style={{ width: '6px', height: '6px' }} />
                  </div>
                  <span className="text-sage fw-semibold d-block" style={{ fontSize: '0.68rem' }}>Zero-hallucination agent</span>
                </div>
              </div>

              {/* Floating Badge 2: Practical Solutions */}
              <div
                className="position-absolute bg-forest-dark text-cream-light p-2.5 rounded-4-custom shadow-hover-custom border border-sage-custom d-flex align-items-center gap-2"
                style={{ bottom: '-18px', right: '-18px', zIndex: 2 }}
              >
                <div className="rounded-3 bg-forest text-sage p-2 d-flex align-items-center justify-content-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="fw-bold text-cream-light d-block" style={{ fontSize: '0.75rem' }}>Practical Solutions</span>
                  <span className="text-sage fw-medium d-block" style={{ fontSize: '0.68rem' }}>Engineered for ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
