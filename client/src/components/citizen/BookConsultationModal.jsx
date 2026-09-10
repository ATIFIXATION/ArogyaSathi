import React, { useState } from 'react';
import {
  X,
  Stethoscope,
  Calendar,
  Clock,
  Building2,
  CheckCircle2,
  Video,
  User
} from 'lucide-react';
import { NEARBY_FACILITIES, CITIZEN_PROFILE } from '../../data/citizenData';

export const BookConsultationModal = ({ onClose, onBookSuccess }) => {
  const [facility, setFacility] = useState(NEARBY_FACILITIES[0].name);
  const [consultType, setConsultType] = useState('In-Person PHC Visit');
  const [preferredDate, setPreferredDate] = useState('2026-08-28');
  const [preferredSlot, setPreferredSlot] = useState('Morning (10:00 AM – 01:00 PM)');
  const [reason, setReason] = useState('Routine checkup & consultation');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBookSuccess) {
      onBookSuccess({
        facility,
        consultType,
        preferredDate,
        preferredSlot,
        reason
      });
    }
    alert(`Consultation booked at ${facility} for ${preferredDate} (${preferredSlot}). Confirmation SMS sent to ${CITIZEN_PROFILE.phone}.`);
    onClose();
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
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Book / Request Consultation
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Connected PHC Network • Maharashtra
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-[#211C17] mb-1">
              Select Healthcare Facility
            </label>
            <select
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
            >
              {NEARBY_FACILITIES.map((fac) => (
                <option key={fac.id} value={fac.name}>{fac.name} ({fac.distance})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">
              Consultation Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'In-Person PHC Visit', icon: Building2 },
                { label: 'Audio / Video Teleconsult', icon: Video }
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setConsultType(item.label)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    consultType === item.label
                      ? 'bg-[#EBF2F7] border-[#3D6B8C] text-[#3D6B8C]'
                      : 'bg-[#FAF7F2] border-[#DCCDBB] text-[#756B60]'
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#211C17] mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#211C17] mb-1">
                Time Slot
              </label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
              >
                <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                <option value="Afternoon (02:00 PM – 04:30 PM)">Afternoon (02:00 PM – 04:30 PM)</option>
                <option value="Evening (05:00 PM – 07:00 PM)">Evening (05:00 PM – 07:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">
              Reason for Consultation / Symptoms
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Fever checkup, prenatal advice, blood pressure screen"
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#756B60]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#3D6B8C] hover:bg-[#2D526C] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const FacilityDetailModal = ({ facility, onClose, onBookAppointment }) => {
  if (!facility) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#405642]" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              {facility.name}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Facility Type:</span>
            <span className="font-bold text-[#211C17]">{facility.type}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Distance &amp; Transit:</span>
            <span className="font-semibold text-[#B94A25]">{facility.distance} • {facility.travelTime}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Medical Officer on Duty:</span>
            <span className="font-bold text-[#405642]">{facility.doctorAvailable}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#756B60]">Operational Timing:</span>
            <span className="text-[#211C17]">{facility.timing}</span>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl space-y-2 text-xs">
            <strong className="block text-[#211C17]">Available Healthcare Services:</strong>
            <div className="flex flex-wrap gap-1.5">
              {facility.services.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-[#FAF7F2] border border-[#DCCDBB] text-[11px] text-[#4A4238]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#756B60]"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onBookAppointment) onBookAppointment(facility);
            }}
            className="px-4 py-1.5 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Book at this Facility
          </button>
        </div>
      </div>
    </div>
  );
};
