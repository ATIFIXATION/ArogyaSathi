import React from 'react';
import {
  X,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  Building2,
  Phone,
  RotateCw,
  CheckCircle2
} from 'lucide-react';

export const AlertDetailModal = ({ alert, onClose, onStartVisit }) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${alert.badgeClass || 'bg-[#B94A25] text-white'}`}>
              {alert.severity}
            </span>
            <span className="text-xs text-[#756B60] flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {alert.timeAgo}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-snug">
              {alert.title}
            </h3>
            <div className="flex items-center gap-1.5 text-[#B94A25] font-semibold mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{alert.location} Community</span>
            </div>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl space-y-1.5">
            <div className="text-[#756B60]">
              <strong>Patient Context:</strong> {alert.patientName || 'Community Member'}
            </div>
            <div className="text-[#756B60]">
              <strong>Target Facility:</strong> {alert.facilityTarget || 'Taloda CHC'}
            </div>
            <p className="text-xs text-[#3D352C] pt-1">
              {alert.description}
            </p>
          </div>

          <div className="p-3 bg-[#FBF0EB] border border-[#F6E4DC] rounded-xl text-xs space-y-1">
            <span className="font-bold text-[#B94A25] block">
              Required Frontline ASHA Step:
            </span>
            <p className="text-[#211C17]">
              Conduct doorstep visit to ensure referral slip delivery and coordinate transport or medicine refill.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#EAE0D2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#211C17]"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              if (onStartVisit) onStartVisit(alert.location);
              onClose();
            }}
            className="px-4 py-1.5 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {alert.actionLabel || 'Proceed with Task'}
          </button>
        </div>
      </div>
    </div>
  );
};
