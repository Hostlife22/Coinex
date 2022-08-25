import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BASE_URL_CRYPTO } from '../common/constants';

const client = new ApolloClient({
  uri: BASE_URL_CRYPTO,
  cache: new InMemoryCache(),
});

export default client;
