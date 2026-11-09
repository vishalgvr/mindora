import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { IndustryItem } from '../data/industries';
import { ServiceIcon } from './ServiceIcon';

interface IndustryCardProps {
  industry: IndustryItem;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  return (
    <div className="card card-growvia h-100 overflow-hidden shadow-soft-custom d-flex flex-column justify-content-between">
      {/* Top Image Container */}
      <div className="position-relative overflow-hidden bg-forest-dark" style={{ height: '180px' }}>
        <img
          src={industry.imageUrl}
          alt={industry.title}
          loading="lazy"
          className="w-100 h-100 object-fit-cover"
          style={{ opacity: 0.85 }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'linear-gradient(to top, rgba(23, 59, 44, 0.9) 0%, rgba(23, 59, 44, 0.2) 60%, transparent 100%)' }}
        />
        
        {/* Floating Badge */}
        <div className="position-absolute bottom-0 start-0 end-0 p-3 text-cream-light d-flex align-items-center gap-2">
          <div
            className="rounded-3 bg-forest text-sage d-flex align-items-center justify-content-center p-1.5 shadow-sm"
            style={{ width: '32px', height: '32px' }}
          >
            <ServiceIcon name={industry.iconName} size={16} />
          </div>
          <span className="fw-bold text-sage text-uppercase fs-8" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>
            {industry.title}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <h4 className="h6 fw-bold text-forest mb-2">{industry.subtitle}</h4>
          <p className="text-body-custom text-opacity-80 fs-8 mb-3" style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
            {industry.description}
          </p>

          <div className="pt-2 border-top border-custom mb-3">
            <span className="text-uppercase fw-bold text-sage d-block mb-1.5" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>
              Tailored Capabilities:
            </span>
            <div className="d-flex flex-column gap-1">
              {industry.tailoredSolutions.slice(0, 2).map((sol, idx) => (
                <div key={idx} className="d-flex align-items-start gap-1.5 fs-8 text-body-custom" style={{ fontSize: '0.75rem' }}>
                  <CheckCircle2 size={12} className="text-forest flex-shrink-0 mt-0.5" />
                  <span className="text-truncate">{sol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-2 border-top border-custom d-flex align-items-center justify-content-between">
          <Link
            to={`/industries#${industry.id}`}
            className="text-forest fw-bold text-decoration-none fs-8 d-inline-flex align-items-center gap-1"
            style={{ fontSize: '0.75rem' }}
          >
            Explore Solutions <ArrowRight size={12} />
          </Link>
          <Link
            to={`/contact?service=tailored&note=${encodeURIComponent(industry.title)}`}
            className="text-muted-custom fs-8 text-decoration-underline"
            style={{ fontSize: '0.68rem' }}
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
};
