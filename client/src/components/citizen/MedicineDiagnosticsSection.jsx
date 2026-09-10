import React from 'react';
import {
  Pill,
  Activity,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { MEDICINES_DATA, DIAGNOSTICS_DATA } from '../../data/citizenData';

export const MedicineDiagnosticsSection = ({
  onViewPrescription,
  onViewDiagnostics
}) => {
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#405642] uppercase tracking-wider block mb-1">
              Care Continuity Layer
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211C17]">
              Medicines &amp; Diagnostics
            </h2>
            <p className="text-xs sm:text-sm text-[#756B60] mt-1 font-sans">
              Keep track of active prescriptions, pharmacy dispensation, and verified laboratory test reports.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Cards (7 Cols on LG) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Prescriptions Summary Card */}
            <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#FEF6EE] text-[#D98A2C] flex items-center justify-center">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                      Active Prescriptions
                    </h3>
                    <p className="text-[11px] text-[#756B60]">
                      2 medicines prescribed • Dispensed at Akkalkuwa PHC
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onViewPrescription}
                  className="px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#DCCDBB] text-[#211C17] rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Medicine Quick List */}
              <div className="space-y-2 mt-3 pt-3 border-t border-[#EAE0D2]">
                {MEDICINES_DATA.slice(0, 2).map((med) => (
                  <div key={med.id} className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#FAF7F2] border border-[#E3D7C7]">
                    <div>
                      <strong className="text-[#211C17] block">{med.name}</strong>
                      <span className="text-[#756B60] text-[11px]">{med.dosage} ({med.timing})</span>
                    </div>
                    <span className="text-[10.5px] font-semibold text-[#405642] bg-[#EAF0E6] px-2 py-0.5 rounded">
                      {med.remainingDays}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics Lab Results Card */}
            <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#EBF2F7] text-[#3D6B8C] flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                      Diagnostic Laboratory Reports
                    </h3>
                    <p className="text-[11px] text-[#756B60]">
                      Blood test — Result available &amp; verified by Medical Officer
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onViewDiagnostics}
                  className="px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#DCCDBB] text-[#3D6B8C] rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <span>View Lab Results</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Diagnostic Quick Row */}
              <div className="space-y-2 mt-3 pt-3 border-t border-[#EAE0D2]">
                <div className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E3D7C7]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#5C8A5E] shrink-0" />
                    <div>
                      <strong className="text-[#211C17] block">Complete Blood Count (CBC)</strong>
                      <span className="text-[#756B60] text-[11px]">Hemoglobin 11.8 g/dL (Normal)</span>
                    </div>
                  </div>
                  <span className="text-[10.5px] font-bold text-[#3D6B8C] bg-[#EBF2F7] px-2.5 py-1 rounded-md">
                    Report Ready (PDF)
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual (5 Cols on LG) featuring medicine-diagnostics.png */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl p-6 sm:p-8 shadow-lg overflow-hidden flex flex-col items-center">
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                <img
                  src="/assets/swasthya-setu-assets/medicine-diagnostics.png"
                  alt="Medicines & Diagnostics in Rural Healthcare"
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/assets/plant.png';
                  }}
                />
              </div>

              <div className="mt-3 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl px-3.5 py-1.5 flex items-center justify-between w-full text-xs text-[#756B60]">
                <span>Akkalkuwa PHC Pharmacy</span>
                <span className="text-[#405642] font-semibold">100% Free Govt Supply</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
