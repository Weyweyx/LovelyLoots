import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

//added dynamic configuration instead of the hardcoded GraphQL URI 

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:3001/graphql',
  }),
  cache: new InMemoryCache(), 
});

export default client;
