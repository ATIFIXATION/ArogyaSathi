import React from 'react';

export const Footer = () => {
  const links = [
    { label: 'Platform', href: '#platform-preview' },
    { label: 'Care Journey', href: '#care-journey' },
    { label: 'Stakeholders', href: '#three-roles' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'ASHA Portal', href: '#asha' },
    { label: 'Officer Console', href: '#dashboard' },
  ];

  return (
    <footer className="w-full bg-paper-warm/80 border-t border-border-soft py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-border-subtle/80">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/assets/arogyasathi-logo.png"
              alt="ArogyaSathi - Connected Public Healthcare"
              className="h-11 sm:h-12 w-auto object-contain mb-3"
            />
            <p className="text-xs text-ink-muted max-w-sm">
              Integrated rural public-health access and continuity platform for underserved communities.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs sm:text-sm font-medium text-ink-muted hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-subtle text-center sm:text-left">
          <div>
            © 2026 ArogyaSathi. All rights reserved.
          </div>
          <div>
            Rural Public Healthcare Access &amp; Continuity Platform • Smart India Hackathon 2026
          </div>
        </div>

      </div>
    </footer>
  );
};
