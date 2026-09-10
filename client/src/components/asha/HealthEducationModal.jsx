import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, Users, Send } from 'lucide-react';
import { ASSIGNED_COMMUNITIES } from '../../data/ashaData';

export const HealthEducationModal = ({ onClose, onSessionLogged }) => {
  const [village, setVillage] = useState(ASSIGNED_COMMUNITIES[0].name);
  const [topic, setTopic] = useState('Maternal & Child Healthcare & Nutrition');
  const [attendeesCount, setAttendeesCount] = useState('24');
  const [pamphletsDistributed, setPamphletsDistributed] = useState('30');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSessionLogged) {
      onSessionLogged({ village, topic, attendeesCount, pamphletsDistributed, notes });
    }
    alert(`Health Education session logged for ${village} (${attendeesCount} community members attended).`);
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
            <BookOpen className="w-5 h-5 text-[#4F46E5]" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              Log Health Education Session
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Community Location</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              >
                {ASSIGNED_COMMUNITIES.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#211C17] mb-1">Community Attendees</label>
              <input
                type="number"
                value={attendeesCount}
                onChange={(e) => setAttendeesCount(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">Education Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
            >
              <option value="Maternal & Child Healthcare & Nutrition">Maternal & Child Healthcare & Nutrition</option>
              <option value="Antenatal Checkups & Institutional Delivery">Antenatal Checkups & Institutional Delivery</option>
              <option value="Childhood Immunization & ORS/Zinc Usage">Childhood Immunization & ORS/Zinc Usage</option>
              <option value="Hygiene, Sanitation & Safe Water">Hygiene, Sanitation & Safe Water</option>
              <option value="Chronic Care & Medicine Adherence">Chronic Care & Medicine Adherence</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">Materials Distributed</label>
            <input
              type="text"
              placeholder="e.g. 25 IFA blister packs, 30 Marathi care leaflets"
              value={pamphletsDistributed}
              onChange={(e) => setPamphletsDistributed(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-2.5 py-1.5"
            />
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">Session Feedback & Key Questions Raised</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Questions asked by women self-help group on ultrasound dates..."
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs"
            />
          </div>

          <div className="pt-3 border-t border-[#DCCDBB] flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#756B60]">
              Cancel
            </button>
            <button type="submit" className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#405642] text-white hover:bg-[#283A2A] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Save Session Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const AshaSupportModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#20392B] text-white border-b border-[#30553F] flex items-center justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-white">
              ASHA Field Support &amp; Emergency Helpline
            </h3>
            <p className="text-[11px] text-[#C5D7C7]">
              Direct assistance for rural frontline workers • Akkalkuwa
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#C5D7C7] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 text-xs">
          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-[#211C17] block">Block Medical Officer (BMO)</span>
              <span className="text-[#756B60]">Dr. K. Patil • Akkalkuwa PHC</span>
            </div>
            <button
              onClick={() => alert('Dialing Akkalkuwa PHC BMO (+91 94230 11223)...')}
              className="px-2.5 py-1 bg-[#405642] text-white rounded-md font-semibold text-xs"
            >
              Call
            </button>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-[#211C17] block">Public Health Emergency Helpline</span>
              <span className="text-[#756B60]">104 / 108 Maharashtra Swasthya Seva</span>
            </div>
            <button
              onClick={() => alert('Dialing 104 Emergency Helpline...')}
              className="px-2.5 py-1 bg-[#B94A25] text-white rounded-md font-semibold text-xs"
            >
              Call 104
            </button>
          </div>

          <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl flex items-center justify-between">
            <div>
              <span className="font-bold text-[#211C17] block">Offline Sync Status</span>
              <span className="text-[#405642] font-semibold">● 14 Local Records Synced (Active)</span>
            </div>
            <button
              onClick={() => alert('Syncing local SQLite/IndexedDB records to PostgreSQL server... OK!')}
              className="px-2.5 py-1 bg-[#FAF7F2] border border-[#DCCDBB] text-[#211C17] rounded-md font-semibold text-xs hover:bg-[#EFE5D5]"
            >
              Sync Now
            </button>
          </div>
        </div>

        <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
          <button onClick={onClose} className="px-4 py-1.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
