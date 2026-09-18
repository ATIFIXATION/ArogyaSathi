import React from 'react';
import { Smartphone, Stethoscope, ClipboardCheck, TrendingUp, ArrowRight, Leaf } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/homeData';

const iconMap = {
  Smartphone: Smartphone,
  Stethoscope: Stethoscope,
  ClipboardCheck: ClipboardCheck,
  TrendingUp: TrendingUp
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 relative overflow-hidden bg-paper-warm/30 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Leaf Embellishment */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-serif font-bold text-terracotta uppercase tracking-widest mb-2">
            <Leaf className="w-4 h-4 text-forest inline" />
            <span>HOW AROGYASATHI WORKS</span>
            <Leaf className="w-4 h-4 text-forest inline -scale-x-100" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-ink font-bold leading-tight tracking-tight mt-1">
            A continuous loop of care for rural communities.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mx-auto">
            From first symptom notification to doctor consultation, laboratory diagnostics, medicine delivery, and verified follow-up.
          </p>
        </div>

        {/* 4 Connected Step Cards Grid with Directional Arrows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const IconComponent = iconMap[step.icon] || Smartphone;
            return (
              <div
                key={step.stepNumber}
                className="relative bg-[#FAF7F2] rounded-2xl p-5 sm:p-6 border border-border-soft shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  {/* Top Row: Step Number + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-bold text-terracotta">
                      {step.stepNumber}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-paper-warm flex items-center justify-center text-ink group-hover:scale-105 transition-transform shadow-2xs">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" style={{ color: step.color }} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-serif font-bold text-ink mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Right Arrow indicator on desktop */}
                {idx < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 bg-[#FAF7F2] border border-border-soft rounded-full p-1 shadow-xs text-ink-muted">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
