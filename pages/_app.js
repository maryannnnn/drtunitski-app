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
                        <Component {...pageProps} />
                    </ThemeProvider>
                </ApolloProvider>
            </ErrorBoundary>
        </SafeReCaptchaProvider>
    );
}

export default appWithTranslation(MyApp);