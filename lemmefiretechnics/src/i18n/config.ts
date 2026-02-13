import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';
import nl from './locales/nl.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      nl: { translation: nl },
    },
    // 1. Explicitly define allowed languages
    supportedLngs: ['fr', 'nl'], 
    
    // 2. Simplify locale codes (e.g. 'fr-BE' becomes 'fr', 'en-US' becomes 'en')
    load: 'languageOnly',

    // 3. If the detected language (e.g. 'en') is NOT in supportedLngs, use this:
    fallbackLng: 'fr', 

    interpolation: {
      escapeValue: false,
    },
    
    // Optional: Configure detection to verify support before caching
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;