import React from 'react';
import {
  AlertTriangle,
  Users,
  Activity,
  Droplet,
  ShieldAlert,
  RotateCw,
  Building2
} from 'lucide-react';

const iconMap = {
  AlertTriangle,
  Users,
  Activity,
  Droplet,
  ShieldAlert,
  RotateCw,
  Building2
};

export const KpiCard = ({ title, value, trend, icon, iconBg, borderColor, onClick }) => {
  const IconComponent = iconMap[icon] || Activity;

  return (
    <div
      onClick={onClick}
      className={`bg-[#FAF7F2] border ${borderColor || 'border-[#DCCDBB]'} rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-between gap-3 cursor-pointer group`}
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Left Circular Icon */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${iconBg || 'bg-[#EAF0E6] text-[#405642]'} transition-transform group-hover:scale-105 shadow-inner`}
        >
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
        </div>

        {/* Text & Value */}
        <div className="flex flex-col">
          <span className="text-xs sm:text-[13px] font-medium text-[#756B60] tracking-wide">
            {title}
          </span>
          <span className="text-2xl sm:text-3xl font-sans font-bold text-[#211C17] leading-tight my-0.5 tracking-tight">
            {value}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold text-[#B94A25] flex items-center gap-1">
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
};
