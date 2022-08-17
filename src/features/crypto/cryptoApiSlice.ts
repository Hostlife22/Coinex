import { cryptocurrencyApi } from '../../app/api/cryptocurrencyApi';
import {
  ICryptocoinReaponse,
  ICryptoHistoryRequest,
  ICryptoHistoryResponse,
  ICryptosResponse,
} from './crypto.interface';

const authApiSlice = cryptocurrencyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCryptos: builder.query<ICryptosResponse, void>({
      query: () => ({
        url: '/assets',
      }),
    }),
    getCrypto: builder.query<ICryptocoinReaponse, string>({
      query: (id) => ({
        url: `/assets/${id}`,
      }),
    }),
    getCryptoHistory: builder.query<ICryptoHistoryResponse, ICryptoHistoryRequest>({
      query: ({ id, interval }) => ({
        url: `/assets/${id}/history`,
        params: {
          interval,
        },
      }),
    }),
  }),
});

export const { useGetAllCryptosQuery, useGetCryptoHistoryQuery, useGetCryptoQuery } = authApiSlice;
