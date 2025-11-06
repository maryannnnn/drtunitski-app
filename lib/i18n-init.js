// lib/i18n-init.js
export function initI18n() {
    if (typeof window === 'undefined') return;

    // Функция для сохранения выбора языка
    const saveUserLanguage = (lng) => {
        try {
            localStorage.setItem('user-language', lng);
            localStorage.setItem('user-language-choice', 'true');

            // Также сохраняем в cookie для серверной стороны
            document.cookie = `NEXT_LOCALE=${lng}; path=/; max-age=31536000`; // 1 год
        } catch (e) {
            console.warn('Failed to save language preference:', e);
        }
    };

    // Функция для загрузки сохраненного языка
    const getSavedLanguage = () => {
        try {
            // 1. Проверяем localStorage
            const savedLang = localStorage.getItem('user-language');
            if (savedLang) return savedLang;

            // 2. Проверяем cookie
            const cookieMatch = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
            if (cookieMatch) return cookieMatch[1];

            return null;
        } catch (e) {
            return null;
        }
    };

    // Применяем сохраненный язык при загрузке
    if (window.i18n) {
        const savedLang = getSavedLanguage();
        if (savedLang && window.i18n.language !== savedLang) {
            window.i18n.changeLanguage(savedLang).then(() => {
                console.log('🔄 Restored user language:', savedLang);
            });
        }

        // Слушаем изменения языка и сохраняем
        window.i18n.on('languageChanged', (lng) => {
            saveUserLanguage(lng);
        });
    }
}