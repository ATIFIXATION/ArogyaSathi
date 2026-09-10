import React, { useState, useEffect } from 'react';
import {
  getAshaProfile,
  getAshaKpis,
  getAshaCareRequests,
  getAshaCommunities,
  getAshaPriorityTasks,
  getAshaReferrals
} from '../services/api';
import {
  ASHA_PROFILE,
  ASHA_KPI_DATA,
  CITIZEN_CARE_REQUESTS,
  ASSIGNED_COMMUNITIES,
  PRIORITY_CARE_TASKS,
  REFERRALS_LIST
} from '../data/ashaData';
import { Leaf } from 'lucide-react';
import { AshaSidebar } from '../components/asha/AshaSidebar';
import { AshaHeader } from '../components/asha/AshaHeader';
import { AshaKpiCards } from '../components/asha/AshaKpiCards';
import { PendingReports } from '../components/asha/PendingReports';
import { AssignedVillages } from '../components/asha/AssignedVillages';
import { ActiveAlerts } from '../components/asha/ActiveAlerts';
import { FieldPlan } from '../components/asha/FieldPlan';
import { CoverageMap } from '../components/asha/CoverageMap';
import { QuickActions } from '../components/asha/QuickActions';
import { FieldVisitModal } from '../components/asha/FieldVisitModal';
import { RegisterCitizenModal } from '../components/asha/RegisterCitizenModal';
import { ReferralsModal } from '../components/asha/ReferralsModal';
import { ServiceIssueModal } from '../components/asha/ServiceIssueModal';
import { HealthEducationModal, AshaSupportModal } from '../components/asha/HealthEducationModal';

