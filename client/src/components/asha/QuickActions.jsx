import React from 'react';
import {
  UserPlus,
  Home,
  ArrowUpRight,
  ClipboardList,
  Heart
} from 'lucide-react';

export const QuickActions = ({
  onRegisterCitizen,
  onNewVisit,
  onCreateReferral,
  onOpenFollowup
}) => {
  return (
    <div className="flex flex-col gap-3.5 h-full">
      {/* Quick Actions 4 Buttons Card */}
      <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs">
        <h2 className="text-base sm:text-lg font-serif font-bold text-[#211C17] mb-3">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Register Citizen Button */}
          <button
            type="button"
            onClick={onRegisterCitizen}
            className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#FDF3EE] border border-[#DCCDBB] hover:border-[#B94A25]/60 transition-all group text-left shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FBF0EB] text-[#B94A25] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <UserPlus className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold text-[#211C17] group-hover:text-[#B94A25] transition-colors leading-tight">
              Register Citizen
            </span>
          </button>

          {/* New Household Visit Button */}
          <button
            type="button"
            onClick={onNewVisit}
            className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F2F7F2] border border-[#DCCDBB] hover:border-[#405642]/60 transition-all group text-left shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EAF0E6] text-[#405642] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold text-[#211C17] group-hover:text-[#405642] transition-colors leading-tight">
              New Visit
            </span>
          </button>

          {/* Create Referral Button */}
          <button
            type="button"
            onClick={onCreateReferral}
            className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F0F6FA] border border-[#DCCDBB] hover:border-[#3D6B8C]/60 transition-all group text-left shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EBF2F7] text-[#3D6B8C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold text-[#211C17] group-hover:text-[#3D6B8C] transition-colors leading-tight">
              Create Referral
            </span>
          </button>

          {/* Follow-up Button */}
          <button
            type="button"
            onClick={onOpenFollowup}
            className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF7F2] hover:bg-[#FEF8EC] border border-[#DCCDBB] hover:border-[#D98A2C]/60 transition-all group text-left shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FEF6EE] text-[#D98A2C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ClipboardList className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-[13px] font-bold text-[#211C17] group-hover:text-[#D98A2C] transition-colors leading-tight">
              Follow-up
            </span>
          </button>
        </div>
      </div>

      {/* Motivational Card with Botanical Watermark */}
      <div className="relative bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-xs overflow-hidden flex-1 flex items-center">
        {/* Botanical watermark in bottom right */}
        <div className="absolute -bottom-4 -right-4 w-28 h-28 pointer-events-none opacity-20 select-none">
          <img
            src="/assets/plant.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-xs sm:text-sm font-serif italic text-[#635A4F] leading-relaxed relative z-10 pr-12">
          &ldquo;Your care at the community builds a healthier tomorrow.&rdquo;
        </p>
      </div>
    </div>
  );
};
