import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Custom fetch with extended timeout for Vercel
const customFetch = (uri, options) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
        controller.abort();
    }, 30000); // 30 секунд для медленного GraphQL сервера

    return fetch(uri, {
        ...options,
        signal: controller.signal,
        headers: {
            ...options.headers,
            'Connection': 'keep-alive',
        },
    }).finally(() => {
        clearTimeout(timeout);
    });
};

// Create HTTP link
const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    fetch: customFetch,
    fetchOptions: {
        timeout: 30000, // 30 секунд timeout для Vercel build
    },
});

console.log("GraphQL URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
console.log("Environment variables:", {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL
});

// Create auth link to add language header
const authLink = setContext((_, { headers }) => {
    // Get language from localStorage or default to 'en'
    const language = typeof window !== 'undefined' 
        ? localStorage.getItem('i18nextLng') || 'en'
        : 'en';
    
    return {
        headers: {
            ...headers,
            'Accept-Language': language,
        }
    }
});

// Server-side Apollo Client without localStorage dependency
const createServerApolloClient = () => {
    const serverAuthLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                'Accept-Language': 'en', // Default language for server-side
            }
        }
    });

    return new ApolloClient({
        link: serverAuthLink.concat(httpLink),
        cache: new InMemoryCache({
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
                // Fix for Story ACF merge errors
                Story_Acfstory: {
                    keyFields: false,
                    merge: true
                },
                Story_Acfstory_GroupInfoPost: {
                    keyFields: false,
                    merge: true
                },
                // Fix for Media ACF merge errors
                Media_Acfmedia: {
                    keyFields: false,
                    merge: true
                },
                // Fix for Gynecology ACF merge errors
                Gynecology_AcfGynecology: {
                    keyFields: false,
                    merge: true
                }
            }
        }),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
            },
            query: {
                errorPolicy: 'all',
            },
        },
        assumeImmutableResults: true,
        ssrMode: true
    });
};

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
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
            // Fix for Story ACF merge errors
            Story_Acfstory: {
                keyFields: false,
                merge: true
            },
            Story_Acfstory_GroupInfoPost: {
                keyFields: false,
                merge: true
            },
            // Fix for Media ACF merge errors
            Media_Acfmedia: {
                keyFields: false,
                merge: true
            },
            // Fix for Gynecology ACF merge errors
            Gynecology_AcfGynecology: {
                keyFields: false,
                merge: true
            }
        }
    }),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'all',
        },
        query: {
            errorPolicy: 'all',
        },
    },
    // Отключаем нормализацию кеша для избежания проблем с сериализацией
    assumeImmutableResults: true
});

export default apolloClient;
export { createServerApolloClient };
