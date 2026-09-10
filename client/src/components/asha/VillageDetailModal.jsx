import React from 'react';
import {
  X,
  MapPin,
  Home,
  CheckCircle2,
  RotateCw,
  Clock,
  UserPlus
} from 'lucide-react';

export const VillageDetailModal = ({ village, onClose, onStartVisit }) => {
  if (!village) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B94A25]" />
            <h3 className="text-base font-serif font-bold text-[#211C17]">
              {village.name} Community Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17] hover:bg-[#E3D7C7]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Block Jurisdiction:</span>
            <span className="font-bold text-[#211C17]">Akkalkuwa Block, Maharashtra</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Household Coverage:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]">
              {village.coveragePct || '80%'} Covered
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D7C7]">
              <span className="text-[11px] text-[#756B60] block font-medium">Total Households</span>
              <span className="text-lg font-serif font-bold text-[#211C17]">{village.households}</span>
              <span className="text-[10px] text-[#405642] font-semibold block">{village.visitsCompleted} visits logged</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D7C7]">
              <span className="text-[11px] text-[#756B60] block font-medium">Continuity Tasks</span>
              <span className="text-lg font-serif font-bold text-[#B94A25]">{village.followUpsDue} follow-ups</span>
              <span className="text-[10px] text-[#756B60] block">{village.pendingReferrals || 4} referrals pending</span>
            </div>
          </div>

          {/* Quick Schedule Notice */}
          <div className="bg-[#FBF0EB] p-3 rounded-lg border border-[#F6E4DC] text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#B94A25] mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Next Field Schedule</span>
            </div>
            <p className="text-[#211C17]">
              Routine antenatal checks and medicine adherence monitoring planned for {village.name}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#EAE0D2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#211C17]"
          >
            Close
          </button>
          <button
            onClick={() => onStartVisit && onStartVisit(village.name)}
            className="px-4 py-1.5 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Start Household Visit
          </button>
        </div>
      </div>
    </div>
  );
};
