import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Custom fetch with timeout - УЛУЧШЕННАЯ версия
const customFetch = (uri, options) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 15000); // ⚡ УМЕНЬШИТЬ до 15 секунд

    return fetch(uri, {
        ...options,
        signal: controller.signal,
    }).finally(() => {
        clearTimeout(timeout);
    });
};

// Create HTTP link
const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    fetch: customFetch,
    // УБРАТЬ дублирующий timeout
});

// УБРАТЬ console.log в проде
if (process.env.NODE_ENV === 'development') {
    console.log("GraphQL URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
}

// Create auth link - ОПТИМИЗИРОВАННАЯ версия
const authLink = setContext((_, { headers }) => {
    // Проверка на серверный рендеринг
    if (typeof window === 'undefined') {
        return {
            headers: {
                ...headers,
                'Accept-Language': 'en',
            }
        }
    }

    // Клиентская часть
    const language = localStorage.getItem('i18nextLng') || 'en';

    return {
        headers: {
            ...headers,
            'Accept-Language': language,
        }
    }
});

// Общий кеш конфиг для избежания дублирования
const cacheConfig = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                posts: {
                    merge(existing, incoming) {
                        return incoming;
                    }
                }
            }
        },
        // Fix для ACF полей
        Story_Acfstory: { keyFields: false, merge: true },
        Story_Acfstory_GroupInfoPost: { keyFields: false, merge: true },
        Media_Acfmedia: { keyFields: false, merge: true },
        Gynecology_AcfGynecology: { keyFields: false, merge: true }
    }
});

// Общие опции для клиентов
const defaultOptions = {
    watchQuery: { errorPolicy: 'all' },
    query: { errorPolicy: 'all' },
};

// Server-side Apollo Client
const createServerApolloClient = () => {
    return new ApolloClient({
        link: httpLink, // ⚡ УБРАТЬ лишний authLink для сервера
        cache: cacheConfig,
        defaultOptions,
        ssrMode: true
    });
};

// Client-side Apollo Client
const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cacheConfig,
    defaultOptions,
    assumeImmutableResults: true
});

export default apolloClient;
export { createServerApolloClient };