import React from 'react';
import { User, Users, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import { THREE_CONNECTED_ROLES } from '../../data/homeData';

export const ThreeRolesSection = ({ onSwitchToCitizen, onSwitchToDashboard, onSwitchToAsha }) => {
  return (
    <section id="three-roles" className="py-16 sm:py-24 relative overflow-hidden bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-terracotta uppercase block mb-2">
            INTEGRATED STAKEHOLDER PLATFORM
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-ink font-bold leading-tight tracking-tight">
            One healthcare system. Three connected roles.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            Designed specifically for the unique workflows of rural citizens, community health workers, and public health administrators.
          </p>
        </div>

        {/* Three Connected Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {THREE_CONNECTED_ROLES.map((role) => {
            const isCitizen = role.id === 'citizen';
            const isAsha = role.id === 'asha';
            const isOfficer = role.id === 'officer';

            return (
              <div
                key={role.id}
                className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-border-soft shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold font-sans tracking-wide uppercase ${role.badgeColor}`}>
                      {role.title}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${role.iconColor} shadow-2xs`}>
                      {isCitizen && <User className="w-5 h-5" />}
                      {isAsha && <Users className="w-5 h-5" />}
                      {isOfficer && <Activity className="w-5 h-5" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-ink mb-1.5">
                    {role.tagline}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted font-medium leading-relaxed mb-6">
                    {role.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2.5 pt-4 border-t border-border-subtle/80">
                    {role.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-ink-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Button */}
                <div className="mt-8 pt-4 border-t border-border-subtle/60">
                  <button
                    type="button"
                    onClick={() => {
                      if (isCitizen && onSwitchToCitizen) onSwitchToCitizen();
                      else if (isCitizen) window.location.hash = 'citizen';
                      else if (isAsha && onSwitchToAsha) onSwitchToAsha();
                      else if (isAsha) window.location.hash = 'asha';
                      else if (isOfficer && onSwitchToDashboard) onSwitchToDashboard();
                      else if (isOfficer) window.location.hash = 'dashboard';
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-2xs ${
                      isCitizen
                        ? 'bg-[#B94A25] hover:bg-[#A53E1D] text-white'
                        : isAsha
                        ? 'bg-forest hover:bg-[#283A2A] text-white'
                        : 'bg-[#283A2A] hover:bg-[#1E2C20] text-white'
                    }`}
                  >
                    <span>Launch {role.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
