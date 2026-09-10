import React, { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, Activity } from 'lucide-react';
import {
  getOfficerDistricts,
  getOfficerKpis,
  getOfficerAlerts,
  getOfficerTrends,
  getOfficerPriorityAreas,
  getOfficerNoCasesFacilities,
  getOfficerAiInsight,
  getOfficerMapDistricts,
  getOfficerProfile
} from '../services/api';
import {
  DISTRICT_OPTIONS,
  DATE_RANGE_OPTIONS,
  KPI_DATA,
  RECENT_ALERTS,
  SERVICE_TRENDS_DATA,
  PRIORITY_AREAS,
  NO_ACTIVE_CASES_FACILITIES,
  AI_INSIGHT_DATA,
  MAHARASHTRA_MAP_DISTRICTS,
  OFFICER_PROFILE,
  set_DISTRICT_OPTIONS,
  set_KPI_DATA,
  set_RECENT_ALERTS,
  set_SERVICE_TRENDS_DATA,
  set_PRIORITY_AREAS,
  set_NO_ACTIVE_CASES_FACILITIES,
  set_AI_INSIGHT_DATA,
  set_MAHARASHTRA_MAP_DISTRICTS,
  set_OFFICER_PROFILE
} from '../data/dashboardData';
import { Sidebar } from '../components/dashboard/Sidebar';
import { TopHeader } from '../components/dashboard/TopHeader';
import { KpiCard } from '../components/dashboard/KpiCard';
import { RiskMap } from '../components/dashboard/RiskMap';
import { AlertList } from '../components/dashboard/AlertList';
import { DiseaseTrendChart } from '../components/dashboard/DiseaseTrendChart';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { HighRiskVillages } from '../components/dashboard/HighRiskVillages';
import { NoActiveCasesCard } from '../components/dashboard/NoActiveCasesCard';