export const AshaDashboard = ({ onSwitchToOfficer, onSwitchToHome }) => {
  const [, setTriggerRender] = useState(0);
  const [careRequestsList, setCareRequestsList] = useState(CITIZEN_CARE_REQUESTS);

  const refreshAshaData = () => {
    const ashaId = '22222222-2222-2222-2222-000000000002'; // Ayesha Begum

    Promise.allSettled([
      getAshaProfile(ashaId),
      getAshaKpis(ashaId),
      getAshaCareRequests(ashaId),
      getAshaCommunities(ashaId),
      getAshaPriorityTasks(ashaId),
      getAshaReferrals(ashaId)
    ]).then(([profileRes, kpisRes, requestsRes, commsRes, tasksRes, referralsRes]) => {
      let updated = false;

      if (profileRes.status === 'fulfilled' && profileRes.value) {
        Object.assign(ASHA_PROFILE, profileRes.value);
        updated = true;
      }
      if (kpisRes.status === 'fulfilled' && kpisRes.value) {
        ASHA_KPI_DATA.splice(0, ASHA_KPI_DATA.length, ...kpisRes.value);
        updated = true;
      }
      if (requestsRes.status === 'fulfilled' && requestsRes.value) {
        CITIZEN_CARE_REQUESTS.splice(0, CITIZEN_CARE_REQUESTS.length, ...requestsRes.value);
        setCareRequestsList([...requestsRes.value]);
        updated = true;
      }
      if (commsRes.status === 'fulfilled' && commsRes.value) {
        ASSIGNED_COMMUNITIES.splice(0, ASSIGNED_COMMUNITIES.length, ...commsRes.value);
        updated = true;
      }
      if (tasksRes.status === 'fulfilled' && tasksRes.value) {
        PRIORITY_CARE_TASKS.splice(0, PRIORITY_CARE_TASKS.length, ...tasksRes.value);
        updated = true;
      }
      if (referralsRes.status === 'fulfilled' && referralsRes.value) {
        REFERRALS_LIST.splice(0, REFERRALS_LIST.length, ...referralsRes.value);
        updated = true;
      }

      if (updated) {
        setTriggerRender(prev => prev + 1);
      }
    }).catch(error => {
      console.warn("Error loading ASHA database records:", error);
    });
  };

  useEffect(() => {
    refreshAshaData();
  }, []);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals state
  const [fieldVisitModalOpen, setFieldVisitModalOpen] = useState(false);
  const [fieldVisitDefaultVillage, setFieldVisitDefaultVillage] = useState('');
  const [registerCitizenModalOpen, setRegisterCitizenModalOpen] = useState(false);
  const [referralsModalOpen, setReferralsModalOpen] = useState(false);
  const [referralsInitialTab, setReferralsInitialTab] = useState('active');
  const [serviceIssueModalOpen, setServiceIssueModalOpen] = useState(false);
  const [healthEduModalOpen, setHealthEduModalOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  const handleStartFieldVisit = (villageName) => {
    setFieldVisitDefaultVillage(villageName || '');
    setFieldVisitModalOpen(true);
  };

  const handleOpenReferrals = (tab = 'active') => {
    setReferralsInitialTab(tab);
    setReferralsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F0E6] text-[#211C17] flex font-sans paper-texture selection:bg-[#B94A25] selection:text-white antialiased overflow-x-hidden">
      {/* 01. Left Forest Green Sidebar */}
      <AshaSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        onOpenSupport={() => setSupportModalOpen(true)}
        onOpenNewVisit={() => setFieldVisitModalOpen(true)}
        onOpenReferral={() => handleOpenReferrals('active')}
        onOpenServiceIssue={() => setServiceIssueModalOpen(true)}
      />

      {/* 02. Main Dashboard Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Header */}
        <AshaHeader
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSwitchToOfficer={onSwitchToOfficer}
          onSwitchToHome={onSwitchToHome}
          onOpenSupport={() => setSupportModalOpen(true)}
        />

        {/* Main Canvas Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1720px] mx-auto w-full space-y-5 sm:space-y-6">
          {/* Quick Tab Banner if specific tab selected */}
          {activeTab !== 'overview' && (
            <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#756B60] uppercase tracking-wider">
                  ASHA Section View:
                </span>
                <span className="text-sm font-bold text-[#B94A25] capitalize">
                  {activeTab.replace('-', ' ')}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs font-semibold text-[#405642] hover:underline"
              >
                Back to Field Overview
              </button>
            </div>
          )}

          {/* 03. 4 KPI Cards Row */}
          <section aria-label="ASHA Field Care Coordination KPI Metrics">
            <AshaKpiCards
              onCardClick={(cardId) => {
                if (cardId === 'visits-today') setFieldVisitModalOpen(true);
                if (cardId === 'care-requests') setActiveTab('cases');
                if (cardId === 'pending-referrals') handleOpenReferrals('active');
                if (cardId === 'followups-due') handleOpenReferrals('active');
              }}
            />
          </section>

          {/* 04. Middle Row: 3 Primary Cards (Citizen Care Requests, Assigned Communities, Priority Care Tasks) */}
          <section aria-label="Citizen Care Requests, Assigned Communities, and Priority Tasks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {/* Col 1: Citizen Care Requests */}
              <div className="flex flex-col">
                <PendingReports
                  requests={careRequestsList}
                  onRefresh={refreshAshaData}
                />
              </div>

              {/* Col 2: Assigned Communities */}
              <div className="flex flex-col">
                <AssignedVillages onScheduleVisit={handleStartFieldVisit} />
              </div>

              {/* Col 3: Priority Care Tasks */}
              <div className="flex flex-col md:col-span-2 lg:col-span-1">
                <ActiveAlerts onStartVisit={handleStartFieldVisit} />
              </div>
            </div>
          </section>

          {/* 05. Bottom Row: 3 Columns (Field Plan, Maharashtra Field Coverage Map, Quick Actions) */}
          <section aria-label="Field Schedule, Coverage Map, and Quick Actions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {/* Col 1: Today's Field Plan */}
              <div className="flex flex-col">
                <FieldPlan
                  onTaskClick={(task) => {
                    if (task.type === 'visit') handleStartFieldVisit(task.location);
                    if (task.type === 'education') setHealthEduModalOpen(true);
                    if (task.type === 'followup') handleOpenReferrals('active');
                  }}
                />
              </div>

              {/* Col 2: Maharashtra Field Coverage Map */}
              <div className="flex flex-col">
                <CoverageMap />
              </div>

              {/* Col 3: Quick Actions + Motivational Card */}
              <div className="flex flex-col md:col-span-2 lg:col-span-1">
                <QuickActions
                  onRegisterCitizen={() => setRegisterCitizenModalOpen(true)}
                  onNewVisit={() => setFieldVisitModalOpen(true)}
                  onCreateReferral={() => handleOpenReferrals('create')}
                  onOpenFollowup={() => handleOpenReferrals('active')}
                />
              </div>
            </div>
          </section>

          {/* 06. Footer */}
          <footer className="pt-6 pb-4 border-t border-[#E3D7C7]/80 text-center select-none">
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-serif italic text-[#635A4F]">
              <Leaf className="w-4 h-4 text-[#405642] not-italic inline" />
              <span>&ldquo;Every household visited brings healthcare closer to home.&rdquo;</span>
            </div>
            <p className="text-[10px] text-[#9E9488] mt-1 font-sans tracking-wide">
              SwasthyaSetu Frontline Healthcare Coordination • Maharashtra District Operations
            </p>
          </footer>
        </main>
      </div>

      {/* Workflow Modals */}
      {fieldVisitModalOpen && (
        <FieldVisitModal
          defaultVillage={fieldVisitDefaultVillage}
          onClose={() => setFieldVisitModalOpen(false)}
        />
      )}

      {registerCitizenModalOpen && (
        <RegisterCitizenModal
          onClose={() => setRegisterCitizenModalOpen(false)}
        />
      )}

      {referralsModalOpen && (
        <ReferralsModal
          initialTab={referralsInitialTab}
          onClose={() => setReferralsModalOpen(false)}
        />
      )}

      {serviceIssueModalOpen && (
        <ServiceIssueModal
          onClose={() => setServiceIssueModalOpen(false)}
        />
      )}

      {healthEduModalOpen && (
        <HealthEducationModal
          onClose={() => setHealthEduModalOpen(false)}
        />
      )}

      {supportModalOpen && (
        <AshaSupportModal
          onClose={() => setSupportModalOpen(false)}
        />
      )}
    </div>
  );
};
