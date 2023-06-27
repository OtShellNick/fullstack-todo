import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8082/v1',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['User'],
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: '/auth/register',
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
                url: '/auth/login',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
        addTodo: builder.mutation({
            query: (payload) => ({
                url: '/todo/add',
                method: 'POST',
                body: payload,
                headers: {
                    'Authorization': localStorage.getItem('testAuthorization'),
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
        getTodos: builder.query({
            query: () => ({
                url: '/todo/get',
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('testAuthorization'),
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            providesTags: ['User'],
        }),
    }),
});

export const { useGetPostsQuery, useRegisterMutation, useLoginMutation, useAddTodoMutation, useGetTodosQuery } = apiSlice;