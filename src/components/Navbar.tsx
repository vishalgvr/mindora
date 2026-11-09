import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight, Sparkles, Box, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { MAIN_NAV, NavItem } from '../data/navigation';
import { COMPANY_CONFIG } from '../config/company';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for shadow & elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`navbar navbar-expand-lg sticky-top navbar-growvia ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Brand Logo */}
        <Logo variant="full" theme="dark" iconSize={36} />

        {/* Mobile Toggle Button */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <Link to="/contact" className="btn btn-forest py-1 px-3 fs-7" style={{ fontSize: '0.75rem' }}>
            Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-link text-forest-dark p-1"
            type="button"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Navigation Content */}
        <div
          ref={dropdownRef}
          className={`collapse navbar-collapse ${mobileMenuOpen ? 'show mt-3 mt-lg-0' : ''}`}
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
            {MAIN_NAV.map((item: NavItem) => {
              const active = isActive(item.href);

              if (item.hasDropdown && item.children) {
                const isOpen = activeDropdown === item.name;

                return (
                  <li key={item.name} className="nav-item dropdown position-relative">
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : item.name)}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      className={`nav-link nav-link-growvia d-flex align-items-center gap-1 border-0 bg-transparent w-100 ${
                        active || isOpen ? 'active' : ''
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-forest' : ''}`}
                      />
                    </button>

                    {/* Rich Bootstrap Dropdown Menu */}
                    {isOpen && (
                      <div
                        onMouseLeave={() => setActiveDropdown(null)}
                        className={`dropdown-menu dropdown-menu-growvia show position-absolute mt-2 shadow-card-custom ${
                          item.name === 'Services' ? 'dropdown-menu-services' : 'dropdown-menu-products'
                        }`}
                        style={{
                          minWidth: item.name === 'Services' ? '480px' : '360px',
                          zIndex: 1050,
                        }}
                      >
                        <div className={item.name === 'Services' ? 'row g-2' : 'd-flex flex-column gap-2'}>
                          {item.children.map((child) => (
                            <div key={child.name} className={item.name === 'Services' ? 'col-6' : 'col-12'}>
                              <Link
                                to={child.href}
                                className="dropdown-item-growvia"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                  <span className="fw-bold fs-7 text-forest-dark" style={{ fontSize: '0.8rem' }}>
                                    {child.name}
                                  </span>
                                  {child.tag && (
                                    <span className="badge-sage">{child.tag}</span>
                                  )}
                                </div>
                                <p className="mb-0 text-muted-custom fs-8" style={{ fontSize: '0.72rem', lineHeight: '1.3' }}>
                                  {child.description}
                                </p>
                              </Link>
                            </div>
                          ))}
                        </div>

                        {/* Dropdown Bottom Notice */}
                        <div className="pt-2 mt-2 border-top border-custom d-flex align-items-center justify-content-between px-2">
                          <span className="text-muted-custom fs-8 d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                            {item.name === 'Services' ? (
                              <>
                                <Sparkles size={11} className="text-forest" />
                                All services backed by SLA guarantees
                              </>
                            ) : (
                              <>
                                <Box size={11} className="text-forest" />
                                Reseller solutions with {COMPANY_CONFIG.partner.name}
                              </>
                            )}
                          </span>
                          <Link
                            to={item.href}
                            className="text-forest fw-bold text-decoration-none fs-8 d-inline-flex align-items-center gap-1"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => setActiveDropdown(null)}
                          >
                            All {item.name} <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name} className="nav-item">
                  <Link
                    to={item.href}
                    className={`nav-link nav-link-growvia ${active ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right-Side CTA Button */}
          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            <Link
              to="/contact"
              className="btn btn-forest w-100 w-lg-auto text-center"
            >
              GET A QUOTE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
