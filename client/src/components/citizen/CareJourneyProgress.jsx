import React from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CARE_JOURNEY_STAGES } from '../../data/citizenData';

export const CareJourneyProgress = ({ onOpenConsultation, stages = CARE_JOURNEY_STAGES, activeStatusText = '03 Consultation Scheduled' }) => {
  const displayStages = stages && stages.length > 0 ? stages : CARE_JOURNEY_STAGES;
  return (
    <section className="py-8 sm:py-10 bg-[#FAF7F2] border-y border-[#DCCDBB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#405642] uppercase tracking-wider block mb-1">
              Continuity of Public Care (SIH26133)
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211C17]">
              From your first concern to continued care.
            </h2>
            <p className="text-xs sm:text-sm text-[#756B60] mt-1 font-sans">
              SwasthyaSetu stays with you through diagnosis, pharmacy dispensation, specialist transfers, and home follow-up.
            </p>
          </div>

          <div className="bg-[#EFE5D5] px-3.5 py-1.5 rounded-full border border-[#DCCDBB] text-xs font-semibold text-[#211C17] flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#B94A25] animate-ping" />
            <span>Active Status: <strong className="text-[#B94A25]">{activeStatusText}</strong></span>
          </div>
        </div>

        {/* 7-Stage Horizontal Pipeline on Desktop / Scrollable on Mobile */}
        <div className="overflow-x-auto pb-3 pt-1">
          <div className="min-w-[840px] grid grid-cols-7 gap-2 relative">
            
            {displayStages.map((stage, idx) => {
              const isCurrent = stage.isCurrent;
              const isCompleted = stage.status === 'completed';

              return (
                <div
                  key={stage.step}
                  className={`relative p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                    isCurrent
                      ? 'bg-[#FDF3EE] border-[#B94A25] shadow-md -translate-y-0.5'
                      : isCompleted
                      ? 'bg-[#FAF7F2] border-[#D4E2D4]'
                      : 'bg-[#FAF7F2]/60 border-[#DCCDBB]/70 opacity-70'
                  }`}
                >
                  {/* Top Step Number & Status Indicator */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#756B60]">
                      {stage.step}
                    </span>

                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-[#405642]" />
                    ) : isCurrent ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B94A25] shadow" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-[#DCCDBB]" />
                    )}
                  </div>

                  {/* Stage Label */}
                  <div>
                    <h4 className={`text-xs sm:text-sm font-serif font-bold leading-tight ${
                      isCurrent ? 'text-[#B94A25]' : isCompleted ? 'text-[#211C17]' : 'text-[#756B60]'
                    }`}>
                      {stage.label}
                    </h4>
                    <p className="text-[10.5px] text-[#756B60] mt-1 leading-snug">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Active Highlight Badge */}
                  {isCurrent && (
                    <div className="mt-2.5 pt-1.5 border-t border-[#FAD3BD] text-[10px] font-bold text-[#B94A25] uppercase tracking-wide">
                      Your current step
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};
