import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useEditPostMutation,
} from '../../services/posts'

export default function Post() {
  const { postId } = useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useGetPostByIdQuery(postId)
  const [savePost, savePostInfo] = useEditPostMutation()
  const [deletePost, deletePostInfo] = useDeletePostMutation()

  const onSubmit = async (values) => {
    await savePost(values)
  }

  const onDelete = async () => {
    await deletePost(postId)
    navigate('/admin')
  }

  return (
    <>
      {isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{data.title}</h3>
          <p>
            <Link to={`/blog/${data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={data}
            onSubmit={onSubmit}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />

          <p>
            <button onClick={onDelete}>
              {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                ? 'Error!'
                : deletePostInfo.isSuccess
                ? 'Deleted!'
                : 'Delete Post'}
            </button>
          </p>
        </div>
      )}
    </>
  )
}
