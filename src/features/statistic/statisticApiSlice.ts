import { userApi } from '../../app/api/userApi';
import { API } from '../../common/constants';
import { safeParse } from '../../common/helpers/safeParse';
import { IGetStatistic, IGetStatisticResponse, IPutStatisticRequest } from './statisticApiSlice.interface';
import { initialState, setStatistics } from './statisticSlice';
import { IStatisticState } from './statisticSlice.interface';

const extStatisticRes = (response: IGetStatisticResponse): IGetStatistic => {
  return {
    id: response.id,
    optional: safeParse<IStatisticState>(response.optional.statistics) || initialState,
  };
};

export const statisticApiSlice = userApi.enhanceEndpoints({ addTagTypes: ['Statistic'] }).injectEndpoints({
  endpoints: (builder) => ({
    getStatistic: builder.query<IGetStatistic, string>({
      query: (userId) => ({
        url: API.statistics.getUrl(userId),
      }),
      transformResponse: extStatisticRes,
      onQueryStarted: (arg: string, { dispatch, queryFulfilled }) => {
        queryFulfilled.then((response) => dispatch(setStatistics(response.data))).catch((e) => {});
      },
      providesTags: ['Statistic'],
    }),
    putStatistic: builder.mutation<IGetStatistic, IPutStatisticRequest>({
      query: ({ userId, statistics }) => ({
        url: API.statistics.getUrl(userId),
        method: 'PUT',
        body: {
          optional: {
            statistics: JSON.stringify(statistics),
          },
        },
      }),
      transformResponse: extStatisticRes,
      invalidatesTags: ['Statistic'],
    }),
  }),
});

export const { useGetStatisticQuery, usePutStatisticMutation } = statisticApiSlice;
