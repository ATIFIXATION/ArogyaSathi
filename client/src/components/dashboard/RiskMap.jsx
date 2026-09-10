import React, { useState, useRef } from 'react';
import {
  Plus,
  Minus,
  RotateCcw,
  Info,
  MapPin,
  Building2,
  Users,
  RotateCw,
  TrendingUp,
  Clock,
  X
} from 'lucide-react';
import { MAHARASHTRA_MAP_DISTRICTS } from '../../data/dashboardData';
import { RiskLegend } from './RiskLegend';

export const RiskMap = ({ onSelectDistrict }) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(MAHARASHTRA_MAP_DISTRICTS[0]); // default Nandurbar
  const [showInfoModal, setShowInfoModal] = useState(false);

  const containerRef = useRef(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    if (onSelectDistrict) {
      onSelectDistrict(district);
    }
  };

  return (
    <div className="relative bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden flex flex-col h-full min-h-[460px]">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-3 z-10">
        <div className="flex items-center gap-1.5">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
            Healthcare Access Map — Maharashtra
          </h2>
          <button
            type="button"
            onClick={() => setShowInfoModal(!showInfoModal)}
            className="text-[#756B60] hover:text-[#B94A25] p-0.5 rounded transition-colors"
            aria-label="Map Information"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {selectedDistrict && (
          <div className="hidden sm:flex items-center gap-2 text-xs bg-[#EFE5D5] px-2.5 py-1 rounded-md border border-[#DCCDBB]">
            <span className="font-semibold text-[#211C17]">Active Focus:</span>
            <span className="text-[#B94A25] font-bold">{selectedDistrict.name}</span>
          </div>
        )}
      </div>

      {/* Info Popover */}
      {showInfoModal && (
        <div className="absolute top-14 left-4 right-4 sm:right-auto sm:w-80 bg-[#FAF7F2] border border-[#B94A25] rounded-xl p-3.5 shadow-xl z-30 animate-in fade-in zoom-in-95 duration-150 text-xs">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#EAE0D2]">
            <span className="font-bold text-[#211C17]">Maharashtra Healthcare Access Index</span>
            <button
              onClick={() => setShowInfoModal(false)}
              className="text-[#756B60] hover:text-[#211C17]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[#756B60] leading-relaxed mb-2">
            Visualizes district healthcare accessibility integrating PHC/CHC network density, doctor roster availability, tele-triage uptime, and referral follow-up completion rates across Maharashtra.
          </p>
          <div className="text-[11px] text-[#405642] font-semibold">
            SIH26133 Rural Public Healthcare Access Layer (Demo)
          </div>
        </div>
      )}

      {/* Map Interactive Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative flex-1 w-full bg-[#F4EDE2] rounded-lg border border-[#E3D7C7] overflow-hidden select-none cursor-${
          isDragging ? 'grabbing' : 'grab'
        }`}
        style={{ minHeight: '340px' }}
      >
        {/* Parchment Grid Substrate */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#C5B8A5_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Regional Watermark Labels */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <span className="absolute left-[2%] top-[68%] text-[10px] font-serif italic text-[#7A8E99] select-none">
            Arabian Sea
          </span>
          <span className="absolute left-[30%] top-[12%] text-[11px] font-serif font-semibold text-[#8C8070] tracking-wider uppercase select-none opacity-40">
            Khandesh
          </span>
          <span className="absolute left-[65%] top-[22%] text-[11px] font-serif font-bold text-[#8C8070] tracking-widest uppercase select-none opacity-40">
            Vidarbha
          </span>
          <span className="absolute left-[52%] top-[55%] text-[11px] font-serif font-semibold text-[#8C8070] tracking-wider uppercase select-none opacity-40">
            Marathwada
          </span>
          <span className="absolute left-[20%] top-[50%] text-[11px] font-serif font-semibold text-[#8C8070] tracking-wider uppercase select-none opacity-40">
            Western Maharashtra
          </span>
        </div>

        {/* SVG Geographic Choropleth Map */}
        <svg
          viewBox="0 0 850 720"
          className="w-full h-full object-contain transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            <filter id="glow-selected" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#B94A25" floodOpacity="0.6" />
            </filter>
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#211C17" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* District Polygons */}
          <g filter="url(#soft-shadow)">
            {MAHARASHTRA_MAP_DISTRICTS.map((district) => {
              const isSelected = selectedDistrict?.id === district.id;
              const isHovered = hoveredDistrict?.id === district.id;

              return (
                <g key={district.id} className="cursor-pointer">
                  <path
                    d={district.path}
                    fill={district.fillColor}
                    stroke={isSelected ? '#211C17' : isHovered ? '#FFFFFF' : district.strokeColor}
                    strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.2}
                    filter={isSelected ? 'url(#glow-selected)' : undefined}
                    className="transition-all duration-150 hover:brightness-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDistrictClick(district);
                    }}
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  />
                  {/* District Center Marker Dot */}
                  <circle
                    cx={district.labelPos.x}
                    cy={district.labelPos.y}
                    r={isSelected ? 4.5 : 2.5}
                    fill={isSelected ? '#FFFFFF' : '#211C17'}
                    stroke={isSelected ? '#B94A25' : '#FFFFFF'}
                    strokeWidth={1.5}
                    className="pointer-events-none"
                  />
                </g>
              );
            })}
          </g>
        </svg>

        {/* Map Control Buttons (Zoom, Pan Reset) */}
        <div className="absolute top-3 left-3 flex flex-col bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg shadow-md overflow-hidden z-20">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 text-[#211C17] hover:bg-[#EFE5D5] transition-colors border-b border-[#EAE0D2]"
            title="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 text-[#211C17] hover:bg-[#EFE5D5] transition-colors border-b border-[#EAE0D2]"
            title="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#211C17] hover:bg-[#EFE5D5] transition-colors"
            title="Reset map view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Risk Legend at Bottom Right */}
        <div className="absolute bottom-3 right-3 z-20">
          <RiskLegend />
        </div>

        {/* Floating Hover Tooltip with Healthcare Context */}
        {hoveredDistrict && (
          <div
            className="absolute top-3 right-3 bg-[#FAF7F2]/95 border border-[#DCCDBB] rounded-xl p-3 shadow-lg text-xs z-20 pointer-events-none animate-in fade-in duration-100 hidden sm:block max-w-[240px]"
          >
            <div className="font-bold text-[#211C17] text-sm">{hoveredDistrict.name}</div>
            <div className="text-[11px] text-[#756B60] mt-0.5">
              Access: <span className="font-bold" style={{ color: hoveredDistrict.strokeColor }}>{hoveredDistrict.accessLevel}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 pt-2 border-t border-[#EAE0D2] text-[10.5px]">
              <div>Facilities: <strong>{hoveredDistrict.facilities}</strong></div>
              <div>Active Cases: <strong>{hoveredDistrict.activeCases}</strong></div>
              <div>Pending Ref.: <strong>{hoveredDistrict.pendingReferrals}</strong></div>
              <div>Follow-ups: <strong>{hoveredDistrict.followUpsDue}</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* Selected District Details Bar */}
      {selectedDistrict && (
        <div className="mt-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B94A25] shrink-0" />
            <div>
              <span className="font-bold text-sm text-[#211C17]">{selectedDistrict.name}</span>
              <span className="text-[#756B60] text-[11px] ml-1.5">({selectedDistrict.region || 'Maharashtra'})</span>
            </div>
            <span
              className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold text-white ml-2 shadow-2xs"
              style={{ backgroundColor: selectedDistrict.fillColor }}
            >
              {selectedDistrict.accessLevel}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-3 sm:gap-5 text-[#3D352C]">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#B94A25]" />
              <span><strong>{selectedDistrict.activeCases}</strong> active cases</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#405642]" />
              <span><strong>{selectedDistrict.facilities}</strong> facilities</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-[#3D6B8C]" />
              <span><strong>{selectedDistrict.pendingReferrals}</strong> pending referrals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#B94A25]" />
              <span><strong>{selectedDistrict.weeklyChange}</strong> requests</span>
            </div>
            <div className="hidden md:flex items-center gap-1 text-[11px] text-[#9E9488]">
              <Clock className="w-3 h-3" />
              <span>Updated {selectedDistrict.lastUpdated}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
