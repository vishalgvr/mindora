import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-5">
      <SEO
        title="Privacy Policy | Mindora Digital Solutions Mauritius"
        description="Official privacy policy and data protection disclosure for Mindora Digital Solutions in Mauritius."
        canonicalPath="/privacy"
      />

      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card-growvia border-beam-card p-4 p-md-5 shadow-card-custom fs-7 text-secondary" style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#CBD5E1' }}>
          <div className="border-bottom border-custom pb-4 mb-4">
            <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              LEGAL & DATA GOVERNANCE
            </span>
            <h1 className="h2 fw-extrabold text-white mb-1">Privacy Policy</h1>
            <p className="text-muted-custom fs-8 mb-0" style={{ fontSize: '0.75rem' }}>
              Effective Date: November 2026 • Jurisdiction: Republic of Mauritius
            </p>
          </div>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">1. Commitment to Data Protection</h2>
            <p className="mb-0">
              Mindora (&ldquo;Mindora Digital Solutions&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is an independent
              digital solutions enterprise based in Mauritius. We are committed to processing all
              commercial and personal information strictly in accordance with the Mauritius Data
              Protection Act (DPA 2017) and relevant international data privacy principles (including
              GDPR standards for cross-border collaboration).
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">2. Information We Collect</h2>
            <p className="mb-2">We collect information you explicitly provide when requesting digital services or products:</p>
            <ul className="mb-0 ps-3">
              <li>Contact Details: Full Name, Company/Organization Name, Corporate Email, Phone/WhatsApp number.</li>
              <li>Project Data: Stated budget parameters, desired service scope, and technical specifications.</li>
              <li>Technical Metadata: IP address, browser user-agent, and submission timestamps collected to prevent spam and verify quotation legitimacy.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">3. Use of Information</h2>
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
            <h2 className="h5 fw-bold text-white mb-2">4. Technology Ecosystem & Reseller Roles</h2>
            <p className="mb-0">
              Mindora collaborates with Klyssel Labs as an authorized reseller and technology partner.
              Where a client requests access to proprietary software suites, project metadata
              relevant for licensing and deployment setup is shared with the technology provider under
              strict bilateral non-disclosure provisions.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="h5 fw-bold text-white mb-2">5. Data Retention & Security</h2>
            <p className="mb-0">
              Lead data is stored in secured environments using industry-standard encryption protocols.
              Information is retained only for the period necessary to deliver quotation responses and
              maintain required corporate tax and governance archives under Mauritian law.
            </p>
          </section>

          <section className="mb-0">
            <h2 className="h5 fw-bold text-white mb-2">6. Your Rights & Privacy Inquiries</h2>
            <p className="mb-0">
              Under the Data Protection Act 2017, you have the right to request access, rectification,
              or deletion of your personal records. For data governance requests, contact the Mindora
              privacy desk at{' '}
              <a href="mailto:info@mindora.mu" className="text-sage fw-bold">
                info@mindora.mu
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
