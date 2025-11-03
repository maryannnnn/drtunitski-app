// components/WordPressContent.jsx
import { useEffect, useState } from 'react';
import { useSafeTranslation } from '@/shared/hooks/useSafeTranslation';

export default function WordPressContent({
                                             content,
                                             className = "",
                                             fallbackDelay = 1500
                                         }) {
    const { ready } = useSafeTranslation();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (ready) {
            setShowContent(true);
        } else {
            const timer = setTimeout(() => {
                setShowContent(true);
            }, fallbackDelay);
            return () => clearTimeout(timer);
        }
    }, [ready, fallbackDelay]);

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