import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogCreateForm from './BlogCreateForm'
import blogService from '../services/blogs'

const BlogList = ({ user, notify }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <BlogCreateForm blogs={blogs} setBlogs={setBlogs} notify={notify} />
      { Array.isArray(blogs) ? blogs.map(blog => <Blog key={blog.id} blog={blog} />) : null }
    </div>
  )
}

export default BlogList
