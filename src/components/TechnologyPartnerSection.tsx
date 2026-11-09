import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const TechnologyPartnerSection: React.FC = () => {
  const { partner } = COMPANY_CONFIG;

  return (
    <section className="py-5 bg-surface border-top border-bottom border-custom position-relative">
      <div className="container py-lg-4">
        {/* Section Heading */}
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
          <div className="badge-growvia mb-3">
            <Cpu size={13} className="text-forest" />
            <span>TECHNOLOGY ECOSYSTEM & RESELLER NETWORK</span>
          </div>

          <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
            Powered by Technology. Delivered by Mindora.
          </h2>

          <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
            Mindora connects businesses with advanced technology services and digital products through
            its technology ecosystem.
          </p>
        </div>

        {/* Partner Highlight Card */}
        <div className="card-growvia p-4 p-md-5 bg-cream-main shadow-card-custom mx-auto" style={{ maxWidth: '920px' }}>
          <div className="row g-4 align-items-start">
            {/* Left Column: Partner Details & Role */}
            <div className="col-12 col-md-7 pe-md-3">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div
                  className="rounded-3 bg-forest-dark text-cream-light d-flex align-items-center justify-content-center fw-bold fs-5 shadow-sm"
                  style={{ width: '48px', height: '48px' }}
                >
                  KL
                </div>
                <div>
                  <h3 className="h5 fw-bold text-forest-dark mb-0">{partner.name}</h3>
                  <span className="text-forest fw-semibold text-uppercase fs-8" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                    {partner.role}
                  </span>
                </div>
              </div>

              <p className="text-body-custom text-opacity-85 fs-7 mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                Through our collaboration with Klyssel Labs, Mindora provides businesses in Mauritius
                and international markets with access to enterprise-grade software products (such as
                Klyssel One, Klyssel One Lite, and Klyx Chatbot AI) and specialized engineering
                expertise.
              </p>

              {/* Independent Entity Notice */}
              <div className="p-3 rounded-3 bg-surface border border-custom fs-8 text-body-custom text-opacity-80" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                <div className="d-flex align-items-center gap-1.5 fw-bold text-forest-dark mb-1">
                  <ShieldCheck size={14} className="text-forest" />
                  <span>Authorized Reseller & Consultation Relationship</span>
                </div>
                <p className="mb-0 text-muted-custom">
                  Mindora is an independent Mauritius digital solutions company. All software products
                  (Klyssel One, Klyssel One Lite, Klyx Chatbot) remain the proprietary intellectual
                  property of Klyssel Labs. Mindora coordinates consultation, local onboarding, and
                  client project management.
                </p>
              </div>
            </div>

            {/* Right Column: Verified Official Resources */}
            <div className="col-12 col-md-5">
              <div className="bg-surface p-4 rounded-4-custom border border-custom">
                <h4 className="text-uppercase fw-bold text-forest-dark fs-8 mb-3" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                  Official Partner Documentation
                </h4>

                <div className="d-flex flex-column gap-2 fs-8 mb-3" style={{ fontSize: '0.78rem' }}>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-3 bg-cream-main text-forest-dark fw-bold text-decoration-none d-flex align-items-center justify-content-between"
                  >
                    <span>Official Website</span>
                    <ExternalLink size={13} className="text-forest" />
                  </a>

                  <a
                    href={partner.servicesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-3 bg-cream-main text-forest-dark fw-bold text-decoration-none d-flex align-items-center justify-content-between"
                  >
                    <span>Official Services</span>
                    <ExternalLink size={13} className="text-forest" />
                  </a>

                  <a
                    href={partner.productsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-3 bg-cream-main text-forest-dark fw-bold text-decoration-none d-flex align-items-center justify-content-between"
                  >
                    <span>Official Products</span>
                    <ExternalLink size={13} className="text-forest" />
                  </a>
                </div>

                <div className="text-muted-custom fs-8 d-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>
                  <CheckCircle2 size={12} className="text-forest" />
                  Verified external partner link verification
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card CTA */}
          <div className="mt-4 pt-3 border-top border-custom d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
            <span className="fs-8 text-body-custom text-opacity-80 text-center text-sm-start" style={{ fontSize: '0.8rem' }}>
              Need assistance evaluating whether an enterprise suite or custom build fits your company?
            </span>
            <Link
              to="/products"
              className="btn btn-forest py-2 px-4 d-inline-flex align-items-center gap-2 fs-8 flex-shrink-0"
              style={{ fontSize: '0.75rem' }}
            >
              <span>Explore Our Technology Solutions</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
