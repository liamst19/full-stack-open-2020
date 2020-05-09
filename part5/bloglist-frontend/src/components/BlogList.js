import React, { useState, useEffect } from 'react'

// Services
import blogService from '../services/blogs'

// Components
import Blog        from './Blog'
import BlogAddForm from './BlogAddForm'
import Togglable   from './Togglable'

// ----------------------------------------
const BlogList = ({ notify }) => {
  const [blogs, setBlogs] = useState([])
  if(blogs) blogs.sort((a, b) => a.likes < b.likes)

  const blogCreateFormRef = React.createRef()

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      if(blogs) {
        setBlogs(blogs)
      }
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

  const handleUpdate = blogToUpdate => {
    setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog ))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={ blogCreateFormRef }>
        <BlogAddForm addBlog={addBlog} />
      </Togglable>
      { Array.isArray(blogs)
        ? blogs.map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate}/>)
        : null }
    </div>
  )
}

export default BlogList
