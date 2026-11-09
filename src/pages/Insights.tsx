import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Tag,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { CTASection } from '../components/CTASection';
import { INSIGHTS_DATA, BlogPost } from '../data/insights';
import { subscribeNewsletter } from '../services/api';

export const Insights: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    await subscribeNewsletter(newsletterEmail);
    setSubscribed(true);
  };

  return (
    <div className="w-100 bg-cream-main">
      <SEO
        title="Technology Insights & Strategy | Mindora Mauritius"
        description="Authoritative articles on AI automation, SaaS vs custom software architecture, and digital transformation for businesses in Mauritius and the Indian Ocean."
        canonicalPath="/insights"
      />

      {/* Header Banner */}
      <section className="py-5 bg-surface border-bottom border-custom text-center">
        <div className="container py-lg-4" style={{ maxWidth: '780px' }}>
          <div className="badge-growvia mb-3">
            <BookOpen size={13} className="text-forest" />
            <span>KNOWLEDGE & EDITORIAL INSIGHTS</span>
          </div>

          <h1 className="display-6 fw-extrabold text-forest-dark mb-3">
            Insights on AI, Software & Automation.
          </h1>

          <p className="fs-6 text-body-custom text-opacity-85 mb-0" style={{ lineHeight: '1.6' }}>
            Practical analyses written by our technical consultants to help executives navigate
            digital transformation with clarity and measurable ROI.
          </p>
        </div>
      </section>

      {/* Articles Feed */}
      <section className="py-5">
        <div className="container py-lg-4">
          <div className="row g-5">
            {/* Main Articles List (8 cols) */}
            <div className="col-12 col-lg-8">
              <div className="d-flex flex-column gap-4">
                {INSIGHTS_DATA.map((post: BlogPost) => (
                  <article
                    key={post.id}
                    id={post.slug}
                    className="card-growvia p-4 p-md-5 shadow-soft-custom"
                  >
                    <div className="d-flex flex-wrap align-items-center gap-3 fs-8 text-muted-custom mb-3" style={{ fontSize: '0.75rem' }}>
                      <span className="badge-growvia">
                        {post.category}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Clock size={12} className="text-sage" />
                        {post.readTime}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <Calendar size={12} className="text-sage" />
                        {post.publishDate}
                      </span>
                    </div>

                    <h2 className="h4 fw-bold text-forest-dark mb-3" style={{ lineHeight: '1.4' }}>
                      {post.title}
                    </h2>

                    <p className="fs-7 text-body-custom text-opacity-85 mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                      {post.excerpt}
                    </p>

                    {/* Body preview */}
                    <div className="pt-3 border-top border-custom d-flex flex-column gap-2 text-muted-custom fs-8" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                      {post.content.map((paragraph, idx) => (
                        <p key={idx} className="mb-1">{paragraph}</p>
                      ))}
                    </div>

                    {/* Tags & Author Footer */}
                    <div className="pt-3 mt-3 border-top border-custom d-flex flex-wrap justify-content-between align-items-center gap-2 fs-8" style={{ fontSize: '0.72rem' }}>
                      <div className="d-flex align-items-center gap-1.5">
                        <Tag size={12} className="text-sage" />
                        <div className="d-flex flex-wrap gap-1">
                          {post.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-2 bg-cream-main border border-custom text-muted-custom">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="text-muted-custom fw-semibold">By {post.author}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="col-12 col-lg-4">
              <div className="d-flex flex-column gap-4">
                {/* Newsletter Box */}
                <div className="card-growvia p-4 shadow-card-custom">
                  <div
                    className="rounded-3 bg-forest text-cream d-flex align-items-center justify-content-center p-2 mb-3 shadow-sm"
                    style={{ width: '42px', height: '42px' }}
                  >
                    <Mail size={20} />
                  </div>
                  <h3 className="h6 fw-bold text-forest-dark mb-2">Technology Executive Briefing</h3>
                  <p className="text-muted-custom fs-8 mb-3" style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
                    Join Mauritius and regional business leaders receiving our monthly briefing on
                    practical AI use cases and software strategies.
                  </p>

                  {subscribed ? (
                    <div className="alert alert-success d-flex align-items-center gap-2 p-2.5 fs-8 mb-0" style={{ fontSize: '0.78rem' }}>
                      <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                      <span>You are subscribed to Mindora Insights.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="d-flex flex-column gap-2">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Corporate email"
                        className="form-control form-control-growvia fs-8"
                      />
                      <button
                        type="submit"
                        className="btn btn-forest py-2 fs-8 text-uppercase"
                        style={{ fontSize: '0.75rem' }}
                      >
                        Subscribe Free
                      </button>
                    </form>
                  )}
                </div>

                {/* Consultation Callout */}
                <div className="p-4 rounded-4-custom bg-forest-dark text-cream-light border border-secondary border-opacity-25 shadow-card-custom">
                  <span className="text-uppercase text-sage fw-bold fs-8 d-block mb-2" style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}>
                    Have an implementation question?
                  </span>
                  <h3 className="h5 fw-bold text-cream-light mb-2">
                    Apply these blueprints to your enterprise.
                  </h3>
                  <p className="text-light text-opacity-80 fs-8 mb-3" style={{ fontSize: '0.78rem', lineHeight: '1.5' }}>
                    Consult directly with our Mauritius solutions directors to evaluate feasibility.
                  </p>
                  <Link
                    to="/contact"
                    className="text-sage fw-bold text-decoration-none d-inline-flex align-items-center gap-1 fs-8"
                    style={{ fontSize: '0.78rem' }}
                  >
                    <span>Request a Strategy Session</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};
