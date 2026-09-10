import React, { useState, useEffect } from 'react';
import {
  Menu,
  MapPin,
  Calendar,
  Bell,
  ChevronDown,
  Check,
  ExternalLink
} from 'lucide-react';
import { DISTRICT_OPTIONS, DATE_RANGE_OPTIONS, OFFICER_PROFILE } from '../../data/dashboardData';

export const TopHeader = ({
  selectedDistrict,
  onSelectDistrict,
  selectedDateRange,
  onSelectDateRange,
  onToggleSidebar,
  onSwitchToAsha,
  onSwitchToHome
}) => {
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => OFFICER_PROFILE?.notifications || []);

  useEffect(() => {
    if (OFFICER_PROFILE?.notifications) {
      setNotifications(OFFICER_PROFILE.notifications);
    }
  }, [OFFICER_PROFILE]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = (notifications || []).filter((n) => n.unread).length;

  return (
    <header className="relative w-full bg-transparent px-4 sm:px-6 lg:px-8 pt-5 pb-3">
      <div className="flex flex-col gap-2 max-w-[1720px] mx-auto">
        {/* Main Top Header Grid */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Left Title & Subtitle */}
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-[#211C17] hover:bg-[#EFE5D5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B94A25] mt-1"
              aria-label="Toggle sidebar navigation"
            >
              <Menu className="w-5 h-5 text-[#211C17]" />
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-[#211C17] leading-tight tracking-tight">
                Maharashtra Healthcare Access Overview
              </h1>
              <p className="text-xs sm:text-sm font-medium text-[#756B60] tracking-wide mt-0.5">
                Monitor. Understand. Act.
              </p>
            </div>
          </div>

          {/* Right Controls Column */}
          <div className="flex flex-col items-end gap-2 ml-auto">
            {/* Top Control Strip */}
            <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
              {/* District Selector Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setDistrictDropdownOpen(!districtDropdownOpen);
                    setDateDropdownOpen(false);
                    setNotificationsOpen(false);
                    setProfileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 bg-[#EFE5D5]/90 hover:bg-[#EFE5D5] text-[#211C17] px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium border border-[#DCCDBB] transition-all shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B94A25]" />
                  <span className="max-w-[150px] sm:max-w-[200px] truncate">
                    {selectedDistrict.name}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#756B60] transition-transform ${districtDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* District Dropdown Menu */}
                {districtDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 max-h-80 overflow-y-auto">
                    <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#756B60] border-b border-[#EAE0D2]">
                      Select Maharashtra District
                    </div>
                    {DISTRICT_OPTIONS.map((district) => (
                      <button
                        key={district.id}
                        onClick={() => {
                          onSelectDistrict(district);
                          setDistrictDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#EFE5D5] transition-colors ${
                          selectedDistrict.id === district.id
                            ? 'font-semibold text-[#B94A25] bg-[#FBF0EB]'
                            : 'text-[#211C17]'
                        }`}
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <span className="truncate block">{district.name}</span>
                          <span className="text-[10px] text-[#756B60] block">{district.accessLevel}</span>
                        </div>
                        {selectedDistrict.id === district.id && (
                          <Check className="w-3.5 h-3.5 text-[#B94A25] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Bell Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setDistrictDropdownOpen(false);
                    setDateDropdownOpen(false);
                    setProfileMenuOpen(false);
                  }}
                  className="relative p-2 rounded-full bg-[#EFE5D5]/90 hover:bg-[#EFE5D5] border border-[#DCCDBB] text-[#211C17] transition-all shadow-xs"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4 text-[#211C17]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#C0392B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#B94A25]" />
                        <span className="text-xs font-bold text-[#211C17]">Health Service Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllRead}
                          className="text-[11px] text-[#B94A25] hover:underline font-medium"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-[#EAE0D2]">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`p-3 text-xs transition-colors hover:bg-[#F4ECE0] ${
                            item.unread ? 'bg-[#FAF7F2]' : 'bg-[#FAF7F2]/60 opacity-80'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className={`leading-snug ${item.unread ? 'font-semibold text-[#211C17]' : 'text-[#756B60]'}`}>
                              {item.title}
                            </p>
                            {item.unread && (
                              <span className="w-2 h-2 rounded-full bg-[#B94A25] shrink-0 mt-1" />
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-1.5 text-[10px] text-[#9E9488]">
                            <span>{item.category}</span>
                            <span>{item.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Officer Profile Chip */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProfileMenuOpen(!profileMenuOpen);
                    setDistrictDropdownOpen(false);
                    setDateDropdownOpen(false);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2.5 bg-[#FAF7F2] hover:bg-[#EFE5D5]/60 pl-1 pr-3 py-1 rounded-full border border-[#DCCDBB] transition-all shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#DCCDBB] bg-[#EFE5D5] shrink-0 flex items-center justify-center">
                    <img
                      src={OFFICER_PROFILE.avatar}
                      alt={OFFICER_PROFILE.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span className="text-xs font-bold text-[#405642]">RS</span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-bold text-[#211C17] leading-none">
                      {OFFICER_PROFILE.name}
                    </div>
                    <div className="text-[10px] text-[#756B60] leading-tight mt-0.5">
                      {OFFICER_PROFILE.role}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl shadow-xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2 border-b border-[#EAE0D2]">
                      <p className="text-xs font-bold text-[#211C17]">{OFFICER_PROFILE.name}</p>
                      <p className="text-[11px] text-[#756B60]">{OFFICER_PROFILE.role}</p>
                      <p className="text-[10px] text-[#405642] font-medium mt-0.5">{selectedDistrict.name}</p>
                    </div>
                    <div className="py-1">
                      {onSwitchToAsha && (
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            onSwitchToAsha();
                          }}
                          className="w-full text-left px-3.5 py-1.5 text-xs text-[#211C17] hover:bg-[#EFE5D5] flex items-center justify-between"
                        >
                          <span>ASHA Worker Portal</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#756B60]" />
                        </button>
                      )}
                      {onSwitchToHome && (
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            onSwitchToHome();
                          }}
                          className="w-full text-left px-3.5 py-1.5 text-xs text-[#211C17] hover:bg-[#EFE5D5] flex items-center justify-between"
                        >
                          <span>Public Portal (Home)</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#756B60]" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          alert('DHO Security & Facility Access Keys active.');
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-[#211C17] hover:bg-[#EFE5D5]"
                      >
                        Facility Management Keys
                      </button>
                      <button
                        onClick={() => {
                          setProfileMenuOpen(false);
                          alert('Healthcare Access Configuration: NHM Standard 2026.');
                        }}
                        className="w-full text-left px-3.5 py-1.5 text-xs text-[#211C17] hover:bg-[#EFE5D5]"
                      >
                        District Access Configuration
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Date Range Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setDateDropdownOpen(!dateDropdownOpen);
                  setDistrictDropdownOpen(false);
                  setNotificationsOpen(false);
                  setProfileMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-[#EFE5D5]/90 hover:bg-[#EFE5D5] text-[#211C17] px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-medium border border-[#DCCDBB] transition-all shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#756B60]" />
                <span className="truncate">{selectedDateRange}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#756B60] transition-transform ${dateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Date Range Dropdown Menu */}
              {dateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#756B60] border-b border-[#EAE0D2]">
                    Surveillance Window
                  </div>
                  {DATE_RANGE_OPTIONS.map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        onSelectDateRange(range);
                        setDateDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#EFE5D5] transition-colors ${
                        selectedDateRange === range
                          ? 'font-semibold text-[#B94A25] bg-[#FBF0EB]'
                          : 'text-[#211C17]'
                      }`}
                    >
                      <span>{range}</span>
                      {selectedDateRange === range && (
                        <Check className="w-3.5 h-3.5 text-[#B94A25]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
