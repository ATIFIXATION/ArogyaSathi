import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  User,
  Building2,
  FileText
} from 'lucide-react';
import { ACTIVE_CARE_DATA } from '../../data/citizenData';

export const MyActiveCareSection = ({
  onViewConsultation,
  onViewReferral,
  onViewFollowup
}) => {
  const consultation = ACTIVE_CARE_DATA.activeConsultation || {
    id: 'CON-9402',
    doctor: 'Dr. Sneha Patil',
    department: 'General Medicine & Maternal Care',
    facility: 'Dhule District Hospital',
    facilityAddress: 'Civil Lines, Dhule, Maharashtra',
    datetime: 'Tomorrow • 11:30 AM',
    status: 'Confirmed'
  };

  const referral = ACTIVE_CARE_DATA.activeReferral || {
    id: 'REF-801',
    type: 'High-Risk Maternal Specialist Referral',
    originFacility: 'Akkalkuwa Sub-Centre',
    destinationFacility: 'Taloda Rural Hospital',
    appointmentDate: '24 Oct 2026',
    status: 'Pending Transfer'
  };

  const followup = ACTIVE_CARE_DATA.activeFollowup || {
    id: 'FUP-402',
    type: 'Post-Natal Care & Neonatal Check',
    assignedAsha: 'Ayesha Begum',
    dueDate: '25 Oct 2026',
    dueInDays: '2 days',
    status: 'Due Today'
  };

  return (
    <section id="my-care" className="py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#B94A25] uppercase tracking-wider block mb-1">
              Personal Healthcare Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211C17]">
              My Active Care &amp; Continuity
            </h2>
            <p className="text-xs sm:text-sm text-[#756B60] mt-1 font-sans">
              Your confirmed appointments, hospital referrals, and frontline ASHA follow-up schedules.
            </p>
          </div>
        </div>

        {/* 3 Interactive Care Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          
          {/* Card 1: Active Consultation */}
          <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF0E6] text-[#405642] border border-[#C5DEC8]">
                  Consultation
                </span>
                <span className="text-xs font-bold text-[#405642] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {consultation.status || 'Confirmed'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-snug">
                {consultation.doctor || 'Primary Health Centre Doctor'}
              </h3>
              <p className="text-xs text-[#756B60] mt-0.5">
                {consultation.department || 'General Medicine'}
              </p>

              <div className="mt-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D7C7] space-y-2 text-xs text-[#3D352C]">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#756B60] shrink-0" />
                  <span className="font-semibold text-[#211C17]">{consultation.facility || 'Akkalkuwa PHC'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#B94A25] shrink-0" />
                  <span className="font-bold text-[#B94A25]">{consultation.datetime || 'Scheduled'}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE0D2] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onViewConsultation}
                className="font-bold text-[#B94A25] hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => alert('Rescheduling request sent to Dhule District Hospital OPD.')}
                className="text-[#756B60] hover:text-[#211C17] font-semibold"
              >
                Reschedule
              </button>
            </div>
          </div>

          {/* Card 2: Specialist Referral */}
          <div id="referrals" className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EBF2F7] text-[#3D6B8C] border border-[#CADAE5]">
                  Specialist Referral
                </span>
                <span className="font-mono text-xs font-bold text-[#756B60]">
                  {referral.id || 'REF-801'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-snug">
                {referral.type || 'Specialist Referral'}
              </h3>
              <p className="text-xs text-[#756B60] mt-0.5">
                Target: {referral.destinationFacility || 'District Hospital'}
              </p>

              <div className="mt-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D7C7] space-y-2 text-xs text-[#3D352C]">
                <div className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-[#3D6B8C] shrink-0" />
                  <span>Transfer: {referral.originFacility || 'Sub-Centre'} → <strong>Civil Hospital</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3D6B8C] shrink-0" />
                  <span>Appointment: <strong>{referral.appointmentDate || 'Confirmed'}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE0D2] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onViewReferral}
                className="font-bold text-[#3D6B8C] hover:underline flex items-center gap-1"
              >
                <span>View Referral Slip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-semibold text-[#405642]">
                Transport Assisted
              </span>
            </div>
          </div>

          {/* Card 3: Scheduled Follow-up */}
          <div id="follow-up" className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FEF8EC] text-[#D98A2C] border border-[#FAD3BD]">
                  ASHA Follow-up
                </span>
                <span className="text-xs font-bold text-[#B94A25]">
                  Due in {followup.dueInDays || 'Scheduled'}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17] leading-snug">
                {followup.type || 'Frontline Follow-up'}
              </h3>
              <p className="text-xs text-[#756B60] mt-0.5">
                Assigned ASHA: {followup.assignedAsha || 'Ayesha Begum'}
              </p>

              <div className="mt-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#E3D7C7] space-y-2 text-xs text-[#3D352C]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D98A2C] shrink-0" />
                  <span>Scheduled Date: <strong>{followup.dueDate || 'Upcoming'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#405642] shrink-0" />
                  <span>Doorstep vitals &amp; medicine adherence</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE0D2] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onViewFollowup}
                className="font-bold text-[#D98A2C] hover:underline flex items-center gap-1"
              >
                <span>View Follow-up Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] text-[#756B60]">
                Home Visit
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
