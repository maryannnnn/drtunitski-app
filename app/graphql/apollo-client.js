import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    fetchOptions: {
        timeout: 15000, // 15 секунд timeout для Vercel build
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
                }
            }
        }),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'ignore',
            },
            query: {
                errorPolicy: 'ignore',
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
            }
        }
    }),
    defaultOptions: {
        watchQuery: {
            errorPolicy: 'ignore',
        },
        query: {
            errorPolicy: 'ignore',
        },
    },
    // Отключаем нормализацию кеша для избежания проблем с сериализацией
    assumeImmutableResults: true
});

export default apolloClient;
export { createServerApolloClient };
