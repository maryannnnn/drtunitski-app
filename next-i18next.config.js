module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'he'], // Активны только 3 языка
    // Временно отключены: 'de', 'fr', 'es', 'ar'
    localeDetection: false,
  },
  fallbackLng: {
    default: ['en'],
    he: ['en'],
    ar: ['en'],
  },
  // RTL languages (только иврит активен)
  rtl: ['he'],
  // Namespaces
  ns: ['common', 'privacyPolicy', 'accessibilityStatement', 'sitemap'],
  defaultNS: 'common',
  // Interpolation
  interpolation: {
    escapeValue: false,
  },
  // React
  react: {
    useSuspense: false,
  },
  // Server-side rendering
  serverLanguageDetection: false,
  // Disable strict mode for build
  strictMode: false,
};
