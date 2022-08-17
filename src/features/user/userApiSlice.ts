import { userApi } from '../../app/api/userApi';
import { API } from '../../common/constants';
import { ICreatedOrUpdatedUser, IUpdateUser, IUser } from './user.interface';

export const userApiSlice = userApi.enhanceEndpoints({ addTagTypes: ['User'] }).injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<ICreatedOrUpdatedUser, IUser>({
      query: (body) => ({
        url: API.user.getUrl(),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUser: builder.query<ICreatedOrUpdatedUser, string>({
      query: (id) => API.user.getUrl(id),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<ICreatedOrUpdatedUser, IUpdateUser>({
      query: ({ id, ...body }) => ({
        url: API.user.getUrl(id),
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<null, string>({
      query: (id) => ({
        url: API.user.getUrl(id),
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } =
  userApiSlice;
