import React from 'react';
import {
  Home,
  FileText,
  RotateCw,
  Clock
} from 'lucide-react';
import { ASHA_KPI_DATA } from '../../data/ashaData';

export const AshaKpiCards = ({ onCardClick }) => {
  const cards = [
    {
      id: 'visits-today',
      value: '12',
      title: 'Visits Today',
      icon: Home,
      iconBg: 'bg-[#EAF0E6] text-[#405642]',
      subtextNode: (
        <div className="text-[11px] sm:text-xs text-[#756B60] font-medium flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
          <span className="text-[#405642] font-semibold">3 Completed</span>
          <span className="text-[#DCCDBB]">•</span>
          <span className="text-[#B94A25] font-semibold">9 Pending</span>
        </div>
      )
    },
    {
      id: 'care-requests',
      value: '7',
      title: 'Citizen Care Requests',
      icon: FileText,
      iconBg: 'bg-[#FBF0EB] text-[#B94A25]',
      subtextNode: (
        <span className="text-[11px] sm:text-xs font-semibold text-[#B94A25] mt-0.5 block">
          Needs Verification
        </span>
      )
    },
    {
      id: 'pending-referrals',
      value: '4',
      title: 'Pending Referrals',
      icon: RotateCw,
      iconBg: 'bg-[#EBF2F7] text-[#3D6B8C]',
      subtextNode: (
        <span className="text-[11px] sm:text-xs font-semibold text-[#3D6B8C] mt-0.5 block">
          Needs Follow-up
        </span>
      )
    },
    {
      id: 'followups-due',
      value: '6',
      title: 'Follow-ups Due',
      icon: Clock,
      iconBg: 'bg-[#FDF0E7] text-[#D45E28]',
      subtextNode: (
        <span className="text-[11px] sm:text-xs font-semibold text-[#C0392B] mt-0.5 block">
          Priority Actions
        </span>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const IconComponent = card.icon;

        return (
          <div
            key={card.id}
            onClick={() => onCardClick && onCardClick(card.id)}
            className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
              {/* Circular Icon Container */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${card.iconBg} transition-transform group-hover:scale-105 shadow-inner`}
              >
                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
              </div>

              {/* Metric Text */}
              <div className="flex flex-col min-w-0">
                <span className="text-2xl sm:text-3xl font-sans font-bold text-[#211C17] leading-tight tracking-tight">
                  {card.value}
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-[#756B60] tracking-wide truncate">
                  {card.title}
                </span>
                {card.subtextNode}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
