import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { AshaDashboard } from './pages/AshaDashboard';
import { Citizen } from './pages/Citizen';

function App() {
  // Check URL hash or path for initial view: 'citizen', 'asha', 'dashboard', or 'home'
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#citizen' || path === '/citizen') return 'citizen';
      if (hash === '#home' || path === '/home') return 'home';
      if (hash === '#officer' || hash === '#dashboard' || path === '/dashboard') return 'dashboard';
      if (hash === '#asha' || path === '/asha') return 'asha';
      return 'citizen'; // Default to Citizen Portal for new user journey
    }
    return 'citizen';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#citizen') {
        setView('citizen');
      } else if (hash === '#home') {
        setView('home');
      } else if (hash === '#dashboard' || hash === '#officer') {
        setView('dashboard');
      } else if (hash === '#asha') {
        setView('asha');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newView) => {
    setView(newView);
    if (typeof window !== 'undefined') {
      window.location.hash = newView;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating View Switcher Badge for Developer / Demo Evaluation */}
      <div className="fixed bottom-4 right-4 z-50 bg-[#20392B] text-white border border-[#446652] rounded-full px-3 py-1.5 shadow-2xl flex items-center gap-1.5 text-xs font-semibold select-none backdrop-blur-md opacity-90 hover:opacity-100 transition-opacity">
        <span className="text-[#C5D7C7] text-[11px] font-normal hidden sm:inline">Role:</span>
        <button
          onClick={() => navigateTo('citizen')}
          className={`px-2.5 py-1 rounded-full text-xs transition-all ${
            view === 'citizen'
              ? 'bg-[#B94A25] text-white shadow-sm font-bold'
              : 'text-[#C5D7C7] hover:text-white'
          }`}
        >
          Citizen Portal
        </button>
        <span className="text-[#446652]">|</span>
        <button
          onClick={() => navigateTo('asha')}
          className={`px-2.5 py-1 rounded-full text-xs transition-all ${
            view === 'asha'
              ? 'bg-[#B94A25] text-white shadow-sm font-bold'
              : 'text-[#C5D7C7] hover:text-white'
          }`}
        >
          ASHA Worker
        </button>
        <span className="text-[#446652]">|</span>
        <button
          onClick={() => navigateTo('dashboard')}
          className={`px-2.5 py-1 rounded-full text-xs transition-all ${
            view === 'dashboard'
              ? 'bg-[#B94A25] text-white shadow-sm font-bold'
              : 'text-[#C5D7C7] hover:text-white'
          }`}
        >
          Health Officer
        </button>
        <span className="text-[#446652]">|</span>
        <button
          onClick={() => navigateTo('home')}
          className={`px-2.5 py-1 rounded-full text-xs transition-all ${
            view === 'home'
              ? 'bg-[#B94A25] text-white shadow-sm font-bold'
              : 'text-[#C5D7C7] hover:text-white'
          }`}
        >
          Public Portal
        </button>
      </div>

      {/* Render selected view */}
      {view === 'citizen' && (
        <Citizen
          onSwitchToAsha={() => navigateTo('asha')}
          onSwitchToDashboard={() => navigateTo('dashboard')}
          onSwitchToHome={() => navigateTo('home')}
        />
      )}
      {view === 'asha' && (
        <AshaDashboard
          onSwitchToOfficer={() => navigateTo('dashboard')}
          onSwitchToHome={() => navigateTo('home')}
        />
      )}
      {view === 'dashboard' && (
        <Dashboard
          onSwitchToAsha={() => navigateTo('asha')}
          onSwitchToHome={() => navigateTo('home')}
        />
      )}
      {view === 'home' && (
        <Home
          onSwitchToCitizen={() => navigateTo('citizen')}
          onSwitchToAsha={() => navigateTo('asha')}
          onSwitchToDashboard={() => navigateTo('dashboard')}
        />
      )}
    </div>
  );
}

export default App;
