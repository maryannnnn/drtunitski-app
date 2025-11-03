// /components/DelayedContent.jsx
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export default function DelayedContent({ children, delay = 2000, fallback = null }) {
    const { ready } = useTranslation();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Показываем контент когда:
        // - Переводы готовы ИЛИ
        // - Прошла задержка (2 секунды по умолчанию)
        if (ready) {
            setShowContent(true);
        } else {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [ready, delay]);

    // Пока контент не готов - показываем fallback или скелетон
    if (!showContent) {
        return fallback || (
            <div style={{
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.6
            }}>
                <div>Загрузка контента...</div>
            </div>
        );
    }

    return children;
}