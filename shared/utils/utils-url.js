/**
 * Утилиты для работы с URL и языковыми суффиксами
 */

// Поддерживаемые языки
export const SUPPORTED_LOCALES = ['en', 'ru', 'he', 'de', 'fr', 'es', 'ar'];

// Языки, которые не требуют суффикса (английский остается как есть)
export const DEFAULT_LOCALE = 'en';

/**
 * Добавляет языковой суффикс к URL для неанглийских языков
 * @param {string} path - исходный путь
 * @param {string} locale - язык
 * @returns {string} - путь с языковым суффиксом
 */
export const addLanguageSuffix = (path, locale) => {
    // Если это английский язык, возвращаем путь как есть
    if (locale === DEFAULT_LOCALE) {
        return path;
    }

    // Не добавляем суффикс к корневому пути
    if (path === '/') {
        return path;
    }

    // Не добавляем суффикс к статическим страницам (они используют языковые префиксы)
    // Проверяем через isStaticPath (определена ниже)
    const staticPaths = [
        '/',
        '/about',
        '/gynecology',
        '/gynecology/planned',
        '/surgery',
        '/media',
        '/media/blog',
        '/media/news',
        '/media/expert',
        '/media/video',
        '/media/faq',
        '/stories',
        '/story/main',
        '/about/contact',
        '/privacy-policy',
        '/accessibility-statement',
        '/sitemap'
    ];
    
    if (staticPaths.includes(path)) {
        return path;
    }

    // Если путь заканчивается на '/', убираем его
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const hasTrailingSlash = path.endsWith('/');
    
    // Если путь уже содержит языковой суффикс, возвращаем как есть
    if (hasLanguageSuffix(cleanPath)) {
        return path;
    }

    // Добавляем языковой суффикс только к slug страницам
    const result = `${cleanPath}-${locale}`;
    return hasTrailingSlash ? result + '/' : result;
};

/**
 * Удаляет языковой суффикс из URL
 * @param {string} path - путь с возможным языковым суффиксом
 * @returns {string} - путь без языкового суффикса
 */
export const removeLanguageSuffix = (path) => {
    // Если путь заканчивается на '/', убираем его
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const hasTrailingSlash = path.endsWith('/');
    
    // Проверяем, есть ли языковой суффикс
    for (const locale of SUPPORTED_LOCALES) {
        if (locale !== DEFAULT_LOCALE && cleanPath.endsWith(`-${locale}`)) {
            const result = cleanPath.slice(0, -(locale.length + 1)); // +1 для дефиса
            return hasTrailingSlash ? result + '/' : result;
        }
    }
    
    return path;
};

/**
 * Проверяет, содержит ли путь языковой суффикс
 * @param {string} path - путь для проверки
 * @returns {boolean} - true, если содержит языковой суффикс
 */
export const hasLanguageSuffix = (path) => {
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    
    for (const locale of SUPPORTED_LOCALES) {
        if (locale !== DEFAULT_LOCALE && cleanPath.endsWith(`-${locale}`)) {
            return true;
        }
    }
    
    return false;
};

/**
 * Извлекает язык из URL с суффиксом
 * @param {string} path - путь с возможным языковым суффиксом
 * @returns {string|null} - язык или null, если суффикс не найден
 */
export const extractLanguageFromPath = (path) => {
    const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
    
    for (const locale of SUPPORTED_LOCALES) {
        if (locale !== DEFAULT_LOCALE && cleanPath.endsWith(`-${locale}`)) {
            return locale;
        }
    }
    
    return null;
};

/**
 * Генерирует URL для конкретного языка
 * @param {string} basePath - базовый путь (например, '/about/dr-serge-tunitski')
 * @param {string} locale - язык
 * @returns {string} - URL с языковым суффиксом
 */
export const generateLocalizedUrl = (basePath, locale) => {
    return addLanguageSuffix(basePath, locale);
};

/**
 * Генерирует массив URL для всех языков
 * @param {string} basePath - базовый путь
 * @returns {Array} - массив объектов {locale, url}
 */
export const generateAllLocalizedUrls = (basePath) => {
    return SUPPORTED_LOCALES.map(locale => ({
        locale,
        url: generateLocalizedUrl(basePath, locale)
    }));
};

/**
 * Проверяет, является ли путь статическим (не требует языкового суффикса)
 * @param {string} path - путь для проверки
 * @returns {boolean} - true, если путь статический
 */
export const isStaticPath = (path) => {
    const staticPaths = [
        '/',
        '/about',
        '/gynecology',
        '/gynecology/planned',
        '/surgery',
        '/media',
        '/media/blog',
        '/media/news',
        '/media/expert',
        '/media/video',
        '/media/faq',
        '/stories',
        '/story/main',
        '/about/contact',
        '/privacy-policy',
        '/accessibility-statement',
        '/sitemap'
    ];
    
    return staticPaths.includes(path);
};

/**
 * Обрабатывает URL для меню - добавляет языковой суффикс
 * @param {string} path - исходный путь
 * @param {string} locale - язык
 * @returns {string} - обработанный путь
 */
export const processMenuUrl = (path, locale) => {
    // Если это статический путь, возвращаем как есть
    if (isStaticPath(path)) {
        return path;
    }
    
    // Для нестатических путей (slug страниц) добавляем языковой суффикс
    return addLanguageSuffix(path, locale);
};
