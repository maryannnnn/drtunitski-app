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

function SafeReCaptchaProvider({ children, locale }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
        return children;
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={siteKey}
            language={locale}
            useRecaptchaNet={false}
            scriptProps={{
                async: true,
                defer: true,
                appendTo: 'head',
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}

function MyApp({Component, pageProps}) {
    const router = useRouter();
    const [isTranslationsReady, setIsTranslationsReady] = useState(false); // ← НАЧИНАЕМ С FALSE!
    const [hasCheckedInitialLoad, setHasCheckedInitialLoad] = useState(false);

    // ← ФИКС 1: ПРИНУДИТЕЛЬНАЯ ПРОВЕРКА ДЛЯ ПРЯМЫХ ССЫЛОК
    useEffect(() => {
        const checkAndLoadTranslations = async () => {
            console.log('Checking translations for direct link...');

            // Функция проверки готовности переводов
            const areTranslationsReady = () => {
                if (window.i18n && window.i18n.isInitialized) {
                    const hasTranslations = Object.keys(window.i18n.store.data).length > 0;
                    const currentLang = window.i18n.language || router.locale;
                    const hasCurrentLang = window.i18n.store.data[currentLang] !== undefined;

                    console.log('Translation check:', {
                        hasTranslations,
                        currentLang,
                        hasCurrentLang,
                        storeData: window.i18n.store.data
                    });

                    return hasTranslations && hasCurrentLang;
                }
                return false;
            };

            // Проверяем сразу
            if (areTranslationsReady()) {
                console.log('Translations are ready immediately');
                setIsTranslationsReady(true);
                setHasCheckedInitialLoad(true);
                return;
            }

            // Если не готово, ждем инициализации i18n
            let attempts = 0;
            const maxAttempts = 50; // 5 секунд

            const waitForTranslations = () => {
                attempts++;

                if (areTranslationsReady()) {
                    console.log('Translations ready after', attempts, 'attempts');
                    setIsTranslationsReady(true);
                    setHasCheckedInitialLoad(true);
                    return;
                }

                if (attempts >= maxAttempts) {
                    console.log('Translation timeout - showing page anyway');
                    setIsTranslationsReady(true);
                    setHasCheckedInitialLoad(true);
                    return;
                }

                // Пытаемся принудительно загрузить переводы
                if (window.i18n && !window.i18n.isInitialized && attempts % 10 === 0) {
                    const lang = router.locale || 'en';
                    console.log('Force reloading translations for:', lang);
                    window.i18n.reloadResources([lang], ['common']).catch(console.error);
                }

                setTimeout(waitForTranslations, 100);
            };

            waitForTranslations();
        };

        // Запускаем проверку только на клиенте
        if (typeof window !== 'undefined') {
            checkAndLoadTranslations();
        } else {
            // На сервере - считаем что готово
            setIsTranslationsReady(true);
            setHasCheckedInitialLoad(true);
        }
    }, [router.locale]);

    // ← ФИКС 2: ПЕРЕЗАГРУЗКА ПРИ СМЕНЕ ЯЗЫКА
    useEffect(() => {
        if (router.locale && window.i18n && isTranslationsReady) {
            console.log('Language changed to:', router.locale);
            window.i18n.reloadResources([router.locale], ['common'])
                .then(() => {
                    console.log('Translations reloaded for new language');
                })
                .catch(console.error);
        }
    }, [router.locale, isTranslationsReady]);

    // ← ФИКС 3: СОХРАНЕНИЕ ЯЗЫКА
    useEffect(() => {
        const userMadeChoice = localStorage.getItem('user-language-choice');
        if (!userMadeChoice && router.locale) {
            localStorage.setItem('user-language-choice', 'true');
            localStorage.setItem('i18n-locale', router.locale);
        }

        document.documentElement.setAttribute('translate', 'no');
        document.documentElement.lang = router.locale || 'en';

        if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
            const meta = document.createElement('meta');
            meta.name = 'google';
            meta.content = 'notranslate';
            document.head.appendChild(meta);
        }
    }, [router.locale]);

    // ← ФИКС 4: ЗАГРУЗЧИК ТОЛЬКО ДО ПЕРВОЙ ПРОВЕРКИ
    if (!isTranslationsReady && !hasCheckedInitialLoad) {
        console.log('Showing loading screen...');
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
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                        Please wait while we load the content...
                    </p>
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

    // Если проверка завершена, но переводы не готовы - показываем страницу в любом случае
    if (!isTranslationsReady && hasCheckedInitialLoad) {
        console.log('Translations not ready but showing page anyway');
    }

    console.log('Rendering app, translations ready:', isTranslationsReady);

    return (
        <SafeReCaptchaProvider locale={router.locale}>
            <ErrorBoundary>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <Component {...pageProps} />
                    </ThemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </SafeReCaptchaProvider>
    );
}

export default appWithTranslation(MyApp);