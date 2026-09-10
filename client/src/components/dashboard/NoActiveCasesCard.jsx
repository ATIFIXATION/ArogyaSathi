import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, WifiOff, Clock, Building2 } from 'lucide-react';
import { NO_ACTIVE_CASES_FACILITIES } from '../../data/dashboardData';

export const NoActiveCasesCard = () => {
  const [filter, setFilter] = useState('all');

  const filteredFacilities = NO_ACTIVE_CASES_FACILITIES.filter((f) => {
    if (filter === 'verified') return f.status === 'Operational';
    if (filter === 'silence') return f.status.includes('Offline');
    return true;
  });

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between h-full">
      <div>
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              &ldquo;No Active Cases&rdquo; Verification
            </h2>
          </div>
          <span className="text-[10.5px] text-[#756B60] italic hidden sm:inline">
            Distinguish Zero Cases vs. Data Silence
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-3.5 select-none text-[11px]">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-2.5 py-0.5 rounded-full font-semibold border transition-all ${
              filter === 'all'
                ? 'bg-[#20392B] text-white border-[#20392B]'
                : 'bg-[#FAF7F2] text-[#756B60] border-[#DCCDBB] hover:bg-[#EFE5D5]'
            }`}
          >
            All Units ({NO_ACTIVE_CASES_FACILITIES.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('verified')}
            className={`px-2.5 py-0.5 rounded-full font-semibold border transition-all ${
              filter === 'verified'
                ? 'bg-[#5C8A5E] text-white border-[#5C8A5E]'
                : 'bg-[#FAF7F2] text-[#405642] border-[#DCCDBB] hover:bg-[#EFE5D5]'
            }`}
          >
            Verified Healthy (2)
          </button>
          <button
            type="button"
            onClick={() => setFilter('silence')}
            className={`px-2.5 py-0.5 rounded-full font-semibold border transition-all ${
              filter === 'silence'
                ? 'bg-[#B94A25] text-white border-[#B94A25]'
                : 'bg-[#FAF7F2] text-[#B94A25] border-[#DCCDBB] hover:bg-[#EFE5D5]'
            }`}
          >
            Data Silence Alert (1)
          </button>
        </div>

        {/* Facility Cards List */}
        <div className="space-y-2.5">
          {filteredFacilities.map((fac) => {
            const isOffline = fac.status.includes('Offline');

            return (
              <div
                key={fac.id}
                className={`p-3 rounded-xl border transition-all text-xs ${
                  isOffline
                    ? 'bg-[#FDF2F0] border-[#F5C2BC]'
                    : 'bg-[#FAF7F2] border-[#E3D7C7] hover:bg-[#F5EDE0]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-[#211C17]">
                      <Building2 className="w-3.5 h-3.5 text-[#756B60] shrink-0" />
                      <span className="truncate">{fac.facilityName}</span>
                      <span className="text-[10px] text-[#756B60] font-normal">({fac.district})</span>
                    </div>
                    <p className="text-[11px] text-[#756B60] mt-0.5 leading-snug">
                      {fac.notes}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      isOffline
                        ? 'bg-[#C0392B] text-white'
                        : 'bg-[#EFF4EF] text-[#405642] border border-[#D4E2D4]'
                    }`}
                  >
                    {isOffline ? 'Data Silence' : '0 Cases (Healthy)'}
                  </span>
                </div>

                <div className="mt-2 pt-1.5 border-t border-[#EAE0D2]/60 flex items-center justify-between text-[10.5px] text-[#756B60]">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#9E9488]" />
                    <span>Last Synced: <strong>{fac.lastReported}</strong></span>
                  </div>
                  <div>
                    {isOffline ? (
                      <span className="text-[#C0392B] font-semibold flex items-center gap-1">
                        <WifiOff className="w-3 h-3" /> Check Network Hardware
                      </span>
                    ) : (
                      <span className="text-[#405642] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Reporting Verified Active
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[#EAE0D2] flex items-center justify-between text-[11px] text-[#756B60]">
        <span>Reporting Fidelity: <strong>96.4%</strong> Active</span>
        <button
          onClick={() => alert('Dispatching automated ping to all 120+ facility nodes in Maharashtra...')}
          className="text-[#B94A25] font-semibold hover:underline"
        >
          Ping All Facility Nodes →
        </button>
      </div>
    </div>
  );
};
