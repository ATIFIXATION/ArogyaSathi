import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { RiskBadge } from '../ui/RiskBadge';
import { MapPin, Navigation, Shield, CloudRain, Mountain, Waves } from 'lucide-react';

export const NortheastSection = () => {
  const [activeState, setActiveState] = useState('Assam');

  const stateDetails = {
    Assam: {
      capital: 'Dispur',
      terrain: 'Riverine flood plains & Char islands',
      icon: Waves,
      hotspotDistricts: 'Kamrup, Dhemaji, Majuli, Dhubri',
      surveillanceCenters: '1,420 Sub-Centers active',
      primaryRisk: 'Post-flood water-borne contamination & siltation',
      riskLevel: 'high',
      offlineNeed: 'High — Flooded road links & intermittent 2G/3G towers',
    },
    'Arunachal Pradesh': {
      capital: 'Itanagar',
      terrain: 'High altitude mountain valleys & dispersed hamlets',
      icon: Mountain,
      hotspotDistricts: 'Papum Pare, Changlang, Upper Subansiri',
      surveillanceCenters: '480 Sub-Centers active',
      primaryRisk: 'Landslide isolation & seasonal water pipeline fractures',
      riskLevel: 'medium',
      offlineNeed: 'Critical — Foot-patrol surveillance without mobile signal',
    },
    Meghalaya: {
      capital: 'Shillong',
      terrain: 'High rainfall plateaus & karst topography',
      icon: CloudRain,
      hotspotDistricts: 'West Khasi Hills, East Garo Hills',
      surveillanceCenters: '560 Sub-Centers active',
      primaryRisk: 'Heavy precipitation leaching into untreated springs',
      riskLevel: 'medium',
      offlineNeed: 'High — Cloud cover & valley reception dropouts',
    },
    Manipur: {
      capital: 'Imphal',
      terrain: 'Intermontane valley and surrounding hill tracts',
      icon: Mountain,
      hotspotDistricts: 'Imphal West, Churachandpur, Thoubal',
      surveillanceCenters: '510 Sub-Centers active',
      primaryRisk: 'Lake basin water stagnation & vector-water co-occurrence',
      riskLevel: 'medium',
      offlineNeed: 'High — Remote hill hamlet visits require offline storage',
    },
    Mizoram: {
      capital: 'Aizawl',
      terrain: 'Steep ridge settlements & bamboo forests',
      icon: Mountain,
      hotspotDistricts: 'Aizawl, Lunglei, Champhai',
      surveillanceCenters: '390 Sub-Centers active',
      primaryRisk: 'Rainwater harvesting tank purity & seasonal diarrhoea',
      riskLevel: 'low',
      offlineNeed: 'Moderate — Village council reporting synchronization',
    },
    Nagaland: {
      capital: 'Kohima',
      terrain: 'Rugged forested hills & terraced hamlets',
      icon: Mountain,
      hotspotDistricts: 'Kohima, Dimapur, Mon',
      surveillanceCenters: '420 Sub-Centers active',
      primaryRisk: 'Spring water bacterial loading during monsoon onset',
      riskLevel: 'low',
      offlineNeed: 'High — Periodic sync at Block Community Health Centers',
    },
    Tripura: {
      capital: 'Agartala',
      terrain: 'Low hill ranges & river alluvial plains',
      icon: Waves,
      hotspotDistricts: 'West Tripura, Dhalai, South Tripura',
      surveillanceCenters: '590 Sub-Centers active',
      primaryRisk: 'Tube-well iron/arsenic co-contamination & seasonal flu',
      riskLevel: 'low',
      offlineNeed: 'Moderate — Door-to-door sync with regional PHC',
    },
    Sikkim: {
      capital: 'Gangtok',
      terrain: 'Glacial streams & alpine settlements',
      icon: Mountain,
      hotspotDistricts: 'East Sikkim, West Sikkim',
      surveillanceCenters: '210 Sub-Centers active',
      primaryRisk: 'Glacial runoff turbidity & localized spring contamination',
      riskLevel: 'low',
      offlineNeed: 'Moderate — Mobile health camp telemetry backhaul',
    },
  };

  const statesList = Object.keys(stateDetails);
  const current = stateDetails[activeState];
  const IconComponent = current.icon;

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Geographic Grounding"
          title="Built for the"
          titleEmphasis="Northeast."
          subtitle="Designed specifically for the geographic realities, distributed hill communities, riverine char islands, and high-precipitation environments of the Eight Sister States."
          align="center"
          className="mb-14"
        />

        {/* State Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 mb-10 no-scrollbar">
          {statesList.map((state) => (
            <button
              key={state}
              onClick={() => setActiveState(state)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeState === state
                  ? 'bg-paper-light border-terracotta text-terracotta shadow-sm font-semibold'
                  : 'bg-paper/70 border-border-soft text-ink-muted hover:text-ink hover:bg-paper-light'
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Map & Context Card Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center Map Visual Container */}
          <div className="lg:col-span-7 bg-paper-light rounded-2xl p-6 sm:p-8 border border-border-soft shadow-card relative overflow-hidden flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between border-b border-border-subtle/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-terracotta" />
                <span className="text-xs font-bold uppercase tracking-wider text-ink">
                  Northeast Geographic Surveillance Grid
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-ink-muted">Active State:</span>
                <span className="text-xs font-bold text-terracotta">{activeState}</span>
              </div>
            </div>

            {/* Map Illustration Reference Canvas */}
            <div className="relative w-full aspect-[16/11] max-w-xl rounded-xl overflow-hidden bg-paper-warm/80 border border-border-subtle flex items-center justify-center p-2">
              <img
                src="/assets/reference/swasthyasetu_extracted_assets/03-northeast-map.png"
                alt="Northeast India surveillance map"
                className="w-full h-full object-contain filter contrast-[1.02]"
              />

              {/* Dynamic Overlay Marker */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper-light/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border-soft shadow-md flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span className="text-xs font-bold text-ink">{activeState}</span>
                <RiskBadge level={current.riskLevel} size="xs" />
              </div>
            </div>

            {/* Map Footer Legend */}
            <div className="mt-4 pt-3 w-full border-t border-border-subtle flex flex-wrap items-center justify-between text-xs text-ink-muted gap-2">
              <span>8 States • 120 Monitored Districts</span>
              <div className="flex items-center gap-3 font-medium">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-terracotta" /> High Risk</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-risk-medium" /> Moderate</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-forest" /> Low</span>
              </div>
            </div>

          </div>

          {/* Right State Intelligence Profile */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="bg-paper-light rounded-2xl p-6 sm:p-7 border border-border-soft shadow-subtle">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold text-terracotta tracking-wider uppercase">
                    State Profile
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-ink">
                    {activeState}
                  </h3>
                  <div className="text-xs text-ink-muted">Capital: {current.capital}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-paper border border-border-soft flex items-center justify-center text-ink">
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-ink-light">
                <div className="p-3 rounded-lg bg-paper border border-border-subtle/80">
                  <span className="font-semibold text-ink block mb-0.5">Terrain &amp; Hydrology:</span>
                  <span className="text-ink-muted">{current.terrain}</span>
                </div>

                <div className="p-3 rounded-lg bg-paper border border-border-subtle/80">
                  <span className="font-semibold text-ink block mb-0.5">Priority Hotspot Districts:</span>
                  <span className="text-terracotta font-medium">{current.hotspotDistricts}</span>
                </div>

                <div className="p-3 rounded-lg bg-paper border border-border-subtle/80">
                  <span className="font-semibold text-ink block mb-0.5">Environmental Risk Pattern:</span>
                  <span className="text-ink-muted">{current.primaryRisk}</span>
                </div>

                <div className="p-3 rounded-lg bg-paper-warm border border-terracotta/20 flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Offline Sync Architecture:</span>
                    <span className="text-ink-muted">{current.offlineNeed}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-ink-muted">{current.surveillanceCenters}</span>
                <span className="text-forest font-semibold">Active Syncing</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
