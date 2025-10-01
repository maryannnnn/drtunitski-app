module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'he', 'de', 'fr', 'es', 'ar'],
    localeDetection: true, // Включаем автоопределение языка
  },
  fallbackLng: {
    default: ['en'],
    he: ['en'],
    ar: ['en'],
  },
  // RTL languages
  rtl: ['he', 'ar'],
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
