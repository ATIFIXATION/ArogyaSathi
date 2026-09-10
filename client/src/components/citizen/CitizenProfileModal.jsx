import React from 'react';
import {
  X,
  User,
  MapPin,
  Phone,
  ShieldCheck,
  Building2,
  Calendar,
  RotateCw,
  HeartPulse
} from 'lucide-react';
import { CITIZEN_PROFILE, ACTIVE_CARE_DATA } from '../../data/citizenData';

export const CitizenProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B94A25] text-white flex items-center justify-center font-bold">
              ID
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Citizen Health Card &amp; Registry
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Ayushman Bharat Health Account (ABHA)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* ABHA ID Card Mockup */}
          <div className="bg-[#FAF7F2] border-2 border-[#DCCDBB] rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#EAE0D2] pb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#756B60]">
                National Health Authority (NHA)
              </span>
              <span className="text-[10.5px] font-bold text-[#405642]">
                Verified Digital Record
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#FDF0E7] text-[#B94A25] flex items-center justify-center font-serif font-bold text-lg border border-[#DCCDBB] shrink-0">
                {CITIZEN_PROFILE.avatarInitials}
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-[#211C17]">
                  {CITIZEN_PROFILE.name}
                </h4>
                <p className="text-xs text-[#756B60]">
                  {CITIZEN_PROFILE.age} yrs • {CITIZEN_PROFILE.gender} • {CITIZEN_PROFILE.village}, {CITIZEN_PROFILE.district}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAE0D2] flex items-center justify-between text-xs">
              <span className="text-[#756B60]">ABHA Number:</span>
              <span className="font-mono font-bold text-[#211C17] text-sm tracking-wider">{CITIZEN_PROFILE.abhaId}</span>
            </div>
          </div>

          {/* Assigned Frontline ASHA Coordinator */}
          <div className="p-3.5 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-[#756B60] block text-[11px]">Assigned Frontline ASHA Worker</span>
              <strong className="text-sm text-[#211C17]">{CITIZEN_PROFILE.assignedAsha.name}</strong>
              <span className="text-[#756B60] block text-[11px]">{CITIZEN_PROFILE.assignedAsha.community}</span>
            </div>
            <span className="font-semibold text-[#405642] bg-[#EAF0E6] px-2.5 py-1 rounded-lg">
              {CITIZEN_PROFILE.assignedAsha.phone}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#B94A25] text-white rounded-lg text-xs font-semibold hover:bg-[#A53E1D]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactAshaModal = ({ onClose }) => {
  const { assignedAsha } = CITIZEN_PROFILE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#405642]" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              Contact ASHA Worker
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs sm:text-sm text-[#3D352C]">
          <div className="text-center py-2 space-y-1">
            <div className="w-14 h-14 rounded-full bg-[#EAF0E6] text-[#405642] flex items-center justify-center mx-auto font-bold text-lg">
              AB
            </div>
            <h4 className="font-serif font-bold text-lg text-[#211C17]">
              {assignedAsha.name}
            </h4>
            <p className="text-xs text-[#756B60]">{assignedAsha.community}</p>
            <p className="text-[11px] font-semibold text-[#405642]">{assignedAsha.availability}</p>
          </div>

          <p className="text-xs text-[#756B60] leading-relaxed text-center">
            Your ASHA worker is available to assist with doorstep basic checks, referral confirmations, maternal health tracking, and PHC appointments.
          </p>

          <div className="space-y-2 pt-2">
            <a
              href={`tel:${assignedAsha.phone}`}
              onClick={(e) => { e.preventDefault(); alert(`Calling ASHA Worker ${assignedAsha.name} (${assignedAsha.phone})...`); }}
              className="w-full py-2.5 bg-[#405642] hover:bg-[#283A2A] text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Direct Phone Call ({assignedAsha.phone})</span>
            </a>

            <button
              onClick={() => {
                alert(`Doorstep visit request sent to ASHA worker ${assignedAsha.name}. She will visit within 24 hours.`);
                onClose();
              }}
              className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#DCCDBB] text-[#211C17] font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <span>Request Doorstep Home Visit</span>
            </button>
          </div>
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button onClick={onClose} className="px-4 py-1.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
