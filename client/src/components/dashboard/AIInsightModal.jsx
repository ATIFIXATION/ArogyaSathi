import React from 'react';
import {
  X,
  BrainCircuit,
  ShieldCheck,
  SendHorizontal,
  CheckCircle,
  Building2,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';
import { AI_INSIGHT_DATA } from '../../data/dashboardData';

export const AIInsightModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FBF0EB] border-b border-[#F6E4DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B94A25] text-white flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                AI Healthcare Access & Continuity Analysis
              </h3>
              <p className="text-[11px] text-[#756B60]">
                {AI_INSIGHT_DATA.modelName} • Gap Severity Index:{' '}
                <strong className="text-[#B94A25]">{AI_INSIGHT_DATA.confidenceScore}/100</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17] hover:bg-[#EFE5D5]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Summary Banner */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#DCCDBB] text-[#211C17] leading-relaxed">
            <p className="font-medium">
              {AI_INSIGHT_DATA.summary}
            </p>
          </div>

          {/* Factor Signals Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#756B60] mb-2">
              Multi-Factor Healthcare Access Decomposition
            </h4>
            <div className="space-y-2">
              {AI_INSIGHT_DATA.factors.map((factor, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E3D7C7] flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#211C17] block">{factor.label}</span>
                    <span className="text-[#756B60] mt-0.5 block">{factor.value}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold shrink-0 ${
                      factor.impact === 'Severe'
                        ? 'bg-[#C0392B] text-white'
                        : factor.impact === 'High'
                        ? 'bg-[#E07A2B] text-white'
                        : 'bg-[#E8B958] text-[#211C17]'
                    }`}
                  >
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommended Rapid Response Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B94A25] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Recommended Access Optimization Checklist
            </h4>
            <ul className="space-y-1.5 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E3D7C7]">
              {AI_INSIGHT_DATA.recommendedActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#211C17]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#405642] shrink-0 mt-0.5" />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Demo Disclaimer */}
          <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#EAE0D2] flex items-center gap-2 text-[11px] text-[#756B60]">
            <AlertCircle className="w-4 h-4 text-[#D98A2C] shrink-0" />
            <span>AI-generated demo insight — synthesizes operational telemetry and referral backlog indicators.</span>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-[#EFE5D5] border-t border-[#DCCDBB] flex items-center justify-between">
          <span className="text-[11px] text-[#756B60] italic">
            ML Access Engine Pipeline (SIH26133)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#756B60] hover:bg-[#E3D7C7]"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('Mobile Tele-Health unit order dispatched to Nandurbar District Health Office.');
                onClose();
              }}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#B94A25] text-white hover:bg-[#A53E1D] shadow-sm flex items-center gap-1.5"
            >
              <SendHorizontal className="w-3.5 h-3.5" />
              Authorize Interventions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
