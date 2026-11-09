import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ShieldCheck, ArrowRight, ExternalLink, Sparkles, Building, Layers } from 'lucide-react';
import { ProductItem } from '../data/products';

interface ProductCardProps {
  product: ProductItem;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  return (
    <div
      id={product.id}
      className={`card card-growvia h-100 p-4 d-flex flex-column justify-content-between ${
        featured ? 'border-2 border-forest-custom shadow-hover-custom' : 'shadow-card-custom'
      }`}
    >
      <div>
        {/* Top Badges */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="badge-growvia">
            <Sparkles size={11} className="text-forest" />
            {product.category}
          </span>
          <span className="badge bg-forest text-cream-light text-uppercase fw-bold rounded-pill" style={{ fontSize: '0.68rem' }}>
            {product.statusBadge}
          </span>
        </div>

        {/* Product Visual Brand Header */}
        <div className="d-flex align-items-start gap-3 mb-3">
          <div
            className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
            style={{ width: '50px', height: '50px' }}
          >
            {product.id === 'klyx-chatbot' ? (
              <Sparkles size={24} />
            ) : product.id === 'klyssel-one' ? (
              <Building size={24} />
            ) : (
              <Layers size={24} />
            )}
          </div>
          <div>
            <h3 className="h4 fw-bold text-forest-dark mb-1">{product.name}</h3>
            <p className="text-forest fs-8 fw-semibold mb-0" style={{ fontSize: '0.75rem' }}>{product.tagline}</p>
          </div>
        </div>

        {/* Resale & Ownership Disclosure */}
        <div className="p-2.5 rounded-3 bg-cream-main border border-custom mb-3" style={{ fontSize: '0.75rem' }}>
          <div className="d-flex align-items-center gap-1.5 fw-bold text-forest-dark mb-1">
            <ShieldCheck size={13} className="text-forest" />
            <span>Authorized Partner & Reseller Distribution</span>
          </div>
          <p className="mb-0 text-muted-custom" style={{ fontSize: '0.7rem' }}>{product.ownership}</p>
        </div>

        {/* Description */}
        <p className="text-body-custom text-opacity-85 fs-7 mb-4" style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
          {product.shortDescription}
        </p>

        {/* Key Features */}
        <div className="mb-4">
          <h4 className="text-uppercase fw-bold text-forest-dark fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            Verified Key Capabilities
          </h4>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            {product.verifiedFeatures.slice(0, 5).map((feature, idx) => (
              <li key={idx} className="d-flex align-items-start gap-2 fs-8 text-body-custom" style={{ fontSize: '0.78rem' }}>
                <span
                  className="rounded-circle bg-botanical-subtle text-forest d-flex align-items-center justify-content-center flex-shrink-0 mt-0.5"
                  style={{ width: '16px', height: '16px' }}
                >
                  <Check size={11} className="stroke-[3]" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Verification Note */}
        {product.requiresVerification && (
          <div className="p-2.5 rounded-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 mb-4 text-dark" style={{ fontSize: '0.7rem', lineHeight: '1.4' }}>
            <strong>Verification Note: </strong>
            Sourced via official Klyssel Labs ecosystem records ({product.officialSource}).
            Deployment configuration customized during consultation.
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-top border-custom">
        <div className="row g-2 mb-2">
          <div className="col-6">
            <Link
              to={`/contact?product=${product.id}&intent=demo`}
              className="btn btn-forest w-100 py-2 fs-8 text-center"
              style={{ fontSize: '0.75rem' }}
            >
              Request a Demo
            </Link>
          </div>
          <div className="col-6">
            <Link
              to={`/contact?product=${product.id}&intent=quote`}
              className="btn btn-cream w-100 py-2 fs-8 text-center"
              style={{ fontSize: '0.75rem' }}
            >
              Enquire Now
            </Link>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between pt-1">
          <Link
            to={`/products#${product.id}`}
            className="text-forest fw-bold text-decoration-none fs-8 d-inline-flex align-items-center gap-1"
            style={{ fontSize: '0.75rem' }}
          >
            Product Details <ArrowRight size={12} />
          </Link>
          <a
            href={product.officialSource}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-custom text-decoration-none fs-8 d-inline-flex align-items-center gap-1"
            style={{ fontSize: '0.7rem' }}
          >
            Official Spec <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
};
