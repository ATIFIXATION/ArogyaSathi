import React from 'react';
import {
  X,
  RotateCw,
  Calendar,
  Building2,
  User,
  CheckCircle2,
  FileText,
  MapPin,
  Clock
} from 'lucide-react';
import { ACTIVE_CARE_DATA, CITIZEN_PROFILE } from '../../data/citizenData';

export const ReferralDetailModal = ({ onClose }) => {
  const activeReferral = ACTIVE_CARE_DATA.activeReferral || {
    id: 'REF-801',
    status: 'Pending Transfer',
    originFacility: 'Akkalkuwa Sub-Centre',
    destinationFacility: 'Taloda Rural Hospital',
    referralDate: '22 Oct 2026',
    appointmentDate: '24 Oct 2026',
    type: 'Specialist Consultation',
    reason: 'High-Risk Pregnancy Evaluation',
    notes: 'Transport coordination advised'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3D6B8C] text-white flex items-center justify-center">
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Specialist Referral Slip
              </h3>
              <p className="text-[11px] text-[#756B60]">
                ID: {activeReferral.id || 'REF-801'} • Maharashtra Referral Network
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div className="p-3.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#756B60] block">Citizen / Patient:</span>
              <strong className="text-sm text-[#211C17]">{CITIZEN_PROFILE.name} ({CITIZEN_PROFILE.age} yrs, {CITIZEN_PROFILE.gender})</strong>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]">
              {activeReferral.status || 'Pending Transfer'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl">
              <span className="text-[#756B60] block font-medium">Referring Sub-Centre</span>
              <strong className="text-[#211C17] block mt-0.5">{activeReferral.originFacility || 'Akkalkuwa Sub-Centre'}</strong>
            </div>
            <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl">
              <span className="text-[#756B60] block font-medium">Destination Hospital</span>
              <strong className="text-[#211C17] block mt-0.5">{activeReferral.destinationFacility || 'Civil Hospital'}</strong>
            </div>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#756B60]">Referral Initiated:</span>
              <strong className="text-[#211C17]">{activeReferral.referralDate || 'Recent'}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#756B60]">Specialist Slot:</span>
              <strong className="text-[#3D6B8C]">{activeReferral.appointmentDate || 'Confirmed'}</strong>
            </div>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl space-y-1 text-xs">
            <strong className="text-[#211C17] block">Referral Reason:</strong>
            <p className="text-[#756B60] leading-relaxed">
              {activeReferral.reason || 'High-Risk Maternal Specialist Evaluation & Ultrasound Screening'}
            </p>
          </div>

          <div className="p-3 bg-[#EAF0E6] border border-[#C5DEC8] rounded-xl flex items-center gap-2 text-xs text-[#405642]">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Transport Coordination: <strong>102 Ambulance Assisted</strong> by ASHA worker.</span>
          </div>
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#3D6B8C] text-white rounded-lg text-xs font-semibold hover:bg-[#2D526C]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const FollowupDetailModal = ({ onClose }) => {
  const activeFollowup = ACTIVE_CARE_DATA.activeFollowup || {
    id: 'FUP-402',
    type: 'Post-Natal Care & Neonatal Check',
    assignedAsha: 'Ayesha Begum',
    dueDate: '25 Oct 2026',
    dueInDays: '2 days',
    status: 'Due Today',
    notes: 'Doorstep vitals & medicine adherence'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D98A2C] text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Scheduled Care Follow-up
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Frontline Recovery &amp; Medicine Adherence
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div className="p-3.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#756B60] block">Follow-up Task:</span>
              <strong className="text-sm text-[#211C17]">{activeFollowup.type || 'Care Follow-up'}</strong>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF8EC] text-[#D98A2C] border border-[#FAD3BD]">
              Due in {activeFollowup.dueInDays || 'Scheduled'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl">
              <span className="text-[#756B60] block font-medium">Scheduled Date</span>
              <strong className="text-[#211C17] block mt-0.5">{activeFollowup.dueDate || 'Upcoming'}</strong>
            </div>
            <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl">
              <span className="text-[#756B60] block font-medium">Conducting Worker</span>
              <strong className="text-[#405642] block mt-0.5">{activeFollowup.assignedAsha || 'Ayesha Begum'}</strong>
            </div>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl space-y-1.5 text-xs">
            <strong className="text-[#211C17] block">Checklist for this Home Visit:</strong>
            <p className="text-[#756B60]">
              • Verify daily intake of prescribed Iron &amp; Folic Acid tablets.<br />
              • Check basic blood pressure and record general maternal recovery.<br />
              • Review any discomfort before the 12 September Civil Hospital specialist appointment.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#D98A2C] text-white rounded-lg text-xs font-semibold hover:bg-[#C27822]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
