import React, { useState } from 'react'

// Services
import blogService from '../services/blogs'
import loginService from '../services/login'

const Blog = ({ blog, handleUpdate }) =>{
  const [expanded, setExpanded] = useState(false)
  const user = loginService.getLocalStorageUser()

  const expandStyle = {
    display: 'block'
  }

  const hideStyle = {
    display: 'none'
  }

  const handleExpandBtnClick = e => {
    setExpanded(!expanded)
  }

  const handleLikeBtnClick = e => {
    const likeBlog = async () => {
      await blogService.likeBlog(blog.id)
      // replace blog data in blogs
      handleUpdate({...blog, likes: blog.likes + 1})
    }
    likeBlog()
  }

  return (
    <div>
      <div>{`${blog.title} by ${blog.author}`} <button onClick={ handleExpandBtnClick }>{ expanded ? 'hide' : 'details' }</button></div>
      <div style={ expanded ? expandStyle : hideStyle }>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={ handleLikeBtnClick }>like</button></div>
        <div>{ blog.user.name }</div>
      </div>
    </div>
  )
}

export default Blog
