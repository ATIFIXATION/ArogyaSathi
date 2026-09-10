import React from 'react';
import {
  X,
  MapPin,
  Building2,
  Users,
  RotateCw,
  TrendingUp,
  Phone,
  ShieldAlert,
  Clock
} from 'lucide-react';

export const VillageDetailModal = ({ village, onClose }) => {
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
              {village.name} Area Profile
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
            <span className="text-[#756B60]">District Jurisdiction:</span>
            <span className="font-bold text-[#211C17]">{village.district}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Access Classification:</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${village.badgeClass}`}>
              {village.priorityLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D7C7]">
              <span className="text-[11px] text-[#756B60] block">Citizen Cases</span>
              <span className="text-lg font-serif font-bold text-[#211C17]">{village.cases} active</span>
              <span className="text-[10px] text-[#B94A25] font-semibold block">{village.weeklyChange} requests</span>
            </div>
            <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D7C7]">
              <span className="text-[11px] text-[#756B60] block">Facilities & Referrals</span>
              <span className="text-lg font-serif font-bold text-[#3D6B8C]">{village.facilities} units</span>
              <span className="text-[10px] text-[#756B60] block">{village.pendingReferrals} referrals pending</span>
            </div>
          </div>

          {/* Primary Service Gap */}
          <div className="bg-[#FBF0EB] p-3 rounded-lg border border-[#F6E4DC] text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#B94A25] mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Identified Access Bottleneck</span>
            </div>
            <p className="text-[#211C17]">{village.primaryGap}</p>
          </div>

          {/* ASHA Lead Info */}
          <div className="border-t border-[#EAE0D2] pt-3 flex items-center justify-between text-xs">
            <div>
              <span className="text-[11px] text-[#756B60] block">Frontline ASHA Lead</span>
              <span className="font-bold text-[#211C17]">{village.ashaLead || 'Local ASHA Coordinator'}</span>
            </div>
            <button
              onClick={() => alert(`Connecting DHO call to frontline coordinator: ${village.ashaLead}...`)}
              className="px-3 py-1.5 rounded-md bg-[#405642] text-white hover:bg-[#283A2A] transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Phone className="w-3 h-3" />
              Contact ASHA
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#EAE0D2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#211C17]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
