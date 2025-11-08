// next-i18next.config.js
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'he'],
    localeDetection: true,
  },

  // ✅ ПРАВИЛЬНЫЕ настройки для next-i18next
  reloadOnPrerender: process.env.NODE_ENV === 'development',

  // Указываем абсолютный путь к папке с локалями
  localePath: path.resolve('./public/locales'),

  // Namespaces
  ns: ['common', 'privacyPolicy', 'accessibilityStatement', 'sitemap'],
  defaultNS: 'common',

  // ✅ ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ для сохранения языка
  saveMissing: false,
  strictMode: true,

  // ✅ ИНТЕРПОЛЯЦИЯ (важно для работы)
  interpolation: {
    escapeValue: false,
  },

  // ✅ НАСТРОЙКИ ДЕТЕКЦИИ ЯЗЫКА через кастомный backend
  detection: {
    order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['cookie', 'localStorage'],
    lookupCookie: 'next-i18next',
    lookupLocalStorage: 'i18nextLng',

    // Всегда проверять cookie/localStorage первыми
    checkWhitelist: true
  },

  // ✅ Fallback языки
  fallbackLng: {
    default: ['en'],
    'he-IL': ['he', 'en'],
    'ru-RU': ['ru', 'en']
  },

  // ✅ RTL поддержка
  react: {
    useSuspense: false,
  }
}



// module.exports = {
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en', 'ru', 'he'],
//     localeDetection: true, // ← ВКЛЮЧАЕМ автоопределение
//   },
//   fallbackLng: {
//     default: ['en'],
//     he: ['en'],
//   },
//   // RTL languages (только иврит активен)
//   rtl: ['he'],
//   // Namespaces
//   ns: ['common', 'privacyPolicy', 'accessibilityStatement', 'sitemap'],
//   defaultNS: 'common',
//   // Interpolation
//   interpolation: {
//     escapeValue: false,
//   },
//   // React
//   react: {
//     useSuspense: false,
//   },
//
//   // ✅ ДОБАВЬТЕ эти настройки для умного определения языка
//   detection: {
//     order: ['cookie', 'localStorage', 'path', 'navigator', 'htmlTag'],
//     caches: ['cookie', 'localStorage'],
//     lookupCookie: 'NEXT_LOCALE',
//     lookupLocalStorage: 'i18n-locale',
//     // Автоопределение работает только если нет сохраненного выбора
//     excludeCacheFor: ['navigator'],
//   },
//
//   // Server-side rendering
//   serverLanguageDetection: false,
//   // Disable strict mode for build
//   strictMode: false,
// };