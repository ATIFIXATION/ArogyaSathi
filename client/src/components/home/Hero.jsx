import React from 'react';
import {
  ArrowRight,
  Play,
  Building2,
  Users,
  RotateCw,
  Headphones,
  Compass,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { HERO_DATA } from '../../data/homeData';

import { useLanguage } from '../../i18n/index.jsx';


export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-6 pb-14 md:pt-10 md:pb-24">
      {/* Botanical background watermarks */}
      <div className="absolute left-0 bottom-6 w-36 sm:w-48 opacity-25 pointer-events-none select-none">
        <img
          src="/assets/plant.png"
          alt=""
          className="w-full h-auto object-contain -scale-x-100"
        />
      </div>
      <div className="absolute right-0 bottom-4 w-40 sm:w-56 opacity-30 pointer-events-none select-none">
        <img
          src="/assets/plant.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline, Paragraph, CTAs & Stats Strip */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left min-w-0">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-terracotta uppercase">
                {HERO_DATA.eyebrow}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-[32px] sm:text-[42px] md:text-[48px] lg:text-[46px] xl:text-[52px] font-serif text-ink font-normal leading-[1.14] tracking-tight">
              {t('home.heroTitle', HERO_DATA.titlePrefix + ' ' + HERO_DATA.titleEmphasis + ' ' + HERO_DATA.titleSuffix)}
            </h1>

            {/* Supporting Paragraph */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-muted leading-relaxed font-sans font-normal max-w-xl">
              {t('home.heroSubtitle', HERO_DATA.description)}
            </p>

            {/* Action Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                className="text-sm sm:text-base font-semibold px-6 py-3.5 shadow-md hover:shadow-lg rounded-full"
                onClick={() => {
                  document.getElementById('care-journey')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {HERO_DATA.primaryCta}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={Play}
                iconPosition="left"
                className="text-sm sm:text-base font-medium px-5 py-3.5 bg-paper-light hover:bg-paper-warm border-border-soft text-ink rounded-full"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {HERO_DATA.secondaryCta}
              </Button>
            </div>

            {/* 4 Hero Statistics Cards Strip */}
            <div className="mt-9 sm:mt-10 pt-6 border-t border-border-soft/60">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                {HERO_DATA.stats.map((stat) => {
                  return (
                    <div
                      key={stat.id}
                      className="bg-[#FAF7F2] p-3 rounded-xl border border-border-soft shadow-2xs flex flex-col items-start"
                    >
                      <div className="text-terracotta mb-1">
                        {stat.id === 'facilities' && <Building2 className="w-4 h-4 text-forest" />}
                        {stat.id === 'citizens' && <Users className="w-4 h-4 text-terracotta" />}
                        {stat.id === 'followup' && <RotateCw className="w-4 h-4 text-forest" />}
                        {stat.id === 'support' && <Headphones className="w-4 h-4 text-[#D98A2C]" />}
                      </div>
                      <span className="text-lg sm:text-xl font-sans font-bold text-ink leading-tight">
                        {stat.value}
                      </span>
                      <span className="text-[11px] text-ink-muted leading-tight mt-0.5 font-medium">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Maharashtra Map & Rural Healthcare Composition */}
          <div className="lg:col-span-7 relative w-full flex items-center justify-center min-w-0">
            <div className="relative w-full max-w-[680px] bg-[#FAF7F2]/60 rounded-3xl border border-border-soft/60 p-3 sm:p-5 shadow-sm overflow-hidden">
              
              {/* Top Right Vintage Compass Rose */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-center pointer-events-none select-none opacity-80">
                <span className="text-[10px] font-serif font-bold text-ink">N</span>
                <div className="flex items-center gap-1 my-0.5">
                  <span className="text-[10px] font-serif font-bold text-ink">W</span>
                  <Compass className="w-6 h-6 text-terracotta animate-pulse-subtle stroke-[1.5]" />
                  <span className="text-[10px] font-serif font-bold text-ink">E</span>
                </div>
                <span className="text-[10px] font-serif font-bold text-ink">S</span>
              </div>

              {/* Maharashtra Map Image from user assets */}
              <div className="relative w-full flex justify-center items-center py-2">
                <img
                  src="/assets/maharashtra.png"
                  alt="Maharashtra Rural Healthcare Access and Facility Coverage Map"
                  className="w-full h-auto object-contain max-h-[460px] drop-shadow-sm select-none"
                  style={{ filter: 'contrast(1.02)' }}
                />
              </div>

              {/* Bottom Overlaid Row: Access Level Legend + Floating Healthcare Signal Card */}
              <div className="relative z-20 mt-2 flex flex-wrap items-end justify-between gap-3">
                {/* Access Level Legend Card */}
                <div className="bg-[#FAF7F2]/95 backdrop-blur-xs border border-border-soft rounded-xl p-3 shadow-xs text-xs select-none">
                  <span className="text-[10.5px] font-bold text-ink uppercase tracking-wider block mb-1.5 border-b border-border-subtle pb-0.5">
                    ACCESS LEVEL
                  </span>
                  <div className="space-y-1 text-[11px] text-ink-light">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#5C8A5E]" />
                      <span>High Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#E5B54A]" />
                      <span>Moderate Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#DF6638]" />
                      <span>Limited / Priority</span>
                    </div>
                  </div>
                </div>

                {/* Floating Healthcare Signal Card */}
                <div className="bg-[#FAF7F2]/95 backdrop-blur-xs border border-border-soft rounded-2xl p-4 shadow-md text-xs w-56 select-none">
                  <div className="flex items-center justify-between text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-1">
                    <div className="flex items-center gap-1.5 text-ink">
                      <Radio className="w-3.5 h-3.5 text-terracotta" />
                      <span>{HERO_DATA.signalCard.title}</span>
                    </div>
                  </div>
                  <div className="text-3xl font-sans font-bold text-ink leading-none my-1">
                    {HERO_DATA.signalCard.coverageValue}
                  </div>
                  <div className="text-xs font-semibold text-ink leading-snug">
                    {HERO_DATA.signalCard.coverageLabel}
                  </div>
                  <div className="text-[10.5px] text-ink-muted leading-tight mt-0.5">
                    {HERO_DATA.signalCard.subtext}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-[11px] text-ink-muted">Access Level</span>
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EFF4EF] text-[#405642] border border-[#D4E2D4]">
                      {HERO_DATA.signalCard.accessLevel}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
