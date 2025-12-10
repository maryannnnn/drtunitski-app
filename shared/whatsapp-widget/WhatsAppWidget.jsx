import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import { useSafeTranslation } from '../hooks/useSafeTranslation';
import './whatsapp-widget.scss';

const WhatsAppWidget = () => {
    const { t } = useSafeTranslation('common');
    const [showTooltip, setShowTooltip] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const PHONE_NUMBER = '972507377870';

    // Google Analytics tracking
    const trackWhatsAppClick = (source = 'widget_button') => {
        // Google Analytics 4
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'whatsapp_click', {
                event_category: 'engagement',
                event_label: source,
                phone_number: PHONE_NUMBER
            });
            
            // Google Ads конверсия WhatsApp Click
            window.gtag('event', 'conversion', {
                'send_to': 'AW-17706912095/oQ8aCJiD984bEN-SqPtB',
                'value': 10.0,
                'currency': 'ILS'
            });
        }

        // Отправка уведомления в Telegram бот
        if (typeof window !== 'undefined') {
            fetch('/api/notify-telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'whatsapp_opened',
                    source: source,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                })
            }).catch(err => console.error('Telegram notification error:', err));
        }
    };

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

    const handleClick = (source = 'widget_button') => {
        trackWhatsAppClick(source);
        const message = t('whatsappWidget.message');
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleTooltipClick = () => {
        handleClick('widget_tooltip');
    };

    const handleCloseTooltip = (e) => {
        e.stopPropagation();
        setShowTooltip(false);
    };

    if (!isVisible) return null;

    return (
        <div className="whatsapp-widget">
            {/* Тултип с текстом - кликабельный */}
            {showTooltip && (
                <div 
                    className="whatsapp-widget__tooltip"
                    onClick={handleTooltipClick}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && handleTooltipClick()}
                >
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
                onClick={() => handleClick('widget_button')}
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

