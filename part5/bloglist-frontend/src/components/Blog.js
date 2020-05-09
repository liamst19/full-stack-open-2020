import React, { useState } from 'react'

// Services
import blogService from '../services/blogs'
import loginService from '../services/login'

const Blog = ({ blog, handleUpdate, handleRemove }) =>{
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

  const handleRemoveBtnClick = e => {
    const removeBlog = async () => {
      await blogService.removeBlog(blog.id)
      handleRemove(blog)
    }
    if(window.confirm(`remove ${blog.title}?`)){
      removeBlog()
    }
  }

  return (
    <div>
      <div>{`${blog.title} by ${blog.author}`} <button onClick={ handleExpandBtnClick }>{ expanded ? 'hide' : 'details' }</button></div>
      <div style={ expanded ? expandStyle : hideStyle }>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={ handleLikeBtnClick }>like</button></div>
        <div>{ blog.user.name }</div>
        { user.username === blog.user.username ? <div><button onClick={ handleRemoveBtnClick }>remove</button></div> : null}
      </div>
    </div>
  )
}

export default Blog
