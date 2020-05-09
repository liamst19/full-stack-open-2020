import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// Services
import blogService from '../services/blogs'
import loginService from '../services/login'
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
          const user = loginService.getLocalStorageUser()
          setBlogs([...blogs, { ...newBlog, user: { name: user.name, username: user.username } }])
          notify({ type: 'info',
            text: `${newBlog.title} by ${newBlog.author} added` })
        }
      } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
          notify({ type: 'error', text: e.response.data.error })
        }
      }
    }
    blogCreateFormRef.current.toggleVisibility()
    addBlogAsync(blog)
  }

  const updateBlogList = blogToUpdate => {
    setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? blogToUpdate : blog ))
  }

  const handleUpdate = blog => {
    const updateBlog = async () => {
      await blogService.updateBlog(blog.id, blog)
      updateBlogList(blog)
    }
    updateBlog()
  }

  const handleLike = blog => {
    const likeBlog = async () => {
      await blogService.likeBlog(blog.id)
      // replace blog data in blogs
      updateBlogList({ ...blog, likes: blog.likes + 1 })
    }
    likeBlog()
  }

  const handleRemove = blog => {
    const removeBlog = async () => {
      await blogService.removeBlog(blog.id)
      handleRemove(blog)
      setBlogs(blogs.filter(blog => blog.id !== blog.id))
    }
    removeBlog()
    notify({ type: 'info', text: `${blog.title} was removed.` })
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={ blogCreateFormRef }>
        <BlogAddForm addBlog={addBlog} />
      </Togglable>
      { Array.isArray(blogs)
        ? blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={handleUpdate}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))
        : null }
    </div>
  )
}

BlogList.propTypes = {
  notify: PropTypes.func.isRequired
}

export default BlogList
