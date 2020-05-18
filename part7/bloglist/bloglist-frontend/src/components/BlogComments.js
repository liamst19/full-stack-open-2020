import React from 'react'

import BlogCommentForm from './BlogCommentForm'

const BlogComments = ({ comments, handleCommentAdd }) => {

  return (
    <div className='blogComments'>
      <h3>Comments</h3>
      <div><BlogCommentForm handleCommentAdd={ handleCommentAdd } /></div>
      {
        comments && comments.length > 0
          ? (<ul>
            {
              comments.map(comment => {
                return (
                  <li key={comment.id}>
                    { comment.comment }
                  </li>
                )
              })
            }
          </ul>)
          : <div>no comments were found</div>
      }
    </div>
  )
}

export default BlogComments
