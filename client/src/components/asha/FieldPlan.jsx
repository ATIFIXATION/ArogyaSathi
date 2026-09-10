import React, { useState } from 'react';
import { Clock, Calendar, ChevronRight, X } from 'lucide-react';
import { TODAY_FIELD_PLAN } from '../../data/ashaData';

export const FieldPlan = ({ onTaskClick }) => {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
        <div>
          {/* Card Header */}
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
              Today&apos;s Field Plan
            </h2>
            <button
              type="button"
              onClick={() => setScheduleModalOpen(true)}
              className="text-xs font-semibold text-[#B94A25] hover:text-[#9E3E20] hover:underline transition-colors cursor-pointer"
            >
              View Full Schedule
            </button>
          </div>

          {/* Timeline Schedule Items */}
          <div className="relative pl-1 space-y-2.5">
            {/* Continuous Vertical Timeline Line */}
            <div className="absolute left-[70px] sm:left-[72px] top-3 bottom-3 w-[1.5px] bg-[#DCCDBB] z-0" />

            {TODAY_FIELD_PLAN.map((item) => (
              <div
                key={item.id}
                onClick={() => onTaskClick && onTaskClick(item)}
                className="flex items-center justify-between gap-3 p-1.5 rounded-lg hover:bg-[#F5EDE0] transition-colors cursor-pointer group"
              >
                {/* Left: Time + Dot + Title/Location */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="text-[11px] font-mono font-bold text-[#756B60] w-[54px] shrink-0">
                    {item.time}
                  </span>

                  {/* Dot */}
                  <span
                    className="w-2 h-2 rounded-full shrink-0 shadow-2xs relative z-10"
                    style={{ backgroundColor: item.dotColor }}
                  />

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#211C17] truncate leading-tight group-hover:text-[#B94A25] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10.5px] text-[#756B60] truncate mt-0.5">
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Right: Status Pill Badge */}
                <span
                  className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full shrink-0 shadow-2xs ${item.statusClass}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Schedule Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-md bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B94A25]" />
                <h3 className="text-base font-serif font-bold text-[#211C17]">
                  Complete Daily Field Schedule
                </h3>
              </div>
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs overflow-y-auto max-h-[60vh]">
              {TODAY_FIELD_PLAN.map((task) => (
                <div
                  key={task.id}
                  className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono font-bold text-[#756B60] block">{task.time}</span>
                    <h4 className="font-bold text-[#211C17] text-sm mt-0.5">{task.title}</h4>
                    <p className="text-[11px] text-[#756B60]">{task.location}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-semibold text-[10.5px] ${task.statusClass}`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
              <button
                onClick={() => setScheduleModalOpen(false)}
                className="px-4 py-1.5 bg-[#FAF7F2] hover:bg-[#EAE0D2] border border-[#DCCDBB] rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
