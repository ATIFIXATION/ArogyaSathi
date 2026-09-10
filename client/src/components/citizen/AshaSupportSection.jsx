import React from 'react';
import {
  PhoneCall,
  User,
  MapPin,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CITIZEN_PROFILE } from '../../data/citizenData';

export const AshaSupportSection = ({ onContactAsha, onRequestAssistance }) => {
  const { assignedAsha } = CITIZEN_PROFILE;

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0E6] border border-[#C5DEC8] text-xs font-semibold text-[#405642]">
              <User className="w-3.5 h-3.5" />
              <span>Frontline Community Care Bridge</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#211C17] leading-tight">
              Need help accessing care?
            </h2>

            <p className="text-sm sm:text-base text-[#5A5145] leading-relaxed font-sans max-w-xl">
              Your ASHA worker can help you understand your options, coordinate referrals, organize doorstep screenings, and support your follow-up recovery.
            </p>

            {/* Assigned ASHA Worker Card */}
            <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#EFE5D5] border border-[#DCCDBB] shrink-0 flex items-center justify-center font-serif font-bold text-base text-[#B94A25]">
                  AB
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#211C17] text-sm sm:text-base">
                      {assignedAsha.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]">
                      Assigned ASHA
                    </span>
                  </div>
                  <div className="text-xs text-[#756B60] flex items-center gap-2 mt-0.5">
                    <span>{assignedAsha.community}</span>
                    <span>•</span>
                    <span className="text-[#405642] font-semibold">{assignedAsha.availability}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onContactAsha}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#405642] hover:bg-[#283A2A] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call ASHA Worker</span>
                </button>
                <button
                  type="button"
                  onClick={onRequestAssistance}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#DCCDBB] text-[#211C17] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#B94A25]" />
                  <span>Request Visit</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#756B60] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#405642] shrink-0" />
              <span>Free frontline support provided under National Health Mission, Government of Maharashtra.</span>
            </div>
          </div>

          {/* Right Visual (5 Cols on LG) featuring asha-support.png */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl p-6 sm:p-8 shadow-lg overflow-hidden flex flex-col items-center">
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                <img
                  src="/assets/swasthya-setu-assets/asha-support.png"
                  alt="ASHA Worker Supporting Citizen in Community"
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/assets/plant.png';
                  }}
                />
              </div>

              <div className="mt-3 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl px-3.5 py-1.5 flex items-center justify-between w-full text-xs text-[#756B60]">
                <span>Community Care Lead</span>
                <span className="text-[#405642] font-semibold">Doorstep Triage &amp; Navigation</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
