import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8082/v1/auth',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['User'],
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/register',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetPostsQuery, useRegisterMutation, useLoginMutation } = apiSlice;