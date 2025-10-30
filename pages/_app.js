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

function MyApp({Component, pageProps}) {
    const router = useRouter();

    // ← КОНТРОЛЬ ПЕРВОГО ПОСЕЩЕНИЯ И СОХРАНЕНИЕ ЯЗЫКА
    useEffect(() => {
        // Проверяем, делал ли пользователь явный выбор языка
        const userMadeChoice = localStorage.getItem('user-language-choice');

        if (!userMadeChoice && router.locale) {
            // Первое посещение - сохраняем автоопределенный язык
            localStorage.setItem('user-language-choice', 'true');
            localStorage.setItem('i18n-locale', router.locale);
        }

        // Блокировка браузерного переводчика (но не автоопределения)
        document.documentElement.setAttribute('translate', 'no');
        document.documentElement.lang = router.locale || 'en';

        const meta = document.createElement('meta');
        meta.name = 'google';
        meta.content = 'notranslate';
        document.head.appendChild(meta);
    }, [router.locale]);

    // ← ПЕРЕЗАГРУЗКА ПЕРЕВОДОВ ЕСЛИ НЕ ЗАГРУЗИЛИСЬ
    useEffect(() => {
        const ensureTranslations = () => {
            if (window.i18n && (!window.i18n.isInitialized || Object.keys(window.i18n.store.data).length === 0)) {
                console.log('Reloading translations...');
                window.i18n.reloadResources();
            }
        };

        setTimeout(ensureTranslations, 1000);
        setTimeout(ensureTranslations, 3000);
    }, []);

    // ← СОХРАНЕНИЕ ЯЗЫКА ПРИ ПЕРЕХОДЕ МЕЖДУ СТРАНИЦАМИ
    useEffect(() => {
        const handleRouteChange = () => {
            if (router.locale) {
                localStorage.setItem('i18n-locale', router.locale);
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

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