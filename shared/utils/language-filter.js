/**
 * Filter GraphQL data by language
 * @param {Array} edges - GraphQL edges array
 * @param {string} targetLanguage - Target language code (e.g., 'en', 'ru', 'he')
 * @returns {Array} Filtered edges
 */
export const filterByLanguage = (edges, targetLanguage = 'en') => {
    if (!edges || !Array.isArray(edges)) {
        return [];
    }

    return edges.filter(edge => {
        const node = edge?.node;
        if (!node) return false;

        // If no language field, assume it's the default language (English)
        if (!node.language) {
            return targetLanguage === 'en';
        }

        // Normalize target language to lowercase
        const targetLang = targetLanguage.toLowerCase();
        
        // Get all possible language identifiers from the node
        const nodeCode = node.language.code?.toLowerCase() || '';
        const nodeLocale = node.language.locale?.toLowerCase() || '';
        const nodeSlug = node.language.slug?.toLowerCase() || '';
        const nodeName = node.language.name?.toLowerCase() || '';
        
        // Extract just the language code from locale (e.g., 'ru_RU' -> 'ru')
        const localePrefix = nodeLocale.split('_')[0];
        
        // Check various matching conditions
        return nodeCode === targetLang || 
               nodeLocale === targetLang ||
               nodeSlug === targetLang ||
               localePrefix === targetLang ||
               nodeCode?.startsWith(targetLang) ||
               nodeLocale?.startsWith(targetLang) ||
               nodeName?.includes(targetLang);
    });
};

/**
 * Get all available languages from GraphQL data
 * @param {Array} edges - GraphQL edges array
 * @returns {Array} Array of unique language objects
 */
export const getAvailableLanguages = (edges) => {
    if (!edges || !Array.isArray(edges)) {
        return [];
    }

    const languages = new Map();
    
    edges.forEach(edge => {
        const node = edge?.node;
        if (node?.language) {
            const lang = node.language;
            languages.set(lang.code, {
                code: lang.code,
                locale: lang.locale,
                name: lang.name,
                slug: lang.slug,
                homeUrl: lang.homeUrl
            });
        }
    });

    return Array.from(languages.values());
};

/**
 * Get content for specific language or fallback to default
 * @param {Array} edges - GraphQL edges array
 * @param {string} targetLanguage - Target language code
 * @param {string} fallbackLanguage - Fallback language code (default: 'en')
 * @returns {Array} Filtered edges with fallback
 */
export const getContentByLanguage = (edges, targetLanguage, fallbackLanguage = 'en') => {
    let filtered = filterByLanguage(edges, targetLanguage);
    
    // If no content found for target language, try fallback
    if (filtered.length === 0 && targetLanguage !== fallbackLanguage) {
        filtered = filterByLanguage(edges, fallbackLanguage);
    }
    
    return filtered;
};





























