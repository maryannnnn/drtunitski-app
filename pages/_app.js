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
        console.warn('reCAPTCHA sitekey is missing');
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

// ← НОВЫЙ КОМПОНЕНТ ДЛЯ ПРИНУДИТЕЛЬНОЙ ЗАГРУЗКИ ПЕРЕВОДОВ
function TranslationInitializer({ children }) {
    const [translationsReady, setTranslationsReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const initializeTranslations = async () => {
            // Ждем немного чтобы i18n instance был доступен
            await new Promise(resolve => setTimeout(resolve, 100));

            if (typeof window !== 'undefined' && window.i18n) {
                const i18n = window.i18n;

                console.log('🌐 Initializing translations for locale:', router.locale);

                // ПРИНУДИТЕЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ПЕРЕВОДОВ
                try {
                    // Способ 1: Если есть метод initInstance
                    if (i18n.initInstance) {
                        await i18n.initInstance();
                    }
                    // Способ 2: Если есть метод loadResources
                    else if (i18n.loadResources) {
                        await i18n.loadResources();
                    }
                    // Способ 3: Принудительно загружаем namespace
                    else {
                        await i18n.loadNamespaces('common');
                    }

                    console.log('✅ Translations initialized successfully');
                } catch (error) {
                    console.warn('⚠️ Translation initialization failed:', error);
                }
            }

            // Разрешаем рендеринг (даже если переводы не загрузились)
            setTranslationsReady(true);
        };

        initializeTranslations();

        // Fallback: через 2 секунды все равно рендерим
        const fallbackTimer = setTimeout(() => {
            console.log('⏰ Translation loading timeout - rendering anyway');
            setTranslationsReady(true);
        }, 2000);

        return () => clearTimeout(fallbackTimer);
    }, [router.locale]);

    // ← ОТЛАДОЧНАЯ ИНФОРМАЦИЯ
    useEffect(() => {
        if (translationsReady && typeof window !== 'undefined' && window.i18n) {
            console.log('🔍 Translation status:', {
                locale: window.i18n.language,
                initialized: window.i18n.isInitialized,
                hasCommon: !!window.i18n.getResourceBundle?.(router.locale, 'common')
            });
        }
    }, [translationsReady, router.locale]);

    // Пока переводы не инициализированы - показываем минимальный лоадер
    if (!translationsReady) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '20px'
                }}></div>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <p style={{ color: '#666', fontSize: '16px' }}>Loading translations...</p>
            </div>
        );
    }

    return children;
}

function MyApp({Component, pageProps}) {
    const router = useRouter();

    // ← СОХРАНЕНИЕ ЯЗЫКА И БЛОКИРОВКА ПЕРЕВОДЧИКА
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

    // ← ОПТИМИЗАЦИЯ: ПЕРЕЗАГРУЗКА ПЕРЕВОДОВ ПРИ СМЕНЕ ЯЗЫКА
    useEffect(() => {
        if (router.locale && typeof window !== 'undefined' && window.i18n) {
            const reloadTranslations = async () => {
                try {
                    await window.i18n.reloadResources([router.locale], ['common']);
                } catch (error) {
                    console.log('Translation reload failed:', error);
                }
            };
            reloadTranslations();
        }
    }, [router.locale]);

    return (
        <SafeReCaptchaProvider locale={router.locale}>
            <ErrorBoundary>
                <ApolloProvider client={client}>
                    <ThemeProvider theme={theme}>
                        {/* ← ОБЕРТКА ДЛЯ ПРИНУДИТЕЛЬНОЙ ЗАГРУЗКИ ПЕРЕВОДОВ */}
                        <TranslationInitializer>
                            <Component {...pageProps} />
                        </TranslationInitializer>
                    </ThemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </SafeReCaptchaProvider>
    );
}

export default appWithTranslation(MyApp);