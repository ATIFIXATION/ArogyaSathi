import React from 'react';
import {
  X,
  Pill,
  CheckCircle2,
  Calendar,
  Building2,
  Clock,
  Download
} from 'lucide-react';
import { MEDICINES_DATA, CITIZEN_PROFILE } from '../../data/citizenData';

export const PrescriptionModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D98A2C] text-white flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Active Prescriptions &amp; Pharmacy Log
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Patient: {CITIZEN_PROFILE.name} • Akkalkuwa PHC Pharmacy
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs sm:text-sm overflow-y-auto max-h-[60vh]">
          {MEDICINES_DATA.map((med) => (
            <div
              key={med.id}
              className="p-4 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#211C17]">
                    {med.name}
                  </h4>
                  <span className="text-xs font-semibold text-[#B94A25]">{med.dosage}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]">
                  {med.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-[#5A5145]">
                <div>
                  <span className="text-[#756B60] block text-[11px]">Timing:</span>
                  <strong>{med.timing}</strong>
                </div>
                <div>
                  <span className="text-[#756B60] block text-[11px]">Purpose:</span>
                  <span>{med.prescribedFor}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#756B60] pt-1.5 border-t border-[#EAE0D2] flex justify-between">
                <span>Dispensed: {med.pharmacy}</span>
                <span className="font-semibold text-[#405642]">{med.remainingDays}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex items-center justify-between">
          <button
            onClick={() => alert('Downloading official digital prescription (PDF)...')}
            className="px-3.5 py-1.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold hover:bg-[#EAE0D2] flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#B94A25]" />
            <span>Download Prescription PDF</span>
          </button>
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
