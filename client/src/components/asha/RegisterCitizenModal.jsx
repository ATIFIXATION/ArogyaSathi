import React, { useState } from 'react';
import {
  X,
  UserPlus,
  MapPin,
  Phone,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';
import { ASSIGNED_COMMUNITIES } from '../../data/ashaData';

export const RegisterCitizenModal = ({ onClose, onRegister }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [phone, setPhone] = useState('');
  const [community, setCommunity] = useState(ASSIGNED_COMMUNITIES[0].name);
  const [address, setAddress] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter citizen name.');
      return;
    }

    const newCitizen = {
      id: `SS-${Math.floor(10000 + Math.random() * 90000).toString().substring(0, 5)}`,
      patientName: name,
      age: parseInt(age) || 25,
      gender,
      symptoms: chiefComplaint || 'General Health Screening',
      community,
      phone: phone || '+91 98000 00000',
      address: address || `${community}, Maharashtra`,
      timeAgo: 'Just now',
      avatarInitials: name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase(),
      avatarBg: 'bg-[#FDF0E7] text-[#B94A25]',
      verified: false
    };

    if (onRegister) {
      onRegister(newCitizen);
    }

    alert(`Citizen ${name} successfully registered in ${community} (ID: ${newCitizen.id}).`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#B94A25] text-white flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                Register New Citizen / Patient
              </h3>
              <p className="text-[11px] text-[#756B60]">
                Akkalkuwa Block • Frontline Health Registry
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-[#211C17] mb-1">
              Full Citizen Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Lata Valvi"
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#211C17] mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Years"
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#211C17] mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#211C17] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98..."
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#211C17] mb-1">
                Assigned Community
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

          <div>
            <label className="block font-bold text-[#211C17] mb-1">
              House Address / Pada
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Near ZP School, Pada 2"
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2 text-xs text-[#211C17]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#211C17] mb-1">
              Chief Symptom / Health Inquiry
            </label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder="e.g. Maternal prenatal checkup, fever, child immunization"
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
              className="px-5 py-2 bg-[#B94A25] hover:bg-[#A53E1D] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Save Citizen to Registry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
