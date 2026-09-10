import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RiskBadge } from '../ui/RiskBadge';
import { AlertOctagon, HelpCircle, ArrowUpRight, CheckCircle2, Droplets, MapPin, Calendar, Activity } from 'lucide-react';

export const EarlyWarning = () => {
  return (
    <section id="early-warning" className="py-20 sm:py-28 relative overflow-hidden bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Explainable AI Early Warning"
          title="Know when something"
          titleEmphasis="feels different."
          subtitle="Unlike black-box algorithms, SwasthyaSetu transparently explains the exact epidemiological and environmental reasons behind every flagged risk alert."
          align="center"
          className="mb-14"
        />

        {/* Early Warning Signal Card Layout */}
        <div className="max-w-4xl mx-auto bg-paper-light rounded-3xl border border-border-soft p-6 sm:p-10 shadow-card">
          
          {/* Card Top Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse glow-high" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-terracotta">
                  POTENTIAL HEALTH HOTSPOT ALERT
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                Kamrup District
              </h3>
              <span className="text-xs text-ink-muted">
                Sub-division: Hajo &amp; Rangia Blocks • 6 Villages Flagged
              </span>
            </div>

            <div className="flex items-center gap-3 bg-paper p-3 rounded-2xl border border-border-soft">
              <div className="text-right">
                <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                  Calculated Risk Score
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-terracotta">
                  87 <span className="text-sm font-sans font-normal text-ink-muted">/ 100</span>
                </div>
              </div>
              <RiskBadge level="high" size="md" />
            </div>
          </div>

          {/* Core 2-Column Explanation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Why was it flagged? */}
            <div className="md:col-span-7 bg-paper/60 p-5 sm:p-6 rounded-2xl border border-border-subtle">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4 h-4 text-terracotta" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-ink">
                  Why was it flagged?
                </h4>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-paper-light border border-border-subtle/70">
                  <span className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-ink flex items-center gap-1.5">
                      <span>↑ 62% diarrhoeal symptom reports in 7 days</span>
                    </div>
                    <p className="text-[11px] text-ink-muted mt-0.5">
                      Statistically significant jump above 3-week baseline reported by 8 ASHA workers across Hajo block.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-paper-light border border-border-subtle/70">
                  <span className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-ink">
                      Elevated water-risk signal
                    </div>
                    <p className="text-[11px] text-ink-muted mt-0.5">
                      Water test kit reports high turbidity (8.6 NTU) and coliform indicator at common village river ghat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-paper-light border border-border-subtle/70">
                  <span className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-ink">
                      Geographic clustering within 4.2 km radius
                    </div>
                    <p className="text-[11px] text-ink-muted mt-0.5">
                      Spatial mapping confirms reports originate from contiguous hamlets sharing a single stream tributary.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-paper-light border border-border-subtle/70">
                  <span className="w-6 h-6 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-ink">
                      Seasonal monsoon transition match
                    </div>
                    <p className="text-[11px] text-ink-muted mt-0.5">
                      Matches historical pre-monsoon water table contamination pattern recorded in 2023 &amp; 2024.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Suggested Response & Protocol */}
            <div className="md:col-span-5 flex flex-col justify-between h-full space-y-5">
              
              <div className="bg-forest-light/60 p-5 rounded-2xl border border-forest/30">
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-forest uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-forest" />
                  <span>Suggested Response Actions</span>
                </div>
                
                <ul className="space-y-2.5 text-xs text-ink-light">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                    <span><strong>Water testing:</strong> Dispatch Mobile Lab for chlorine &amp; bacterial testing at 4 community handpumps.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                    <span><strong>Targeted Health Camp:</strong> Mobilize Block PHC team with ORS packets, zinc, and water purification tablets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest mt-1.5 shrink-0" />
                    <span><strong>Community Advisory:</strong> Broadcast boiled water advisory through village headmen and ASHA workers.</span>
                  </li>
                </ul>
              </div>

              {/* Safety & Medical Language Notice */}
              <div className="p-4 rounded-xl bg-paper border border-border-subtle text-[11px] text-ink-muted leading-relaxed">
                <span className="font-semibold text-ink block mb-0.5">Clinical Disclaimer:</span>
                This early warning signal represents statistical and environmental risk intelligence for surveillance decision support. It does not constitute individual clinical diagnosis.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
