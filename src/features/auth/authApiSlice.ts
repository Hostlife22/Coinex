import { userApi } from '../../app/api/userApi';
import { API } from '../../common/constants';
import { MethodsEnum } from '../../common/enums';
import { ISignInRequest, ISignInResponse } from './auth.interface';

const authApiSlice = userApi.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation<ISignInResponse, ISignInRequest>({
      query: (body) => ({
        url: API.auth.getUrl(),
        method: MethodsEnum.POST,
        body,
      }),
    }),
  }),
});

export const { useAuthMutation } = authApiSlice;
