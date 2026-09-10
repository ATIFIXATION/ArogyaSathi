import React from 'react';
import {
  PhoneCall,
  AlertTriangle,
  Ambulance,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { EMERGENCY_NUMBERS } from '../../data/citizenData';

export const EmergencySupportSection = () => {
  return (
    <section id="help" className="py-10 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FAF7F2] border-2 border-[#F6C6BA] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left Info */}
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F0] border border-[#F5C2BC] text-xs font-bold text-[#C0392B]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Emergency &amp; Urgent Medical Assistance</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#211C17]">
                Need urgent help? Call emergency services
              </h2>

              <p className="text-xs sm:text-sm text-[#756B60] leading-relaxed font-sans">
                {EMERGENCY_NUMBERS.description}
              </p>
            </div>

            {/* Right Action Call Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${EMERGENCY_NUMBERS.ambulance}`}
                onClick={(e) => { e.preventDefault(); alert(`Calling 108 Emergency Ambulance Service...`); }}
                className="flex-1 sm:flex-initial px-5 py-3 bg-[#C0392B] hover:bg-[#A82E22] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 108 (Ambulance)</span>
              </a>

              <a
                href={`tel:${EMERGENCY_NUMBERS.healthHelp}`}
                onClick={(e) => { e.preventDefault(); alert(`Calling 104 Maharashtra Health Helpline...`); }}
                className="flex-1 sm:flex-initial px-5 py-3 bg-[#FAF7F2] hover:bg-[#EFE5D5] border-2 border-[#DCCDBB] text-[#211C17] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#405642]" />
                <span>Call 104 (Health Advice)</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
