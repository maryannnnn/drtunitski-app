// components/MetaPixel.jsx
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { CookieConsentManager } from '../shared/utils/cookie-consent-manager';

// Meta Pixel IDs для разных языковых версий
const META_PIXEL_CONFIG = {
    // Английская бизнес-страница
    english: '4080137825537332',
    // Русская бизнес-страница
    russian: '847408494559512'
};

// Функция выбора пикселя по языку
// Возвращает null если для языка нет пикселя (реклама не запущена)
const getPixelIdByLocale = (locale) => {
    switch (locale) {
        case 'en':
        case 'he': // Иврит использует английский пиксель (для теста)
            return META_PIXEL_CONFIG.english;
        case 'ru':
            return META_PIXEL_CONFIG.russian;
        default:
            // Для остальных языков пиксель не загружается
            return null;
    }
};

const MetaPixel = () => {
    const [consent, setConsent] = useState(null);
    const [pixelInitialized, setPixelInitialized] = useState(false);
    const router = useRouter();
    const { locale } = router;
    
    // Выбираем нужный пиксель на основе текущего языка
    const pixelId = getPixelIdByLocale(locale);

    useEffect(() => {
        // Загрузить сохраненное согласие
        CookieConsentManager.getConsent().then(savedConsent => {
            if (savedConsent) {
                setConsent(savedConsent);
            }
        });

        // Слушать изменения согласия
        const handleConsentChange = (e) => {
            setConsent(e.detail);
            updateMetaConsent(e.detail);
        };
        window.addEventListener('cookieConsentChanged', handleConsentChange);
        return () => window.removeEventListener('cookieConsentChanged', handleConsentChange);
    }, []);

    // Отслеживание переходов между страницами (SPA navigation)
    useEffect(() => {
        const handleRouteChange = () => {
            if (typeof window !== 'undefined' && window.fbq && consent?.marketing) {
                window.fbq('track', 'PageView');
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, consent]);

    const updateMetaConsent = (consentData) => {
        if (typeof window !== 'undefined' && window.fbq) {
            if (consentData?.marketing) {
                // Включить полное отслеживание
                window.fbq('consent', 'grant');
                console.log('✅ Meta Pixel: consent granted');
            } else {
                // Ограниченное отслеживание (Limited Data Use)
                window.fbq('consent', 'revoke');
                console.log('🔒 Meta Pixel: consent revoked');
            }
        }
    };

    const handlePixelLoad = () => {
        setPixelInitialized(true);
        console.log(`📘 Meta Pixel loaded (${locale === 'ru' ? 'Russian' : 'English'} page)`);
        
        // Применить текущее согласие после загрузки
        if (consent) {
            updateMetaConsent(consent);
        }
    };

    // Не загружать пиксель если для языка нет настроенного ID
    if (!pixelId) {
        return null;
    }

    return (
        <>
            {/* Meta Pixel Base Code */}
            <Script
                id="meta-pixel-base"
                strategy="afterInteractive"
                onLoad={handlePixelLoad}
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        
                        // Инициализация с режимом ограниченного использования данных по умолчанию
                        // Data Processing Options для соответствия GDPR/CCPA
                        fbq('dataProcessingOptions', ['LDU'], 0, 0);
                        
                        // Инициализация пикселя (выбран по языку: ${locale})
                        fbq('init', '${pixelId}');
                        
                        // Отслеживание первого просмотра страницы
                        fbq('track', 'PageView');
                        
                        console.log('📘 Meta Pixel initialized (ID: ${pixelId}, Locale: ${locale})');
                    `,
                }}
            />

            {/* Noscript fallback для Meta Pixel */}
            <noscript>
                <img 
                    height="1" 
                    width="1" 
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
};

// Экспорт хелпер-функций для отслеживания событий конверсии
export const trackMetaEvent = (eventName, params = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
        console.log(`📘 Meta Event: ${eventName}`, params);
    }
};

// Стандартные события Meta Pixel
export const MetaEvents = {
    // Контакт
    Contact: () => trackMetaEvent('Contact'),
    
    // Лид (заполнение формы)
    Lead: (params = {}) => trackMetaEvent('Lead', params),
    
    // Запись на прием
    Schedule: (params = {}) => trackMetaEvent('Schedule', params),
    
    // Поиск
    Search: (searchString) => trackMetaEvent('Search', { search_string: searchString }),
    
    // Просмотр контента
    ViewContent: (params = {}) => trackMetaEvent('ViewContent', params),
    
    // Кастомное событие
    Custom: (eventName, params = {}) => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('trackCustom', eventName, params);
            console.log(`📘 Meta Custom Event: ${eventName}`, params);
        }
    }
};

export default MetaPixel;
