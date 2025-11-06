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
    if (!siteKey) return children;

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={siteKey}
            language={locale}
            useRecaptchaNet={false}
            scriptProps={{ async: true, defer: true, appendTo: 'head' }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}

// ← УПРОЩЕННЫЙ КОМПОНЕНТ - только принудительная установка языка
function LanguageSync({ children }) {
    const router = useRouter();
    const [languageSynced, setLanguageSynced] = useState(false);

    useEffect(() => {
        const syncLanguage = () => {
            if (typeof window !== 'undefined' && window.i18n) {
                const i18n = window.i18n;
                const targetLanguage = router.locale || 'en';

                console.log('🌐 LanguageSync: Setting language to', targetLanguage);

                // КРИТИЧЕСКИ ВАЖНО: Принудительно устанавливаем язык
                if (i18n.language !== targetLanguage) {
                    i18n.changeLanguage(targetLanguage).then(() => {
                        console.log('✅ LanguageSync: Successfully changed to', targetLanguage);
                        setLanguageSynced(true);
                    }).catch(error => {
                        console.warn('⚠️ LanguageSync: Change failed', error);
                        setLanguageSynced(true); // Все равно продолжаем
                    });
                } else {
                    console.log('✅ LanguageSync: Language already correct', targetLanguage);
                    setLanguageSynced(true);
                }
            } else {
                // Если i18n не доступен - продолжаем без блокировки
                console.warn('⚠️ LanguageSync: i18n not available');
                setLanguageSynced(true);
            }
        };

        // Ждем немного чтобы i18n успел инициализироваться
        const timer = setTimeout(syncLanguage, 50);

        return () => clearTimeout(timer);
    }, [router.locale]);

    // Очень короткая блокировка - только для синхронизации языка
    if (!languageSynced) {
        return (
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div>Syncing language...</div>
            </div>
        );
    }

    return children;
}

function MyApp({Component, pageProps}) {
    const router = useRouter();

    // Блокировка переводчика
    useEffect(() => {
        document.documentElement.setAttribute('translate', 'no');
        document.documentElement.lang = router.locale || 'en';

        if (!document.querySelector('meta[name="google"][content="notranslate"]')) {
            const meta = document.createElement('meta');
            meta.name = 'google';
            meta.content = 'notranslate';
            document.head.appendChild(meta);
        }
    }, [router.locale]);

    useEffect(() => {
        // Сохраняем язык при изменении
        const handleRouteChange = (url) => {
            const locale = router.locale;
            if (locale && typeof window !== 'undefined') {
                try {
                    localStorage.setItem('user-language', locale);
                    localStorage.setItem('user-language-choice', 'true');
                } catch (e) {}
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => router.events.off('routeChangeComplete', handleRouteChange);
    }, [router]);

    return (
        <SafeReCaptchaProvider locale={router.locale}>
            <ErrorBoundary>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        {/* ← ТОЛЬКО СИНХРОНИЗАЦИЯ ЯЗЫКА */}
                        <LanguageSync>
                            <Component {...pageProps} />
                        </LanguageSync>
                    </ThemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </SafeReCaptchaProvider>
    );
}

export default appWithTranslation(MyApp);