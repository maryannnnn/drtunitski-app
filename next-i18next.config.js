module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'he'],
    localeDetection: true, // ← ВКЛЮЧАЕМ автоопределение
  },
  fallbackLng: {
    default: ['en'],
    he: ['en'],
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

  // ✅ ДОБАВЬТЕ эти настройки для умного определения языка
  detection: {
    order: ['cookie', 'localStorage', 'path', 'navigator', 'htmlTag'],
    caches: ['cookie', 'localStorage'],
    lookupCookie: 'NEXT_LOCALE',
    lookupLocalStorage: 'i18n-locale',
    // Автоопределение работает только если нет сохраненного выбора
    excludeCacheFor: ['navigator'],
  },

  // Server-side rendering
  serverLanguageDetection: false,
  // Disable strict mode for build
  strictMode: false,
};