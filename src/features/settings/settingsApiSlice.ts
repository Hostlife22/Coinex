import { apiSlice } from '../../app/api/apiSlice';
import { API, MethodsEnum } from '../../common';
import { ISettingsRequest, ISettingsResponse } from './settingsApiSlice.interface';
import { setAllSettings } from './settingsSlice';

export const settingsApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Settings'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getSettings: builder.query<ISettingsResponse, string>({
        query: (userId) => ({
          url: API.settings.getUrl(userId),
        }),
        onQueryStarted: (arg: string, { dispatch, queryFulfilled }) => {
          queryFulfilled
            .then((response) => dispatch(setAllSettings(response.data.optional)))
            .catch((e) => {});
        },
        providesTags: [{ type: 'Settings', id: 'LIST' }],
      }),
      putSettings: builder.mutation<ISettingsResponse, ISettingsRequest>({
        query: ({ userId, settings }) => ({
          url: API.settings.getUrl(userId),
          method: MethodsEnum.PUT,
          body: {
            wordsPerDay: 1,
            optional: settings,
          },
        }),
        onQueryStarted: (arg: ISettingsRequest, { dispatch, queryFulfilled }) => {
          queryFulfilled
            .then((response) => dispatch(setAllSettings(response.data.optional)))
            .catch((e) => {});
        },
        invalidatesTags: [{ type: 'Settings', id: 'LIST' }],
      }),
    }),
  });

export const { useGetSettingsQuery, usePutSettingsMutation } = settingsApiSlice;
