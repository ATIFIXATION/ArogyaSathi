import React, { useState, useEffect } from 'react';
import {
  getCitizenProfile,
  getCitizenNotifications,
  getCitizenActiveCare,
  getCitizenMedicines,
  getCitizenDiagnostics,
  getNearbyFacilities
} from '../services/api';
import {
  CITIZEN_PROFILE,
  CITIZEN_NOTIFICATIONS,
  CARE_JOURNEY_STAGES,
  ACTIVE_CARE_DATA,
  MEDICINES_DATA,
  DIAGNOSTICS_DATA,
  NEARBY_FACILITIES
} from '../data/citizenData';
import { CitizenHeader } from '../components/citizen/CitizenHeader';
import { CitizenHero } from '../components/citizen/CitizenHero';
import { LocationCareSection } from '../components/citizen/LocationCareSection';
import { PrimaryActionsSection } from '../components/citizen/PrimaryActionsSection';
import { CareJourneyProgress } from '../components/citizen/CareJourneyProgress';
import { MyActiveCareSection } from '../components/citizen/MyActiveCareSection';
import { TeleconsultationSection } from '../components/citizen/TeleconsultationSection';
import { MedicineDiagnosticsSection } from '../components/citizen/MedicineDiagnosticsSection';
import { RuralPhcSection } from '../components/citizen/RuralPhcSection';
import { AshaSupportSection } from '../components/citizen/AshaSupportSection';
import { CommunityCareSection } from '../components/citizen/CommunityCareSection';
import { EmergencySupportSection } from '../components/citizen/EmergencySupportSection';
import { CitizenFooter } from '../components/citizen/CitizenFooter';

// Modals
import { ReportConcernModal } from '../components/citizen/ReportConcernModal';
import { BookConsultationModal, FacilityDetailModal } from '../components/citizen/BookConsultationModal';
import { ReferralDetailModal, FollowupDetailModal } from '../components/citizen/ReferralDetailModal';
import { PrescriptionModal } from '../components/citizen/PrescriptionModal';
import { DiagnosticsModal } from '../components/citizen/DiagnosticsModal';
import { CitizenProfileModal, ContactAshaModal } from '../components/citizen/CitizenProfileModal';

