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
    <div className="card card-growvia h-100 p-4 shadow-soft-custom d-flex flex-column justify-content-between">
      {/* Top Header */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div
            className="rounded-3 bg-botanical-subtle text-forest d-flex align-items-center justify-content-center"
            style={{ width: '50px', height: '50px' }}
          >
            <ServiceIcon name={service.iconName} size={24} />
          </div>
          <span className="font-monospace fw-bold text-forest text-opacity-50 fs-8" style={{ fontSize: '0.75rem' }}>
            {service.number}
          </span>
        </div>

        <h3 className="h5 fw-bold text-forest-dark mb-2" style={{ lineHeight: '1.3' }}>
          {service.title}
        </h3>

        <p className="text-body-custom text-opacity-80 fs-7 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
          {service.shortDescription}
        </p>

        {/* Capabilities Snippet */}
        <div className="pt-3 border-top border-custom mb-4">
          <span className="text-uppercase fw-bold text-sage d-block mb-2" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>
            Capabilities Included:
          </span>
          <div className="d-flex flex-column gap-1">
            {service.subServices.slice(0, 3).map((sub) => (
              <div key={sub.name} className="d-flex align-items-center gap-2 fs-8 text-body-custom" style={{ fontSize: '0.78rem' }}>
                <CheckCircle2 size={13} className="text-forest flex-shrink-0" />
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
          className="text-forest fw-bold text-decoration-none d-inline-flex align-items-center gap-1 fs-8"
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
