import React from 'react';
import { Header } from '../components/layout/Header';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { ThreeRolesSection } from '../components/home/ThreeRolesSection';
import { CareJourneySection } from '../components/home/CareJourneySection';
import { ProblemSection } from '../components/home/ProblemSection';
import { PlatformPreview } from '../components/home/PlatformPreview';
import { FinalCTA } from '../components/home/FinalCTA';
import { Footer } from '../components/layout/Footer';

export const Home = ({ onSwitchToCitizen, onSwitchToDashboard, onSwitchToAsha }) => {
  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col paper-texture selection:bg-terracotta selection:text-white">
      {/* 01. Header */}
      <Header
        onSwitchToCitizen={onSwitchToCitizen}
        onSwitchToDashboard={onSwitchToDashboard}
        onSwitchToAsha={onSwitchToAsha}
      />

      <main className="flex-1">
        {/* 02. Hero with Maharashtra Healthcare Access Map */}
        <Hero onAccessCare={onSwitchToCitizen} />

        {/* 03. How SwasthyaSetu Works (Connect → Care → Continue → Impact) */}
        <HowItWorks />

        {/* 04. Three Connected Roles (Citizen, ASHA Worker, Health Officer) */}
        <ThreeRolesSection
          onSwitchToCitizen={onSwitchToCitizen}
          onSwitchToDashboard={onSwitchToDashboard}
          onSwitchToAsha={onSwitchToAsha}
        />

        {/* 05. The 8-Stage Care Journey Continuity Pipeline */}
        <CareJourneySection />

        {/* 06. The Rural Healthcare Gap */}
        <ProblemSection />

        {/* 07. District Health Operations Console Preview */}
        <PlatformPreview onLaunchConsole={onSwitchToDashboard} />

        {/* 08. Final Call to Action */}
        <FinalCTA onSwitchToDashboard={onSwitchToDashboard} />
      </main>

      {/* 09. Editorial Footer */}
      <Footer />
    </div>
  );
};
