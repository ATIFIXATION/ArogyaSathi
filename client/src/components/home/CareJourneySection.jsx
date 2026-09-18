import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import {
  User,
  MapPin,
  Activity,
  Stethoscope,
  FlaskConical,
  Pill,
  Hospital,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CARE_JOURNEY_STAGES } from '../../data/homeData';

const stageIcons = [
  User,
  MapPin,
  Activity,
  Stethoscope,
  FlaskConical,
  Pill,
  Hospital,
  CheckCircle2
];

export const CareJourneySection = () => {
  return (
    <section id="care-journey" className="py-16 sm:py-24 relative overflow-hidden bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="End-to-End Continuity of Care"
          title="From first symptom to"
          titleEmphasis="complete recovery."
          subtitle="ArogyaSathi creates a single unified record that travels with the patient across sub-centres, primary health centres, and district hospitals."
          align="center"
          className="mb-14"
        />

        {/* 8-Stage Care Journey Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 mb-12">
          {CARE_JOURNEY_STAGES.map((item, idx) => {
            const Icon = stageIcons[idx] || CheckCircle2;
            const isLast = idx === CARE_JOURNEY_STAGES.length - 1;

            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-2xl p-3.5 sm:p-4 border border-border-soft shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-paper-warm flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform text-terracotta">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-ink block leading-tight font-sans">
                    {item.stage}
                  </span>
                  <p className="text-[10px] text-ink-muted leading-tight mt-1">
                    {item.desc}
                  </p>
                </div>

                {!isLast && (
                  <div className="mt-3 text-right text-terracotta hidden lg:block opacity-40">
                    <ArrowRight className="w-3 h-3 ml-auto" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Care Coordination Value Card */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-border-soft shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border-subtle">
            <div className="px-4 py-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-terracotta block">
                0% Drop-off
              </span>
              <span className="text-xs font-semibold text-ink mt-1 block">
                Closed-Loop Referral Tracking
              </span>
              <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                Automated SMS & ASHA notifications ensure patients arrive at referred hospital.
              </p>
            </div>

            <div className="px-4 py-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-forest block">
                100% Digital
              </span>
              <span className="text-xs font-semibold text-ink mt-1 block">
                Integrated Health Passport
              </span>
              <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                ABHA & PM-JAY linked records accessible seamlessly at any public facility.
              </p>
            </div>

            <div className="px-4 py-2">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#3D6B8C] block">
                24/7 Verified
              </span>
              <span className="text-xs font-semibold text-ink mt-1 block">
                Frontline ASHA Follow-up
              </span>
              <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                Doorstep recovery check within 48 hours of discharge or treatment.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
