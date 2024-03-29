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
        getRegister: builder.query({
            query: (code) => ({
                url: `/auth/confirm?code=${code}`,
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
        restore: builder.mutation({
            query: (payload) => ({
                url: '/auth/restore',
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
            query: (page = 1) => ({
                url: `/todo/get?page=${page}`,
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('testAuthorization'),
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            providesTags: ['User'],
        }),
        updateTodo: builder.mutation({
            query: (payload) => ({
                url: '/todo/update',
                method: 'POST',
                body: payload,
                headers: {
                    'Authorization': localStorage.getItem('testAuthorization'),
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
        deleteTodo: builder.mutation({
            query: (payload) => ({
                url: '/todo/delete',
                method: 'DELETE',
                body: payload,
                headers: {
                    'Authorization': localStorage.getItem('testAuthorization'),
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetRegisterQuery,
    useRegisterMutation,
    useLoginMutation,
    useAddTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
    useRestoreMutation,
} = apiSlice;