import React from 'react';
import {
  X,
  Activity,
  CheckCircle2,
  Calendar,
  Building2,
  Download,
  FileText
} from 'lucide-react';
import { DIAGNOSTICS_DATA, CITIZEN_PROFILE } from '../../data/citizenData';

export const DiagnosticsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3D6B8C] text-white flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Diagnostic Lab Reports
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Patient: {CITIZEN_PROFILE.name} • Verified Lab Records
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs sm:text-sm overflow-y-auto max-h-[60vh]">
          {DIAGNOSTICS_DATA.map((diag) => (
            <div
              key={diag.id}
              className="p-4 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#211C17]">
                    {diag.testName}
                  </h4>
                  <span className="text-[11px] text-[#756B60]">{diag.facility} • {diag.date}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                  diag.status === 'Result Available'
                    ? 'bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]'
                    : 'bg-[#EBF2F7] text-[#3D6B8C] border border-[#CADAE5]'
                }`}>
                  {diag.status}
                </span>
              </div>

              <div className="p-2.5 bg-[#FAF7F2] border border-[#E3D7C7] rounded-lg text-xs text-[#3D352C]">
                <strong>Findings:</strong> {diag.resultSummary}
              </div>

              {diag.pdfAvailable && (
                <div className="pt-2 border-t border-[#EAE0D2] flex justify-end">
                  <button
                    onClick={() => alert(`Downloading verified lab report for ${diag.testName} (PDF)...`)}
                    className="text-xs font-bold text-[#3D6B8C] hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Lab Report (PDF)</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#3D6B8C] text-white rounded-lg text-xs font-semibold hover:bg-[#2D526C]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
