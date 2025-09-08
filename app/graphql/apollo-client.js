import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create HTTP link
const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_API_URL,
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
            }
        }
    })
});

export default apolloClient;
