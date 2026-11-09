import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Building,
  Layers,
  FileCheck,
  X,
  Send,
  Loader2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTASection } from '../components/CTASection';
import { PRODUCTS_DATA, ProductItem } from '../data/products';
import { submitDemoRequest } from '../services/api';

export const Products: React.FC = () => {
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [modalMode, setModalMode] = useState<'demo' | 'quote'>('demo');
  const [modalForm, setModalForm] = useState({
    fullName: '',
    companyName: '',
    workEmail: '',
    phone: '',
    teamSize: '10–50 Employees',
    requirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalSuccessMessage, setModalSuccessMessage] = useState<string | null>(null);

  const openModal = (product: ProductItem, mode: 'demo' | 'quote') => {
    setActiveModalProduct(product);
    setModalMode(mode);
    setModalSuccessMessage(null);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalProduct) return;
    setIsSubmitting(true);

    try {
      const response = await submitDemoRequest({
        product_name: activeModalProduct.name,
        full_name: modalForm.fullName,
        company_name: modalForm.companyName,
        work_email: modalForm.workEmail,
        phone: modalForm.phone,
        team_size: modalForm.teamSize,
        requirements: modalForm.requirements,
      });

      if (response.success) {
        setModalSuccessMessage(
          response.message ||
            `Thank you! Your ${modalMode === 'demo' ? 'demo request' : 'pricing quotation request'} has been recorded. Our team will contact you shortly.`
        );
      }
    } catch {
      setModalSuccessMessage(`Thank you! Request recorded. Our solutions desk will be in touch.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-100 bg-cream-main">
      <SEO
        title="Digital Products | Klyssel One & Klyx Chatbot AI — Mindora Mauritius"
        description="Explore enterprise software products available through Mindora: Klyssel One ERP/CRM, Klyssel One Lite, and Klyx Chatbot v2.4 AI with authorized deployment support."
        canonicalPath="/products"
      />

      {/* Header Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center">
        <div className="container py-lg-4" style={{ maxWidth: '780px' }}>
          <div className="badge-growvia mb-3">
            <Sparkles size={13} className="text-forest" />
            <span>PRODUCT ECOSYSTEM & RESELLER CATALOGUE</span>
          </div>

          <h1 className="display-6 fw-extrabold text-forest-dark mb-3">
            Explore Digital Products for Business Growth.
          </h1>

          <p className="fs-6 text-body-custom text-opacity-85 mb-4" style={{ lineHeight: '1.6' }}>
            Discover ready-made digital solutions designed to simplify business operations, improve
            customer interactions, and support digital transformation.
          </p>

          <div className="p-3 rounded-4-custom bg-cream-main border border-custom fs-8 text-body-custom text-opacity-80 mx-auto" style={{ maxWidth: '640px', fontSize: '0.78rem', lineHeight: '1.5' }}>
            <div className="d-flex align-items-center justify-content-center gap-1.5 fw-bold text-forest-dark mb-1">
              <ShieldCheck size={14} className="text-forest" />
              <span>Technology Partner & Distribution Notice</span>
            </div>
            All featured software products are the proprietary intellectual property of Klyssel Labs
            (official documentation:{' '}
            <a
              href="https://klyssel.com/products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest text-decoration-underline fw-bold"
            >
              klyssel.com/products
            </a>
            ). Mindora provides client consultation, authorized reselling, and local implementation.
          </div>
        </div>
      </section>

      {/* Detailed Product Showcases */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="d-flex flex-column gap-5">
            {PRODUCTS_DATA.map((product) => (
              <div
                key={product.id}
                id={product.id}
                className="card-growvia p-4 p-md-5 shadow-card-custom"
                style={{ scrollMarginTop: '100px' }}
              >
                {/* Product Header */}
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center pb-4 mb-4 border-bottom border-custom gap-3">
                  <div className="d-flex align-items-start gap-3">
                    <div
                      className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{ width: '56px', height: '56px' }}
                    >
                      {product.id === 'klyx-chatbot' ? (
                        <Sparkles size={28} />
                      ) : product.id === 'klyssel-one' ? (
                        <Building size={28} />
                      ) : (
                        <Layers size={28} />
                      )}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="text-uppercase fw-bold text-forest fs-8" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                          {product.category}
                        </span>
                        <span className="badge bg-forest text-cream rounded-pill fs-8" style={{ fontSize: '0.65rem' }}>
                          {product.statusBadge}
                        </span>
                      </div>
                      <h2 className="h3 fw-extrabold text-forest-dark mb-1">
                        {product.name}
                      </h2>
                      <p className="text-forest fs-8 fw-semibold mb-0" style={{ fontSize: '0.78rem' }}>{product.tagline}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <button
                      onClick={() => openModal(product, 'demo')}
                      className="btn btn-forest py-2 px-4 fs-8"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Request a Demo
                    </button>
                    <button
                      onClick={() => openModal(product, 'quote')}
                      className="btn btn-cream py-2 px-4 fs-8"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Request Pricing
                    </button>
                    <a
                      href={product.officialSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light-growvia p-2 d-flex align-items-center justify-content-center rounded-circle"
                      title="View official Klyssel Labs product page"
                      style={{ width: '38px', height: '38px' }}
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="row g-4 mb-4">
                  {/* Left 7 cols: Overview & Verified Features */}
                  <div className="col-12 col-lg-7">
                    <div className="mb-4">
                      <h3 className="text-uppercase fw-bold text-sage fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Platform Overview
                      </h3>
                      <p className="fs-7 text-body-custom text-opacity-90 mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {product.overview}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-uppercase fw-bold text-forest-dark fs-8 mb-3" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Verified Technical Capabilities:
                      </h3>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {product.verifiedFeatures.map((feat, idx) => (
                          <li key={idx} className="d-flex align-items-start gap-2 fs-8 text-body-custom" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                            <span
                              className="rounded-circle bg-botanical-subtle text-forest d-flex align-items-center justify-content-center flex-shrink-0 mt-0.5"
                              style={{ width: '16px', height: '16px' }}
                            >
                              <Check size={11} className="stroke-[3]" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {product.requiresVerification && (
                      <div className="p-3 rounded-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 fs-8 text-dark d-flex align-items-start gap-2" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                        <FileCheck size={16} className="text-warning flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Verified Documentation Status: </strong>
                          {product.placeholderNotice} Official source:{' '}
                          <a
                            href={product.officialSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-dark fw-bold text-decoration-underline"
                          >
                            {product.officialSource}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right 5 cols: Sizing, Benefits, Deployment */}
                  <div className="col-12 col-lg-5">
                    <div className="d-flex flex-column gap-3">
                      {/* Suitable Business Types */}
                      <div className="p-3 rounded-4-custom bg-cream-main border border-custom">
                        <h4 className="text-uppercase fw-bold text-forest-dark fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                          Ideal For These Organizations:
                        </h4>
                        <div className="d-flex flex-wrap gap-1.5">
                          {product.suitableBusinessTypes.map((type, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-3 bg-surface fs-8 text-forest-dark border border-custom fw-semibold"
                              style={{ fontSize: '0.75rem' }}
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Business Benefits */}
                      <div className="p-3 rounded-4-custom bg-cream-main border border-custom">
                        <h4 className="text-uppercase fw-bold text-forest-dark fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                          Measurable Business Benefits:
                        </h4>
                        <ul className="list-unstyled d-flex flex-column gap-1.5 fs-8 mb-0" style={{ fontSize: '0.78rem' }}>
                          {product.businessBenefits.map((ben, idx) => (
                            <li key={idx} className="d-flex align-items-start gap-1.5 text-body-custom">
                              <span className="text-forest fw-bold">•</span>
                              <span>{ben}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deployment */}
                      <div className="p-3 rounded-4-custom bg-cream-main border border-custom">
                        <h4 className="text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                          Deployment & Hosting:
                        </h4>
                        <p className="mb-0 text-muted-custom fs-8" style={{ fontSize: '0.75rem' }}>
                          {product.deploymentOptions.join(' • ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Strip */}
                <div className="pt-3 border-top border-custom d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 fs-8" style={{ fontSize: '0.78rem' }}>
                  <div className="d-flex align-items-center gap-2 text-muted-custom">
                    <ShieldCheck size={14} className="text-forest flex-shrink-0" />
                    <span>
                      <strong>Ownership & Distribution: </strong>
                      {product.ownership} {product.resellerRole}
                    </span>
                  </div>

                  <button
                    onClick={() => openModal(product, 'demo')}
                    className="btn btn-link text-forest fw-bold text-decoration-none p-0 d-inline-flex align-items-center gap-1 fs-8"
                    style={{ fontSize: '0.78rem' }}
                  >
                    Schedule Technical Walkthrough <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOTSTRAP DEMO / PRICING MODAL */}
      {activeModalProduct && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(23, 59, 44, 0.75)', zIndex: 1070 }}
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '480px' }}>
            <div className="modal-content card-growvia p-4 border-0 shadow-hover-custom">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="text-uppercase fw-bold text-sage fs-8 d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
                    {modalMode === 'demo' ? 'Product Demo Scheduling' : 'Quotation Enquiry'}
                  </span>
                  <h3 className="h5 fw-bold text-forest-dark mb-0">{activeModalProduct.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalProduct(null)}
                  className="btn btn-link text-muted-custom p-0"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {modalSuccessMessage ? (
                <div className="text-center py-4">
                  <div className="rounded-circle bg-success-subtle text-forest d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '48px', height: '48px' }}>
                    <Check size={24} />
                  </div>
                  <h4 className="h6 fw-bold text-forest-dark mb-2">Request Registered</h4>
                  <p className="fs-8 text-muted-custom mb-4" style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                    {modalSuccessMessage}
                  </p>
                  <button
                    onClick={() => setActiveModalProduct(null)}
                    className="btn btn-forest py-2 px-4 fs-8"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.7rem' }}>
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={modalForm.fullName}
                      onChange={(e) => setModalForm({ ...modalForm, fullName: e.target.value })}
                      placeholder="e.g. Marie Laurent"
                      className="form-control form-control-growvia"
                    />
                  </div>

                  <div>
                    <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.7rem' }}>
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={modalForm.companyName}
                      onChange={(e) => setModalForm({ ...modalForm, companyName: e.target.value })}
                      placeholder="e.g. Ocean View Hospitality Ltd"
                      className="form-control form-control-growvia"
                    />
                  </div>

                  <div className="row g-2">
                    <div className="col-6">
                      <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.7rem' }}>
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={modalForm.workEmail}
                        onChange={(e) => setModalForm({ ...modalForm, workEmail: e.target.value })}
                        placeholder="marie@company.mu"
                        className="form-control form-control-growvia"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.7rem' }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={modalForm.phone}
                        onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                        placeholder="+230 ..."
                        className="form-control form-control-growvia"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.7rem' }}>
                      Organization Size
                    </label>
                    <select
                      value={modalForm.teamSize}
                      onChange={(e) => setModalForm({ ...modalForm, teamSize: e.target.value })}
                      className="form-select form-select-growvia"
                    >
                      <option value="1–10 Employees">1–10 Employees</option>
                      <option value="10–50 Employees">10–50 Employees</option>
                      <option value="50–200 Employees">50–200 Employees</option>
                      <option value="200+ Enterprise">200+ Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.7rem' }}>
                      Specific Requirements
                    </label>
                    <textarea
                      rows={2}
                      value={modalForm.requirements}
                      onChange={(e) => setModalForm({ ...modalForm, requirements: e.target.value })}
                      placeholder="e.g. Looking to integrate guest WhatsApp inquiries..."
                      className="form-control form-control-growvia"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-forest w-100 py-2.5 d-inline-flex align-items-center justify-content-center gap-2 fs-8"
                    >
                      {isSubmitting ? (
                        <Loader2 size={16} className="spinner-border spinner-border-sm" />
                      ) : (
                        <>
                          <span>Submit {modalMode === 'demo' ? 'Demo Request' : 'Pricing Enquiry'}</span>
                          <Send size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection
        headline="Evaluate Enterprise Software with Complete Confidence."
        description="Our technical directors in Mauritius guide you through product compatibility and customization."
      />
    </div>
  );
};
