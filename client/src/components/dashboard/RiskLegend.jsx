import React from 'react';

export const RiskLegend = () => {
  const levels = [
    { label: 'Good Access', color: 'bg-[#5C8A5E]' },
    { label: 'Moderate Access', color: 'bg-[#E8B958]' },
    { label: 'Limited Access', color: 'bg-[#DF6638]' },
    { label: 'Priority Gap', color: 'bg-[#C0392B]' },
  ];

  return (
    <div className="bg-[#FAF7F2]/95 backdrop-blur-xs border border-[#DCCDBB] rounded-xl px-3 py-2 shadow-sm text-xs select-none">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#756B60] block mb-1.5 border-b border-[#EAE0D2] pb-0.5">
        HEALTHCARE ACCESS
      </span>
      <div className="flex items-center gap-3 flex-wrap">
        {levels.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-[#211C17]">
            <span className={`w-2.5 h-2.5 rounded-sm ${item.color} shadow-2xs`} />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
