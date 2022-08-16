import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptocurrencyApi = createApi({
  reducerPath: 'cryptocurrencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (builder) => ({}),
});
