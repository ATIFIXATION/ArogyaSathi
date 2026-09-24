import React, { useState } from 'react';
import {
  AlertOctagon,
  Pill,
  Activity,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { RECENT_ALERTS } from '../../data/dashboardData';
import { AlertDetailModal } from './AlertDetailModal';
import { useLanguage } from '../../i18n/index.jsx';


const iconComponents = {
  AlertOctagon,
  Pill,
  Activity,
  UserCheck
};

export const AlertList = ({ onSelectAlert, onRefresh }) => {
  const { t, tStatus } = useLanguage();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayAlerts = showAll ? RECENT_ALERTS : RECENT_ALERTS.slice(0, 4);

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
    if (onSelectAlert) {
      onSelectAlert(alert);
    }
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
          {t('officer.alertListTitle', 'Recent Service Alerts')}
        </h2>
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-[#B94A25] hover:text-[#9E3E20] hover:underline transition-colors"
        >
          {showAll ? t('actions.showLess', 'Show Less') : t('actions.viewAll', 'View All')}
        </button>
      </div>

      {/* Alert Item List */}
      <div className="space-y-3 flex-1 overflow-y-auto">
        {displayAlerts.map((alert) => {
          const IconComp = iconComponents[alert.icon] || AlertOctagon;

          return (
            <div
              key={alert.id}
              onClick={() => handleAlertClick(alert)}
              className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EDE0] border border-transparent hover:border-[#DCCDBB] transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Severity Icon Circle */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${alert.iconColor} transition-transform group-hover:scale-105 shadow-2xs`}
                >
                  <IconComp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div
                    className="text-[11px] font-bold tracking-wide uppercase"
                    style={{
                      color:
                        alert.severity === 'High Priority'
                          ? '#C0392B'
                          : alert.severity === 'Medium Priority'
                          ? '#E07A2B'
                          : '#405642'
                    }}
                  >
                    {tStatus(alert.severity)}
                  </div>
                  <h4 className="text-xs sm:text-[13px] font-serif font-bold text-[#211C17] leading-tight truncate group-hover:text-[#B94A25] transition-colors">
                    {alert.title}
                  </h4>
                  <p className="text-[11px] text-[#756B60] truncate mt-0.5">
                    {alert.location}
                  </p>
                </div>
              </div>

              {/* Right Side: Timestamp & Chevron */}
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <span className="text-[11px] text-[#9E9488] whitespace-nowrap hidden sm:inline">
                  {alert.timeAgo}
                </span>
                <ChevronRight className="w-4 h-4 text-[#9E9488] group-hover:text-[#B94A25] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Popup */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onInterventionSuccess={() => {
            if (onRefresh) onRefresh();
          }}
        />
      )}
    </div>
  );
};
