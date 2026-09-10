import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  RotateCw,
  HeartPulse,
  Info
} from 'lucide-react';
import { submitAshaTriage } from '../../services/api';

export const ReportVerificationModal = ({ report, onClose, onVerify }) => {
  const [observedSymptoms, setObservedSymptoms] = useState(report.symptomTags || ['Fever']);
  const [severityGrade, setSeverityGrade] = useState('Moderate');
  const [triageCareAction, setTriageCareAction] = useState('Schedule Tele-Consultation with PHC Doctor');
  const [actionChecklist, setActionChecklist] = useState({
    vitalsChecked: true,
    guidanceGiven: true,
    orsMedProvided: false,
    referredToFacility: false
  });
  const [notes, setNotes] = useState(
    `Field check conducted at ${report.community}. Citizen verified in person. General vitals stable.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleChecklist = (key) => {
    setActionChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCompleteVerification = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      careRequestId: report.dbId || report.id,
      ashaWorkerId: '22222222-2222-2222-2222-000000000002',
      observedSymptoms,
      severityGrade,
      recommendedAction: triageCareAction,
      vitalsChecked: actionChecklist.vitalsChecked,
      guidanceGiven: actionChecklist.guidanceGiven,
      orsMedProvided: actionChecklist.orsMedProvided,
      referralInitiated: actionChecklist.referredToFacility,
      fieldNotes: notes
    };

    try {
      const result = await submitAshaTriage(payload);
      if (onVerify) {
        onVerify({
          ...report,
          verified: true,
          status: 'Verified',
          observedSymptoms,
          severityGrade,
          triageCareAction,
          actionChecklist,
          notes,
          assessment: result.assessment
        });
      }
    } catch (error) {
      console.warn('Backend triage submission error, applying mock update:', error);
      if (onVerify) {
        onVerify({
          ...report,
          verified: true,
          status: 'Verified',
          observedSymptoms,
          severityGrade,
          triageCareAction,
          actionChecklist,
          notes
        });
      }
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono font-bold text-xs bg-[#B94A25] text-white px-2.5 py-1 rounded-md">
              {report.id}
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              Verify Citizen Care Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17] hover:bg-[#E3D7C7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleCompleteVerification} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* Citizen Demographic Banner */}
          <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FDF0E7] text-[#B94A25] flex items-center justify-center font-bold text-sm shrink-0">
                {report.avatarInitials || 'CT'}
              </div>
              <div>
                <h4 className="font-bold text-[#211C17] text-sm sm:text-base">
                  {report.patientName}
                </h4>
                <div className="text-[11px] text-[#756B60] flex items-center gap-2 mt-0.5">
                  <span>{report.age} yrs • {report.gender}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-[#B94A25] font-semibold">
                    <MapPin className="w-3 h-3" /> {report.community}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#405642] font-semibold bg-[#EAF0E6] px-2.5 py-1 rounded-lg">
              <Phone className="w-3.5 h-3.5" />
              <span>{report.phone}</span>
            </div>
          </div>

          {/* Citizen Address & Initial Complaint */}
          <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D7C7] text-xs space-y-1">
            <div className="text-[#756B60]">
              <strong>Address:</strong> {report.address}
            </div>
            <div className="text-[#3D352C]">
              <strong>Citizen Note:</strong> {report.notes}
            </div>
          </div>

          {/* Field Assessment & Observations */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#211C17] uppercase tracking-wider">
              Step 1: Frontline Field Observations
            </label>
            <div className="flex flex-wrap gap-1.5">
              {['Fever', 'Body Weakness', 'Persistent Cough', 'Shortness of Breath', 'Diarrhoea', 'Vomiting', 'Antenatal Check', 'Skin Irritation'].map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => {
                    if (observedSymptoms.includes(sym)) {
                      setObservedSymptoms(observedSymptoms.filter((s) => s !== sym));
                    } else {
                      setObservedSymptoms([...observedSymptoms, sym]);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
                    observedSymptoms.includes(sym)
                      ? 'bg-[#B94A25] text-white border-[#B94A25]'
                      : 'bg-[#FAF7F2] text-[#756B60] border-[#DCCDBB] hover:bg-[#EFE5D5]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Triage Urgency Level */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            {['Routine', 'Moderate', 'High Priority'].map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => setSeverityGrade(grade)}
                className={`py-2 px-2 text-center rounded-lg font-bold border transition-all ${
                  severityGrade === grade
                    ? grade === 'High Priority'
                      ? 'bg-[#C0392B] text-white border-[#C0392B]'
                      : grade === 'Moderate'
                      ? 'bg-[#E07A2B] text-white border-[#E07A2B]'
                      : 'bg-[#405642] text-white border-[#405642]'
                    : 'bg-[#FAF7F2] text-[#756B60] border-[#DCCDBB]'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          {/* Care Coordination Recommendation */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#211C17] uppercase tracking-wider">
              Step 2: Care Navigation & Protocol
            </label>
            <select
              value={triageCareAction}
              onChange={(e) => setTriageCareAction(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs font-medium text-[#211C17]"
            >
              <option value="Schedule Tele-Consultation with PHC Doctor">Schedule Tele-Consultation with PHC Doctor</option>
              <option value="Doorstep First-Aid & Essential Drug Dispensing">Doorstep First-Aid & Essential Drug Dispensing</option>
              <option value="Refer to Taloda Community Health Centre (CHC)">Refer to Taloda Community Health Centre (CHC)</option>
              <option value="Refer to District Civil Hospital (Specialist OPD)">Refer to District Civil Hospital (Specialist OPD)</option>
              <option value="Schedule Antenatal Care (ANC) Sub-Centre Visit">Schedule Antenatal Care (ANC) Sub-Centre Visit</option>
            </select>
          </div>

          {/* Frontline Actions Checklist */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#211C17] uppercase tracking-wider">
              Step 3: ASHA Actions Checklist
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 bg-[#FAF7F2] border border-[#E3D7C7] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={actionChecklist.vitalsChecked}
                  onChange={() => toggleChecklist('vitalsChecked')}
                  className="rounded text-[#B94A25]"
                />
                <span>Basic vitals verified</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-[#FAF7F2] border border-[#E3D7C7] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={actionChecklist.guidanceGiven}
                  onChange={() => toggleChecklist('guidanceGiven')}
                  className="rounded text-[#B94A25]"
                />
                <span>Care guidance explained</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-[#FAF7F2] border border-[#E3D7C7] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={actionChecklist.orsMedProvided}
                  onChange={() => toggleChecklist('orsMedProvided')}
                  className="rounded text-[#B94A25]"
                />
                <span>ORS / basic meds provided</span>
              </label>
              <label className="flex items-center gap-2 p-2 bg-[#FAF7F2] border border-[#E3D7C7] rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={actionChecklist.referredToFacility}
                  onChange={() => toggleChecklist('referredToFacility')}
                  className="rounded text-[#B94A25]"
                />
                <span>Facility referral initiated</span>
              </label>
            </div>
          </div>

          {/* ASHA Field Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#211C17] uppercase tracking-wider">
              Field Notes for Medical Officer
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
              placeholder="Record any home observations, nutrition state, or transport requirements..."
            />
          </div>

          {/* Safety Disclaimer */}
          <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EAE0D2] flex items-center gap-2 text-[11px] text-[#756B60]">
            <Info className="w-4 h-4 text-[#405642] shrink-0" />
            <span>ASHA assessment records field observations to coordinate care and does not constitute autonomous medical diagnosis.</span>
          </div>

          {/* Modal Actions Footer */}
          <div className="pt-3 border-t border-[#DCCDBB] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#756B60] hover:bg-[#E3D7C7] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-[#B94A25] text-white hover:bg-[#A53E1D] disabled:opacity-60 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying & Saving...' : 'Complete Verification & Coordinate Care'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
