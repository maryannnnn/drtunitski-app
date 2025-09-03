import {ApolloProvider} from '@apollo/client';
import client from '../app/graphql/apollo-client'; // Путь к вашему клиенту Apollo
import '../app/scss/app.scss'; // Подключите здесь ваши глобальные стили
import {ThemeProvider} from '@mui/material/styles';
import theme from '../material.config'; // Импортируйте ваш theme

function MyApp({Component, pageProps}) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;