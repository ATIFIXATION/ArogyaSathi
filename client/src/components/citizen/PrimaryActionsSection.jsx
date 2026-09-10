import React from 'react';
import {
  HeartPulse,
  Building2,
  Stethoscope,
  RotateCw,
  ArrowRight
} from 'lucide-react';
import { PRIMARY_ACTIONS } from '../../data/citizenData';

export const PrimaryActionsSection = ({
  onReportConcern,
  onBrowseFacilities,
  onRequestConsultation,
  onTrackReferral
}) => {
  const iconMap = {
    HeartPulse,
    Building2,
    Stethoscope,
    RotateCw
  };

  const handleAction = (id) => {
    if (id === 'report-concern') onReportConcern();
    if (id === 'find-facility') onBrowseFacilities();
    if (id === 'request-consultation') onRequestConsultation();
    if (id === 'track-referral') onTrackReferral();
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#211C17] tracking-tight">
            What do you need today?
          </h2>
          <p className="text-xs sm:text-sm text-[#756B60] mt-2 font-sans">
            Choose a service below to access medical guidance, locate clinics, or track your ongoing treatment.
          </p>
        </div>

        {/* 4 Primary Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRIMARY_ACTIONS.map((action) => {
            const Icon = iconMap[action.icon] || HeartPulse;

            return (
              <div
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`rounded-2xl p-5 sm:p-6 border transition-all duration-200 shadow-2xs hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${action.bgClass}`}
              >
                <div>
                  {/* Top Icon Pill */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-inner"
                    style={{ backgroundColor: `${action.accentColor}18`, color: action.accentColor }}
                  >
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-snug">
                    {action.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#756B60] mt-2 leading-relaxed font-sans">
                    {action.description}
                  </p>
                </div>

                {/* Bottom Action CTA */}
                <div className="mt-5 pt-3 border-t border-[#DCCDBB]/60 flex items-center justify-between text-xs font-bold" style={{ color: action.accentColor }}>
                  <span>{action.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
