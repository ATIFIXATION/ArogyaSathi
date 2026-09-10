import React from 'react';
import { Leaf, ShieldCheck, Heart, MapPin } from 'lucide-react';

export const CitizenFooter = ({ onSwitchToHome, onSwitchToAsha, onSwitchToDashboard }) => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#DCCDBB] pt-10 pb-8 text-xs text-[#756B60]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3 md:col-span-2">
            <img
              src="/assets/swasthyasetu-logo.png"
              alt="SwasthyaSetu"
              className="h-10 w-auto object-contain"
            />
            <p className="text-xs text-[#5A5145] leading-relaxed max-w-md font-sans">
              SwasthyaSetu connects rural citizens with frontline ASHA workers and public healthcare facilities across Maharashtra, ensuring continuous care from first concern to complete recovery.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#405642] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#405642]" />
              <span>SIH 2026 Problem Statement SIH26133</span>
            </div>
          </div>

          {/* Col 2: Citizen Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#211C17] uppercase tracking-wider text-[11px]">
              Citizen Navigation
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li><a href="#find-care" className="hover:text-[#B94A25] transition-colors">Find Nearby Facilities</a></li>
              <li><a href="#my-care" className="hover:text-[#B94A25] transition-colors">My Active Care</a></li>
              <li><a href="#referrals" className="hover:text-[#B94A25] transition-colors">Referrals &amp; Transfers</a></li>
              <li><a href="#follow-up" className="hover:text-[#B94A25] transition-colors">Home Follow-up</a></li>
              <li><a href="#help" className="hover:text-[#B94A25] transition-colors">Emergency Help (108 / 104)</a></li>
            </ul>
          </div>

          {/* Col 3: Role Switcher & System Portals */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#211C17] uppercase tracking-wider text-[11px]">
              SwasthyaSetu Portals
            </h4>
            <ul className="space-y-1.5 font-medium">
              <li>
                <button
                  onClick={onSwitchToHome}
                  className="hover:text-[#B94A25] transition-colors text-left"
                >
                  Public Homepage
                </button>
              </li>
              <li>
                <button
                  onClick={onSwitchToAsha}
                  className="hover:text-[#B94A25] transition-colors text-left"
                >
                  ASHA Worker Portal
                </button>
              </li>
              <li>
                <button
                  onClick={onSwitchToDashboard}
                  className="hover:text-[#B94A25] transition-colors text-left"
                >
                  Health Officer Dashboard
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Editorial Note */}
        <div className="pt-6 border-t border-[#EAE0D2] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#9E9488]">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-[#405642]" />
            <span>&ldquo;Bridging Care. Building Healthier Communities.&rdquo;</span>
          </div>
          <div>
            SwasthyaSetu Healthcare Access Platform • Maharashtra Rural Deployment
          </div>
        </div>

      </div>
    </footer>
  );
};
