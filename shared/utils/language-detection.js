/**
 * Detect user's preferred language from browser settings
 * @returns {string} Language code
 */
export const detectUserLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en'; // Server-side fallback
  }

  // Get browser language preferences
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Supported languages in your app (только 3 активных языка)
  const supportedLanguages = ['en', 'ru', 'he'];
  
  // Find first supported language
  for (const lang of browserLanguages) {
    // Extract language code (e.g., 'en-US' -> 'en')
    const langCode = lang.split('-')[0].toLowerCase();
    
    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }
  }
  
  // Fallback to English if no supported language found
  return 'en';
};

/**
 * Get language name by code
 * @param {string} code - Language code
 * @returns {string} Language name
 */
export const getLanguageName = (code) => {
  const languages = {
    en: 'English',
    ru: 'Русский',
    de: 'Deutsch',
    fr: 'Français',
    es: 'Español',
    he: 'עברית',
    ar: 'العربية'
  };
  
  return languages[code] || 'English';
};

/**
 * Check if language is RTL
 * @param {string} code - Language code
 * @returns {boolean} Is RTL language
 */
export const isRTLLanguage = (code) => {
  return ['he', 'ar'].includes(code);
};

/**
 * Get user's language preference from localStorage or detect from browser
 * @returns {string} Language code
 */
export const getUserLanguagePreference = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  // Check if user has previously set a language preference
  const savedLanguage = localStorage.getItem('user-language');
  if (savedLanguage) {
    return savedLanguage;
  }

  // Auto-detect from browser
  return detectUserLanguage();
};

/**
 * Save user's language preference
 * @param {string} languageCode - Language code to save
 */
export const saveUserLanguagePreference = (languageCode) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user-language', languageCode);
  }
};
