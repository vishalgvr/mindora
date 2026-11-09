import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface CTASectionProps {
  headline?: string;
  description?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  headline = "Let's Build Something That Moves Your Business Forward.",
  description = "Tell us about your business goals. Our team will help you explore the right digital solutions.",
}) => {
  const { whatsappNumber, whatsappPrefillMessage } = COMPANY_CONFIG.contact;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappPrefillMessage)}`;

  return (
    <section className="py-5 bg-forest-dark text-cream-light position-relative overflow-hidden">
      <div className="container py-lg-5 text-center position-relative" style={{ maxWidth: '850px', zIndex: 1 }}>
        {/* Tag Pill */}
        <div
          className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-forest border border-sage-custom text-sage fs-8 mb-3"
          style={{ fontSize: '0.75rem', letterSpacing: '0.06em' }}
        >
          <Sparkles size={13} className="text-cream" />
          <span>START YOUR DIGITAL JOURNEY</span>
        </div>

        {/* Headline */}
        <h2 className="display-5 fw-extrabold text-cream-light mb-3">
          {headline}
        </h2>

        {/* Description */}
        <p className="fs-5 text-light text-opacity-85 mb-4 mx-auto" style={{ maxWidth: '650px', fontWeight: 300, lineHeight: '1.6' }}>
          {description}
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
          <Link
            to="/contact"
            className="btn btn-cream d-inline-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto shadow-hover-custom"
          >
            <span>Request a Consultation</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/contact"
            className="btn btn-outline-light d-inline-flex align-items-center justify-content-center rounded-pill py-2 px-4 text-uppercase fw-bold fs-8 w-100 w-sm-auto"
            style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}
          >
            Contact Mindora
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success d-inline-flex align-items-center justify-content-center rounded-pill py-2 px-4 text-uppercase fw-bold fs-8 w-100 w-sm-auto shadow-sm"
            style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}
          >
            <MessageSquare size={15} className="me-1.5" />
            WhatsApp Desk
          </a>
        </div>

        {/* Reassurance points */}
        <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-wrap justify-content-center gap-4 text-light text-opacity-70 fs-8" style={{ fontSize: '0.78rem' }}>
          <span className="d-flex align-items-center gap-1.5">
            <ShieldCheck size={14} className="text-sage" />
            No obligation initial consultation
          </span>
          <span className="d-flex align-items-center gap-1.5">
            <ShieldCheck size={14} className="text-sage" />
            Transparent technical architectures
          </span>
          <span className="d-flex align-items-center gap-1.5">
            <ShieldCheck size={14} className="text-sage" />
            Strict data confidentiality guaranteed
          </span>
        </div>
      </div>
    </section>
  );
};
