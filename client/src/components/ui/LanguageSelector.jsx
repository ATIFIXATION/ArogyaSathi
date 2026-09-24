import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../i18n/index.jsx';


export const LanguageSelector = ({ variant = 'default', className = '' }) => {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-1 sm:gap-1.5 p-1 bg-[#FAF7F2]/80 border border-[#DCCDBB] rounded-xl shadow-2xs ${className}`}>
      <Globe className="w-3.5 h-3.5 text-[#B94A25] shrink-0 ml-1" aria-hidden="true" />
      <span className="sr-only">Select Language</span>
      <div className="flex items-center gap-0.5 sm:gap-1" role="radiogroup" aria-label="Language selection">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Language: ${lang.label}`}
              onClick={() => setLanguage(lang.code)}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#B94A25] ${
                isSelected
                  ? 'bg-[#B94A25] text-white shadow-xs font-bold'
                  : 'text-[#5C5346] hover:bg-[#EFE5D5] hover:text-[#211C17]'
              }`}
            >
              {lang.shortLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};
