import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const graphqlApiBaseUrl = `${import.meta.env.VITE_API_GW_URL}/graphql`;

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: `${graphqlApiBaseUrl}`,
    }),
    cache: new InMemoryCache(),
});

export default apolloClient

