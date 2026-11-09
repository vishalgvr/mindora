import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTASection } from '../components/CTASection';
import { INDUSTRIES_DATA, IndustryItem } from '../data/industries';
import { ServiceIcon } from '../components/ServiceIcon';

export const Industries: React.FC = () => {
  return (
    <div className="w-100 bg-cream-main">
      <SEO
        title="Industries We Serve | Mauritius & International — Mindora"
        description="Specialized digital solutions for hospitality, healthcare, retail, finance, education, restaurants, startups, and corporate enterprises across Mauritius and global markets."
        canonicalPath="/industries"
      />

      {/* Header Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center">
        <div className="container py-lg-4" style={{ maxWidth: '780px' }}>
          <div className="badge-growvia mb-3">
            <Sparkles size={13} className="text-forest" />
            <span>VERTICAL TECHNOLOGY SOLUTIONS</span>
          </div>

          <h1 className="display-6 fw-extrabold text-forest-dark mb-3">
            Tailored for Your Industry Reality.
          </h1>

          <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
            Every sector faces distinct operational pressures, compliance frameworks, and customer
            expectations. Discover how Mindora connects your industry with modern technology.
          </p>
        </div>
      </section>

      {/* Industry Detail Cards */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="d-flex flex-column gap-5">
            {INDUSTRIES_DATA.map((industry: IndustryItem) => (
              <div
                key={industry.id}
                id={industry.id}
                className="card-growvia overflow-hidden shadow-card-custom"
                style={{ scrollMarginTop: '100px' }}
              >
                <div className="row g-0">
                  {/* Visual Imagery (5 cols) */}
                  <div className="col-12 col-lg-5 position-relative bg-forest-dark overflow-hidden" style={{ minHeight: '280px' }}>
                    <img
                      src={industry.imageUrl}
                      alt={industry.title}
                      loading="lazy"
                      className="w-100 h-100 object-fit-cover"
                      style={{ opacity: 0.85 }}
                    />
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ background: 'linear-gradient(to top, rgba(23, 59, 44, 0.95) 0%, rgba(23, 59, 44, 0.4) 60%, transparent 100%)' }}
                    />

                    <div className="position-absolute bottom-0 start-0 end-0 p-4 text-cream-light">
                      <div
                        className="rounded-3 bg-forest text-sage d-flex align-items-center justify-content-center p-2 mb-2 shadow-sm"
                        style={{ width: '42px', height: '42px' }}
                      >
                        <ServiceIcon name={industry.iconName} size={22} />
                      </div>
                      <span className="text-uppercase fw-bold text-sage fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.06em' }}>
                        Vertical Focus
                      </span>
                      <h3 className="h4 fw-bold text-cream-light mb-0">{industry.title}</h3>
                    </div>
                  </div>

                  {/* Content (7 cols) */}
                  <div className="col-12 col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-between">
                    <div>
                      <span className="text-uppercase fw-bold text-forest fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                        {industry.subtitle}
                      </span>

                      <p className="fs-7 text-body-custom text-opacity-85 mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                        {industry.description}
                      </p>

                      {/* Friction vs Solutions */}
                      <div className="row g-3 mb-4">
                        {/* Challenges */}
                        <div className="col-12 col-sm-6">
                          <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 h-100">
                            <h4 className="text-uppercase fw-bold text-danger fs-8 d-flex align-items-center gap-1.5 mb-2" style={{ fontSize: '0.72rem' }}>
                              <AlertTriangle size={13} className="text-danger flex-shrink-0" />
                              Common Friction Points:
                            </h4>
                            <ul className="list-unstyled d-flex flex-column gap-1 fs-8 text-body-custom mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                              {industry.keyChallenges.map((ch, idx) => (
                                <li key={idx} className="d-flex align-items-start gap-1">
                                  <span className="text-danger fw-bold">•</span>
                                  <span>{ch}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="col-12 col-sm-6">
                          <div className="p-3 rounded-3 bg-cream-main border border-custom h-100">
                            <h4 className="text-uppercase fw-bold text-forest-dark fs-8 d-flex align-items-center gap-1.5 mb-2" style={{ fontSize: '0.72rem' }}>
                              <CheckCircle2 size={13} className="text-forest flex-shrink-0" />
                              Tailored Solutions:
                            </h4>
                            <ul className="list-unstyled d-flex flex-column gap-1 fs-8 text-body-custom mb-0" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                              {industry.tailoredSolutions.map((sol, idx) => (
                                <li key={idx} className="d-flex align-items-start gap-1">
                                  <span className="text-forest fw-bold">•</span>
                                  <span>{sol}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Recommended Products */}
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-3 fs-8">
                        <span className="fw-bold text-forest-dark d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                          <Layers size={13} />
                          Recommended:
                        </span>
                        {industry.recommendedProducts.map((prod, idx) => (
                          <span
                            key={idx}
                            className="badge-sage"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-3 border-top border-custom d-flex justify-content-between align-items-center">
                      <Link
                        to={`/contact?service=tailored&note=${encodeURIComponent(industry.title)}`}
                        className="btn btn-forest py-2 px-4 fs-8 d-inline-flex align-items-center gap-2"
                        style={{ fontSize: '0.75rem' }}
                      >
                        <span>Request Proposal for {industry.title}</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Don't See Your Specific Industry Listed?"
        description="We craft bespoke software and autonomous automation architectures for unique commercial models."
      />
    </div>
  );
};
