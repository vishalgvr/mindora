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
    <div className="w-100 bg-cream-main">
      <SEO
        title="Digital Services | AI, Software & Automation — Mindora Mauritius"
        description="Explore Mindora's digital services: AI development, custom software, mobile apps, data analytics, BI, data engineering, UI/UX, and technology consulting."
        canonicalPath="/services"
      />

      {/* Header Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center">
        <div className="container py-lg-4" style={{ maxWidth: '780px' }}>
          <div className="badge-growvia mb-3">
            <Sparkles size={13} className="text-forest" />
            <span>SOLUTIONS ARCHITECTURE & DELIVERY</span>
          </div>

          <h1 className="display-6 fw-extrabold text-forest-dark mb-3">
            Digital Services Designed Around Your Business.
          </h1>

          <p className="fs-6 text-body-custom text-opacity-85 mb-4" style={{ lineHeight: '1.6' }}>
            Discover technology and digital services that help businesses modernize operations,
            improve customer experiences, and unlock new opportunities.
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
              All 8 Disciplines
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
                className="card-growvia p-4 p-md-5 shadow-card-custom"
                style={{ scrollMarginTop: '100px' }}
              >
                {/* Category Header */}
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center pb-4 mb-4 border-bottom border-custom gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{ width: '56px', height: '56px' }}
                    >
                      <ServiceIcon name={service.iconName} size={28} />
                    </div>
                    <div>
                      <span className="font-monospace fw-bold text-forest text-uppercase fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                        Service Category {service.number}
                      </span>
                      <h2 className="h3 fw-extrabold text-forest-dark mb-0">
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
                        Strategic Business Value
                      </h3>
                      <p className="fs-7 text-body-custom text-opacity-90 mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {service.businessValue}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-uppercase fw-bold text-forest-dark fs-8 mb-3" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Core Specialized Capabilities:
                      </h3>
                      <div className="row g-2">
                        {service.subServices.map((sub) => (
                          <div key={sub.name} className="col-12 col-sm-6">
                            <div className="p-3 rounded-3 bg-cream-main border border-custom h-100">
                              <div className="fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.8rem' }}>
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
                    <div className="p-4 rounded-4-custom bg-cream-main border border-custom h-100 d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="text-uppercase fw-bold text-forest-dark fs-8 d-flex align-items-center gap-1.5 mb-3" style={{ fontSize: '0.75rem' }}>
                          <Layers size={14} className="text-forest" />
                          Standard Deliverables & Assets
                        </h3>

                        <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="d-flex align-items-start gap-2 fs-8 text-body-custom" style={{ fontSize: '0.78rem' }}>
                              <CheckCircle2 size={13} className="text-forest flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Delivery Model Notice */}
                      <div className="mt-4 pt-3 border-top border-custom p-2.5 rounded-3 bg-surface border border-custom fs-8" style={{ fontSize: '0.72rem', lineHeight: '1.4' }}>
                        <div className="d-flex align-items-center gap-1 fw-bold text-forest-dark mb-1">
                          <Info size={12} className="text-forest" />
                          <span>Delivery Arrangement Note:</span>
                        </div>
                        <p className="mb-0 text-muted-custom">{service.deliveryModelNotice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Action Strip */}
                <div className="pt-3 border-top border-custom d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 fs-8" style={{ fontSize: '0.78rem' }}>
                  <div className="d-flex align-items-center gap-2 text-muted-custom">
                    <span className="fw-bold text-forest-dark">Recommended For:</span>
                    <span>{service.recommendedFor.join(' • ')}</span>
                  </div>

                  <Link
                    to={`/contact?service=${service.id}`}
                    className="text-forest fw-bold text-decoration-none d-inline-flex align-items-center gap-1"
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
        headline="Ready to Modernize Your Operations?"
        description="Book a technical discovery session with Mindora's digital solutions leads in Mauritius."
      />
    </div>
  );
};
