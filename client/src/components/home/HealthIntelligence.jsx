import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RiskBadge } from '../ui/RiskBadge';
import { Activity, AlertCircle, Droplet, CloudRain, ArrowUpRight, BarChart3 } from 'lucide-react';

export const HealthIntelligence = () => {
  const [selectedDisease, setSelectedDisease] = useState('diarrhoea');

  const diseaseData = {
    diarrhoea: {
      name: 'Diarrhoeal Illness',
      change: '+42%',
      risk: 'high',
      timeline: 'Last 7 Days',
      hotspots: 'Kamrup & Dhemaji',
      summary: 'Statistical syndromic clustering detected across 4 riverine sub-centers following Brahmaputra tributary rainfall surge.',
      signals: [
        { label: 'Syndromic Reports', val: '184 cases', trend: '↑ 42% vs baseline', status: 'high' },
        { label: 'Water Turbidity', val: '8.6 NTU', trend: 'Exceeds safe limit (5.0)', status: 'high' },
        { label: 'Rainfall Surge', val: '142 mm', trend: '72h cumulative peak', status: 'medium' },
        { label: 'Frontline Flags', val: '12 ASHA alerts', trend: 'Door-to-door clusters', status: 'high' },
      ],
      points: [
        { day: 'Mon', actual: 24, baseline: 22 },
        { day: 'Tue', actual: 28, baseline: 21 },
        { day: 'Wed', actual: 35, baseline: 23 },
        { day: 'Thu', actual: 48, baseline: 24 },
        { day: 'Fri', actual: 64, baseline: 22 },
        { day: 'Sat', actual: 82, baseline: 25 },
        { day: 'Sun', actual: 112, baseline: 24 },
      ]
    },
    gastro: {
      name: 'Acute Gastroenteritis',
      change: '+28%',
      risk: 'medium',
      timeline: 'Last 7 Days',
      hotspots: 'West Khasi Hills',
      summary: 'Gradual upward variance linked to unprotected open well sources in hill hamlet clusters.',
      signals: [
        { label: 'Syndromic Reports', val: '92 cases', trend: '↑ 28% vs baseline', status: 'medium' },
        { label: 'Water Coliform', val: 'Positive', trend: 'Sample tests in 3 hamlets', status: 'high' },
        { label: 'Rainfall Surge', val: '65 mm', trend: 'Seasonal normal', status: 'low' },
        { label: 'Frontline Flags', val: '6 ASHA alerts', trend: 'Single block concentration', status: 'medium' },
      ],
      points: [
        { day: 'Mon', actual: 18, baseline: 16 },
        { day: 'Tue', actual: 20, baseline: 17 },
        { day: 'Wed', actual: 22, baseline: 16 },
        { day: 'Thu', actual: 29, baseline: 18 },
        { day: 'Fri', actual: 36, baseline: 17 },
        { day: 'Sat', actual: 44, baseline: 18 },
        { day: 'Sun', actual: 52, baseline: 19 },
      ]
    },
    fever: {
      name: 'Undifferentiated Fever',
      change: '+12%',
      risk: 'low',
      timeline: 'Last 7 Days',
      hotspots: 'Papum Pare',
      summary: 'Variance within expected seasonal standard deviation. Continues under baseline passive surveillance.',
      signals: [
        { label: 'Syndromic Reports', val: '45 cases', trend: '↑ 12% vs baseline', status: 'low' },
        { label: 'Water Turbidity', val: '3.2 NTU', trend: 'Within safe parameters', status: 'low' },
        { label: 'Rainfall Surge', val: '40 mm', trend: 'Light precipitation', status: 'low' },
        { label: 'Frontline Flags', val: '2 ASHA alerts', trend: 'Isolated reports', status: 'low' },
      ],
      points: [
        { day: 'Mon', actual: 12, baseline: 14 },
        { day: 'Tue', actual: 15, baseline: 14 },
        { day: 'Wed', actual: 13, baseline: 13 },
        { day: 'Thu', actual: 16, baseline: 15 },
        { day: 'Fri', actual: 14, baseline: 14 },
        { day: 'Sat', actual: 17, baseline: 15 },
        { day: 'Sun', actual: 18, baseline: 16 },
      ]
    }
  };

  const current = diseaseData[selectedDisease];

  return (
    <section id="health-intelligence" className="py-20 sm:py-28 relative overflow-hidden bg-paper-warm/40 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Pattern Recognition &amp; Anomaly Detection"
          title="From scattered signals to"
          titleEmphasis="meaningful patterns."
          subtitle="Transforming disparate village logs, rainfall telemetry, and water indicators into contextual public health intelligence."
          align="center"
          className="mb-14"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
          {[
            { id: 'diarrhoea', label: 'Diarrhoeal Illness (High Risk)' },
            { id: 'gastro', label: 'Acute Gastroenteritis' },
            { id: 'fever', label: 'Undifferentiated Fever' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDisease(tab.id)}
              className={`text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                selectedDisease === tab.id
                  ? 'bg-paper-light border-terracotta text-terracotta shadow-sm font-semibold'
                  : 'bg-paper/80 border-border-soft text-ink-muted hover:text-ink hover:bg-paper-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Analytics Card Canvas */}
        <div className="bg-paper-light rounded-2xl border border-border-soft p-6 sm:p-8 lg:p-10 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Col: Interactive Chart Visualizer */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle/80 pb-5 mb-6">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink">
                      {current.name} Trend
                    </h3>
                    <RiskBadge level={current.risk} />
                  </div>
                  <p className="text-xs text-ink-muted mt-1">
                    Temporal syndromic variance against 5-year seasonal baseline
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5 text-terracotta">
                    <span className="w-2.5 h-0.5 bg-terracotta" />
                    <span>Observed ({current.timeline})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest">
                    <span className="w-2.5 h-0.5 bg-forest border-dashed" />
                    <span>Expected Baseline</span>
                  </div>
                </div>
              </div>

              {/* Chart SVG Canvas */}
              <div className="relative w-full h-64 sm:h-72 bg-paper/60 rounded-xl p-4 border border-border-subtle/80 flex flex-col justify-between">
                
                {/* Horizontal Grid lines */}
                <div className="absolute inset-x-4 top-8 bottom-12 flex flex-col justify-between pointer-events-none opacity-40">
                  <div className="border-b border-border-soft border-dashed w-full" />
                  <div className="border-b border-border-soft border-dashed w-full" />
                  <div className="border-b border-border-soft border-dashed w-full" />
                </div>

                {/* SVG Curves */}
                <div className="relative w-full h-full pb-6">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                    {/* Baseline Line (Forest) */}
                    <path
                      d="M 50,150 Q 150,145 250,140 T 450,142 T 650,140"
                      fill="none"
                      stroke="#405642"
                      strokeWidth="2.5"
                      strokeDasharray="6,6"
                    />
                    
                    {/* Actual Trend Line (Terracotta) */}
                    <path
                      d={
                        selectedDisease === 'diarrhoea'
                          ? "M 50,145 Q 150,135 250,120 T 450,80 T 550,50 T 650,20"
                          : selectedDisease === 'gastro'
                          ? "M 50,150 Q 150,140 250,130 T 450,105 T 550,85 T 650,65"
                          : "M 50,155 Q 150,148 250,152 T 450,144 T 550,148 T 650,142"
                      }
                      fill="none"
                      stroke="#B94A25"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Gradient Fill under observed */}
                    <path
                      d={
                        selectedDisease === 'diarrhoea'
                          ? "M 50,145 Q 150,135 250,120 T 450,80 T 550,50 T 650,20 L 650,190 L 50,190 Z"
                          : selectedDisease === 'gastro'
                          ? "M 50,150 Q 150,140 250,130 T 450,105 T 550,85 T 650,65 L 650,190 L 50,190 Z"
                          : "M 50,155 Q 150,148 250,152 T 450,144 T 550,148 T 650,142 L 650,190 L 50,190 Z"
                      }
                      fill="url(#terracotta-gradient)"
                      opacity="0.12"
                    />

                    <defs>
                      <linearGradient id="terracotta-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B94A25" />
                        <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Active Hotspot Anomaly Marker */}
                    {selectedDisease === 'diarrhoea' && (
                      <g transform="translate(650, 20)">
                        <circle r="6" fill="#B94A25" className="animate-ping opacity-75" />
                        <circle r="5" fill="#B94A25" />
                      </g>
                    )}
                  </svg>
                </div>

                {/* X Axis Days */}
                <div className="flex justify-between text-[11px] font-mono text-ink-muted pt-2 border-t border-border-subtle/80 px-2">
                  {current.points.map((p) => (
                    <span key={p.day}>{p.day}</span>
                  ))}
                </div>
              </div>

              {/* Bottom Insight Strip */}
              <div className="mt-4 p-3.5 rounded-xl bg-paper border border-border-subtle flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <p className="text-xs text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">Epidemiological Note: </strong>
                  {current.summary}
                </p>
              </div>

            </div>

            {/* Right Col: Multi-Signal Correlation Matrix */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-subtle/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                    Contributing Environmental &amp; Field Signals
                  </span>
                  <span className="text-xs font-serif font-bold text-terracotta">
                    {current.hotspots}
                  </span>
                </div>

                <div className="space-y-3">
                  {current.signals.map((sig, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-paper border border-border-subtle/80 hover:border-terracotta/30 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-ink">{sig.label}</div>
                        <div className="text-[11px] text-ink-muted mt-0.5">{sig.trend}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-mono font-bold text-ink">{sig.val}</span>
                        <div className="mt-0.5">
                          <RiskBadge level={sig.status} size="xs" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Suggestion Card */}
              <div className="mt-6 p-4 rounded-xl bg-forest-subtle/50 border border-forest/30">
                <div className="flex items-center gap-2 text-xs font-bold text-forest uppercase tracking-wider mb-1.5">
                  <Activity className="w-4 h-4" />
                  <span>Early Action Protocol</span>
                </div>
                <p className="text-xs text-ink-light leading-relaxed">
                  Triggers automatic notification to Block Medical Officer for water chlorine residual testing and oral rehydration salt (ORS) stock audit.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
