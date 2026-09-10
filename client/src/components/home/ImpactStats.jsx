import React from 'react';
import { Users, UserCheck, MapPin, ShieldCheck } from 'lucide-react';
import { StatCard } from '../ui/StatCard';

export const ImpactStats = () => {
  const stats = [
    {
      value: '32K+',
      label: 'Community Reports Collected',
      sublabel: 'Field syndromic observations',
      icon: Users,
    },
    {
      value: '1.2K+',
      label: 'Health Workers Onboarded',
      sublabel: 'ASHAs, ANMs & facility nurses',
      icon: UserCheck,
    },
    {
      value: '120',
      label: 'Districts Monitored',
      sublabel: 'Across 8 Northeast states',
      icon: MapPin,
    },
    {
      value: '89%',
      label: 'Early Detection Improvement',
      sublabel: 'Signal-to-response velocity',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="impact-stats" className="w-full relative z-20 -mt-2 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Paper Container Strip */}
        <div className="bg-paper-light rounded-2xl border border-border-soft shadow-subtle p-2 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle/80">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                value={stat.value}
                label={stat.label}
                sublabel={stat.sublabel}
                icon={stat.icon}
                className="py-4 sm:py-5"
              />
            ))}
          </div>
          
          <div className="pt-3 pb-1 text-center border-t border-border-subtle/60 mt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-ink-subtle">
              * Prototype &amp; Simulation data for demonstration purposes
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
