import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Droplet,
  Thermometer,
  Apple,
  X
} from 'lucide-react';
import { COMMUNITY_HEALTH_TOPICS } from '../../data/citizenData';

export const CommunityCareSection = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const iconMap = {
    Apple: Apple,
    ShieldCheck: ShieldCheck,
    Droplet: Droplet,
    Thermometer: Thermometer
  };

  return (
    <section className="py-10 sm:py-14 bg-[#FAF7F2] border-y border-[#DCCDBB]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-semibold text-[#B94A25] uppercase tracking-wider block mb-1">
              Preventive &amp; Public Health
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211C17]">
              Health information for your community
            </h2>
            <p className="text-xs sm:text-sm text-[#756B60] mt-1 font-sans">
              Practical guidance on maternal wellness, immunization, clean water, and seasonal care in rural Maharashtra.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Visual (5 Cols on LG) featuring community-care.png */}
          <div className="lg:col-span-5 relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[420px] bg-[#FAF7F2] border border-[#DCCDBB] rounded-3xl p-6 sm:p-8 shadow-lg overflow-hidden flex flex-col items-center">
              <div className="relative w-full h-[220px] sm:h-[260px] flex items-center justify-center">
                <img
                  src="/assets/swasthya-setu-assets/community-care.png"
                  alt="Community Healthcare and Education"
                  className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                  onError={(e) => {
                    e.target.src = '/assets/plant.png';
                  }}
                />
              </div>

              <div className="mt-3 bg-[#FAF7F2] border border-[#DCCDBB] rounded-xl px-3.5 py-1.5 flex items-center justify-between w-full text-xs text-[#756B60]">
                <span>Village Health Sanitation &amp; Nutrition</span>
                <span className="text-[#405642] font-semibold">Community Verified</span>
              </div>
            </div>
          </div>

          {/* Right Topic Cards List (7 Cols on LG) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 order-1 lg:order-2">
            {COMMUNITY_HEALTH_TOPICS.map((topic) => {
              const Icon = iconMap[topic.icon] || BookOpen;

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#DCCDBB] hover:border-[#B94A25] shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#EFE5D5] text-[#756B60]">
                        {topic.category}
                      </span>
                      <span className="text-[10.5px] text-[#9E9488]">
                        {topic.readTime}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-serif font-bold text-[#211C17] group-hover:text-[#B94A25] transition-colors leading-snug">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-[#756B60] mt-1.5 leading-relaxed font-sans">
                      {topic.summary}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#EAE0D2] flex items-center justify-between text-xs font-semibold text-[#B94A25]">
                    <span>Read Guidance</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#DCCDBB] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 bg-[#EFE5D5] border-b border-[#DCCDBB] flex items-center justify-between">
              <div>
                <span className="text-[10.5px] font-bold text-[#B94A25] uppercase tracking-wider block">
                  {selectedTopic.category}
                </span>
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#211C17]">
                  {selectedTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="p-1 rounded-lg text-[#756B60] hover:text-[#211C17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs sm:text-sm leading-relaxed text-[#3D352C]">
              <p className="font-semibold text-[#211C17]">
                {selectedTopic.summary}
              </p>
              <div className="p-3 bg-[#FAF7F2] border border-[#E3D7C7] rounded-xl space-y-1.5 text-xs text-[#5A5145]">
                <strong className="text-[#211C17] block">Key Community Recommendations:</strong>
                <p>• Visit your nearest Primary Health Centre or Sub-Centre for free routine checkups.</p>
                <p>• Contact your village ASHA worker for doorstep iron supplements, ORS packets, and immunization scheduling.</p>
                <p>• In case of emergency or severe dehydration/fever, contact 108 or 104 immediately.</p>
              </div>
            </div>

            <div className="p-3 bg-[#EFE5D5] border-t border-[#DCCDBB] flex justify-end">
              <button
                onClick={() => setSelectedTopic(null)}
                className="px-4 py-1.5 bg-[#FAF7F2] border border-[#DCCDBB] rounded-lg text-xs font-semibold text-[#211C17]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
