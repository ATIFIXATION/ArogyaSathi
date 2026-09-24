import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, ArrowRight, ShieldCheck, Activity, Users, HeartPulse } from 'lucide-react';
import { LanguageSelector } from '../ui/LanguageSelector';

export const Header = ({ onSwitchToCitizen, onSwitchToDashboard, onSwitchToAsha }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardsDropdownOpen, setDashboardsDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'About', href: '#how-it-works' },
    { label: 'Services', href: '#care-journey' },
    {
      label: 'Portals & Dashboards',
      isDropdown: true,
      items: [
        { label: 'Citizen Portal', role: 'citizen', action: () => onSwitchToCitizen ? onSwitchToCitizen() : (window.location.hash = 'citizen') },
        { label: 'ASHA Worker Portal', role: 'asha', action: () => onSwitchToAsha ? onSwitchToAsha() : (window.location.hash = 'asha') },
        { label: 'Health Officer Console', role: 'officer', action: () => onSwitchToDashboard ? onSwitchToDashboard() : (window.location.hash = 'dashboard') }
      ]
    },
    { label: 'Resources', href: '#three-roles' },
    { label: 'Contact', href: '#platform-preview' },
  ];

  return (
    <header className="relative w-full z-40 bg-ivory/95 backdrop-blur-sm border-b border-border-subtle/70 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Brand Logo with Editorial Tagline */}
          <div className="flex items-center">
            <a href="#" className="flex flex-col group">
              <img
                src="/assets/arogyasathi-logo.png"
                alt="ArogyaSathi"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.01]"
              />
              <span className="text-[10px] font-sans font-medium text-[#756B60] tracking-tight mt-0.5 pl-0.5">
                Bridging Care. Building Healthier Communities.
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.label} className="relative">
                    <button
                      type="button"
                      onClick={() => setDashboardsDropdownOpen(!dashboardsDropdownOpen)}
                      className="text-sm font-medium text-ink-muted hover:text-ink flex items-center gap-1 py-1.5 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dashboardsDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dashboardsDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-56 bg-[#FAF7F2] border border-border-soft rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                        {item.items.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => {
                              setDashboardsDropdownOpen(false);
                              sub.action();
                            }}
                            className="w-full text-left px-3.5 py-2 text-xs text-ink hover:bg-paper-warm hover:text-terracotta flex items-center justify-between transition-colors"
                          >
                            <span>{sub.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#9E9488]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-150 py-1.5 ${
                    item.active
                      ? 'text-ink font-semibold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  {item.active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-terracotta rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action: Language Selector & Login Dropdown */}
          <div className="hidden md:flex items-center space-x-3.5">
            <LanguageSelector />
            <div className="relative">
              <button
                type="button"
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="flex items-center gap-2 bg-[#283A2A] hover:bg-[#1E2C20] text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-sm"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D2E2D5]" />
                <span>Portals</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#D2E2D5] transition-transform ${loginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] border border-border-soft rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#756B60] border-b border-border-subtle">
                    Select Access Portal
                  </div>
                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      if (onSwitchToCitizen) onSwitchToCitizen();
                      else window.location.hash = 'citizen';
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-ink hover:bg-paper-warm flex items-center gap-2.5 transition-colors"
                  >
                    <HeartPulse className="w-4 h-4 text-terracotta" />
                    <div>
                      <div className="font-semibold text-terracotta">Citizen Portal</div>
                      <div className="text-[10px] text-ink-muted">Care access &amp; follow-up tracking</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      if (onSwitchToAsha) onSwitchToAsha();
                      else window.location.hash = 'asha';
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-ink hover:bg-paper-warm flex items-center gap-2.5 transition-colors"
                  >
                    <Users className="w-4 h-4 text-forest" />
                    <div>
                      <div className="font-semibold">ASHA Worker Portal</div>
                      <div className="text-[10px] text-ink-muted">Field screening &amp; visit log</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      if (onSwitchToDashboard) onSwitchToDashboard();
                      else window.location.hash = 'dashboard';
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-ink hover:bg-paper-warm flex items-center gap-2.5 transition-colors"
                  >
                    <Activity className="w-4 h-4 text-[#3D6B8C]" />
                    <div>
                      <div className="font-semibold">Health Officer Console</div>
                      <div className="text-[10px] text-ink-muted">District access &amp; surveillance</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="p-2 rounded-lg text-ink hover:bg-paper-dark/30 focus:outline-none focus:ring-2 focus:ring-terracotta"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-ink" />
              ) : (
                <Menu className="w-6 h-6 text-ink" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-soft bg-paper-light px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href || '#'}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  item.active
                    ? 'bg-paper-warm text-terracotta font-semibold'
                    : 'text-ink-muted hover:text-ink hover:bg-paper'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-border-soft/60 flex flex-col gap-2">
            <div className="flex justify-center pb-2">
              <LanguageSelector />
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSwitchToCitizen) onSwitchToCitizen();
                else window.location.hash = 'citizen';
              }}
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-terracotta text-white flex items-center justify-center gap-2"
            >
              <HeartPulse className="w-4 h-4" />
              Citizen Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSwitchToAsha) onSwitchToAsha();
                else window.location.hash = 'asha';
              }}
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#283A2A] text-white flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              ASHA Worker Portal
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSwitchToDashboard) onSwitchToDashboard();
                else window.location.hash = 'dashboard';
              }}
              className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#3D6B8C] text-white flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Health Officer Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
