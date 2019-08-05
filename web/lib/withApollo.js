import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: 'https://graphql-dot-fifth-inkwell-181305.appspot.com/graphql',
      cache: new InMemoryCache().restore(initialState || {})
    })
);
