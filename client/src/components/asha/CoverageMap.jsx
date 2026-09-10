import React, { useState } from 'react';
import {
  MapPin,
  Users,
  Home,
  RotateCw,
  Clock,
  Info,
  CheckCircle2,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react';
import { ASSIGNED_COMMUNITIES } from '../../data/ashaData';

export const CoverageMap = ({ onSelectCommunity }) => {
  const [selectedComm, setSelectedComm] = useState(ASSIGNED_COMMUNITIES[0]); // Akkalkuwa default
  const [hoveredComm, setHoveredComm] = useState(null);
  const [zoom, setZoom] = useState(1);

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#5C8A5E'; // Green
      case 'In Progress':
        return '#E8B958'; // Amber
      case 'Priority Focus':
        return '#B94A25'; // Terracotta
      default:
        return '#9E9488'; // Gray
    }
  };

  const handleCommClick = (comm) => {
    setSelectedComm(comm);
    if (onSelectCommunity) onSelectCommunity(comm);
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full min-h-[380px]">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
            Maharashtra Field Coverage
          </h2>
          <p className="text-[11px] text-[#756B60]">
            Dhule &amp; Nandurbar Border Cluster • 6 Assigned Communities
          </p>
        </div>

        {selectedComm && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs bg-[#EFE5D5] px-2.5 py-1 rounded-md border border-[#DCCDBB]">
            <span className="font-semibold text-[#211C17]">Focus:</span>
            <span className="text-[#B94A25] font-bold">{selectedComm.name}</span>
          </div>
        )}
      </div>

      {/* Map Canvas with Maharashtra PNG & Pins */}
      <div className="relative flex-1 w-full bg-[#F4EDE2] rounded-xl border border-[#E3D7C7] overflow-hidden min-h-[220px] flex items-center justify-center select-none">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#C5B8A5_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Maharashtra Map Asset Contained */}
        <div
          className="relative w-full h-full max-h-[280px] p-2 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          <img
            src="/assets/maharashtra.png"
            alt="Maharashtra Map"
            className="w-full h-full object-contain opacity-85 filter contrast-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />

          {/* Interactive Community Marker Pins */}
          {ASSIGNED_COMMUNITIES.map((comm) => {
            const isSelected = selectedComm?.id === comm.id;
            const dotColor = getStatusDotColor(comm.status);

            return (
              <button
                key={comm.id}
                type="button"
                onClick={() => handleCommClick(comm)}
                onMouseEnter={() => setHoveredComm(comm)}
                onMouseLeave={() => setHoveredComm(null)}
                style={{
                  top: `${comm.coordinates.y}%`,
                  left: `${comm.coordinates.x}%`
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-1 rounded-full transition-all duration-150 group z-20 cursor-pointer ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                }`}
                title={comm.name}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md border-2 border-white"
                  style={{ backgroundColor: dotColor }}
                >
                  <MapPin className="w-3 h-3" />
                </div>

                {/* Hover Label Tooltip */}
                <div className="absolute left-1/2 -top-7 -translate-x-1/2 bg-[#211C17] text-white text-[10.5px] px-2 py-0.5 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {comm.name} ({comm.status})
                </div>
              </button>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-2.5 left-2.5 flex flex-col bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg shadow-xs overflow-hidden z-20">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 1.8))}
            className="p-1.5 text-[#211C17] hover:bg-[#EFE5D5] border-b border-[#EAE0D2]"
            title="Zoom in"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.8))}
            className="p-1.5 text-[#211C17] hover:bg-[#EFE5D5] border-b border-[#EAE0D2]"
            title="Zoom out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1.5 text-[#211C17] hover:bg-[#EFE5D5]"
            title="Reset zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-2 right-2 bg-[#FAF7F2]/95 border border-[#DCCDBB] rounded-lg px-2.5 py-1.5 shadow-xs text-[10.5px] z-20 select-none">
          <div className="font-bold text-[#756B60] text-[9.5px] uppercase tracking-wider mb-1">
            Status
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1 text-[#211C17]">
              <span className="w-2 h-2 rounded-full bg-[#5C8A5E]" /> Completed
            </span>
            <span className="flex items-center gap-1 text-[#211C17]">
              <span className="w-2 h-2 rounded-full bg-[#E8B958]" /> In Progress
            </span>
            <span className="flex items-center gap-1 text-[#211C17]">
              <span className="w-2 h-2 rounded-full bg-[#9E9488]" /> Pending
            </span>
            <span className="flex items-center gap-1 text-[#211C17]">
              <span className="w-2 h-2 rounded-full bg-[#B94A25]" /> Priority
            </span>
          </div>
        </div>
      </div>

      {/* Selected Community Details Bar */}
      {selectedComm && (
        <div className="mt-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B94A25] shrink-0" />
            <span className="font-bold text-sm text-[#211C17]">{selectedComm.name}</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs ml-1"
              style={{ backgroundColor: getStatusDotColor(selectedComm.status) }}
            >
              {selectedComm.status}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-[#3D352C]">
            <div className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-[#405642]" />
              <span><strong>{selectedComm.households}</strong> Households</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5C8A5E]" />
              <span><strong>{selectedComm.visitsCompleted}</strong> Visits</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D45E28]" />
              <span><strong>{selectedComm.followUpsDue}</strong> Follow-ups</span>
            </div>
            <div className="flex items-center gap-1">
              <RotateCw className="w-3.5 h-3.5 text-[#3D6B8C]" />
              <span><strong>{selectedComm.pendingReferrals}</strong> Pending Ref.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
