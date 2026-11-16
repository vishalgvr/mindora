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
    <section className="py-5 position-relative overflow-hidden" style={{ backgroundColor: 'rgba(5, 4, 12, 0.85)' }}>
      {/* Ambient Aurora Orbs */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: '500px',
          height: '500px',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(133, 55, 252, 0.2) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container py-lg-5 text-center position-relative" style={{ maxWidth: '850px', zIndex: 1 }}>
        {/* Tag Pill with Pulse Beacon */}
        <div className="badge-growvia mb-3 shadow-sm">
          <span className="beacon-dot" />
          <span>START YOUR DIGITAL JOURNEY</span>
        </div>

        {/* Headline */}
        <h2 className="display-5 fw-extrabold text-gradient-luxury mb-3">
          {headline}
        </h2>

        {/* Description */}
        <p className="fs-5 text-secondary mb-4 mx-auto" style={{ maxWidth: '650px', fontWeight: 300, lineHeight: '1.6', color: '#CBD5E1' }}>
          {description}
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-5">
          <Link
            to="/contact"
            className="btn btn-forest d-inline-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto shadow-hover-custom"
          >
            <span>Request a Consultation</span>
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/contact"
            className="btn btn-cream d-inline-flex align-items-center justify-content-center rounded-pill py-2 px-4 text-uppercase fw-bold fs-8 w-100 w-sm-auto"
            style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}
          >
            Contact Mindora
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light d-inline-flex align-items-center justify-content-center rounded-pill py-2 px-4 text-uppercase fw-bold fs-8 w-100 w-sm-auto shadow-sm"
            style={{ fontSize: '0.8rem', letterSpacing: '0.05em', borderColor: 'rgba(37, 211, 102, 0.5)', color: '#25D366' }}
          >
            <MessageSquare size={15} className="me-1.5" />
            WhatsApp Desk
          </a>
        </div>

        {/* Reassurance points */}
        <div className="pt-4 border-top border-custom d-flex flex-wrap justify-content-center gap-4 text-secondary fs-8" style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
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
