import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import ar from "./locales/ar/translation.json";
import storeConfig from "./config/storeConfig";

const applyDirection = (lng) => {
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lng;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ar: { translation: ar },
  },
  lng: localStorage.getItem("language") || storeConfig.defaultLanguage,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

applyDirection(i18n.language);
i18n.on("languageChanged", applyDirection);

export default i18n;
