import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  MessageCircle,
  Mail,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';
import { submitLeadEnquiry, LeadEnquiryResponse } from '../services/api';

export const ContactForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { whatsappNumber, whatsappPrefillMessage } = COMPANY_CONFIG.contact;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: 'Mauritius',
    serviceOrProduct: 'AI Development',
    estimatedBudget: 'Not Decided',
    projectDescription: '',
    consent: true,
    website_hp: '', // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<LeadEnquiryResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-select service or product from URL query parameters
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const productParam = searchParams.get('product');

    if (productParam) {
      if (productParam.includes('klyssel-one-lite')) {
        setFormData((prev) => ({ ...prev, serviceOrProduct: 'Klyssel One Lite' }));
      } else if (productParam.includes('klyssel-one')) {
        setFormData((prev) => ({ ...prev, serviceOrProduct: 'Klyssel One' }));
      } else if (productParam.includes('klyx')) {
        setFormData((prev) => ({ ...prev, serviceOrProduct: 'Klyx Chatbot' }));
      }
    } else if (serviceParam) {
      const map: Record<string, string> = {
        'ai-automation': 'AI Development',
        'data-analytics': 'Data Analytics',
        'custom-software': 'Custom Software',
        'mobile-development': 'Mobile App Development',
        'data-engineering': 'Custom Software',
        'digital-marketing': 'Digital Marketing',
        'ui-ux-design': 'UI/UX Design',
        'tech-consulting': 'Technology Consulting',
      };
      if (map[serviceParam]) {
        setFormData((prev) => ({ ...prev, serviceOrProduct: map[serviceParam] }));
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('Please provide your company or organization name.');
      return;
    }
    if (!formData.consent) {
      setErrorMessage('Please accept the privacy consent checkbox to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLeadEnquiry({
        full_name: formData.fullName,
        company_name: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        service_or_product: formData.serviceOrProduct,
        estimated_budget: formData.estimatedBudget,
        project_description: formData.projectDescription,
        consent_given: formData.consent,
        website_hp: formData.website_hp,
      });

      setSubmissionResponse(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit enquiry.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (submissionResponse?.reference_id) {
      navigator.clipboard.writeText(submissionResponse.reference_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadReceipt = () => {
    if (!submissionResponse) return;
    const content = `=====================================================
MINDORA DIGITAL SOLUTIONS — QUOTATION ENQUIRY RECEIPT
=====================================================
Reference ID : ${submissionResponse.reference_id}
Date         : ${submissionResponse.created_at}
Company      : ${formData.companyName}
Contact Name : ${formData.fullName}
Email        : ${formData.email}
Phone        : ${formData.phone}
Country      : ${formData.country}
Solution     : ${formData.serviceOrProduct}
Budget       : ${formData.estimatedBudget}

Description  :
${formData.projectDescription || 'Initial consultation request.'}
=====================================================
Mindora Executive Office: Mauritius
Technology Ecosystem: Klyssel Labs Partner
Official Site: https://mindora.mu
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mindora-Enquiry-${submissionResponse.reference_id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // SUCCESS VIEW
  if (submissionResponse) {
    return (
      <div className="card-growvia p-4 p-md-5 shadow-hover-custom mx-auto" style={{ maxWidth: '640px' }}>
        <div
          className="rounded-4-custom bg-success-subtle text-forest d-flex align-items-center justify-content-center mx-auto mb-4"
          style={{ width: '64px', height: '64px' }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h3 className="h3 fw-extrabold text-forest-dark text-center mb-2">
          Quotation Enquiry Received
        </h3>

        <p className="fs-7 text-body-custom text-center mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
          Thank you, <strong className="text-forest-dark">{formData.fullName}</strong>. Your enquiry
          has been generated and recorded. Our Mauritius solutions directors will review your
          scope and prepare your customized proposal.
        </p>

        {/* Reference Code Box */}
        <div className="p-4 rounded-4-custom bg-cream-main border border-custom mb-4">
          <div className="d-flex justify-content-between text-muted-custom fs-8 fw-semibold text-uppercase mb-1" style={{ fontSize: '0.72rem' }}>
            <span>Enquiry Reference Code</span>
            <span>Mauritius Lead Desk</span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <span className="h4 fw-extrabold text-forest-dark font-monospace mb-0">
              {submissionResponse.reference_id}
            </span>
            <div className="d-flex gap-2">
              <button
                onClick={handleCopyReference}
                className="btn btn-forest py-1 px-3 fs-8 d-inline-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem' }}
                title="Copy reference code"
              >
                <Copy size={13} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownloadReceipt}
                className="btn btn-cream py-1 px-3 fs-8 d-inline-flex align-items-center gap-1"
                style={{ fontSize: '0.75rem' }}
                title="Download text receipt"
              >
                <Download size={13} />
                <span>Receipt</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dispatch Action Strip */}
        <div className="mb-4">
          <span className="text-uppercase fw-bold text-sage fs-8 d-block mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            Instant Direct Dispatch Options:
          </span>
          <div className="row g-2">
            <div className="col-12 col-sm-6">
              <a
                href={submissionResponse.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success w-100 py-2.5 d-inline-flex align-items-center justify-content-center gap-2 fs-8 fw-bold text-uppercase"
                style={{ fontSize: '0.75rem' }}
              >
                <MessageCircle size={16} />
                Send via WhatsApp
              </a>
            </div>
            <div className="col-12 col-sm-6">
              <a
                href={submissionResponse.email_mailto_url}
                className="btn btn-forest w-100 py-2.5 d-inline-flex align-items-center justify-content-center gap-2 fs-8 fw-bold text-uppercase"
                style={{ fontSize: '0.75rem' }}
              >
                <Mail size={16} />
                Send via Corporate Email
              </a>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-4 fs-8 text-body-custom pt-3 border-top border-custom" style={{ fontSize: '0.8rem' }}>
          <h4 className="fw-bold text-uppercase text-forest-dark fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
            What Happens Next:
          </h4>
          <div className="d-flex align-items-start gap-2 mb-2">
            <span className="badge bg-forest text-cream rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}>1</span>
            <span>Technical review of your project scope by our Mauritius solutions architects.</span>
          </div>
          <div className="d-flex align-items-start gap-2 mb-2">
            <span className="badge bg-forest text-cream rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}>2</span>
            <span>We contact you via email ({formData.email}) or phone ({formData.phone}) within 24 business hours.</span>
          </div>
          <div className="d-flex align-items-start gap-2">
            <span className="badge bg-forest text-cream rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}>3</span>
            <span>Initial discovery consultation to finalize architecture and pricing roadmap.</span>
          </div>
        </div>

        {/* Reset */}
        <div className="text-center">
          <button
            onClick={() => setSubmissionResponse(null)}
            className="btn btn-link text-muted-custom fs-8 text-decoration-underline"
            style={{ fontSize: '0.75rem' }}
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  // STANDARD FORM VIEW
  return (
    <form
      onSubmit={handleSubmit}
      className="card-growvia p-4 p-md-5 shadow-card-custom"
      noValidate
    >
      {/* Honeypot field for bot/spam prevention */}
      <div className="d-none" aria-hidden="true">
        <label htmlFor="website_hp">Leave this field blank</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          value={formData.website_hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="alert alert-danger d-flex align-items-center gap-2 p-3 mb-4 rounded-3 fs-8" role="alert" style={{ fontSize: '0.8rem' }}>
          <AlertCircle size={18} className="flex-shrink-0" />
          <div>{errorMessage}</div>
        </div>
      )}

      {/* Grid: Name & Company */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Jean-Luc Perrier"
            className="form-control form-control-growvia"
          />
        </div>

        <div className="col-12 col-sm-6">
          <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Company Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Blue Lagoon Resorts Ltd"
            className="form-control form-control-growvia"
          />
        </div>
      </div>

      {/* Grid: Email & Phone */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Business Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.mu"
            className="form-control form-control-growvia"
          />
        </div>

        <div className="col-12 col-sm-6">
          <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+230 5..."
            className="form-control form-control-growvia"
          />
        </div>
      </div>

      {/* Grid: Country & Service/Product */}
      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Country / Region
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="form-select form-select-growvia"
          >
            <option value="Mauritius">Mauritius</option>
            <option value="Reunion Island">Reunion Island</option>
            <option value="Seychelles">Seychelles</option>
            <option value="South Africa">South Africa</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
            <option value="Other International">Other International</option>
          </select>
        </div>

        <div className="col-12 col-sm-6">
          <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            Service or Product Required <span className="text-danger">*</span>
          </label>
          <select
            name="serviceOrProduct"
            value={formData.serviceOrProduct}
            onChange={handleChange}
            className="form-select form-select-growvia fw-bold"
          >
            <optgroup label="Digital Services">
              <option value="AI Development">AI Development & Automation</option>
              <option value="Custom Software">Custom Software Development</option>
              <option value="Website Development">Corporate Website & Web Apps</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Data Analytics">Data Analytics & Business Intelligence</option>
              <option value="Digital Marketing">Digital Marketing & AI SEO</option>
              <option value="UI/UX Design">UI/UX Design Services</option>
              <option value="Technology Consulting">Technology Consulting</option>
            </optgroup>
            <optgroup label="Featured Digital Products">
              <option value="Klyssel One">Klyssel One (Flagship Enterprise)</option>
              <option value="Klyssel One Lite">Klyssel One Lite (Growth Edition)</option>
              <option value="Klyx Chatbot">Klyx Chatbot v2.4 AI</option>
            </optgroup>
            <option value="Other">Other Specialized Solution</option>
          </select>
        </div>
      </div>

      {/* Budget Choices */}
      <div className="mb-3">
        <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-2" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
          Estimated Budget Range
        </label>
        <div className="row g-2">
          {[
            'Under USD 500',
            'USD 500–1,000',
            'USD 1,000–5,000',
            'USD 5,000–10,000',
            'Above USD 10,000',
            'Not Decided',
          ].map((budget) => (
            <div key={budget} className="col-6 col-md-4">
              <label
                className={`w-100 p-2 text-center rounded-3 border fs-8 fw-semibold cursor-pointer transition-all ${
                  formData.estimatedBudget === budget
                    ? 'bg-forest text-cream-light border-forest shadow-sm'
                    : 'bg-cream-main border-custom text-body-custom'
                }`}
                style={{ fontSize: '0.75rem', cursor: 'pointer' }}
              >
                <input
                  type="radio"
                  name="estimatedBudget"
                  value={budget}
                  checked={formData.estimatedBudget === budget}
                  onChange={handleChange}
                  className="visually-hidden"
                />
                <span>{budget}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Project Description */}
      <div className="mb-3">
        <label className="form-label text-uppercase fw-bold text-forest-dark fs-8 mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
          Project Description & Requirements
        </label>
        <textarea
          name="projectDescription"
          rows={3}
          value={formData.projectDescription}
          onChange={handleChange}
          placeholder="Briefly describe your objectives, existing tech stack, target timeline, and challenges..."
          className="form-control form-control-growvia"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="form-check mb-4">
        <input
          type="checkbox"
          id="consentCheck"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="form-check-input"
        />
        <label htmlFor="consentCheck" className="form-check-label text-muted-custom fs-8" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
          I consent to Mindora storing and processing my commercial enquiry details in accordance with
          the Mauritius Data Protection Act and international privacy standards to receive a project quote.
        </label>
      </div>

      {/* Buttons */}
      <div className="row g-3">
        <div className="col-12 col-sm-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-forest w-100 py-3 d-inline-flex align-items-center justify-content-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="spinner-border spinner-border-sm" />
                <span>Registering Enquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Quotation Request</span>
                <Send size={15} />
              </>
            )}
          </button>
        </div>

        <div className="col-12 col-sm-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappPrefillMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success w-100 py-3 d-inline-flex align-items-center justify-content-center gap-2 fs-8 fw-bold"
            style={{ fontSize: '0.78rem' }}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Submissions notice */}
      <div className="text-center text-muted-custom fs-8 pt-3 d-flex align-items-center justify-content-center gap-1" style={{ fontSize: '0.72rem' }}>
        <ShieldCheck size={13} className="text-forest" />
        <span>Submissions generate an official Mindora quotation reference and instant dispatch links</span>
      </div>
    </form>
  );
};
