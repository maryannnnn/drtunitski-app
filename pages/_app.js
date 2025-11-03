import {ApolloProvider} from '@apollo/client';
import client from '../app/graphql/apollo-client';
import '../app/scss/app.scss';
import {ThemeProvider} from '@mui/material/styles';
import theme from '../material.config';
import { appWithTranslation } from 'next-i18next';
import ErrorBoundary from '../components/ErrorBoundary';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function SafeReCaptchaProvider({ children, locale }) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    // Если siteKey не существует, показываем детей без reCAPTCHA
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

function MyApp({Component, pageProps}) {
    const router = useRouter();

    // ← СОХРАНЕНИЕ ЯЗЫКА И БЛОКИРОВКА ПЕРЕВОДЧИКА
    useEffect(() => {
        // Сохраняем выбор языка
        const userMadeChoice = localStorage.getItem('user-language-choice');
        if (!userMadeChoice && router.locale) {
            localStorage.setItem('user-language-choice', 'true');
            localStorage.setItem('i18n-locale', router.locale);
        }

        // Блокируем браузерный переводчик
        document.documentElement.setAttribute('translate', 'no');
        document.documentElement.lang = router.locale || 'en';

        // Добавляем meta тег если его нет
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
            // Плавно перезагружаем переводы для нового языка
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
                        <Component {...pageProps} />
                    </ThemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </SafeReCaptchaProvider>
    );
}

export default appWithTranslation(MyApp);