import React from 'react';
import {
  Video,
  PhoneCall,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export const TeleconsultationSection = ({ onRequestConsultation }) => {
  return (
    <section className="py-10 sm:py-14 bg-[#FAF7F2] border-y border-[#DCCDBB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual (5 Cols on LG) featuring teleconsultation.png */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[420px] bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl p-6 sm:p-8 shadow-lg overflow-hidden flex flex-col items-center">
              
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                <img
                  src="/assets/swasthya-setu-assets/teleconsultation.png"
                  alt="Rural Teleconsultation with Doctor"
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/assets/plant.png';
                  }}
                />
              </div>

              <div className="mt-3 bg-[#EAF0E6] border border-[#C5DEC8] rounded-xl px-3.5 py-1.5 flex items-center justify-between w-full text-xs text-[#405642] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5C8A5E]" />
                  <span>Available on 2G / 3G Networks</span>
                </div>
                <span>Audio &amp; Video Support</span>
              </div>
            </div>
          </div>

          {/* Right Content (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF2F7] border border-[#CADAE5] text-xs font-semibold text-[#3D6B8C]">
              <Video className="w-3.5 h-3.5" />
              <span>Remote Doctor Consultation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#211C17] leading-tight">
              Need to speak with a healthcare professional?
            </h2>

            <p className="text-sm sm:text-base text-[#5A5145] leading-relaxed font-sans max-w-xl">
              Connect with an available healthcare professional when visiting a facility is difficult. Your local ASHA worker can also join the call to support your care plan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#3D352C]">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E3D7C7]">
                <CheckCircle2 className="w-4 h-4 text-[#405642] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#211C17]">Direct Doctor Triage</strong>
                  <span className="text-[#756B60]">Get guidance on symptoms and medicine prescriptions.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E3D7C7]">
                <CheckCircle2 className="w-4 h-4 text-[#3D6B8C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#211C17]">Digital Prescription</strong>
                  <span className="text-[#756B60]">Dispatched directly to your nearest PHC pharmacy.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onRequestConsultation}
                className="px-6 py-3 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => alert('Teleconsultations connect rural citizens with government medical officers via secure audio/video bridges with ASHA assistance.')}
                className="px-5 py-3 bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#DCCDBB] text-[#211C17] rounded-xl text-xs sm:text-sm font-semibold transition-all"
              >
                How teleconsultation works
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
