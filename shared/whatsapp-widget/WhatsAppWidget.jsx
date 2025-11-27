import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import './whatsapp-widget.scss';

const WhatsAppWidget = () => {
    const { t } = useSafeTranslation('common');
    const [showTooltip, setShowTooltip] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const PHONE_NUMBER = '972507377870';

    // Появление виджета с задержкой
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000); // 3 секунды задержка

        return () => clearTimeout(timer);
    }, []);

    // Появление тултипа периодически
    useEffect(() => {
        if (!isVisible) return;

        const showTooltipTimer = setTimeout(() => {
            setShowTooltip(true);
        }, 5000); // Показать тултип через 5 сек после появления виджета

        const hideTooltipTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 15000); // Скрыть через 15 сек

        // Повторять периодически
        const interval = setInterval(() => {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 10000);
        }, 60000); // Каждую минуту

        return () => {
            clearTimeout(showTooltipTimer);
            clearTimeout(hideTooltipTimer);
            clearInterval(interval);
        };
    }, [isVisible]);

    const handleClick = () => {
        const message = t('whatsappWidget.message');
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleCloseTooltip = (e) => {
        e.stopPropagation();
        setShowTooltip(false);
    };

    if (!isVisible) return null;

    return (
        <div className="whatsapp-widget">
            {/* Тултип с текстом */}
            {showTooltip && (
                <div className="whatsapp-widget__tooltip">
                    <button 
                        className="whatsapp-widget__tooltip-close"
                        onClick={handleCloseTooltip}
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                    <p>{t('whatsappWidget.tooltip')}</p>
                </div>
            )}

            {/* Кнопка WhatsApp */}
            <button
                className="whatsapp-widget__button"
                onClick={handleClick}
                aria-label="Open WhatsApp chat"
            >
                <FaWhatsapp className="whatsapp-widget__icon" />
                
                {/* Notification Badge */}
                <span className="whatsapp-widget__badge">1</span>
            </button>
        </div>
    );
};

export default WhatsAppWidget;

