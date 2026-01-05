import { useState, useEffect } from 'react';

/**
 * Хук для определения мобильного устройства
 * SSR-безопасный - возвращает false на сервере
 * @param {number} breakpoint - брейкпоинт в пикселях (по умолчанию 768)
 * @returns {boolean} - true если ширина экрана меньше breakpoint
 */
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Проверяем только на клиенте
        if (typeof window === 'undefined') return;

        const checkMobile = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        // Проверяем сразу
        checkMobile();

        // Слушаем изменения размера окна
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
};

export default useIsMobile;
