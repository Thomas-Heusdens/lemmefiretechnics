import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';
import nl from './locales/nl.json';

i18n
  .use(LanguageDetector) // Auto-detects language (browser settings or localStorage)
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      fr: { translation: fr },
      nl: { translation: nl },
    },
    fallbackLng: 'fr', // Default if language not found
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;