import React, { useState } from 'react';
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  ExternalLink,
  MapPin,
  HeartPulse,
  Building2,
  Calendar,
  RotateCw,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { CITIZEN_PROFILE, CITIZEN_NOTIFICATIONS } from '../../data/citizenData';
import { LanguageSelector } from '../ui/LanguageSelector';


export const CitizenHeader = ({
  onSwitchToAsha,
  onSwitchToDashboard,
  onSwitchToHome,
  onOpenProfile,
  onOpenReportConcern,
  onOpenConsultation,
  onOpenReferral,
  onOpenFollowup
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(CITIZEN_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const navLinks = [
    { label: 'Find Care', href: '#find-care' },
    { label: 'My Care', href: '#my-care' },
    { label: 'Referrals', href: '#referrals' },
    { label: 'Follow-up', href: '#follow-up' },
    { label: 'Help', href: '#help' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#DCCDBB]/80 transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#home" onClick={(e) => { e.preventDefault(); onSwitchToHome && onSwitchToHome(); }} className="flex items-center gap-2.5 group">
            <img
              src="/assets/arogyasathi-logo.png"
              alt="ArogyaSathi"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>
          <span className="hidden md:inline-block h-6 w-px bg-[#DCCDBB]" />
          <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#756B60]">
            <MapPin className="w-3.5 h-3.5 text-[#B94A25]" />
            <span>Akkalkuwa, Maharashtra</span>
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs sm:text-sm font-semibold text-[#4A4238]">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); onSwitchToHome && onSwitchToHome(); }}
            className="hover:text-[#B94A25] transition-colors"
          >
            Home
          </a>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#B94A25] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Language Selector + Notifications Bell + Citizen Profile + Mobile Menu Button */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <LanguageSelector />
          {/* Notifications Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileDropdownOpen(false);
              }}
              className="relative p-2 sm:p-2.5 rounded-full bg-[#EFE5D5] hover:bg-[#EAE0D2] border border-[#DCCDBB] text-[#211C17] transition-all shadow-2xs"
              aria-label="Care notifications"
            >
              <Bell className="w-4 h-4 text-[#211C17]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B94A25] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-3 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#B94A25]" />
                    <span className="text-xs font-bold text-[#211C17]">Care Notifications</span>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-[#B94A25] hover:underline font-semibold"
                    >
                      Mark read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-[#EAE0D2]">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3 text-xs transition-colors hover:bg-[#F4ECE0] ${
                        item.unread ? 'bg-[#FAF7F2]' : 'bg-[#FAF7F2]/60 opacity-85'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`leading-snug ${item.unread ? 'font-bold text-[#211C17]' : 'font-medium text-[#756B60]'}`}>
                          {item.title}
                        </p>
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-[#B94A25] shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#756B60] mt-1 leading-snug">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-[#9E9488]">
                        <span className="capitalize font-semibold text-[#405642]">{item.type}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Citizen Profile Chip */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 bg-[#FAF7F2] hover:bg-[#EFE5D5] pl-1 pr-3 py-1 rounded-full border border-[#DCCDBB] transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#FDF0E7] text-[#B94A25] border border-[#DCCDBB] shrink-0 flex items-center justify-center font-bold text-xs">
                {CITIZEN_PROFILE.avatarInitials}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-[#211C17] leading-none">
                  {CITIZEN_PROFILE.name}
                </div>
                <div className="text-[10px] text-[#756B60] leading-tight mt-0.5">
                  Citizen • {CITIZEN_PROFILE.village}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#756B60]" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-[#EAE0D2]">
                  <p className="text-xs font-bold text-[#211C17]">{CITIZEN_PROFILE.name}</p>
                  <p className="text-[11px] text-[#756B60]">ABHA: {CITIZEN_PROFILE.abhaId}</p>
                  <p className="text-[10px] text-[#405642] font-semibold mt-0.5">
                    Assigned ASHA: {CITIZEN_PROFILE.assignedAsha.name}
                  </p>
                </div>

                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="w-full text-left px-4 py-2 text-[#211C17] hover:bg-[#EFE5D5] flex items-center justify-between"
                  >
                    <span>My Health ID &amp; Profile</span>
                    <User className="w-3.5 h-3.5 text-[#756B60]" />
                  </button>

                  <div className="border-t border-[#EAE0D2] my-1" />

                  {/* Switch to ASHA Dashboard */}
                  {onSwitchToAsha && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSwitchToAsha();
                      }}
                      className="w-full text-left px-4 py-1.5 text-[#211C17] hover:bg-[#EFE5D5] flex items-center justify-between"
                    >
                      <span>ASHA Worker Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#756B60]" />
                    </button>
                  )}

                  {/* Switch to Health Officer Dashboard */}
                  {onSwitchToDashboard && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSwitchToDashboard();
                      }}
                      className="w-full text-left px-4 py-1.5 text-[#211C17] hover:bg-[#EFE5D5] flex items-center justify-between"
                    >
                      <span>Health Officer Dashboard</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#756B60]" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#211C17] hover:bg-[#EFE5D5] border border-[#DCCDBB]"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#DCCDBB] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-[#211C17]">
            <a
              href="#home"
              onClick={() => { setMobileMenuOpen(false); onSwitchToHome && onSwitchToHome(); }}
              className="py-2 px-3 rounded-lg hover:bg-[#EFE5D5]"
            >
              Home
            </a>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-[#EFE5D5]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE0D2] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReportConcern) onOpenReportConcern();
              }}
              className="w-full py-2.5 bg-[#B94A25] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <HeartPulse className="w-4 h-4" />
              Report a Health Concern
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenProfile) onOpenProfile();
              }}
              className="w-full py-2.5 bg-[#FAF7F2] border border-[#DCCDBB] text-[#211C17] font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-[#756B60]" />
              View Citizen Health ID ({CITIZEN_PROFILE.name})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
