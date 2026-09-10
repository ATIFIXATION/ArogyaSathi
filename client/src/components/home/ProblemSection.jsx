import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPinOff, FileQuestion, ArrowRight, ShieldAlert, CheckCircle2, UserX } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    {
      id: '01',
      title: 'ACCESS BARRIERS',
      subtitle: 'Distance & Fragmented Triage',
      description: 'Rural citizens often travel hours to find doctors, only to face facility closures, missing diagnostic tools, or lack of guidance on where to seek appropriate care.',
      icon: MapPinOff,
      color: 'border-terracotta/40 text-terracotta',
      badge: 'First Mile Challenge',
    },
    {
      id: '02',
      title: 'REFERRAL DROPOUTS',
      subtitle: 'Lost in Secondary Care Transfer',
      description: 'When sub-centres refer patients to District Hospitals, records are lost on paper. 60%+ patients drop out without completing specialized treatment.',
      icon: UserX,
      color: 'border-forest/40 text-forest',
      badge: 'Continuity Gap',
    },
    {
      id: '03',
      title: 'FOLLOW-UP DEFICIT',
      subtitle: 'Unmonitored Recovery',
      description: 'Once a patient leaves the hospital, frontline ASHA workers receive no discharge summaries or medicine adherence schedules, leading to preventable relapse.',
      icon: FileQuestion,
      color: 'border-risk-medium/40 text-risk-medium',
      badge: 'Care Breakdown',
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-paper-warm/40 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Rural Healthcare Gap"
          title="When healthcare journeys break,"
          titleEmphasis="lives are lost."
          subtitle="In rural and remote communities, healthcare often begins and ends with an isolated visit — with no follow-up, no referral tracking, and no care continuity."
          align="center"
          className="mb-14"
        />

        {/* The 3 Core Care Gaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {problems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-paper-light rounded-2xl p-6 sm:p-8 border border-border-soft shadow-subtle flex flex-col justify-between transition-all duration-200 hover:border-terracotta/40 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-paper border border-border-soft text-ink-muted">
                      GAP {item.id}
                    </span>
                    <span className="text-[11px] font-medium text-ink-subtle uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-paper border border-border-soft flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-ink" strokeWidth={1.75} />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-ink mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-terracotta mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-2 text-xs text-ink-subtle">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-subtle" />
                  <span>Unlinked patient journey</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Connection Bridge */}
        <div className="max-w-4xl mx-auto bg-paper rounded-2xl border border-border-soft p-6 sm:p-8 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* The Disconnected State */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-risk-high uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-terracotta" />
                <span>The Disconnected Reality</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ink-light font-medium flex-wrap">
                <span className="bg-paper-light px-2.5 py-1 rounded border border-border-soft text-xs">Citizen</span>
                <span>→</span>
                <span className="bg-paper-light px-2.5 py-1 rounded border border-border-soft text-xs">PHC / CHC</span>
                <span>→</span>
                <span className="bg-paper-light px-2.5 py-1 rounded border border-border-soft text-xs text-terracotta line-through">Drop-off</span>
              </div>
              <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                Patients fall through the cracks between primary facilities and secondary district care.
              </p>
            </div>

            {/* Visual Arrow Divider */}
            <div className="lg:col-span-2 flex justify-center py-2 lg:py-0">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 border border-terracotta/30 flex items-center justify-center text-terracotta">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* The SwasthyaSetu Solution */}
            <div className="lg:col-span-5 flex flex-col gap-2 bg-paper-light p-4 rounded-xl border border-terracotta/30">
              <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>SwasthyaSetu Bridges The Journey</span>
              </div>
              <h4 className="text-base font-serif font-bold text-ink">
                Continuous Access & Closed-Loop Referral
              </h4>
              <p className="text-xs text-ink-muted leading-relaxed">
                Empowers citizens, connects ASHA workers, and gives health officers full visibility into every stage of patient care.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
