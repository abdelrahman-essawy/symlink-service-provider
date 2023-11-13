import i18n, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationAR from '../locales/ar/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: ['en', 'ar',],
    resources,
    lng: 'ar',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // react already safes arom xss
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

export default i18n;

export type TranslatedWord = keyof typeof resources["ar"]["translation"];

export const dictionary = <T extends TranslatedWord>(word: T) => t(word);