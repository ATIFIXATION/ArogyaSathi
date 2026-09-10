import React, { useState } from 'react';
import { X, Droplet, CheckCircle, Save, Send, AlertTriangle } from 'lucide-react';
import { ASSIGNED_VILLAGES, WATER_SOURCE_OPTIONS } from '../../data/ashaDashboardData';

export const WaterCheckModal = ({ onClose, onSubmitObservation }) => {
  const [village, setVillage] = useState(ASSIGNED_VILLAGES[0].name);
  const [locationName, setLocationName] = useState('');
  const [waterSource, setWaterSource] = useState('Hand pump');
  const [visualCondition, setVisualCondition] = useState('Turbid / Muddy');
  const [odour, setOdour] = useState('Foul / Stagnant');
  const [communityComplaints, setCommunityComplaints] = useState('Yes, multiple households');
  const [contaminationSource, setContaminationSource] = useState('Agricultural Runoff / Flood Water');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationName) {
      alert('Please specify the water point location name.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitObservation) {
        onSubmitObservation({
          village,
          locationName,
          waterSource,
          visualCondition,
          odour,
          communityComplaints,
          contaminationSource,
          notes
        });
      }
      alert(`Water Observation for ${locationName} (${village}) logged & flagged to PHED.`);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#3D6B8C] text-white flex items-center justify-center">
              <Droplet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-none">
                Water Quality Field Observation
              </h3>
              <p className="text-[11px] text-[#756B60] mt-1">
                Jal Jeevan Sentinel Surveillance Log
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

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Village <span className="text-[#B94A25]">*</span>
              </label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                {ASSIGNED_VILLAGES.map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Water Point / Location <span className="text-[#B94A25]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Public Handpump #3 near LP School"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Water Source Type
              </label>
              <select
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                {WATER_SOURCE_OPTIONS.map((ws) => (
                  <option key={ws} value={ws}>
                    {ws}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Visual Appearance
              </label>
              <select
                value={visualCondition}
                onChange={(e) => setVisualCondition(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                <option value="Clear / Normal">Clear / Normal</option>
                <option value="Turbid / Muddy">Turbid / Muddy</option>
                <option value="Discolored / Yellowish">Discolored / Yellowish</option>
                <option value="Presence of Floating Particles">Presence of Floating Particles</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Odour
              </label>
              <select
                value={odour}
                onChange={(e) => setOdour(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                <option value="No Odour">No Odour</option>
                <option value="Foul / Stagnant">Foul / Stagnant</option>
                <option value="Chemical / Metallic">Chemical / Metallic</option>
                <option value="Sewage / Marshy">Sewage / Marshy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#211C17] mb-1">
                Community Complaints
              </label>
              <select
                value={communityComplaints}
                onChange={(e) => setCommunityComplaints(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
              >
                <option value="None">None</option>
                <option value="1-2 households">1-2 households</option>
                <option value="Yes, multiple households">Yes, multiple households</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#211C17] mb-1">
              Suspected Contamination Source
            </label>
            <input
              type="text"
              placeholder="e.g. Broken drainage pipe / River flood runoff"
              value={contaminationSource}
              onChange={(e) => setContaminationSource(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg px-3 py-2 text-xs text-[#211C17]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#211C17] mb-1">
              Observations & Action Advised
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Advised villagers not to use this handpump until PHED chlorination test is complete."
              className="w-full bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg p-2.5 text-xs text-[#211C17]"
            />
          </div>

          <div className="pt-3 border-t border-[#DCCDBB] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                alert('Water check observation draft saved.');
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
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Saving...' : 'Submit Observation'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
