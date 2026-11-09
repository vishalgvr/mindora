import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ExternalLink, Shield, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_CONFIG } from '../config/company';
import { SERVICES_DATA } from '../data/services';
import { PRODUCTS_DATA } from '../data/products';

export const Footer: React.FC = () => {
  const { contact, partner, structure, location } = COMPANY_CONFIG;

  return (
    <footer className="bg-forest-dark text-cream-light pt-5 pb-4 mt-auto">
      <div className="container">
        {/* Main Columns Grid */}
        <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-25">
          {/* Column 1: Brand & Positioning */}
          <div className="col-12 col-lg-5 pe-lg-4">
            <Logo variant="full" theme="light" iconSize={38} className="mb-3" />
            <p className="text-light text-opacity-75 fs-7 mb-4" style={{ maxWidth: '380px', lineHeight: '1.6', fontSize: '0.85rem' }}>
              Empowering businesses in Mauritius and international markets with smart technology,
              intelligent AI automation, custom software, and robust enterprise digital products.
            </p>

            <div className="d-flex flex-column gap-2 text-light text-opacity-75 fs-8 mb-4" style={{ fontSize: '0.78rem' }}>
              <div className="d-flex align-items-center gap-2">
                <MapPin size={15} className="text-sage flex-shrink-0" />
                <span>Location: {location.country} ({location.region})</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Shield size={15} className="text-sage flex-shrink-0" />
                <span>Governance: {structure.type}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={15} className="text-sage flex-shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-cream text-decoration-none text-opacity-80"
                >
                  {contact.email}
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={15} className="text-sage flex-shrink-0" />
                <span>{contact.phone}</span>
              </div>
            </div>

            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-forest border border-sage-custom fs-8" style={{ fontSize: '0.72rem' }}>
              <CheckCircle2 size={13} className="text-sage" />
              <span className="text-sage">Independent Brand • Mauritius Registered</span>
            </div>
          </div>

          {/* Column 2: Digital Services */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-uppercase text-sage fw-bold fs-8 tracking-wider mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              Digital Services
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-8 mb-0" style={{ fontSize: '0.78rem' }}>
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="text-light text-opacity-75 text-decoration-none"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/services" className="text-sage text-decoration-none fw-bold">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Digital Products & Verticals */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-uppercase text-sage fw-bold fs-8 tracking-wider mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              Digital Products
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-8 mb-4" style={{ fontSize: '0.78rem' }}>
              {PRODUCTS_DATA.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/products#${product.id}`}
                    className="text-light text-opacity-75 text-decoration-none"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h6 className="text-uppercase text-sage fw-bold fs-8 tracking-wider mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              Industries
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-1 fs-8 mb-0" style={{ fontSize: '0.75rem' }}>
              <li><Link to="/industries" className="text-light text-opacity-75 text-decoration-none">Hospitality & Tourism</Link></li>
              <li><Link to="/industries" className="text-light text-opacity-75 text-decoration-none">Healthcare & Retail</Link></li>
              <li><Link to="/industries" className="text-light text-opacity-75 text-decoration-none">Finance & Startups</Link></li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-uppercase text-sage fw-bold fs-8 tracking-wider mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              Company
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-8 mb-4" style={{ fontSize: '0.78rem' }}>
              <li><Link to="/about" className="text-light text-opacity-75 text-decoration-none">About Mindora</Link></li>
              <li><Link to="/about#directors" className="text-light text-opacity-75 text-decoration-none">Leadership Structure</Link></li>
              <li><Link to="/insights" className="text-light text-opacity-75 text-decoration-none">Technology Insights</Link></li>
              <li><Link to="/contact" className="text-light text-opacity-75 text-decoration-none">Get a Consultation</Link></li>
              <li><Link to="/privacy" className="text-light text-opacity-75 text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-light text-opacity-75 text-decoration-none">Terms & Conditions</Link></li>
            </ul>

            {/* Technology Partner Notice */}
            <div className="pt-3 border-top border-secondary border-opacity-25">
              <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>
                Technology Partner
              </span>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light text-opacity-90 text-decoration-none fs-8 d-inline-flex align-items-center gap-1"
                style={{ fontSize: '0.8rem' }}
              >
                <span>{partner.name}</span>
                <ExternalLink size={12} className="text-sage" />
              </a>
            </div>
          </div>
        </div>

        {/* Partnership & Resale Disclosure */}
        <div className="py-4 border-bottom border-secondary border-opacity-25">
          <p className="mb-0 text-light text-opacity-50 fs-8" style={{ fontSize: '0.72rem', lineHeight: '1.5' }}>
            <strong className="text-sage fw-semibold">Technology Ecosystem Notice: </strong>
            {partner.relationshipDisclaimer}
          </p>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 fs-8 text-light text-opacity-60" style={{ fontSize: '0.75rem' }}>
          <p className="mb-0">© 2026 Mindora Digital Solutions. All Rights Reserved. Mauritius.</p>
          <div className="d-flex align-items-center gap-3">
            <Link to="/privacy" className="text-light text-opacity-60 text-decoration-none">Privacy Policy</Link>
            <Link to="/terms" className="text-light text-opacity-60 text-decoration-none">Terms of Service</Link>
            <Link to="/contact" className="text-light text-opacity-60 text-decoration-none">Request a Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
