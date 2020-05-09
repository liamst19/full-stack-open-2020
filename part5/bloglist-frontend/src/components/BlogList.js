import React, { useState, useEffect } from 'react'

// Services
import blogService from '../services/blogs'

// Components
import Blog from './Blog'
import BlogCreateForm from './BlogCreateForm'
import Togglable from './Togglable'

// ----------------------------------------
const BlogList = ({ notify }) => {
  const [blogs, setBlogs] = useState([])

  const blogCreateFormRef = React.createRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      if(blogs) setBlogs(blogs)
    }
    getBlogs()
  }, [])

  const addBlog = blog => {
    const addBlogAsync = async blog => {
      try{
        const newBlog =  await blogService.addBlog(blog)
        if(newBlog
           && !Object.prototype.hasOwnProperty.call(newBlog, 'error')){
          setBlogs([...blogs, newBlog])
          notify({type: 'info',
                  text: `${newBlog.title} by ${newBlog.author} added`})
          // hide form before or after creating?
        }
      } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
          notify({type: 'error', text: e.response.data.error})
        }
      }
    }
    blogCreateFormRef.current.toggleVisibility()
    addBlogAsync(blog)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={ blogCreateFormRef }>
        <BlogCreateForm addBlog={addBlog} />
      </Togglable>
      { Array.isArray(blogs)
        ? blogs.map(blog => <Blog key={blog.id} blog={blog} />)
        : null }
    </div>
  )
}

export default BlogList
