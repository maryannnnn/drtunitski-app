import {ApolloProvider} from '@apollo/client';
import client from '../app/graphql/apollo-client'; // Путь к вашему клиенту Apollo
import '../app/scss/app.scss'; // Подключите здесь ваши глобальные стили
import {ThemeProvider} from '@mui/material/styles';
import theme from '../material.config'; // Импортируйте ваш theme
import { appWithTranslation } from 'next-i18next';
import ErrorBoundary from '../components/ErrorBoundary';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useRouter } from 'next/router';

function MyApp({Component, pageProps}) {
    const router = useRouter();
    
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