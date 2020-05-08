import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  return (
    <div>
      <h2>blogs{ user ? ` for ${ user.name }` : null }</h2>
      { Array.isArray(blogs) ? blogs.map(blog => <Blog key={blog.id} blog={blog} />) : null }
    </div>
  )
}

export default BlogList
