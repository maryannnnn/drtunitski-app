// RTL languages
const RTL_LANGUAGES = ['he', 'ar'];

/**
 * Check if language is RTL
 * @param {string} locale - Language code
 * @returns {boolean}
 */
export const isRTL = (locale) => {
    return RTL_LANGUAGES.includes(locale);
};

/**
 * Get direction based on locale
 * @param {string} locale - Language code
 * @returns {string} - 'rtl' or 'ltr'
 */
export const getDirection = (locale) => {
    return isRTL(locale) ? 'rtl' : 'ltr';
};

/**
 * Get text alignment based on locale
 * @param {string} locale - Language code
 * @returns {string} - 'right' or 'left'
 */
export const getTextAlign = (locale) => {
    return isRTL(locale) ? 'right' : 'left';
};

/**
 * Get flex direction based on locale
 * @param {string} locale - Language code
 * @returns {string} - 'row-reverse' or 'row'
 */
export const getFlexDirection = (locale) => {
    return isRTL(locale) ? 'row-reverse' : 'row';
};
