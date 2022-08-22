import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL, LOCALSTORAGE_KEY_USER } from '../../common/constants';
import { MethodsEnum } from '../../common/enums';
import { safeParse } from '../../common/helpers/safeParse';
import { IAuthPayload, IAuthTokens } from '../../features/auth/auth.interface';
import { logout, updateUserTokens } from '../../features/auth/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const user = safeParse<IAuthPayload>(localStorage.getItem(LOCALSTORAGE_KEY_USER) || 'null');
    const {
      tokens: { token },
    } = (getState() as RootState).auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    } else if (user) {
      headers.set('authorization', `Bearer ${user.token}`);
    }

    return headers;
  },
});

const getNewTokens = async (url: string, refreshToken: string): Promise<IAuthTokens | null> => {
  try {
    const rawResponse = await fetch(BASE_URL + url, {
      method: MethodsEnum.GET,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!rawResponse.ok) {
      throw new Error('Error');
    }

    const content = await rawResponse.json();

    return content;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  return null;
};

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 'PARSING_ERROR' && result.error.originalStatus === 401) {
    const user = safeParse<IAuthPayload>(localStorage.getItem(LOCALSTORAGE_KEY_USER) || 'null');
    const {
      tokens: { refreshToken },
      user: { userId },
    } = (api.getState() as RootState).auth;

    let refreshResult;

    if (refreshToken && userId) {
      refreshResult = await getNewTokens(`users/${userId}/tokens`, refreshToken);
    } else if (user?.refreshToken && user?.userId) {
      refreshResult = await getNewTokens(`users/${user.userId}/tokens`, user.refreshToken);
    }

    if (refreshResult) {
      const { token, refreshToken: newRefreshToken } = refreshResult;
      api.dispatch(updateUserTokens({ token, refreshToken: newRefreshToken }));

      return baseQuery(args, api, extraOptions);
    }
    api.dispatch(logout());
  }

  return result;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
