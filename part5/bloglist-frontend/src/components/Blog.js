import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  user,
  blog,
  // handleUpdate,
  handleLike,
  handleRemove
}) => {
  const [expanded, setExpanded] = useState(false)
  const expandStyle = {
    display: 'block'
  }

  const hideStyle = {
    display: 'none'
  }

  const handleExpandBtnClick = () => {
    setExpanded(!expanded)
  }

  const handleLikeBtnClick = () => {
    handleLike(blog)
  }

  const handleRemoveBtnClick = () => {
    if(window.confirm(`remove ${blog.title}?`)){
      handleRemove(blog)
    }
  }

  return (
    <div className='blogEntry'>
      <div className='blogHeader'>
        {`${blog.title} by ${blog.author} `}
        <button className="blogDetailsBtn" onClick={ handleExpandBtnClick }>
          { expanded ? 'hide' : 'details' }
        </button>
      </div>
      <div className='blogDetails' style={ expanded ? expandStyle : hideStyle }>
        <div>{blog.url}</div>
        <div className='blogLikes'>
          Likes: {blog.likes} <button className="blogLikeBtn" onClick={ handleLikeBtnClick }>like</button>
        </div>
        <div>
          { blog.user.name }
        </div>
        { user.username === blog.user.username
          ? <div><button className="blogRemoveBtn" onClick={ handleRemoveBtnClick }>remove</button></div>
          : null }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // handleUpdate: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog
