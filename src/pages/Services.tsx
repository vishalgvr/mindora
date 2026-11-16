import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Info,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTASection } from '../components/CTASection';
import { SERVICES_DATA, ServiceCategory } from '../data/services';
import { ServiceIcon } from '../components/ServiceIcon';

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.id === activeCategory);

  return (
    <div className="w-100">
      <SEO
        title="Digital Services | AI, Software & Automation — Mindora Mauritius"
        description="Explore Mindora's 6 core digital services: AI development, custom software, mobile apps, data analytics, data engineering, and digital marketing."
        canonicalPath="/services"
      />

      {/* Header Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center position-relative">
        <div className="container py-lg-4" style={{ maxWidth: '720px' }}>
          <div className="badge-growvia mb-3">
            <Sparkles size={13} className="text-sage" />
            <span>CORE DISCIPLINES</span>
          </div>

          <h1 className="display-6 fw-extrabold text-gradient-luxury mb-3">
            Digital Services Designed for Impact.
          </h1>

          <p className="fs-6 text-secondary mb-4" style={{ lineHeight: '1.6', color: '#94A3B8' }}>
            High-velocity software engineering, autonomous AI workflows, and data ecosystems built to scale.
          </p>

          {/* Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`btn btn-sm rounded-pill fw-bold fs-8 ${
                activeCategory === 'all' ? 'btn-forest' : 'btn-cream'
              }`}
              style={{ fontSize: '0.78rem' }}
            >
              All 6 Services
            </button>
            {SERVICES_DATA.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveCategory(s.id)}
                className={`btn btn-sm rounded-pill fw-bold fs-8 ${
                  activeCategory === s.id ? 'btn-forest' : 'btn-cream'
                }`}
                style={{ fontSize: '0.78rem' }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Detailed Service Sections */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="d-flex flex-column gap-5">
            {filteredServices.map((service: ServiceCategory) => (
              <div
                key={service.id}
                id={service.id}
                className="card-growvia border-beam-card p-4 p-md-5 shadow-card-custom"
                style={{ scrollMarginTop: '100px' }}
              >
                {/* Category Header */}
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center pb-4 mb-4 border-bottom border-custom gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{ width: '52px', height: '52px', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                    >
                      <ServiceIcon name={service.iconName} size={26} />
                    </div>
                    <div>
                      <span className="font-monospace fw-bold text-sage text-uppercase fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                        Service {service.number}
                      </span>
                      <h2 className="h4 fw-extrabold text-white mb-0">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div>
                    <Link
                      to={`/contact?service=${service.id}`}
                      className="btn btn-forest py-2 px-4 d-inline-flex align-items-center gap-2 fs-8"
                      style={{ fontSize: '0.75rem' }}
                    >
                      <span>Request a Quote</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Grid: Value & Deliverables */}
                <div className="row g-4 mb-4">
                  {/* Left Column: Overview & Sub-services */}
                  <div className="col-12 col-lg-7">
                    <div className="mb-4">
                      <h3 className="text-uppercase fw-bold text-sage fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Commercial Value
                      </h3>
                      <p className="fs-7 text-secondary mb-0" style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#CBD5E1' }}>
                        {service.businessValue}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-uppercase fw-bold text-white fs-8 mb-3" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Specialized Capabilities:
                      </h3>
                      <div className="row g-2">
                        {service.subServices.slice(0, 4).map((sub) => (
                          <div key={sub.name} className="col-12 col-sm-6">
                            <div className="p-3 rounded-3 bg-surface-solid border border-custom h-100">
                              <div className="fw-bold text-white fs-8 mb-1" style={{ fontSize: '0.8rem' }}>
                                {sub.name}
                              </div>
                              <p className="mb-0 text-muted-custom fs-8" style={{ fontSize: '0.72rem', lineHeight: '1.4' }}>
                                {sub.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Deliverables & Notice */}
                  <div className="col-12 col-lg-5">
                    <div className="p-4 rounded-4-custom bg-surface-solid border border-custom h-100 d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="text-uppercase fw-bold text-white fs-8 d-flex align-items-center gap-1.5 mb-3" style={{ fontSize: '0.75rem' }}>
                          <Layers size={14} className="text-sage" />
                          Key Deliverables
                        </h3>

                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                          {service.deliverables.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="d-flex align-items-start gap-2 fs-8" style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
                              <CheckCircle2 size={13} className="text-sage flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Delivery Model Notice */}
                      <div className="mt-4 pt-3 border-top border-custom p-2.5 rounded-3 bg-surface border border-custom fs-8" style={{ fontSize: '0.72rem', lineHeight: '1.4' }}>
                        <div className="d-flex align-items-center gap-1 fw-bold text-white mb-1">
                          <Info size={12} className="text-sage" />
                          <span>Delivery SLA:</span>
                        </div>
                        <p className="mb-0 text-muted-custom">{service.deliveryModelNotice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Action Strip */}
                <div className="pt-3 border-top border-custom d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 fs-8" style={{ fontSize: '0.78rem' }}>
                  <div className="d-flex align-items-center gap-2 text-muted-custom">
                    <span className="fw-bold text-white">Recommended For:</span>
                    <span>{service.recommendedFor.join(' • ')}</span>
                  </div>

                  <Link
                    to={`/contact?service=${service.id}`}
                    className="text-sage fw-bold text-decoration-none d-inline-flex align-items-center gap-1"
                  >
                    Consult on {service.title} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Elevate Your Digital Systems?"
        description="Schedule a focused discovery session with Mindora's solutions leads in Mauritius."
      />
    </div>
  );
};
