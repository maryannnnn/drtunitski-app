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

    // ← ДЛЯ ВСЕХ УСТРОЙСТВ
    useEffect(() => {
        // Перезагрузка переводов если они не загрузились
        const ensureTranslations = () => {
            if (window.i18n && (!window.i18n.isInitialized || Object.keys(window.i18n.store.data).length === 0)) {
                console.log('Reloading translations...');
                window.i18n.reloadResources();
            }
        };

        // Проверяем через 1 секунду
        setTimeout(ensureTranslations, 1000);

        // Дополнительная проверка через 3 секунды
        setTimeout(ensureTranslations, 3000);
    }, []);

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