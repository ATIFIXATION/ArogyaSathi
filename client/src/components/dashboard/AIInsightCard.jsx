import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { AI_INSIGHT_DATA } from '../../data/dashboardData';
import { AIInsightModal } from './AIInsightModal';

export const AIInsightCard = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between h-full overflow-hidden">
        {/* Subtle Botanical Watermark in Bottom-Right Corner */}
        <div className="absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none opacity-20 select-none">
          <img
            src="/assets/plant.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Top Header */}
        <div>
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17] mb-3">
            {AI_INSIGHT_DATA.title}
          </h2>

          <div className="flex items-start gap-3.5">
            {/* Peach Circle with Brain Icon */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FDF0E7] text-[#D45E28] flex items-center justify-center shrink-0 shadow-xs border border-[#F9DEC9]">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </div>

            {/* Insight Text */}
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#211C17] font-medium">
              {AI_INSIGHT_DATA.summary}
            </p>
          </div>
        </div>

        {/* Action Button at Bottom Left */}
        <div className="mt-4 pt-2 z-10">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="bg-[#B94A25] hover:bg-[#A53E1D] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-98 cursor-pointer"
          >
            Investigate Now
          </button>
        </div>
      </div>

      {modalOpen && (
        <AIInsightModal onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};
