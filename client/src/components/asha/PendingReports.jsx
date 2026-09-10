import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { CITIZEN_CARE_REQUESTS } from '../../data/ashaData';
import { ReportVerificationModal } from './ReportVerificationModal';

export const PendingReports = ({ requests = CITIZEN_CARE_REQUESTS, onVerifyRequest, onRefresh }) => {
  const [reports, setReports] = useState(requests || CITIZEN_CARE_REQUESTS);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (requests && requests.length > 0) {
      setReports(requests);
    }
  }, [requests]);

  const displayReports = showAll ? reports : reports.slice(0, 4);

  const handleVerifyClick = (report) => {
    setSelectedReport(report);
  };

  const handleVerificationComplete = (verifiedReport) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === verifiedReport.id ? { ...r, verified: true, status: 'Verified' } : r
      )
    );
    setSelectedReport(null);
    if (onVerifyRequest) {
      onVerifyRequest(verifiedReport);
    }
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
            Citizen Care Requests
          </h2>
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-[#B94A25] hover:text-[#9E3E20] hover:underline transition-colors"
          >
            {showAll ? 'Show Less' : 'View All (7)'}
          </button>
        </div>

        {/* List of Citizen Care Requests */}
        <div className="space-y-2.5">
          {displayReports.map((report) => (
            <div
              key={report.id}
              onClick={() => handleVerifyClick(report)}
              className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EDE0] border border-transparent hover:border-[#DCCDBB] transition-all duration-150 cursor-pointer"
            >
              {/* Left Side: Avatar + Details */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${report.avatarBg} shadow-2xs`}
                >
                  {report.avatarInitials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-xs sm:text-[13px] leading-tight">
                    <span className="font-mono font-bold text-[#211C17] shrink-0">
                      {report.id}
                    </span>
                    <span className="text-[#9E9488] shrink-0">•</span>
                    <span className="font-semibold text-[#211C17] truncate">
                      {report.symptoms}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#756B60]">
                    <span className="truncate">{report.community}</span>
                    <span className="text-[#9E9488]">•</span>
                    <span className="flex items-center gap-1 text-[#9E9488] whitespace-nowrap shrink-0">
                      <Clock className="w-3 h-3" />
                      {report.timeAgo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Verify Button or Verified Badge */}
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {report.verified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVerifyClick(report);
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FAF7F2] hover:bg-[#B94A25] text-[#B94A25] hover:text-white border border-[#B94A25] transition-colors duration-150 shadow-2xs"
                  >
                    Verify
                  </button>
                )}
                <ChevronRight className="w-4 h-4 text-[#9E9488] group-hover:text-[#B94A25] group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification / Assessment Modal */}
      {selectedReport && (
        <ReportVerificationModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onVerify={handleVerificationComplete}
        />
      )}
    </div>
  );
};