export const Citizen = ({ onSwitchToAsha, onSwitchToDashboard, onSwitchToHome }) => {
  const [, setTriggerRender] = useState(0);
  const [careJourneyStages, setCareJourneyStages] = useState(CARE_JOURNEY_STAGES);
  const [activeStatusText, setActiveStatusText] = useState('03 Consultation Scheduled');

  const refreshCitizenData = () => {
    const citizenId = '11111111-1111-1111-1111-000000000010'; // Suman Valvi
    const userId = '99999999-9999-9999-9999-000000000010';

    Promise.allSettled([
      getCitizenProfile(citizenId),
      getCitizenNotifications(userId),
      getCitizenActiveCare(citizenId),
      getCitizenMedicines(citizenId),
      getCitizenDiagnostics(citizenId),
      getNearbyFacilities()
    ]).then(([profileRes, notifRes, careRes, medRes, diagRes, facRes]) => {
      let updated = false;

      if (profileRes.status === 'fulfilled' && profileRes.value) {
        Object.assign(CITIZEN_PROFILE, profileRes.value);
        updated = true;
      }
      if (notifRes.status === 'fulfilled' && notifRes.value) {
        CITIZEN_NOTIFICATIONS.splice(0, CITIZEN_NOTIFICATIONS.length, ...notifRes.value);
        updated = true;
      }
      if (careRes.status === 'fulfilled' && careRes.value) {
        Object.assign(ACTIVE_CARE_DATA, careRes.value);
        if (careRes.value.journeyStages) {
          setCareJourneyStages(careRes.value.journeyStages);
        }
        if (careRes.value.activeStatusText) {
          setActiveStatusText(careRes.value.activeStatusText);
        }
        updated = true;
      }
      if (medRes.status === 'fulfilled' && medRes.value) {
        MEDICINES_DATA.splice(0, MEDICINES_DATA.length, ...medRes.value);
        updated = true;
      }
      if (diagRes.status === 'fulfilled' && diagRes.value) {
        DIAGNOSTICS_DATA.splice(0, DIAGNOSTICS_DATA.length, ...diagRes.value);
        updated = true;
      }
      if (facRes.status === 'fulfilled' && facRes.value) {
        NEARBY_FACILITIES.splice(0, NEARBY_FACILITIES.length, ...facRes.value);
        updated = true;
      }

      if (updated) {
        setTriggerRender(prev => prev + 1);
      }
    }).catch(error => {
      console.warn("Error loading database citizen data:", error);
    });
  };

  useEffect(() => {
    refreshCitizenData();
  }, []);

  // Modal States
  const [reportConcernModalOpen, setReportConcernModalOpen] = useState(false);
  const [bookConsultModalOpen, setBookConsultModalOpen] = useState(false);
  const [selectedFacilityForModal, setSelectedFacilityForModal] = useState(null);
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [followupModalOpen, setFollowupModalOpen] = useState(false);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [diagnosticsModalOpen, setDiagnosticsModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [contactAshaModalOpen, setContactAshaModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F0E6] text-[#211C17] flex flex-col font-sans paper-texture selection:bg-[#B94A25] selection:text-white antialiased overflow-x-hidden">
      
      {/* 01. Citizen Header */}
      <CitizenHeader
        onSwitchToAsha={onSwitchToAsha}
        onSwitchToDashboard={onSwitchToDashboard}
        onSwitchToHome={onSwitchToHome}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenReportConcern={() => setReportConcernModalOpen(true)}
        onOpenConsultation={() => setBookConsultModalOpen(true)}
        onOpenReferral={() => setReferralModalOpen(true)}
        onOpenFollowup={() => setFollowupModalOpen(true)}
      />

      {/* Main Page Canvas */}
      <main className="flex-1">
        
        {/* 02. Citizen Hero (featuring citizen-care.png) */}
        <CitizenHero
          onFindCare={() => scrollToSection('find-care')}
          onReportConcern={() => setReportConcernModalOpen(true)}
        />

        {/* 03. Location-aware Healthcare Summary */}
        <LocationCareSection
          onBrowseFacilities={() => scrollToSection('find-care')}
        />

        {/* 04. What do you need today? Primary Actions */}
        <PrimaryActionsSection
          onReportConcern={() => setReportConcernModalOpen(true)}
          onBrowseFacilities={() => scrollToSection('find-care')}
          onRequestConsultation={() => setBookConsultModalOpen(true)}
          onTrackReferral={() => setReferralModalOpen(true)}
        />

        {/* 05. 7-Stage Guided Care Journey */}
        <CareJourneyProgress
          stages={careJourneyStages}
          activeStatusText={activeStatusText}
          onOpenConsultation={() => setBookConsultModalOpen(true)}
        />

        {/* 06. My Active Care (Consultation, Referral, Follow-up) */}
        <MyActiveCareSection
          onViewConsultation={() => setBookConsultModalOpen(true)}
          onViewReferral={() => setReferralModalOpen(true)}
          onViewFollowup={() => setFollowupModalOpen(true)}
        />

        {/* 07. Teleconsultation Section (featuring teleconsultation.png) */}
        <TeleconsultationSection
          onRequestConsultation={() => setBookConsultModalOpen(true)}
        />

        {/* 08. Medicines & Diagnostics (featuring medicine-diagnostics.png) */}
        <MedicineDiagnosticsSection
          onViewPrescription={() => setPrescriptionModalOpen(true)}
          onViewDiagnostics={() => setDiagnosticsModalOpen(true)}
        />

        {/* 09. Rural Primary Health Centre Access (featuring rural-phc.png) */}
        <RuralPhcSection
          onSelectFacility={(fac) => setSelectedFacilityForModal(fac)}
        />

        {/* 10. ASHA Frontline Support Section (featuring asha-support.png) */}
        <AshaSupportSection
          onContactAsha={() => setContactAshaModalOpen(true)}
          onRequestAssistance={() => setContactAshaModalOpen(true)}
        />

        {/* 11. Community Health Information (featuring community-care.png) */}
        <CommunityCareSection />

        {/* 12. Urgent Emergency Support */}
        <EmergencySupportSection />

      </main>

      {/* 13. Citizen Footer */}
      <CitizenFooter
        onSwitchToHome={onSwitchToHome}
        onSwitchToAsha={onSwitchToAsha}
        onSwitchToDashboard={onSwitchToDashboard}
      />

      {/* Interactive Workflow Modals */}
      {reportConcernModalOpen && (
        <ReportConcernModal
          onClose={() => setReportConcernModalOpen(false)}
          onSubmitSuccess={(data) => {
            console.log('Care Request Submitted by Citizen:', data);
            refreshCitizenData();
          }}
        />
      )}

      {bookConsultModalOpen && (
        <BookConsultationModal
          onClose={() => setBookConsultModalOpen(false)}
          onBookSuccess={(data) => {
            console.log('Consultation Booked:', data);
          }}
        />
      )}

      {selectedFacilityForModal && (
        <FacilityDetailModal
          facility={selectedFacilityForModal}
          onClose={() => setSelectedFacilityForModal(null)}
          onBookAppointment={() => {
            setSelectedFacilityForModal(null);
            setBookConsultModalOpen(true);
          }}
        />
      )}

      {referralModalOpen && (
        <ReferralDetailModal
          onClose={() => setReferralModalOpen(false)}
        />
      )}

      {followupModalOpen && (
        <FollowupDetailModal
          onClose={() => setFollowupModalOpen(false)}
        />
      )}

      {prescriptionModalOpen && (
        <PrescriptionModal
          onClose={() => setPrescriptionModalOpen(false)}
        />
      )}

      {diagnosticsModalOpen && (
        <DiagnosticsModal
          onClose={() => setDiagnosticsModalOpen(false)}
        />
      )}

      {profileModalOpen && (
        <CitizenProfileModal
          onClose={() => setProfileModalOpen(false)}
        />
      )}

      {contactAshaModalOpen && (
        <ContactAshaModal
          onClose={() => setContactAshaModalOpen(false)}
        />
      )}

    </div>
  );
};
