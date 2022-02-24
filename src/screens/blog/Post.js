import React from 'react'
import { useParams } from 'react-router-dom'

import { useGetPostByIdQuery } from '../../services/posts'

export default function Post() {
  const { postId } = useParams()
  const { data, error, isLoading } = useGetPostByIdQuery(postId)

  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        error.message
      ) : (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      )}
    </>
  )
}
