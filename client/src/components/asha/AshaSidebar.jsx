import React from 'react';
import {
  Home,
  MapPin,
  Users,
  UserPlus,
  RotateCw,
  AlertTriangle,
  Clock,
  User,
  Settings,
  Sparkles,
  X,
  PhoneCall
} from 'lucide-react';

export const AshaSidebar = ({
  activeTab,
  onSelectTab,
  mobileOpen,
  onCloseMobile,
  onOpenSupport,
  onOpenNewVisit,
  onOpenReferral,
  onOpenServiceIssue
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'communities', label: 'My Communities', icon: MapPin },
    { id: 'cases', label: 'Citizen Cases', icon: Users, badge: '7' },
    { id: 'new-visit', label: 'New Visit', icon: UserPlus, action: onOpenNewVisit },
    { id: 'referrals', label: 'Referrals & Follow-up', icon: RotateCw, badge: '4', action: onOpenReferral },
    { id: 'service-issues', label: 'Service Issues', icon: AlertTriangle, action: onOpenServiceIssue },
    { id: 'history', label: 'Care History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-ink/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col justify-between w-64 xl:w-72 bg-[#20392B] text-white shadow-2xl transition-transform duration-300 ease-in-out shrink-0 overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Top Logo Banner Container */}
          <div className="bg-[#FAF7F2] p-4 sm:p-5 flex items-center justify-between border-b border-[#DCCDBB]/60">
            <div className="flex flex-col">
              <a href="#/" className="flex items-center gap-2.5 group">
                <img
                  src="/assets/arogyasathi-logo.png"
                  alt="ArogyaSathi"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </a>
              <span className="text-[10px] font-medium text-[#756B60] tracking-tight mt-1 pl-0.5 font-sans">
                Bridging Care. Building Healthier Communities.
              </span>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-md text-[#211C17] hover:bg-[#EFE5D5]"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3.5 space-y-1 mt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      onSelectTab(item.id);
                    }
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#C25E30] text-white shadow-md font-semibold'
                      : 'text-[#E1EAE2] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-[#C5D7C7]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#C25E30] text-white shadow-sm'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section with Botanical Illustration & Support Helpline Card */}
        <div className="relative p-3.5 mt-auto pt-2 flex flex-col justify-end">
          {/* Botanical PNG Natural Placement */}
          <div className="relative w-full flex justify-center pointer-events-none mb-1 select-none">
            <img
              src="/assets/plant.png"
              alt=""
              className="w-44 sm:w-48 h-auto object-contain opacity-95 drop-shadow-md -mb-4 z-0"
            />
          </div>

          {/* ASHA Support Card */}
          <div className="relative z-10 bg-[#2C4938]/95 backdrop-blur-sm border border-[#446652] rounded-xl p-3.5 shadow-lg">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E6A868]" />
                <span className="text-xs font-semibold tracking-wide text-[#FAF7F2]">
                  ASHA Field Support
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#5C8A5E] animate-pulse" />
            </div>
            <p className="text-[11px] leading-relaxed text-[#D2E2D5] mb-2.5">
              Offline sync active • Direct PHC medical officer helpline.
            </p>
            <button
              onClick={onOpenSupport}
              className="w-full py-1.5 px-2.5 bg-[#405642] hover:bg-[#4E6B51] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Emergency Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
