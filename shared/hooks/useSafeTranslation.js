import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * Упрощенный безопасный хук для переводов
 * Работает без лоадера, показывает fallback пока переводы не готовы
 */
export const useSafeTranslation = (namespace = 'common') => {
    const { t, i18n, ready } = useTranslation(namespace);
    const router = useRouter();
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        // Если переводы не загрузились за 1.5 секунды - показываем fallback
        const timer = setTimeout(() => {
            if (!ready) {
                setShowFallback(true);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [ready]);

    /**
     * Умная функция перевода
     * Показывает fallback вместо ключей пока переводы не готовы
     */
    const safeTrans = (key, options = {}) => {
        // Если переводы не готовы - показываем плейсхолдер или defaultValue
        if (!ready && showFallback) {
            return options.defaultValue || '...';
        }

        // Если переводы не готовы но fallback еще не включен - возвращаем ключ
        // (это временное состояние на 1.5 секунды)
        if (!ready) {
            return key;
        }

        const translation = t(key, options);

        // Если перевод не найден - используем fallback
        if (translation === key) {
            return options.defaultValue || key;
        }

        return translation;
    };

    return {
        t: safeTrans,
        i18n,
        ready: ready || showFallback, // Считаем готовым если включен fallback
        isLoading: !ready && !showFallback,
        currentLanguage: router.locale || 'en'
    };
};

export default useSafeTranslation;
