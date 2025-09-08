import {ApolloProvider} from '@apollo/client';
import client from '../app/graphql/apollo-client'; // Путь к вашему клиенту Apollo
import '../app/scss/app.scss'; // Подключите здесь ваши глобальные стили
import {ThemeProvider} from '@mui/material/styles';
import theme from '../material.config'; // Импортируйте ваш theme
import { appWithTranslation } from 'next-i18next';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({Component, pageProps}) {
    return (
        <ErrorBoundary>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </ApolloProvider>
        </ErrorBoundary>
    );
}

export default appWithTranslation(MyApp);