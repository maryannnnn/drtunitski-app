import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Безопасный хук для работы с переводами на Vercel
 * 
 * Решает проблему race condition между серверной и клиентской гидратацией
 * Предотвращает показ ключей переводов или английских fallback значений
 * 
 * @param {string} namespace - пространство имен для переводов (по умолчанию 'common')
 * @returns {object} - объект с безопасной функцией t, состоянием загрузки и i18n
 */
export const useSafeTranslation = (namespace = 'common') => {
    const { t, i18n, ready } = useTranslation(namespace);
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Проверяем монтирование компонента
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Ждем, пока все условия будут выполнены:
        // 1. i18n готов (ready === true)
        // 2. роутер готов (router.locale существует)
        // 3. язык i18n соответствует языку роутера
        // 4. компонент смонтирован
        if (mounted && ready && router.locale && i18n.language === router.locale) {
            setIsReady(true);
        }
    }, [mounted, ready, router.locale, i18n.language]);

    /**
     * Безопасная функция перевода
     * Возвращает пустую строку или дефолтное значение, пока переводы не готовы
     * 
     * @param {string} key - ключ перевода
     * @param {object} options - опции для t() функции
     * @returns {string} - переведенная строка или fallback
     */
    const safeTrans = (key, options = {}) => {
        // Если переводы не готовы, возвращаем пустую строку или дефолт
        if (!isReady) {
            return options.defaultValue || '';
        }
        
        // Переводы готовы - возвращаем перевод
        return t(key, options);
    };

    return {
        t: safeTrans,
        i18n,
        ready: isReady,
        isLoading: !isReady,
        currentLanguage: router.locale || 'en'
    };
};

export default useSafeTranslation;

