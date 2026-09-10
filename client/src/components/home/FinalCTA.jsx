import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

export const FinalCTA = ({ onSwitchToDashboard }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-ivory">
      {/* Botanical watermarks */}
      <div className="absolute left-0 bottom-0 w-48 sm:w-64 opacity-25 pointer-events-none select-none">
        <img
          src="/assets/plant.png"
          alt=""
          className="w-full h-auto object-contain -scale-x-100"
        />
      </div>
      <div className="absolute right-0 bottom-0 w-56 sm:w-80 opacity-25 pointer-events-none select-none">
        <img
          src="/assets/plant.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-terracotta uppercase">
            Transforming Rural Healthcare Delivery
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ink font-normal leading-[1.15] tracking-tight">
          A stronger public health system starts with{' '}
          <span className="italic text-terracotta font-serif">continuous care.</span>
        </h2>

        <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed font-sans max-w-xl mx-auto">
          Connect rural citizens, frontline ASHA workers and public healthcare facilities — from first symptoms to consultation, referral, treatment and follow-up.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            className="text-sm sm:text-base font-semibold px-7 py-3.5 shadow-md hover:shadow-lg rounded-full"
            onClick={() => {
              if (onSwitchToDashboard) onSwitchToDashboard();
              else window.location.hash = 'dashboard';
            }}
          >
            Launch Healthcare Console
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={Mail}
            iconPosition="left"
            className="text-sm sm:text-base font-medium px-6 py-3.5 bg-paper-light hover:bg-paper-warm border-border-soft rounded-full"
            onClick={() => alert('SwasthyaSetu Rural Healthcare Access & Continuity Platform • SIH 2026')}
          >
            Contact Team
          </Button>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle/80 max-w-lg mx-auto">
          <span className="text-xs text-ink-subtle">
            Dedicated to rural public healthcare access and continuity across underserved communities.
          </span>
        </div>

      </div>
    </section>
  );
};
