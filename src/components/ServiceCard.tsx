import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ServiceCategory } from '../data/services';
import { ServiceIcon } from './ServiceIcon';

interface ServiceCardProps {
  service: ServiceCategory;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="card card-growvia h-100 p-4 p-lg-4 d-flex flex-column justify-content-between">
      {/* Top Header */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div
            className="rounded-3 bg-surface-solid text-sage d-flex align-items-center justify-content-center shadow-sm"
            style={{ width: '46px', height: '46px', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <ServiceIcon name={service.iconName} size={22} />
          </div>
          <span className="font-monospace fw-bold text-sage fs-8" style={{ fontSize: '0.72rem', opacity: 0.7 }}>
            {service.number}
          </span>
        </div>

        <h3 className="h5 fw-bold text-white mb-2" style={{ lineHeight: '1.3' }}>
          {service.title}
        </h3>

        <p className="text-secondary fs-7 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#94A3B8' }}>
          {service.shortDescription}
        </p>

        {/* Minimalist Capability Tags */}
        <div className="d-flex flex-wrap gap-1.5 mb-4">
          {service.subServices.slice(0, 3).map((sub) => (
            <span
              key={sub.name}
              className="px-2.5 py-1 rounded-pill bg-surface-solid fs-8 text-secondary border border-custom"
              style={{ fontSize: '0.72rem', color: '#CBD5E1' }}
            >
              {sub.name}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA Row */}
      <div className="pt-3 border-top border-custom d-flex align-items-center justify-content-between">
        <Link
          to={`/services#${service.id}`}
          className="text-sage fw-bold text-decoration-none d-inline-flex align-items-center gap-1 fs-8"
          style={{ fontSize: '0.78rem' }}
        >
          <span>Explore Details</span>
          <ArrowUpRight size={14} />
        </Link>

        <Link
          to={`/contact?service=${service.id}`}
          className="badge-sage text-decoration-none py-1 px-3"
          style={{ fontSize: '0.68rem' }}
        >
          Quote
        </Link>
      </div>
    </div>
  );
};
