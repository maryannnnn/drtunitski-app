// components/WordPressContent.jsx
import { useEffect, useState } from 'react';
import { useSafeTranslation } from '@/shared/hooks/useSafeTranslation';

export default function WordPressContent({
                                             content,
                                             className = "",
                                             fallbackDelay = 2000,
                                             forceRefresh = true // ← Новая опция
                                         }) {
    const { t, ready, i18n } = useSafeTranslation();
    const [showContent, setShowContent] = useState(false);
    const [translationChecked, setTranslationChecked] = useState(false);

    useEffect(() => {
        const checkTranslations = async () => {
            // Если переводы готовы - сразу показываем
            if (ready) {
                setShowContent(true);
                return;
            }

            // Если переводы не готовы, проверяем есть ли проблема
            if (forceRefresh && !ready) {
                // Проверяем, не показываются ли ключи вместо текста
                const testKey = 'common:buttons.bookAppointment';
                const testTranslation = t(testKey);

                // Если перевод возвращает ключ (значит переводы не загружены)
                if (testTranslation === testKey) {
                    console.log('Translations missing, attempting to reload...');

                    // Пытаемся перезагрузить языковые файлы
                    try {
                        await i18n.reloadResources();
                    } catch (error) {
                        console.log('Failed to reload translations:', error);
                    }
                }
            }

            // Fallback: показываем контент через задержку
            const timer = setTimeout(() => {
                setShowContent(true);
            }, fallbackDelay);

            return () => clearTimeout(timer);
        };

        checkTranslations();
    }, [ready, forceRefresh, t, i18n, fallbackDelay]);

    if (!showContent) {
        return (
            <div
                className={className}
                style={{
                    minHeight: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.6
                }}
            >
                <div>Loading content...</div>
            </div>
        );
    }

    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content || '' }}
        />
    );
}