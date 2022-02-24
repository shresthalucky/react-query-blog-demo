import React from 'react'
import { Link } from 'react-router-dom'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

import usePosts from '../../hooks/usePosts'
import useCreatePost from '../../hooks/useCreatePost'
import { useCreatePostMutation, useGetPostsQuery } from '../../services/posts'

export default function Posts() {
  // const postsQuery = usePosts()
  // const [createPost, createPostInfo] = useCreatePost()
  
  const { data, isLoading, isError, refetch } = useGetPostsQuery()
  const [createPost, createPostInfo] = useCreatePostMutation()

  const onSubmit = async (values) => {
    await createPost(values)
    // postsQuery.fetch()
    // refetch()
  }

  return (
    <section>
      <div>
        <div>
          {isLoading ? (
            <span>
              <Loader /> Loading
            </span>
          ) : (
            <>
              <h3>Posts</h3>
              <ul>
                {data.map((post) => (
                  <li key={post.id}>
                    <Link to={`./${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
      <hr />
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={onSubmit}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}
