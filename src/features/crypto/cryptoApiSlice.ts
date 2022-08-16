import { cryptocurrencyApi } from '../../app/api/cryptocurrencyApi';
import { ICryptosRequest } from './crypto.interface';

const authApiSlice = cryptocurrencyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCryptos: builder.query<ICryptosRequest, void>({
      query: () => ({
        url: '/assets',
      }),
    }),
  }),
});

export const { useGetAllCryptosQuery } = authApiSlice;
