import React, { useState } from 'react';
import {
  X,
  RotateCw,
  Clock,
  Plus,
  CheckCircle2,
  Building2,
  User,
  ArrowUpRight,
  Send,
  MapPin
} from 'lucide-react';
import {
  REFERRALS_LIST,
  MAHARASHTRA_FACILITIES_LIST,
  ASSIGNED_COMMUNITIES
} from '../../data/ashaData';

export const ReferralsModal = ({ onClose, initialTab = 'active' }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'active' or 'create'
  const [referrals, setReferrals] = useState(REFERRALS_LIST);

  // New Referral Form State
  const [citizenName, setCitizenName] = useState('');
  const [community, setCommunity] = useState(ASSIGNED_COMMUNITIES[0].name);
  const [targetFacility, setTargetFacility] = useState(MAHARASHTRA_FACILITIES_LIST[1]);
  const [referralService, setReferralService] = useState('Specialist Consultation');
  const [urgency, setUrgency] = useState('Routine');
  const [notes, setNotes] = useState('');

  const handleCreateReferral = (e) => {
    e.preventDefault();
    if (!citizenName.trim()) {
      alert('Please enter citizen name.');
      return;
    }

    const newRef = {
      id: `REF-${Math.floor(100 + Math.random() * 900)}`,
      patientName: citizenName,
      age: 30,
      community: community,
      service: referralService,
      referralFrom: 'Akkalkuwa Sub-Centre',
      referralTo: targetFacility,
      status: 'Pending Transfer',
      statusColor: 'bg-[#FEF6EE] text-[#B94A25] border border-[#FAD3BD]',
      date: 'Just now',
      actionRequired: notes || 'Coordinate transport & schedule confirmation'
    };

    setReferrals([newRef, ...referrals]);
    alert(`Referral ${newRef.id} generated for ${citizenName} to ${targetFacility}.`);
    setActiveTab('active');
    setCitizenName('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3D6B8C] text-white flex items-center justify-center">
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Referral &amp; Care Continuity Tracker
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Maharashtra Public Healthcare Continuum (SIH26133)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17] hover:bg-[#E3D7C7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="px-5 pt-3 border-b border-[#EAE0D2] flex gap-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('active')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'active'
                ? 'border-[#B94A25] text-[#B94A25]'
                : 'border-transparent text-[#756B60] hover:text-[#211C17]'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            Active Referrals &amp; Follow-ups ({referrals.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'create'
                ? 'border-[#B94A25] text-[#B94A25]'
                : 'border-transparent text-[#756B60] hover:text-[#211C17]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Create New Referral
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5">
          {activeTab === 'active' ? (
            <div className="space-y-3">
              {referrals.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl p-3.5 shadow-2xs hover:border-[#B94A25] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#B94A25]">
                        {item.id}
                      </span>
                      <h4 className="font-bold text-sm text-[#211C17]">
                        {item.patientName}
                      </h4>
                      <span className="text-[11px] text-[#756B60]">
                        ({item.community})
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-[#3D352C] font-medium">
                    {item.service}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center justify-between text-[11px] text-[#756B60] gap-2 pt-2 border-t border-[#EAE0D2]">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#405642]" />
                      <span>{item.referralFrom} → <strong>{item.referralTo}</strong></span>
                    </div>
                    <span>{item.actionRequired}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleCreateReferral} className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#211C17] mb-1">
                    Citizen / Patient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="e.g. Vandana Pawara"
                    className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#211C17] mb-1">
                    Community
                  </label>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
                  >
                    {ASSIGNED_COMMUNITIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#211C17] mb-1">
                    Target Facility (Referral Node)
                  </label>
                  <select
                    value={targetFacility}
                    onChange={(e) => setTargetFacility(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
                  >
                    {MAHARASHTRA_FACILITIES_LIST.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#211C17] mb-1">
                    Required Clinical Service
                  </label>
                  <select
                    value={referralService}
                    onChange={(e) => setReferralService(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
                  >
                    <option value="Specialist OB-GYN Consultation">Specialist OB-GYN Consultation</option>
                    <option value="Pediatric Diagnostics & Checkup">Pediatric Diagnostics & Checkup</option>
                    <option value="Complete Blood Panel & Ultrasonography">Complete Blood Panel & Ultrasonography</option>
                    <option value="General Physician Consultation">General Physician Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#211C17] mb-1">
                  Field Referral Reason &amp; Clinical Summary
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record symptoms observed, duration, initial frontline checks..."
                  className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('active')}
                  className="px-4 py-2 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#756B60]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Referral &amp; Notify PHC
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex items-center justify-between text-xs text-[#756B60]">
          <span>Continuity Adherence Rate: <strong>86.4%</strong> in Akkalkuwa</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#EAE0D2] border border-[#DCCDBB] rounded-lg font-semibold text-[#211C17]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
