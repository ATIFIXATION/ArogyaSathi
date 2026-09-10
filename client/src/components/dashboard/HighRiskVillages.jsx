import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { PRIORITY_AREAS } from '../../data/dashboardData';
import { VillageDetailModal } from './VillageDetailModal';

export const HighRiskVillages = ({ onSelectArea }) => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const areas = showAll ? PRIORITY_AREAS : PRIORITY_AREAS.slice(0, 5);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    if (onSelectArea) {
      onSelectArea(area);
    }
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between h-full">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
            Top 5 Priority Healthcare Areas
          </h2>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-[#B94A25] hover:text-[#9E3E20] hover:underline transition-colors"
          >
            {showAll ? 'Show Top 5' : 'View All'}
          </button>
        </div>

        {/* Priority Area Rows */}
        <div className="space-y-2">
          {areas.map((area) => (
            <div
              key={area.id}
              onClick={() => handleAreaClick(area)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F4ECE0] transition-colors cursor-pointer group"
            >
              {/* Left Side: Pin Icon + Area/District Name */}
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="text-[#9E9488] group-hover:text-[#B94A25] transition-colors shrink-0">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#211C17] leading-tight group-hover:text-[#B94A25] transition-colors truncate">
                    {area.name}
                  </h4>
                  <p className="text-[10.5px] text-[#756B60] leading-none mt-0.5 truncate">
                    {area.district} • {area.primaryGap}
                  </p>
                </div>
              </div>

              {/* Right Side: Priority Badge */}
              <span
                className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-md shadow-2xs shrink-0 ${area.badgeClass}`}
              >
                {area.priorityLevel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Area Details Modal */}
      {selectedArea && (
        <VillageDetailModal
          village={selectedArea}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </div>
  );
};
