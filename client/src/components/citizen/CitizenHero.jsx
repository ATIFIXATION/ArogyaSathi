import React from 'react';
import {
  HeartPulse,
  Building2,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

import { useLanguage } from '../../i18n/index.jsx';


export const CitizenHero = ({ onFindCare, onReportConcern }) => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-6 sm:pt-10 pb-10 sm:pb-14 overflow-hidden">
      {/* Background Natural Substrate */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#C5B8A5_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Context Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE5D5] border border-[#DCCDBB] text-xs font-semibold text-[#405642] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5C8A5E] animate-pulse" />
              <span>Public Healthcare Access &amp; Care Continuity (SIH26133)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-[#211C17] leading-[1.12] tracking-tight">
              {t('citizen.welcomeTitle', 'Your healthcare journey, connected.')}
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base md:text-lg text-[#5A5145] leading-relaxed max-w-2xl font-sans">
              {t('home.heroSubtitle', 'Find care, talk to healthcare professionals, manage referrals and stay connected with your follow-up — all in one place.')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onFindCare}
                className="px-6 py-3.5 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>{t('actions.scheduleVisit', 'Find Care')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onReportConcern}
                className="px-6 py-3.5 bg-[#FAF7F2] hover:bg-[#EFE5D5] border-2 border-[#B94A25] text-[#B94A25] rounded-xl text-sm font-semibold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <HeartPulse className="w-4 h-4" />
                <span>{t('actions.reportConcern', 'Report a Health Concern')}</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="pt-4 sm:pt-6 border-t border-[#DCCDBB]/70 grid grid-cols-3 gap-3 sm:gap-6 text-xs text-[#5A5145]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#405642] shrink-0" />
                <span className="font-semibold text-[#211C17]">100% Free Public Services</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-[#B94A25] shrink-0" />
                <span className="font-semibold text-[#211C17]">Doorstep ASHA Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#3D6B8C] shrink-0" />
                <span className="font-semibold text-[#211C17]">Verified PHC/CHC Network</span>
              </div>
            </div>

          </div>

          {/* Right Visual Composition (5 Cols on LG) with citizen-care.png */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Decorative Card Framing */}
            <div className="relative w-full max-w-[440px] bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden flex flex-col items-center">
              
              {/* Soft Radial Ambient Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#EAE0D2]/50 rounded-full blur-2xl pointer-events-none" />

              {/* Citizen Care PNG Illustration */}
              <div className="relative w-full h-[260px] sm:h-[300px] flex items-center justify-center">
                <img
                  src="/assets/swasthya-setu-assets/citizen-care.png"
                  alt="Citizen Healthcare Access in Rural Maharashtra"
                  className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/assets/plant.png';
                  }}
                />
              </div>

              {/* Editorial Floating Signal Pill */}
              <div className="mt-4 bg-[#FAF7F2]/95 border border-[#DCCDBB] rounded-xl px-4 py-2 shadow-xs flex items-center justify-between w-full text-xs">
                <div className="flex items-center gap-2 text-[#405642] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#5C8A5E]" />
                  <span>Akkalkuwa PHC Tele-Triage Live</span>
                </div>
                <span className="text-[11px] font-bold text-[#B94A25]">
                  08 mins response
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
