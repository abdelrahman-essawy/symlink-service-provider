import i18n, { t } from 'i18next';
import { initReactI18next  } from 'react-i18next';
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
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

export const languages = [
  {
      code: 'en',
      name: 'English',
      dir: 'ltr',
      letter: 'En'
  },
  {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      letter: 'ع'
  }
]

i18n
  .use(initReactI18next)
  .use(HttpApi) 
  .use(LanguageDetector) 
  .init({
    supportedLngs: ['en', 'ar'],
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // react already safes arom xss
    },
    detection:{
      order:['path', 'locale', 'sessionStorage'],
      caches:['sessionStorage'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

export default i18n;

export type TranslatedWord = keyof typeof resources["ar"]["translation"];

export const dictionary = <T extends TranslatedWord>(word: T) => t(word);