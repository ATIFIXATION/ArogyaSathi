import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Pill,
  Activity,
  ShieldCheck
} from 'lucide-react';
import { NEARBY_FACILITIES } from '../../data/citizenData';

export const RuralPhcSection = ({ onSelectFacility }) => {
  const [selectedFacility, setSelectedFacility] = useState(NEARBY_FACILITIES[0]);

  return (
    <section className="py-10 sm:py-14 bg-[#FAF7F2] border-y border-[#DCCDBB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#B94A25] uppercase tracking-wider block mb-1">
              Public Healthcare Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211C17]">
              Find your nearest healthcare facility
            </h2>
            <p className="text-xs sm:text-sm text-[#756B60] mt-1 font-sans">
              Verified sub-centres, primary health centres, and referral hospitals in Maharashtra.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual (5 Cols on LG) featuring rural-phc.png */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[420px] bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl p-6 sm:p-8 shadow-lg overflow-hidden flex flex-col items-center">
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                <img
                  src="/assets/swasthya-setu-assets/rural-phc.png"
                  alt="Rural Primary Health Centre in Maharashtra"
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/assets/plant.png';
                  }}
                />
              </div>

              <div className="mt-3 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl px-3.5 py-1.5 flex items-center justify-between w-full text-xs text-[#756B60]">
                <span>Akkalkuwa Primary Health Centre</span>
                <span className="text-[#405642] font-semibold">24/7 Delivery Ward Open</span>
              </div>
            </div>
          </div>

          {/* Right Facility Cards List (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-3.5 order-1 lg:order-2">
            {NEARBY_FACILITIES.map((fac) => (
              <div
                key={fac.id}
                onClick={() => onSelectFacility && onSelectFacility(fac)}
                className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#DCCDBB] hover:border-[#B94A25] shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] group-hover:text-[#B94A25] transition-colors leading-snug">
                        {fac.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${fac.badgeClass}`}>
                        {fac.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#756B60] mt-1">
                      <span className="font-semibold text-[#B94A25]">{fac.distance}</span>
                      <span>•</span>
                      <span>{fac.travelTime}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectFacility) onSelectFacility(fac);
                    }}
                    className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#B94A25] text-[#211C17] hover:text-white border border-[#DCCDBB] hover:border-[#B94A25] rounded-lg text-xs font-semibold transition-colors shrink-0 shadow-2xs"
                  >
                    View Facility
                  </button>
                </div>

                {/* Facility Services Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#EAE0D2]">
                  {fac.services.map((svc, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E3D7C7] text-[11px] text-[#4A4238] font-medium">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
