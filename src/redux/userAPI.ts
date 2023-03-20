import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import NProgress from "nprogress";
import { IMutateUser, IUser, IUserResponse } from "./types";

const BASEURL = "https://fakestoreapi.com/users";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation<IUserResponse, IMutateUser>({
      query(user) {
        return {
          url: "/",
          method: "POST",
          credentials: "include",
          body: user,
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      transformResponse: (result: { user: IUserResponse }) => result.user,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    updateUser: builder.mutation<
      IUserResponse,
      { id: string; user: IMutateUser }
    >({
      query({ id, user }) {
        return {
          url: `/${id}`,
          method: "PATCH",
          credentials: "include",
          body: user,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Users", id },
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      transformResponse: (response: { user: IUserResponse }) => response.user,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    getUser: builder.query<IUserResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getAllUsers: builder.query<IUser[], { page: number; limit: number }>({
      query({ page, limit }) {
        return {
          url: `/?page=${page}&limit=${limit}`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Users" as const,
                id,
              })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      transformResponse: (results: { users: IUser[] }) => results.users,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation<IUserResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetAllUsersQuery,
} = userAPI;
