import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { whatsappNumber, whatsappPrefillMessage } = COMPANY_CONFIG.contact;

  const encodedMessage = encodeURIComponent(whatsappPrefillMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <aside
      aria-label="Direct WhatsApp Assistance"
      className="position-fixed bottom-0 end-0 m-4 d-flex align-items-end gap-2"
      style={{ zIndex: 1060 }}
    >
      {/* Tooltip Card */}
      {showTooltip && (
        <div
          className="d-none d-sm-block bg-forest-dark text-cream-light p-3 rounded-4-custom shadow-hover-custom border border-sage-custom"
          style={{ width: '260px' }}
        >
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="text-uppercase text-sage fw-bold" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
              Direct WhatsApp Desk
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="btn btn-link text-light text-opacity-50 p-0 border-0"
              aria-label="Close tooltip"
            >
              <X size={14} />
            </button>
          </div>
          <p className="mb-2 text-light text-opacity-90" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
            Have questions about digital services or product demos? Chat directly with Mindora’s consultation desk.
          </p>
          <div className="text-sage d-flex align-items-center gap-1" style={{ fontSize: '0.68rem' }}>
            <span className="rounded-circle bg-success d-inline-block" style={{ width: '6px', height: '6px' }} />
            Typically replies within 1 business hour
          </div>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="whatsapp-float-btn position-relative"
        aria-label="Chat with Mindora on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </aside>
  );
};
