import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-cream-main py-5">
      <SEO
        title="Privacy Policy | Mindora Digital Solutions Mauritius"
        description="Official privacy policy and data protection disclosure for Mindora Digital Solutions in Mauritius."
        canonicalPath="/privacy"
      />

      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card-growvia p-4 p-md-5 shadow-card-custom fs-7 text-body-custom" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
          <div className="border-bottom border-custom pb-4 mb-4">
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              LEGAL & DATA GOVERNANCE
            </span>
            <h1 className="h2 fw-extrabold text-forest-dark mb-1">Privacy Policy</h1>
            <p className="text-muted-custom fs-8 mb-0" style={{ fontSize: '0.75rem' }}>
              Effective Date: November 2026 • Jurisdiction: Republic of Mauritius
            </p>
          </div>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-forest-dark mb-2">1. Commitment to Data Protection</h2>
            <p className="mb-0">
              Mindora (&ldquo;Mindora Digital Solutions&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is an independent
              digital solutions enterprise based in Mauritius. We are committed to processing all
              commercial and personal information strictly in accordance with the Mauritius Data
              Protection Act (DPA 2017) and relevant international data privacy principles (including
              GDPR standards for cross-border collaboration).
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-forest-dark mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect information you explicitly provide when requesting digital services or products:</p>
            <ul className="mb-0 ps-3">
              <li>Contact Details: Full Name, Company/Organization Name, Corporate Email, Phone/WhatsApp number.</li>
              <li>Project Data: Stated budget parameters, desired service scope, and technical specifications.</li>
              <li>Technical Metadata: IP address, browser user-agent, and submission timestamps collected to prevent spam and verify quotation legitimacy.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-forest-dark mb-2">3. Use of Information</h2>
            <p className="mb-2">Your details are processed solely to:</p>
            <ul className="mb-2 ps-3">
              <li>Prepare and deliver technical quotation proposals and discovery consultations.</li>
              <li>Coordinate authorized demonstrations of partner software products (including Klyssel One and Klyx Chatbot).</li>
              <li>Manage agreed service-level agreements and ongoing client communications.</li>
            </ul>
            <p className="mb-0">
              We do not sell, rent, or trade client lead information to third-party marketing brokers.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-forest-dark mb-2">4. Technology Ecosystem & Reseller Roles</h2>
            <p className="mb-0">
              Mindora works with authorized technology partners, including Klyssel Labs. Where a
              client requests a demonstration or procurement of third-party software products,
              necessary onboarding information is shared with authorized partner infrastructure only
              upon the client’s explicit confirmation.
            </p>
          </section>

          <section>
            <h2 className="h5 fw-bold text-forest-dark mb-2">5. Contact Our Data Governance Desk</h2>
            <p className="mb-2">
              For data access requests, rectification, or inquiries regarding your stored records,
              contact:
            </p>
            <div className="p-3 rounded-3 bg-cream-main border border-custom fs-8 fw-medium">
              Data Privacy Desk • Mindora Digital Solutions <br />
              Email: contact@mindora.mu <br />
              Location: Mauritius
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
