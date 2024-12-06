import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Create an ApolloClient instance for the frontend to communicate with the backend GraphQL server

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3001/graphql', // GraphQL server running on port 3001
  }),
  cache: new InMemoryCache(),
});

export default client;
