import React, { createContext, useContext, useState } from 'react';
import { en } from './en';
import { mr } from './mr';
import { hi } from './hi';
import { mrSimple } from './mr-simple';

export const LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'mr', label: 'मराठी', shortLabel: 'मराठी' },
  { code: 'hi', label: 'हिंदी', shortLabel: 'हिंदी' },
  { code: 'mr-simple', label: 'सोपी मराठी', shortLabel: 'सोपी मराठी' }
];

const translations = {
  en,
  mr,
  hi,
  'mr-simple': mrSimple
};

const STORAGE_KEY = 'arogyasathi-language';

function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
}

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) {
        return saved;
      }
    } catch (e) {
      console.warn('Unable to access localStorage for language preference:', e);
    }
    return 'en';
  });

  const setLanguage = (langCode) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
      try {
        localStorage.setItem(STORAGE_KEY, langCode);
      } catch (e) {
        console.warn('Unable to save language preference to localStorage:', e);
      }
    }
  };

  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.findIndex(l => l.code === language);
    const nextIndex = (currentIndex + 1) % LANGUAGES.length;
    setLanguage(LANGUAGES[nextIndex].code);
  };

  /**
   * Translate helper function
   * @param {string} path Key path (e.g. 'nav.home' or 'status.highPriority')
   * @param {string} fallback Default string if key is not found
   */
  const t = (path, fallback = '') => {
    const currentDict = translations[language] || translations.en;
    let val = getNestedValue(currentDict, path);
    if (val !== undefined && val !== null) {
      return val;
    }
    // Fallback to English if missing in current language
    val = getNestedValue(translations.en, path);
    if (val !== undefined && val !== null) {
      return val;
    }
    return fallback || path;
  };

  /**
   * Helper for translating system status and priority display strings
   * while preserving exact backend database values
   */
  const tStatus = (statusVal) => {
    if (!statusVal) return '';
    const norm = String(statusVal).toLowerCase().trim();
    if (norm === 'high priority' || norm === 'high') return t('status.highPriority', 'High Priority');
    if (norm === 'medium priority' || norm === 'medium') return t('status.mediumPriority', 'Medium Priority');
    if (norm === 'low priority' || norm === 'low') return t('status.lowPriority', 'Low Priority');
    if (norm === 'routine') return t('status.routine', 'Routine');
    if (norm === 'moderate') return t('status.moderate', 'Moderate');
    if (norm === 'pending') return t('status.pending', 'Pending');
    if (norm === 'verified') return t('status.verified', 'Verified');
    if (norm === 'reported') return t('status.reported', 'Reported');
    if (norm === 'dispatch in progress' || norm === 'dispatched') return t('status.dispatchInProgress', 'Dispatch In Progress');
    if (norm === 'resolved') return t('status.resolved', 'Resolved');
    return statusVal;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, tStatus, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
