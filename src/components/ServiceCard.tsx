import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ServiceCategory } from '../data/services';
import { ServiceIcon } from './ServiceIcon';

interface ServiceCardProps {
  service: ServiceCategory;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="card card-growvia h-100 p-4 shadow-card-custom d-flex flex-column justify-content-between">
      {/* Top Header */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div
            className="rounded-3 bg-forest-subtle text-sage d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '50px', height: '50px', border: '1px solid rgba(133, 55, 252, 0.3)' }}
          >
            <ServiceIcon name={service.iconName} size={24} />
          </div>
          <span className="font-monospace fw-bold text-sage fs-8" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            {service.number}
          </span>
        </div>

        <h3 className="h5 fw-bold text-white mb-2" style={{ lineHeight: '1.3' }}>
          {service.title}
        </h3>

        <p className="text-secondary fs-7 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#94A3B8' }}>
          {service.shortDescription}
        </p>

        {/* Capabilities Snippet */}
        <div className="pt-3 border-top border-custom mb-4">
          <span className="text-uppercase fw-bold text-sage d-block mb-2" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>
            Capabilities Included:
          </span>
          <div className="d-flex flex-column gap-1.5">
            {service.subServices.slice(0, 3).map((sub) => (
              <div key={sub.name} className="d-flex align-items-center gap-2 fs-8" style={{ fontSize: '0.78rem', color: '#CBD5E1' }}>
                <CheckCircle2 size={13} className="text-sage flex-shrink-0" />
                <span className="text-truncate">{sub.name}</span>
              </div>
            ))}
            {service.subServices.length > 3 && (
              <span className="text-sage fw-medium pt-1" style={{ fontSize: '0.72rem' }}>
                + {service.subServices.length - 3} more tailored capabilities
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="pt-3 border-top border-custom d-flex align-items-center justify-content-between">
        <Link
          to={`/services#${service.id}`}
          className="text-sage fw-bold text-decoration-none d-inline-flex align-items-center gap-1 fs-8"
          style={{ fontSize: '0.78rem' }}
        >
          Explore Service
          <ArrowUpRight size={14} />
        </Link>

        <Link
          to={`/contact?service=${service.id}`}
          className="badge-sage text-decoration-none"
        >
          Request Quote
        </Link>
      </div>
    </div>
  );
};
