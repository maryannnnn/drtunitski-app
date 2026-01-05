// components/GoogleTags.jsx
// ✅ ОПТИМИЗИРОВАНО: загрузка скриптов после взаимодействия пользователя
import { useEffect, useState, useCallback } from 'react';
import Script from 'next/script';
import { CookieConsentManager } from '../shared/utils/cookie-consent-manager';

const GoogleTags = () => {
    const [consent, setConsent] = useState(null);
    const [consentInitialized, setConsentInitialized] = useState(false);
    const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

    // ✅ ОТЛОЖЕННАЯ ЗАГРУЗКА: загружаем скрипты после взаимодействия или через 3 сек
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const interactionEvents = ['scroll', 'click', 'touchstart', 'keydown', 'mousemove'];
        
        const handleInteraction = () => {
            setShouldLoadScripts(true);
            // Удаляем все слушатели после первого взаимодействия
            interactionEvents.forEach(event => {
                window.removeEventListener(event, handleInteraction);
            });
        };

        // Добавляем слушатели на взаимодействие (passive для производительности)
        interactionEvents.forEach(event => {
            window.addEventListener(event, handleInteraction, { once: true, passive: true });
        });

        // Fallback: загрузить через 3 секунды если нет взаимодействия
        const timer = setTimeout(() => {
            setShouldLoadScripts(true);
            interactionEvents.forEach(event => {
                window.removeEventListener(event, handleInteraction);
            });
        }, 3000);

        return () => {
            clearTimeout(timer);
            interactionEvents.forEach(event => {
                window.removeEventListener(event, handleInteraction);
            });
        };
    }, []);

    useEffect(() => {
        // Инициализировать Google Consent Mode v2 ДО загрузки тегов
        if (typeof window !== 'undefined' && !consentInitialized) {
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            
            // ⚠️ КРИТИЧЕСКИ ВАЖНО: установить default ПЕРЕД загрузкой тегов
            gtag('consent', 'default', {
                'ad_storage': 'denied',           // Google Ads cookies
                'ad_user_data': 'denied',         // Данные пользователя для рекламы
                'ad_personalization': 'denied',   // Персонализация рекламы
                'analytics_storage': 'denied',    // Analytics cookies
                'wait_for_update': 500            // Подождать 500мс обновления
            });

            setConsentInitialized(true);
            console.log('🔒 Google Consent Mode v2 initialized (default: denied)');
        }

        // Загрузить сохраненное согласие
        CookieConsentManager.getConsent().then(savedConsent => {
            if (savedConsent) {
                updateConsent(savedConsent);
            }
        });

        // Слушать изменения согласия
        const handleConsentChange = (e) => {
            updateConsent(e.detail);
        };
        window.addEventListener('cookieConsentChanged', handleConsentChange);
        return () => window.removeEventListener('cookieConsentChanged', handleConsentChange);
    }, [consentInitialized]);

    const updateConsent = (consentData) => {
        setConsent(consentData);
        
        if (typeof window !== 'undefined' && window.gtag) {
            // Обновить consent mode
            window.gtag('consent', 'update', {
                'ad_storage': consentData.marketing ? 'granted' : 'denied',
                'ad_user_data': consentData.marketing ? 'granted' : 'denied',
                'ad_personalization': consentData.marketing ? 'granted' : 'denied',
                'analytics_storage': consentData.analytics ? 'granted' : 'denied'
            });
            
            console.log('✅ Google Consent updated:', {
                marketing: consentData.marketing ? 'granted' : 'denied',
                analytics: consentData.analytics ? 'granted' : 'denied'
            });
        }
    };

    // ✅ Не загружаем скрипты пока пользователь не взаимодействовал со страницей
    if (!shouldLoadScripts) {
        return null;
    }

    return (
        <>
            {/* Google Tag Manager - загружается после взаимодействия */}
            <Script
                id="google-tag-manager"
                strategy="lazyOnload"
                src="https://www.googletagmanager.com/gtag/js?id=G-V6ZF4RL4ST"
            />
            <Script
                id="google-tags-config"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        // Google Analytics - с Consent Mode
                        gtag('config', 'G-V6ZF4RL4ST', {
                            'anonymize_ip': true,
                            'allow_google_signals': false,
                            'allow_ad_personalization_signals': false
                        });
                        
                        // Google Ads - с Consent Mode
                        gtag('config', 'AW-17706912095', {
                            'allow_ad_personalization_signals': false
                        });
                        
                        // Google Ads конверсия - Просмотр страницы
                        gtag('event', 'conversion', {
                            'send_to': 'AW-17706912095/SX8nCIWOzbobEN-SqPtB'
                        });
                        
                        console.log('📊 Google Tags loaded with Consent Mode v2');
                    `,
                }}
            />

            {/* Yandex.Metrika - загружается после взаимодействия */}
            <Script
                id="yandex-metrika"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(m,e,t,r,i,k,a){
                            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();
                            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js','ym');

                        ym(105509619, 'init', {
                            ssr:true, 
                            webvisor:true, 
                            clickmap:true, 
                            ecommerce:"dataLayer", 
                            accurateTrackBounce:true, 
                            trackLinks:true
                        });
                    `,
                }}
            />

            {/* Noscript для Яндекс.Метрики */}
            <noscript>
                <div>
                    <img
                        src="https://mc.yandex.ru/watch/105509619"
                        style={{position:'absolute', left:'-9999px'}}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
};

export default GoogleTags;