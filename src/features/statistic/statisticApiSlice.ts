import { apiSlice } from '../../app/api/apiSlice';
import { API, safeParse } from '../../common';
import {
  IGetStatisticResponse,
  IPersonStatistic,
  IPutStatisticRequest,
  IStatistic,
} from './statisticApiSlice.interface';
import { setStatistics } from './statisticSlice';

const extStatisticRes = (response: IGetStatisticResponse): IPersonStatistic => {
  return {
    learnedWords: response.learnedWords,
    statistics: safeParse<IStatistic[]>(response.optional.statistics) || [],
  };
};

export const statisticApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatistic: builder.query<IPersonStatistic, string>({
      query: (userId) => ({
        url: API.statistics.getUrl(userId),
      }),
      transformResponse: extStatisticRes,
      onQueryStarted: (arg: string, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((response) => dispatch(setStatistics(response.data))).catch((e) => {});
      },
    }),
    putStatistic: builder.mutation<IPersonStatistic, IPutStatisticRequest>({
      query: ({ userId, statistic: { learnedWords, statistics } }) => ({
        url: API.statistics.getUrl(userId),
        method: 'PUT',
        body: {
          learnedWords,
          optional: {
            statistics: JSON.stringify(statistics),
          },
        },
      }),
      transformResponse: extStatisticRes,
    }),
  }),
});

export const { useGetStatisticQuery, usePutStatisticMutation } = statisticApiSlice;
