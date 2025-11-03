// hooks/useForceTranslations.js
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useForceTranslations = () => {
    const { i18n, ready } = useTranslation();
    const [translationsForced, setTranslationsForced] = useState(false);

    useEffect(() => {
        const forceLoadTranslations = async () => {
            // Если переводы уже готовы - отлично
            if (ready) {
                setTranslationsForced(true);
                return;
            }

            // Если переводы не готовы, принудительно загружаем
            try {
                console.log('🔄 Forcing translations load...');

                // Принудительно загружаем все необходимые namespace
                await i18n.loadNamespaces('common');

                // Ждем немного для инициализации
                await new Promise(resolve => setTimeout(resolve, 100));

                setTranslationsForced(true);
                console.log('✅ Translations forced loaded');
            } catch (error) {
                console.error('❌ Failed to force load translations:', error);
                // Все равно продолжаем, чтобы не блокировать интерфейс
                setTranslationsForced(true);
            }
        };

        // Запускаем принудительную загрузку
        forceLoadTranslations();

        // Fallback: через 3 секунды все равно разблокируем интерфейс
        const fallbackTimer = setTimeout(() => {
            console.log('⚠️ Using translation fallback');
            setTranslationsForced(true);
        }, 3000);

        return () => clearTimeout(fallbackTimer);
    }, [ready, i18n]);

    return translationsForced;
};