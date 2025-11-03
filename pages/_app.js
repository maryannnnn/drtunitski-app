import {ApolloProvider} from '@apollo/client';
import client from '../app/graphql/apollo-client';
import '../app/scss/app.scss';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../material.config';
import { appWithTranslation } from 'next-i18next';
import ErrorBoundary from '../components/ErrorBoundary';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [isTranslationsReady, setIsTranslationsReady] = useState(true); // ← Начинаем с true!

    // ← ФИКС 1: Умная проверка готовности переводов
    useEffect(() => {
        const checkTranslationsReady = () => {
            if (window.i18n && window.i18n.isInitialized) {
                // Проверяем что переводы реально загружены
                const hasTranslations = Object.keys(window.i18n.store.data).length > 0;
                const currentLang = window.i18n.language;
                const hasCurrentLang = window.i18n.store.data[currentLang] !== undefined;

                return hasTranslations && hasCurrentLang;
            }
            return false;
        };

        // Первоначальная проверка
        if (checkTranslationsReady()) {
            setIsTranslationsReady(true);
        } else {
            // Если не готово, проверяем каждые 100ms
            const interval = setInterval(() => {
                if (checkTranslationsReady()) {
                    setIsTranslationsReady(true);
                    clearInterval(interval);
                }
            }, 100);

            // Максимум ждем 5 секунд
            setTimeout(() => {
                clearInterval(interval);
                setIsTranslationsReady(true); // Fallback
            }, 5000);
        }
    }, []);

    // ← ФИКС 2: Упрощенная навигация - БЕЗ загрузчика
    useEffect(() => {
        const handleRouteChangeStart = () => {
            // Не показываем загрузчик при навигации
            // setIsTranslationsReady(false); ← УБИРАЕМ!
        };

        const handleRouteChangeComplete = () => {
            // Просто проверяем что переводы на месте
            setTimeout(() => {
                if (window.i18n && !window.i18n.isInitialized) {
                    window.i18n.reloadResources();
                }
            }, 10);
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
        };
    }, [router]);

    // ← ФИКС 3: Сохранение языка (оставляем ваш код)
    useEffect(() => {
        const userMadeChoice = localStorage.getItem('user-language-choice');

        if (!userMadeChoice && router.locale) {
            localStorage.setItem('user-language-choice', 'true');
            localStorage.setItem('i18n-locale', router.locale);
        }

        document.documentElement.setAttribute('translate', 'no');
        document.documentElement.lang = router.locale || 'en';

        // Убираем дублирование meta тегов
        if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
            const meta = document.createElement('meta');
            meta.name = 'google';
            meta.content = 'notranslate';
            document.head.appendChild(meta);
        }
    }, [router.locale]);

    // ← ФИКС 4: Показываем загрузчик ТОЛЬКО при первой загрузке
    if (!isTranslationsReady && typeof window !== 'undefined') {
        // Дополнительная проверка - если i18n уже готов, скрываем загрузчик
        if (window.i18n && window.i18n.isInitialized && Object.keys(window.i18n.store.data).length > 0) {
            setIsTranslationsReady(true);
        } else {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: '#f5f5f5',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    <div style={{
                        textAlign: 'center',
                        padding: '20px'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '4px solid #f3f3f3',
                            borderTop: '4px solid #0070f3',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 20px'
                        }}></div>
                        <p>Loading translations...</p>
                    </div>

                    <style jsx>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            );
        }
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            language={router.locale}
            useRecaptchaNet={false}
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
            }}
        >
            <ErrorBoundary>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </GoogleReCaptchaProvider>
    );
}

export default appWithTranslation(MyApp);