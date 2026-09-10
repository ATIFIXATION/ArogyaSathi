import React, { useState } from 'react';
import {
  TrendingUp,
  MapPin,
  ChevronRight,
  ShieldAlert,
  Clock,
  RotateCw
} from 'lucide-react';
import { PRIORITY_CARE_TASKS } from '../../data/ashaData';
import { AlertDetailModal } from './AlertDetailModal';

export const ActiveAlerts = ({ onStartVisit }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
            Priority Care Tasks
          </h2>
          <span className="text-xs font-semibold text-[#B94A25]">
            {PRIORITY_CARE_TASKS.length} Active
          </span>
        </div>

        {/* Priority Care Task Cards */}
        <div className="space-y-3">
          {PRIORITY_CARE_TASKS.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="p-3 sm:p-3.5 rounded-xl bg-[#FAF7F2] border border-[#DCCDBB] shadow-2xs hover:border-[#B94A25] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${task.badgeClass}`}
                  >
                    {task.severity}
                  </span>
                  <span className="text-[11px] text-[#756B60] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#9E9488]" />
                    {task.timeAgo}
                  </span>
                </div>

                <ChevronRight className="w-4 h-4 text-[#9E9488] group-hover:text-[#B94A25] transition-transform group-hover:translate-x-0.5" />
              </div>

              <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#211C17] mt-2 group-hover:text-[#B94A25] transition-colors leading-tight">
                {task.title}
              </h4>

              <p className="text-[11px] text-[#756B60] mt-1 leading-snug">
                {task.description}
              </p>

              <div className="mt-3 pt-2 border-t border-[#EAE0D2] flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-[#756B60] text-[11px]">
                  <MapPin className="w-3 h-3 text-[#B94A25]" />
                  {task.location}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskClick(task);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#B94A25] text-[#B94A25] hover:text-white border border-[#B94A25] transition-colors shadow-2xs"
                >
                  {task.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <AlertDetailModal
          alert={selectedTask}
          onClose={() => setSelectedTask(null)}
          onStartVisit={(loc) => {
            setSelectedTask(null);
            if (onStartVisit) onStartVisit(loc);
          }}
        />
      )}
    </div>
  );
};
