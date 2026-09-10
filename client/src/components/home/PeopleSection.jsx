import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Smartphone, Stethoscope, Building2, Check, WifiOff, BellRing, Users } from 'lucide-react';

export const PeopleSection = () => {
  const personas = [
    {
      role: 'ASHA WORKER',
      title: 'Report from the field.',
      badge: 'Frontline Community',
      icon: Smartphone,
      accent: 'border-terracotta/40 bg-terracotta/5',
      image: '/assets/reference/swasthyasetu_extracted_assets/05-asha-worker.png',
      description: 'Equipped with an offline-first mobile app with Assamese, Bengali, and tribal language voice-logging for doorstep syndromic reporting.',
      features: [
        'Works 100% offline in no-signal village zones',
        'Simple 4-tap syndromic report form',
        'Automatic GPS tagging of local water sources',
        'Instant sync when network is restored',
      ],
    },
    {
      role: 'PHC MEDICAL OFFICER',
      title: 'Understand individual cases.',
      badge: 'Primary Health Centre',
      icon: Stethoscope,
      accent: 'border-forest/40 bg-forest/5',
      image: '/assets/reference/swasthyasetu_extracted_assets/06-ai-intelligence.png',
      description: 'Correlates outpatient fever and diarrhoea trends with upstream environmental water contamination data before prescribing.',
      features: [
        'Doorstep-to-clinic patient history trail',
        'Localized water testing results feed',
        'Sub-center cluster warning notifications',
        'Rapid requisition for essential ORS and antibiotics',
      ],
    },
    {
      role: 'HEALTH OFFICER & MAGISTRATE',
      title: 'See what is happening across the district.',
      badge: 'District Command',
      icon: Building2,
      accent: 'border-risk-medium/40 bg-risk-medium/5',
      image: '/assets/reference/swasthyasetu_extracted_assets/07-health-officer.png',
      description: 'Oversees block-level epidemiological heatmaps, assesses predictive risk scores, and orchestrates targeted health camp deployments.',
      features: [
        'District-wide syndromic anomaly monitor',
        'Automated early warning risk scoring (1-100)',
        'Water purification team dispatch tools',
        'State surveillance committee export reports',
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-paper-warm/50 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="User Perspectives"
          title="One system."
          titleEmphasis="Different perspectives."
          subtitle="Designed with deep empathy for frontline health workers in remote hamlets, medical officers at PHCs, and district epidemiologists."
          align="center"
          className="mb-16"
        />

        {/* 3 Personas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {personas.map((persona) => {
            const Icon = persona.icon;
            return (
              <div
                key={persona.role}
                className="bg-paper-light rounded-2xl border border-border-soft p-6 sm:p-8 shadow-subtle flex flex-col justify-between transition-all duration-300 hover:shadow-card hover:border-terracotta/40"
              >
                <div>
                  {/* Top Role Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-terracotta tracking-widest uppercase">
                      {persona.role}
                    </span>
                    <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-paper border border-border-soft text-ink-muted">
                      {persona.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-ink mb-2">
                    {persona.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-6">
                    {persona.description}
                  </p>

                  {/* Persona Illustration Box */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-paper-warm border border-border-subtle/80 flex items-center justify-center p-2">
                    <img
                      src={persona.image}
                      alt={persona.title}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-2.5 mb-6">
                    {persona.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-ink-light">
                        <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-border-subtle/80 flex items-center justify-between text-xs text-ink-subtle">
                  <span>Role Workflow</span>
                  <span className="text-terracotta font-medium">Synchronized</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
