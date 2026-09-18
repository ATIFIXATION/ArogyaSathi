import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RiskBadge } from '../ui/RiskBadge';
import { Button } from '../ui/Button';
import { Building2, Stethoscope, Users, Check, ArrowRight } from 'lucide-react';

export const PlatformPreview = () => {
  const [activeBlock, setActiveBlock] = useState('Palghar');

  const blocks = [
    { name: 'Palghar', access: 'High', phcs: 14, bedOccupancy: '68%', status: 'Active Tele-Triage Network' },
    { name: 'Ratnagiri', access: 'Moderate', phcs: 11, bedOccupancy: '54%', status: 'Mobile Medical Unit Active' },
    { name: 'Beed', access: 'Priority', phcs: 18, bedOccupancy: '82%', status: 'High Referral Dispatch' },
    { name: 'Sindhudurg', access: 'High', phcs: 9, bedOccupancy: '45%', status: 'Normal Continuity Roster' },
    { name: 'Gadchiroli', access: 'Priority', phcs: 16, bedOccupancy: '78%', status: 'Specialist Outreach Camp' },
  ];

  const currentBlockData = blocks.find((b) => b.name === activeBlock) || blocks[0];

  return (
    <section id="platform-preview" className="py-16 sm:py-24 relative overflow-hidden bg-paper-warm/40 border-y border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="District Health Command Console"
          title="One unified view of"
          titleEmphasis="healthcare access."
          subtitle="A synchronized public healthcare operations console connecting Primary Health Centres, Sub-Centres, and District Hospitals."
          align="center"
          className="mb-14"
        />

        {/* Console Container Frame */}
        <div className="bg-paper-light rounded-3xl border border-border-soft shadow-card overflow-hidden">
          
          {/* Top Bar of Console */}
          <div className="bg-paper px-6 py-4 border-b border-border-soft flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-forest animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-ink uppercase">
                  AROGYASATHI HEALTHCARE OPERATIONS
                </span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-paper-light border border-border-soft text-ink-muted">
                v2.4 Live
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-paper-light px-3 py-1.5 rounded-lg border border-border-soft text-ink-muted">
                <span className="font-semibold text-ink">Region:</span>
                <span>Maharashtra Rural Health</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-forest font-medium">
                <Check className="w-3.5 h-3.5" /> 120+ Facilities Online
              </span>
            </div>
          </div>

          {/* Metric Summary Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border-subtle/80 bg-paper-light">
            <div className="p-4 sm:p-6 border-r border-b md:border-b-0 border-border-subtle">
              <span className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Connected Facilities
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                120+
              </span>
              <span className="text-[11px] text-forest block mt-0.5 font-medium">
                PHCs, CHCs & Sub-Centres
              </span>
            </div>

            <div className="p-4 sm:p-6 border-r border-b md:border-b-0 border-border-subtle">
              <span className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Active Tele-Consultations
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-terracotta">
                438
              </span>
              <span className="text-[11px] text-ink-muted block mt-0.5">
                Specialist appointments today
              </span>
            </div>

            <div className="p-4 sm:p-6 border-r border-border-subtle">
              <span className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Referral Loop Closure
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-forest">
                86%
              </span>
              <span className="text-[11px] text-ink-muted block mt-0.5">
                Verified post-discharge check
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <span className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">
                Frontline ASHA Sync
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-ink">
                1,120
              </span>
              <span className="text-[11px] text-forest block mt-0.5 font-medium">
                Active community workers
              </span>
            </div>
          </div>

          {/* Interactive Block Inspector Work Area */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Block Selection List */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
                <span className="text-xs font-bold text-ink uppercase tracking-wider">
                  District Health Network Blocks
                </span>
                <span className="text-[11px] text-ink-muted">Click block to inspect</span>
              </div>

              <div className="space-y-2.5">
                {blocks.map((b) => (
                  <div
                    key={b.name}
                    onClick={() => setActiveBlock(b.name)}
                    className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      activeBlock === b.name
                        ? 'bg-paper border-terracotta shadow-sm'
                        : 'bg-paper/40 border-border-subtle hover:bg-paper/70 hover:border-border-soft'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        b.access === 'High' ? 'bg-[#5C8A5E]' : b.access === 'Moderate' ? 'bg-[#E5B54A]' : 'bg-[#DF6638]'
                      }`} />
                      <div>
                        <span className="text-sm font-semibold text-ink block">
                          {b.name} Sector
                        </span>
                        <span className="text-xs text-ink-muted">
                          {b.status}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-ink block">
                        {b.phcs} PHCs
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.access === 'High' ? 'bg-[#EFF4EF] text-[#405642]' : b.access === 'Moderate' ? 'bg-[#FEF8EC] text-[#B87A1E]' : 'bg-[#FBF0EB] text-[#B94A25]'
                      }`}>
                        {b.access} Access
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Block Telemetry & Action Hub */}
            <div className="lg:col-span-7 bg-paper rounded-2xl p-6 border border-border-soft flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between pb-4 border-b border-border-subtle/80 mb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta">
                      Care Access Telemetry
                    </span>
                    <h4 className="text-2xl font-serif font-bold text-ink">
                      {currentBlockData.name} Sector Primary Health Network
                    </h4>
                    <span className="text-xs text-ink-muted">
                      Status: {currentBlockData.status} • Bed Occupancy: {currentBlockData.bedOccupancy}
                    </span>
                  </div>
                </div>

                {/* Sub-metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-paper-light rounded-xl border border-border-subtle">
                    <span className="text-[11px] text-ink-muted block mb-1">Functional PHCs & Sub-Centres</span>
                    <span className="text-xl font-serif font-bold text-ink">{currentBlockData.phcs} Connected Units</span>
                    <span className="text-[10px] text-forest block mt-0.5 font-medium">Doctor on roster 24/7</span>
                  </div>
                  <div className="p-3 bg-paper-light rounded-xl border border-border-subtle">
                    <span className="text-[11px] text-ink-muted block mb-1">Referral Adherence Rate</span>
                    <span className="text-xl font-serif font-bold text-ink">88.4% Completed</span>
                    <span className="text-[10px] text-terracotta block mt-0.5 font-medium">ASHA confirmed recovery</span>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="border-t border-border-subtle/80 pt-4">
                  <span className="text-xs font-bold text-ink uppercase tracking-wider block mb-3">
                    Recent Care Coordination Events
                  </span>
                  <div className="space-y-2 text-xs text-ink-light">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-paper-light border border-border-subtle/60">
                      <span>Tele-consultation completed between PHC {currentBlockData.name} and District Civil Hospital</span>
                      <span className="text-[10px] font-mono text-ink-muted">8m ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-paper-light border border-border-subtle/60">
                      <span>ASHA worker uploaded post-natal follow-up report via offline-first sync</span>
                      <span className="text-[10px] font-mono text-ink-muted">22m ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-ink-muted font-medium">
                  Authorised Action: View District Hospital Transfer Roster
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert(`Opening referral queue for ${currentBlockData.name} sector.`)}
                >
                  View Facility Roster →
                </Button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
