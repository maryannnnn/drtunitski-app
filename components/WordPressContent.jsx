// components/WordPressContent.jsx
import { useEffect, useState } from 'react';
import { useForceTranslations } from '@/shared/hooks/useForceTranslations';

export default function WordPressContent({
                                             content,
                                             className = "",
                                             fallbackDelay = 1500
                                         }) {
    const translationsForced = useForceTranslations();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Показываем контент когда:
        // - Переводы принудительно загружены И
        // - Прошла минимальная задержка
        if (translationsForced) {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, fallbackDelay);

            return () => clearTimeout(timer);
        }
    }, [translationsForced, fallbackDelay]);

    if (!showContent) {
        return (
            <div
                className={className}
                style={{
                    minHeight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f5f5f5',
                    borderRadius: '4px'
                }}
            >
                <div style={{ color: '#666', fontSize: '14px' }}>Loading content...</div>
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