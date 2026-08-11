import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// En
import authEn from "../i18n/locales/en/auth.json";
import commonEn from "../i18n/locales/en/common.json";
import profileEn from "../i18n/locales/en/profile.json";
import add_postEn from "../i18n/locales/en/add_post.json";
import add_todoEn from "../i18n/locales/en/add_todo.json";
// Ar
import authAr from "../i18n/locales/ar/auth.json";
import commonAr from "../i18n/locales/ar/common.json";
import profileAr from "../i18n/locales/ar/profile.json";
import add_postAr from "../i18n/locales/ar/add_post.json";
import add_todoAr from "../i18n/locales/ar/add_todo.json";
// Es
import authEs from "../i18n/locales/es/auth.json";
import commonEs from "../i18n/locales/es/common.json";
import profileEs from "../i18n/locales/es/profile.json";
import add_postEs from "../i18n/locales/es/add_post.json";
import add_todoEs from "../i18n/locales/es/add_todo.json";

const isDev = import.meta.env.DEV;
const resources = {
  en: {
    auth: authEn,
    common: commonEn,
    profile: profileEn,
    add_post: add_postEn,
    add_todo: add_todoEn,
  },
  ar: {
    auth: authAr,
    common: commonAr,
    profile: profileAr,
    add_post: add_postAr,
    add_todo: add_todoAr,
  },
  es: {
    auth: authEs,
    common: commonEs,
    profile: profileEs,
    add_post: add_postEs,
    add_todo: add_todoEs,
  },
};
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    ns: ["auth", "common", "profile", "add_post", "add_todo"],
    defaultNS: "common",
    debug: isDev,
    fallbackLng: "en",
    saveMissing: isDev,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
