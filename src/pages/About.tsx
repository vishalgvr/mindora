import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, Sparkles, Building, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTASection } from '../components/CTASection';
import { COMPANY_CONFIG } from '../config/company';

export const About: React.FC = () => {
  const { structure, values, location } = COMPANY_CONFIG;

  return (
    <div className="w-100 bg-cream-main">
      <SEO
        title="About Us | Leadership & Values — Mindora Mauritius"
        description="Mindora is an independent Mauritius-based digital solutions company governed by two directors, connecting businesses with modern software and Klyssel Labs technology ecosystem."
        canonicalPath="/about"
      />

      {/* Hero / Overview Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center">
        <div className="container py-lg-4" style={{ maxWidth: '780px' }}>
          <div className="badge-growvia mb-3">
            <Sparkles size={13} className="text-forest" />
            <span>OUR MISSION & FOUNDATION</span>
          </div>

          <h1 className="display-6 fw-extrabold text-forest-dark mb-3">
            Growing Businesses Through Smarter Digital Solutions.
          </h1>

          <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
            Mindora is a Mauritius-based digital solutions company focused on connecting businesses
            with appropriate technology, custom software development, and modern digital services.
            We operate as an independent bridge between business vision and technical execution.
          </p>
        </div>
      </section>

      {/* Company Story & Positioning */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="row g-5 align-items-center">
            {/* Left Column: Narrative */}
            <div className="col-12 col-lg-7">
              <span className="text-uppercase text-forest fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                OUR APPROACH
              </span>
              <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
                An Independent Digital Partner Grounded in Pragmatism.
              </h2>
              <p className="fs-7 text-body-custom text-opacity-85 mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Too many organizations invest in software tools that end up underutilized, overly
                complex, or detached from actual commercial workflows. Mindora was established to
                solve this dilemma.
              </p>
              <p className="fs-7 text-body-custom text-opacity-85 mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Based strategically in Mauritius—the premier financial and technological gateway
                connecting Africa, India, and the Indian Ocean—Mindora partners with enterprises,
                SMEs, and regional resorts to modernize their operations systematically.
              </p>

              <div className="p-3 rounded-4-custom bg-surface border border-custom fs-8 text-body-custom text-opacity-80" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                <div className="d-flex align-items-center gap-2 fw-bold text-forest-dark mb-1">
                  <ShieldCheck size={16} className="text-forest" />
                  <span>Corporate Governance & Structure</span>
                </div>
                <p className="mb-0 text-muted-custom">
                  Mindora is structured as a private company governed by two directors. All client
                  engagements, service-level agreements, and authorized reseller arrangements are
                  managed with complete transparency and compliance.
                </p>
              </div>
            </div>

            {/* Right Column: Fact Sheet */}
            <div className="col-12 col-lg-5">
              <div className="card-growvia p-4 p-lg-5 shadow-card-custom">
                <h3 className="text-uppercase fw-bold text-forest-dark fs-8 pb-3 border-bottom border-custom mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                  Company At A Glance
                </h3>

                <ul className="list-unstyled d-flex flex-column gap-3 mb-0 fs-8" style={{ fontSize: '0.82rem' }}>
                  <li className="d-flex justify-content-between pb-2 border-bottom border-custom">
                    <span className="text-muted-custom">Brand Name</span>
                    <span className="fw-bold text-forest-dark">Mindora Digital Solutions</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 border-bottom border-custom">
                    <span className="text-muted-custom">Corporate Type</span>
                    <span className="fw-bold text-forest-dark">{structure.type}</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 border-bottom border-custom">
                    <span className="text-muted-custom">Governance</span>
                    <span className="fw-bold text-forest-dark">{structure.directorsCount} Executive Directors</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 border-bottom border-custom">
                    <span className="text-muted-custom">Headquarters</span>
                    <span className="fw-bold text-forest-dark">{location.country} ({location.region})</span>
                  </li>
                  <li className="d-flex justify-content-between pb-2 border-bottom border-custom">
                    <span className="text-muted-custom">Technology Partner</span>
                    <span className="fw-bold text-forest-dark">Klyssel Labs</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span className="text-muted-custom">Delivery Framework</span>
                    <span className="fw-bold text-forest-dark">Agile & SLA-Backed</span>
                  </li>
                </ul>

                <div className="mt-4 pt-3 border-top border-custom d-flex align-items-center gap-2 text-forest fw-semibold fs-8" style={{ fontSize: '0.72rem' }}>
                  <Building size={14} />
                  <span>Registered Office placeholder: Ebène / Port Louis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP & TWO DIRECTORS SECTION */}
      <section id="directors" className="py-5 bg-surface border-top border-bottom border-custom">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              EXECUTIVE GOVERNANCE
            </span>
            <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
              Company Leadership
            </h2>
            <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
              Mindora operates under the governance of two directors overseeing client technology
              consultation, partnership management, and operational service delivery.
            </p>
          </div>

          {/* Two Director Profile Cards (No invented names, photos, or false qualifications) */}
          <div className="row g-4 justify-content-center mx-auto" style={{ maxWidth: '860px' }}>
            {structure.directors.map((director) => (
              <div key={director.id} className="col-12 col-md-6">
                <div className="card-growvia p-4 bg-cream-main shadow-soft-custom h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div
                        className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center shadow-sm"
                        style={{ width: '50px', height: '50px' }}
                      >
                        <UserCheck size={26} />
                      </div>
                      <div>
                        <span className="font-monospace fw-bold text-forest text-uppercase fs-8 d-block" style={{ fontSize: '0.72rem' }}>
                          {director.role}
                        </span>
                        <h3 className="h6 fw-bold text-forest-dark mb-0">
                          [Director Profile Placeholder]
                        </h3>
                        <p className="text-muted-custom fs-8 mb-0" style={{ fontSize: '0.75rem' }}>{director.title}</p>
                      </div>
                    </div>

                    <p className="p-3 rounded-3 bg-surface border border-custom fs-8 text-body-custom text-opacity-85 mb-3" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                      {director.bioPlaceholder}
                    </p>

                    <div>
                      <span className="text-uppercase fw-bold text-sage fs-8 d-block mb-1.5" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                        Core Oversight & Responsibilities:
                      </span>
                      <div className="d-flex flex-wrap gap-1.5">
                        {director.focusAreas.map((focus, idx) => (
                          <span
                            key={idx}
                            className="badge-sage"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-top border-custom text-muted-custom fs-8 fst-italic d-flex align-items-center gap-1 mt-3" style={{ fontSize: '0.7rem' }}>
                    <Lock size={12} className="text-forest" />
                    <span>Official director names and bios updated upon formal corporate gazetting.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE COMPANY VALUES */}
      <section className="py-5 bg-cream-main">
        <div className="container py-lg-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '720px' }}>
            <span className="text-uppercase text-forest fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              WHAT GUIDES US
            </span>
            <h2 className="display-6 fw-extrabold text-forest-dark mb-3">
              Our Core Values
            </h2>
            <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
              Principles embedded into every consultation, software architecture, and partnership we
              undertake.
            </p>
          </div>

          <div className="row g-4">
            {values.map((val) => (
              <div key={val.title} className="col-12 col-md-6 col-lg-4">
                <div className="card card-growvia h-100 p-4 shadow-soft-custom">
                  <div
                    className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center mb-3"
                    style={{ width: '40px', height: '40px' }}
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="h6 fw-bold text-forest-dark mb-2">{val.title}</h3>
                  <p className="text-body-custom text-opacity-80 fs-8 mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Partner with Mindora for Natural, Sustainable Growth."
        description="Discuss your project with our executive directors in Mauritius."
      />
    </div>
  );
};
