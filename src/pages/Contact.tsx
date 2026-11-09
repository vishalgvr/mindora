import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ContactForm } from '../components/ContactForm';
import { COMPANY_CONFIG } from '../config/company';

export const Contact: React.FC = () => {
  const { contact, location } = COMPANY_CONFIG;
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
    contact.whatsappPrefillMessage
  )}`;

  return (
    <div className="w-100 bg-cream-main">
      <SEO
        title="Contact Us & Request a Quote | Mindora Mauritius"
        description="Tell us what your business needs. Contact Mindora Digital Solutions in Mauritius for custom software, AI automation, and enterprise product consultations."
        canonicalPath="/contact"
      />

      {/* Header Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center">
        <div className="container py-lg-4" style={{ maxWidth: '780px' }}>
          <div className="badge-growvia mb-3">
            <Sparkles size={13} className="text-forest" />
            <span>DIRECT CLIENT CONSULTATION</span>
          </div>

          <h1 className="display-6 fw-extrabold text-forest-dark mb-3">
            Tell Us What Your Business Needs.
          </h1>

          <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
            Have a project in mind? Looking for the right digital product? Let's discuss how Mindora
            can help move your business forward.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="row g-5 align-items-start">
            {/* Left Column: Direct Contact Info (5 cols) */}
            <div className="col-12 col-lg-5">
              <div className="mb-4">
                <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                  COMMUNICATION DESK
                </span>
                <h2 className="h4 fw-bold text-forest-dark mb-2">
                  Direct Access to Solutions Leadership
                </h2>
                <p className="fs-7 text-body-custom text-opacity-80 mb-0" style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  Every enquiry submitted to Mindora is evaluated by our technology directors. We
                  respect your time and provide straightforward technical and commercial guidance.
                </p>
              </div>

              {/* Contact Information Card */}
              <div className="card-growvia p-4 shadow-card-custom mb-4">
                <h3 className="text-uppercase fw-bold text-forest-dark fs-8 pb-2 border-bottom border-custom mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
                  Official Contact Channels
                </h3>

                <div className="d-flex flex-column gap-3 fs-8" style={{ fontSize: '0.8rem' }}>
                  {/* Email */}
                  <div className="d-flex align-items-start gap-2.5">
                    <div className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center p-2 flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-sage fw-bold d-block" style={{ fontSize: '0.72rem' }}>Corporate Email</span>
                      <a href={`mailto:${contact.email}`} className="text-forest-dark fw-bold text-decoration-underline">
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="d-flex align-items-start gap-2.5">
                    <div className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center p-2 flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-sage fw-bold d-block" style={{ fontSize: '0.72rem' }}>Direct Line</span>
                      <span className="text-forest-dark fw-bold">{contact.phone}</span>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="d-flex align-items-start gap-2.5">
                    <div className="rounded-3 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center p-2 flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                      <MessageCircle size={16} />
                    </div>
                    <div>
                      <span className="text-sage fw-bold d-block" style={{ fontSize: '0.72rem' }}>Instant WhatsApp Desk</span>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-success fw-bold text-decoration-underline">
                        Open WhatsApp Direct Chat →
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="d-flex align-items-start gap-2.5">
                    <div className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center p-2 flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-sage fw-bold d-block" style={{ fontSize: '0.72rem' }}>Location</span>
                      <span className="text-forest-dark fw-bold">{location.country}</span>
                      <span className="text-muted-custom d-block mt-0.5 fs-8" style={{ fontSize: '0.72rem' }}>
                        {location.registeredOfficePlaceholder}
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="d-flex align-items-start gap-2.5">
                    <div className="rounded-3 bg-forest-subtle text-forest d-flex align-items-center justify-content-center p-2 flex-shrink-0" style={{ width: '36px', height: '36px' }}>
                      <Clock size={16} />
                    </div>
                    <div>
                      <span className="text-sage fw-bold d-block" style={{ fontSize: '0.72rem' }}>Consultation Hours</span>
                      <span className="text-body-custom">{contact.consultationHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reassurance */}
              <div className="p-3.5 rounded-4-custom bg-surface border border-custom fs-8 text-body-custom text-opacity-80" style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
                <div className="d-flex align-items-center gap-1.5 fw-bold text-forest-dark mb-1">
                  <ShieldCheck size={15} className="text-forest" />
                  <span>Our Consultation Commitment</span>
                </div>
                <ul className="list-unstyled d-flex flex-column gap-1 text-muted-custom mb-0 fs-8" style={{ fontSize: '0.75rem' }}>
                  <li>• Initial discovery calls are exploratory and carry no commercial obligation.</li>
                  <li>• Mutual Non-Disclosure Agreement (NDA) available prior to sharing proprietary data.</li>
                  <li>• Backend enquiries are stored securely and never shared with third-party advertisers.</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Quotation Form (7 cols) */}
            <div className="col-12 col-lg-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
