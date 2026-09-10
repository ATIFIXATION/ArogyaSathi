import React, { useState } from 'react';
import { X, FileText, CheckCircle, Send, User, Phone, MapPin } from 'lucide-react';
import { ASSIGNED_VILLAGES, SYMPTOM_OPTIONS } from '../../data/ashaDashboardData';

export const ReportCaseModal = ({ onClose, onCaseSubmitted }) => {
  const [village, setVillage] = useState(ASSIGNED_VILLAGES[0].name);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [contactNo, setContactNo] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Fever']);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName) {
      alert('Please enter patient name.');
      return;
    }
    if (onCaseSubmitted) {
      onCaseSubmitted({ village, patientName, age, gender, contactNo, selectedSymptoms, notes });
    }
    alert(`Case report for ${patientName} registered into Sentinel Surveillance queue.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#B94A25]" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              Report Syndromic Case
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Village</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              >
                {ASSIGNED_VILLAGES.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Patient Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rupesh Bora"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Age</label>
              <input
                type="number"
                placeholder="e.g. 28"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              />
            </div>
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Contact Phone</label>
              <input
                type="tel"
                placeholder="+91..."
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">Key Symptoms</label>
            <div className="flex flex-wrap gap-1.5">
              {SYMPTOM_OPTIONS.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => toggleSymptom(sym)}
                  className={`px-2 py-0.5 rounded-full text-[11px] border ${
                    selectedSymptoms.includes(sym)
                      ? 'bg-[#B94A25] text-white border-[#B94A25]'
                      : 'bg-[#FAF7F2] text-[#756B60] border-[#DCCDBB]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">Case Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Clinical notes, medications given..."
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-[#DCCDBB] flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#756B60]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#B94A25] text-white hover:bg-[#A53E1D] flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Submit Case Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
