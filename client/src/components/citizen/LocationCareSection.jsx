import React from 'react';
import {
  MapPin,
  Building2,
  Stethoscope,
  Activity,
  Pill,
  PhoneCall,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const LocationCareSection = ({ onBrowseFacilities }) => {
  const quickMetrics = [
    {
      title: 'Nearby PHC / CHC Nodes',
      value: '4 Facilities',
      subtitle: 'Nearest: 1.2 km (Akkalkuwa PHC)',
      icon: Building2,
      iconColor: 'bg-[#EAF0E6] text-[#405642]'
    },
    {
      title: 'Consultations Today',
      value: 'OPD Active',
      subtitle: 'Maternal care, General physician',
      icon: Stethoscope,
      iconColor: 'bg-[#FBF0EB] text-[#B94A25]'
    },
    {
      title: 'Diagnostic Services',
      value: 'CBC & Glucose',
      subtitle: 'Free government lab tests',
      icon: Activity,
      iconColor: 'bg-[#EBF2F7] text-[#3D6B8C]'
    },
    {
      title: 'Medicine Stock',
      value: '96% In Stock',
      subtitle: 'Essential drugs available at PHC',
      icon: Pill,
      iconColor: 'bg-[#FEF6EE] text-[#D98A2C]'
    }
  ];

  return (
    <section id="find-care" className="py-8 sm:py-10 bg-[#FAF7F2] border-y border-[#DCCDBB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B94A25] uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Healthcare Near You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211C17]">
              Dhule &amp; Nandurbar District, Maharashtra
            </h2>
            <p className="text-xs sm:text-sm text-[#756B60] mt-1">
              Akkalkuwa Block community coverage • Connected with frontline ASHA &amp; Primary Health Centre network.
            </p>
          </div>

          <button
            type="button"
            onClick={onBrowseFacilities}
            className="text-xs sm:text-sm font-semibold text-[#B94A25] hover:text-[#9E3E20] flex items-center gap-1.5 hover:underline"
          >
            <span>Find healthcare services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {quickMetrics.map((item, idx) => {
            const Icon = item.icon;

            return (
              <div
                key={idx}
                onClick={onBrowseFacilities}
                className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.iconColor} transition-transform group-hover:scale-105 shadow-inner`}>
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#756B60] block">
                      {item.title}
                    </span>
                    <span className="text-lg sm:text-xl font-serif font-bold text-[#211C17] leading-tight">
                      {item.value}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#756B60] border-t border-[#EAE0D2] pt-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
