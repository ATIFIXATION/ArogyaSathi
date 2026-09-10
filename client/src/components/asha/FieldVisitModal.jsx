import React, { useState } from 'react';
import {
  X,
  Home,
  MapPin,
  Calendar,
  Users,
  FileCheck,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';
import { ASSIGNED_COMMUNITIES } from '../../data/ashaData';

export const FieldVisitModal = ({ defaultVillage, onClose, onVisitSubmitted }) => {
  const [community, setCommunity] = useState(defaultVillage || ASSIGNED_COMMUNITIES[0].name);
  const [householdNo, setHouseholdNo] = useState('');
  const [visitDate, setVisitDate] = useState('2026-05-24');
  const [citizenName, setCitizenName] = useState('');
  const [visitType, setVisitType] = useState('Routine Screening & Antenatal Check');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['General Wellbeing']);
  const [medsProvided, setMedsProvided] = useState('Iron-Folic Acid + ORS');
  const [referralRequired, setReferralRequired] = useState('No Referral Needed');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const symptomOptions = [
    'General Wellbeing',
    'Fever / Weakness',
    'Antenatal Routine Check',
    'Child Nutrition / Immunization',
    'Post-Natal Recovery',
    'Blood Pressure Screen',
    'Cough / Cold',
    'Medicine Adherence Check'
  ];

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!householdNo) {
      alert('Please enter Household / Pada number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onVisitSubmitted) {
        onVisitSubmitted({
          community,
          householdNo,
          citizenName,
          visitDate,
          visitType,
          selectedSymptoms,
          medsProvided,
          referralRequired,
          observations
        });
      }
      alert(`Household Visit for ${citizenName || 'Household ' + householdNo} (${community}) successfully logged in Care Continuum.`);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#405642] text-white flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-none">
                Record Household Field Visit
              </h3>
              <p className="text-[11px] text-[#756B60] mt-1">
                Akkalkuwa Block • Frontline Health Log
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#756B60] hover:text-[#211C17] hover:bg-[#E3D7C7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Community & Household */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Community <span className="text-[#B94A25]">*</span>
              </label>
              <select
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                {ASSIGNED_COMMUNITIES.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Household / Pada <span className="text-[#B94A25]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pada 2 / House #54"
                value={householdNo}
                onChange={(e) => setHouseholdNo(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              />
            </div>
          </div>

          {/* Citizen Name & Visit Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Primary Citizen / Patient Name
              </label>
              <input
                type="text"
                placeholder="e.g. Suman Valvi"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Visit Category
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                <option value="Routine Screening & Antenatal Check">Routine Screening &amp; Antenatal Check</option>
                <option value="Follow-up: Post Consultation">Follow-up: Post Consultation</option>
                <option value="Follow-up: Medicine Adherence">Follow-up: Medicine Adherence</option>
                <option value="Child Immunization & Growth Check">Child Immunization &amp; Growth Check</option>
              </select>
            </div>
          </div>

          {/* Screening Tags Checklist */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#211C17] mb-1.5">
              Screening Focus &amp; Symptoms Checked
            </label>
            <div className="flex flex-wrap gap-1.5">
              {symptomOptions.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => toggleSymptom(sym)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                    selectedSymptoms.includes(sym)
                      ? 'bg-[#B94A25] text-white border-[#B94A25]'
                      : 'bg-[#FAF7F2] text-[#756B60] border-[#DCCDBB] hover:border-[#B94A25]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Supplies & Referral Need */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Supplies / Medicines Distributed
              </label>
              <input
                type="text"
                value={medsProvided}
                onChange={(e) => setMedsProvided(e.target.value)}
                placeholder="e.g. IFA Tablets, ORS, Paracetamol"
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Referral Recommendation
              </label>
              <select
                value={referralRequired}
                onChange={(e) => setReferralRequired(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                <option value="No Referral Needed">No Referral Needed (Self-Care)</option>
                <option value="Schedule PHC Tele-Consult">Schedule PHC Tele-Consult</option>
                <option value="Refer to Taloda CHC (Specialist)">Refer to Taloda CHC (Specialist)</option>
                <option value="Refer to District Hospital OPD">Refer to District Hospital OPD</option>
              </select>
            </div>
          </div>

          {/* Observations & Field Notes */}
          <div>
            <label className="block text-xs font-bold text-[#211C17] mb-1">
              ASHA Field Notes
            </label>
            <textarea
              rows={2}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="e.g. Mother counseled on dietary iron intake. Next visit scheduled for 10 days."
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2.5 text-xs text-[#211C17]"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-[#DCCDBB] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                alert('Household visit draft saved locally.');
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-[#DCCDBB] text-[#756B60] hover:bg-[#EFE5D5]"
            >
              Save Draft
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold text-[#756B60] hover:bg-[#E3D7C7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#B94A25] text-white hover:bg-[#A53E1D] shadow-sm flex items-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                {isSubmitting ? 'Saving...' : 'Submit Household Visit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