export const Dashboard = ({ onSwitchToAsha, onSwitchToHome }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_OPTIONS[0]); // Nandurbar
  const [selectedDateRange, setSelectedDateRange] = useState(DATE_RANGE_OPTIONS[0]);
  const [, setTriggerRender] = useState(0);

  const refreshOfficerData = () => {
    const officerId = '33333333-3333-3333-3333-000000000001'; // Dr. Rajesh Shinde

    Promise.allSettled([
      getOfficerProfile(officerId),
      getOfficerDistricts(),
      getOfficerKpis(),
      getOfficerAlerts(),
      getOfficerTrends(),
      getOfficerPriorityAreas(),
      getOfficerNoCasesFacilities(),
      getOfficerAiInsight(),
      getOfficerMapDistricts()
    ]).then(([profileRes, districtsRes, kpisRes, alertsRes, trendsRes, areasRes, noCasesRes, insightRes, mapRes]) => {
      let updated = false;

      if (profileRes.status === 'fulfilled' && profileRes.value) {
        set_OFFICER_PROFILE(profileRes.value);
        updated = true;
      }
      if (districtsRes.status === 'fulfilled' && Array.isArray(districtsRes.value) && districtsRes.value.length > 0) {
        set_DISTRICT_OPTIONS(districtsRes.value);
        setSelectedDistrict(districtsRes.value[0]);
        updated = true;
      }
      if (kpisRes.status === 'fulfilled' && Array.isArray(kpisRes.value) && kpisRes.value.length > 0) {
        set_KPI_DATA(kpisRes.value);
        updated = true;
      }
      if (alertsRes.status === 'fulfilled' && Array.isArray(alertsRes.value) && alertsRes.value.length > 0) {
        set_RECENT_ALERTS(alertsRes.value);
        updated = true;
      }
      if (trendsRes.status === 'fulfilled' && Array.isArray(trendsRes.value) && trendsRes.value.length > 0) {
        set_SERVICE_TRENDS_DATA(trendsRes.value);
        updated = true;
      }
      if (areasRes.status === 'fulfilled' && Array.isArray(areasRes.value) && areasRes.value.length > 0) {
        set_PRIORITY_AREAS(areasRes.value);
        updated = true;
      }
      if (noCasesRes.status === 'fulfilled' && Array.isArray(noCasesRes.value) && noCasesRes.value.length > 0) {
        set_NO_ACTIVE_CASES_FACILITIES(noCasesRes.value);
        updated = true;
      }
      if (insightRes.status === 'fulfilled' && insightRes.value) {
        set_AI_INSIGHT_DATA(insightRes.value);
        updated = true;
      }
      if (mapRes.status === 'fulfilled' && Array.isArray(mapRes.value) && mapRes.value.length > 0) {
        set_MAHARASHTRA_MAP_DISTRICTS(mapRes.value);
        updated = true;
      }

      if (updated) {
        setTriggerRender(prev => prev + 1);
      }
    }).catch(error => {
      console.warn("Error loading database officer surveillance details:", error);
    });
  };

  useEffect(() => {
    refreshOfficerData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F0E6] text-[#211C17] flex font-sans paper-texture selection:bg-[#B94A25] selection:text-white antialiased overflow-x-hidden">
      {/* 01. Forest Green Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 02. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <TopHeader
          selectedDistrict={selectedDistrict}
          onSelectDistrict={setSelectedDistrict}
          selectedDateRange={selectedDateRange}
          onSelectDateRange={setSelectedDateRange}
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onSwitchToAsha={onSwitchToAsha}
          onSwitchToHome={onSwitchToHome}
        />

        {/* Main Dashboard Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1720px] mx-auto w-full space-y-6">
          {/* Quick Tab Banner if specific tab selected */}
          {activeTab !== 'overview' && (
            <div className="bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#756B60] uppercase tracking-wider">
                  Module View:
                </span>
                <span className="text-sm font-bold text-[#B94A25] capitalize">
                  {activeTab.replace('-', ' ')}
                </span>
              </div>
              <button
                onClick={() => setActiveTab('overview')}
                className="text-xs font-semibold text-[#405642] hover:underline"
              >
                Back to Access Overview
              </button>
            </div>
          )}

          {/* 03. Overview KPI Cards (4 Column Grid) */}
          <section aria-label="Maharashtra Healthcare Access KPI Metrics">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {KPI_DATA.map((kpi) => (
                <KpiCard
                  key={kpi.id}
                  title={kpi.title}
                  value={kpi.value}
                  trend={kpi.trend}
                  icon={kpi.icon}
                  iconBg={kpi.iconBg}
                  borderColor={kpi.borderColor}
                  onClick={() => {
                    if (kpi.id === 'active-alerts') setActiveTab('alerts');
                    if (kpi.id === 'high-priority-areas') setActiveTab('risk-map');
                    if (kpi.id === 'total-cases') setActiveTab('cases');
                    if (kpi.id === 'referrals-pending') setActiveTab('referrals');
                  }}
                />
              ))}
            </div>
          </section>

          {/* 04. Middle Row: Maharashtra Healthcare Access Map & Service Alerts */}
          <section aria-label="Geographic Access Map & Live Service Alerts">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
              {/* Left 7 Columns on LG: Healthcare Access Map (Maharashtra) */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
                <RiskMap
                  onSelectDistrict={(dist) => {
                    const match = DISTRICT_OPTIONS.find((d) => d.id === dist.id);
                    if (match) setSelectedDistrict(match);
                  }}
                />
              </div>

              {/* Right 5 Columns on LG: Recent Service Alerts */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
                <AlertList onRefresh={refreshOfficerData} />
              </div>
            </div>
          </section>

          {/* 05. Bottom Row: 3 Column Intelligence Grid */}
          <section aria-label="Healthcare Service Trends, AI Insights & Priority Areas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
              {/* Col 1: Healthcare Service Trends (Last 6 Weeks) */}
              <div className="flex flex-col">
                <DiseaseTrendChart />
              </div>

              {/* Col 2: AI Healthcare Access Insight */}
              <div className="flex flex-col">
                <AIInsightCard />
              </div>

              {/* Col 3: Top 5 Priority Healthcare Areas */}
              <div className="flex flex-col md:col-span-2 lg:col-span-1">
                <HighRiskVillages />
              </div>
            </div>
          </section>

          {/* 06. "No Active Cases" Verification Section */}
          <section aria-label="No Active Cases Verification and Facility Integrity">
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <NoActiveCasesCard />
            </div>
          </section>

          {/* 07. Editorial Calm Healthcare Footer */}
          <footer className="pt-6 pb-4 border-t border-[#E3D7C7]/80 text-center select-none">
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-serif italic text-[#635A4F]">
              <span>&ldquo;Healthcare access that reaches every citizen. Continuity that heals.&rdquo;</span>
              <Leaf className="w-4 h-4 text-[#405642] not-italic inline" />
            </div>
            <p className="text-[10px] text-[#9E9488] mt-1 font-sans tracking-wide">
              SwasthyaSetu Public Healthcare Access &amp; Continuity Platform • Maharashtra District Operations
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
