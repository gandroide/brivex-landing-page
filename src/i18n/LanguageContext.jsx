import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './en.json';
import es from './es.json';
import pt from './pt.json';

const dictionaries = { en, es, pt };
const SUPPORTED_LOCALES = ['en', 'es', 'pt'];
const STORAGE_KEY = 'brivex-locale';

function detectLocale() {
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;

  // Auto-detect from browser
  const browserLang = navigator.language?.toLowerCase() || 'en';
  const langCode = browserLang.split('-')[0];
  if (SUPPORTED_LOCALES.includes(langCode)) return langCode;

  return 'en'; // fallback
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(detectLocale);

  const setLocale = useCallback((newLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = useCallback((key) => {
    const value = getNestedValue(dictionaries[locale], key);
    if (value !== undefined) return value;
    // Fallback to English
    const fallback = getNestedValue(dictionaries.en, key);
    return fallback !== undefined ? fallback : key;
  }, [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, SUPPORTED_LOCALES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}
