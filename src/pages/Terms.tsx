import React from 'react';
import { SEO } from '../components/SEO';

export const Terms: React.FC = () => {
  return (
    <div className="py-5">
      <SEO
        title="Terms of Service & Engagement | Mindora Mauritius"
        description="Official terms of service and commercial consultation conditions for Mindora Digital Solutions."
        canonicalPath="/terms"
      />

      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card-growvia border-beam-card p-4 p-md-5 shadow-card-custom fs-7 text-secondary" style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#CBD5E1' }}>
          <div className="border-bottom border-custom pb-4 mb-4">
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              COMMERCIAL TERMS
            </span>
            <h1 className="h2 fw-extrabold text-white mb-1">Terms of Service</h1>
            <p className="text-muted-custom fs-8 mb-0" style={{ fontSize: '0.75rem' }}>
              Last Updated: November 2026 • Governing Law: Republic of Mauritius
            </p>
          </div>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p className="mb-0">
              By accessing the website of Mindora Digital Solutions (&ldquo;Mindora&rdquo;) or submitting an
              inquiry for digital services or software products, you agree to comply with these terms
              of engagement.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">2. Scope of Services & Delivery Models</h2>
            <p className="mb-2">
              Mindora provides digital technology consultation, custom software engineering
              coordination, and authorized software reselling arrangements. Specific deliverables,
              timelines, milestones, and payment schedules are governed by dedicated commercial
              Service Agreements executed between Mindora and the client.
            </p>
            <p className="mb-0">
              Mindora does not promise that every underlying software component is built or hosted
              directly by Mindora; authorized ecosystem engineering teams (including Klyssel Labs)
              support relevant software modules as clarified during technical discovery.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">3. Proprietary Rights & Software Products</h2>
            <p className="mb-0">
              Featured digital products—including Klyssel One, Klyssel One Lite, and Klyx Chatbot AI—are
              the proprietary intellectual property of Klyssel Labs. Mindora acts as an authorized
              reseller and implementation partner where formal arrangements are confirmed. Mindora
              makes no claim of product ownership over third-party IP.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">4. Quotations & Consultations</h2>
            <p className="mb-0">
              Information provided via online quotation forms generates an estimate based on provided
              requirements. Formal commercial binding quotes require mutual technical discovery and
              written execution by an authorized director of Mindora.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">5. Limitation of Liability</h2>
            <p className="mb-0">
              In no event shall Mindora be held liable for indirect, incidental, or consequential
              damages resulting from the use or inability to use the website or preliminary advisory
              materials, beyond the statutory limits recognized under Mauritian law.
            </p>
          </section>

          <section className="mb-0">
            <h2 className="h5 fw-bold text-white mb-2">6. Governing Law & Dispute Resolution</h2>
            <p className="mb-0">
              These terms are governed and construed in accordance with the laws of the Republic of
              Mauritius. Any disputes arising in connection with commercial operations shall be
              subject to the jurisdiction of the competent courts of Port Louis, Mauritius.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
