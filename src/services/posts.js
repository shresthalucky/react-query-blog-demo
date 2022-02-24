import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postApi = createApi({
  reducerPath: 'posts',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        // { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),
    editPost: builder.mutation({
      query: (body) => ({
        url: `/posts/${body.id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: 'Posts', id: body.id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postApi
