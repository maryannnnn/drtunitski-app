// shared/utils/seo-translations.js
// SSR-safe SEO translations - reads from public/locales/*/common.json
import path from 'path';
import fs from 'fs';

// Cache for loaded translations
const translationsCache = {};

/**
 * Load translations from JSON file
 * @param {string} locale - language code
 * @param {string} namespace - namespace (common, privacyPolicy, etc.)
 */
function loadTranslations(locale, namespace = 'common') {
  const cacheKey = `${locale}_${namespace}`;
  
  if (translationsCache[cacheKey]) {
    return translationsCache[cacheKey];
  }
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'locales', locale, `${namespace}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    translationsCache[cacheKey] = JSON.parse(fileContent);
    return translationsCache[cacheKey];
  } catch (error) {
    console.warn(`Failed to load translations for ${locale}/${namespace}:`, error.message);
    return null;
  }
}

/**
 * Get SEO data for a page based on locale
 * Reads from existing files public/locales/common.json
 * 
 * @param {string} pageKey - page key (e.g. 'mediaBlog', 'surgeryImportant'), or empty string for root level
 * @param {string} locale - current locale
 * @param {string} namespace - translations file namespace (default 'common')
 * @returns {{ title: string, description: string }}
 */
export function getSeoData(pageKey, locale, namespace = 'common') {
  const defaultSeo = {
    title: 'Dr. Serge Tunitski Clinic',
    description: 'Expert medical care in gynecology and surgery in Israel.'
  };
  
  const translations = loadTranslations(locale, namespace);
  
  if (!translations) {
    // Fallback to English
    const enTranslations = loadTranslations('en', namespace);
    if (!enTranslations) return defaultSeo;
    
    // If pageKey is empty - read from JSON root
    if (!pageKey) {
      return {
        title: enTranslations.seoTitle || enTranslations.title || defaultSeo.title,
        description: enTranslations.seoDescription || enTranslations.description || defaultSeo.description
      };
    }
    
    if (enTranslations[pageKey]) {
      return {
        title: enTranslations[pageKey].seoTitle || enTranslations[pageKey].title || defaultSeo.title,
        description: enTranslations[pageKey].seoDescription || enTranslations[pageKey].description || defaultSeo.description
      };
    }
    return defaultSeo;
  }
  
  // If pageKey is empty - read from JSON root (for privacyPolicy, accessibilityStatement)
  if (!pageKey) {
    return {
      title: translations.seoTitle || translations.title || defaultSeo.title,
      description: translations.seoDescription || translations.description || defaultSeo.description
    };
  }
  
  const pageData = translations[pageKey];
  if (!pageData) {
    return defaultSeo;
  }
  
  return {
    title: pageData.seoTitle || pageData.title || defaultSeo.title,
    description: pageData.seoDescription || pageData.description || defaultSeo.description
  };
}
