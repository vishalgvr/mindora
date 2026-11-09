import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  theme?: 'dark' | 'light';
  className?: string;
  iconSize?: number;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'dark',
  className = '',
  iconSize = 38,
}) => {
  const isLight = theme === 'light';

  const textTitleColor = isLight ? '#FFFFFF' : '#1E1035';
  const textSubColor = isLight ? '#38BDF8' : '#7533FB';

  return (
    <Link
      to="/"
      className={`d-inline-flex align-items-center gap-2.5 text-decoration-none ${className}`}
      aria-label="Mindora Digital Solutions — Home"
    >
      {/* Mindora Icon (Crown 'M' with Cyan Dot in Electric Violet Squircle) */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`mindora-logo-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8537FC" />
            <stop offset="100%" stopColor="#7332FB" />
          </linearGradient>
        </defs>

        {/* Background Squircle */}
        <rect width="100" height="100" rx="28" fill={`url(#mindora-logo-${theme})`} />

        {/* Accent Cyan Dot */}
        <circle cx="50" cy="33.5" r="4.8" fill="#38BDF8" />

        {/* Crown 'M' Polyline */}
        <polyline
          points="28.5,69.5 28.5,41.5 41.5,53.5 50,45.0 58.5,53.5 71.5,41.5 71.5,69.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="5.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark and Descriptor */}
      {variant !== 'icon' && (
        <div className="d-flex flex-column lh-1">
          <span
            className="fw-extrabold tracking-tight"
            style={{
              color: textTitleColor,
              fontSize: iconSize > 35 ? '1.38rem' : '1.18rem',
              letterSpacing: '0.04em',
              fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
            }}
          >
            MINDORA
          </span>
          <span
            className="text-uppercase fw-bold"
            style={{
              color: textSubColor,
              fontSize: '0.56rem',
              letterSpacing: '0.22em',
              marginTop: '2px',
            }}
          >
            DIGITAL SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
};
