import React from 'react'
import { useField } from '../hooks'

const BlogCommentForm = ({ handleCommentAdd }) => {
  const comment = useField('text')

  const onCommentSubmit = e => {
    e.preventDefault()
    const newComment = comment.value
    handleCommentAdd(newComment)
    comment.reset()
  }

  return (
    <form onSubmit={ onCommentSubmit }>
      <input { ...comment.attr } />
      <button type="submit">add comment</button>
    </form>
  )
}

export default BlogCommentForm
