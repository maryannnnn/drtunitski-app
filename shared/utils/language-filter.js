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

        // Check if the node's language matches the target language
        return node.language.code === targetLanguage || 
               node.language.locale === targetLanguage ||
               node.language.slug === targetLanguage;
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



