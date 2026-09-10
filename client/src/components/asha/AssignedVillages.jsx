import React, { useState } from 'react';
import { MapPin, ChevronRight, Home, Users } from 'lucide-react';
import { ASSIGNED_COMMUNITIES } from '../../data/ashaData';
import { VillageDetailModal } from './VillageDetailModal';

export const AssignedVillages = ({ onScheduleVisit }) => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const communities = showAll ? ASSIGNED_COMMUNITIES : ASSIGNED_COMMUNITIES.slice(0, 6);

  const handleCommunityClick = (comm) => {
    setSelectedCommunity(comm);
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
            Assigned Communities ({ASSIGNED_COMMUNITIES.length})
          </h2>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-[#B94A25] hover:text-[#9E3E20] hover:underline transition-colors"
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>

        {/* Communities List */}
        <div className="space-y-2">
          {communities.map((comm) => (
            <div
              key={comm.id}
              onClick={() => handleCommunityClick(comm)}
              className="group flex items-center justify-between p-2 sm:p-2.5 rounded-xl hover:bg-[#F5EDE0] transition-all duration-150 cursor-pointer border border-transparent hover:border-[#DCCDBB]"
            >
              {/* Left Side: Pin Icon + Community Name */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#DCCDBB] flex items-center justify-center text-[#756B60] group-hover:text-[#B94A25] group-hover:border-[#B94A25] transition-colors shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-[#211C17] leading-tight group-hover:text-[#B94A25] transition-colors truncate">
                    {comm.name}
                  </h4>
                  <p className="text-[11px] text-[#756B60] leading-tight mt-0.5 truncate">
                    {comm.households} Households • {comm.visitsCompleted} Visits Done
                  </p>
                </div>
              </div>

              {/* Right Side: Follow-ups Due & Chevron */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#DCCDBB] text-[#756B60] whitespace-nowrap">
                  {comm.followUpsDue} Follow-ups
                </span>
                <ChevronRight className="w-4 h-4 text-[#9E9488] group-hover:text-[#B94A25] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Detail Modal */}
      {selectedCommunity && (
        <VillageDetailModal
          village={selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          onStartVisit={(villageName) => {
            setSelectedCommunity(null);
            if (onScheduleVisit) onScheduleVisit(villageName);
          }}
        />
      )}
    </div>
  );
};
