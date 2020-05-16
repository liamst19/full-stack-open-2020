import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// Actions
import {
  addBlog,
  updateBlog,
  likeBlog,
  removeBlog
} from '../reducers/blogReducer'
import {
  notifyInfo,
  notifyError
} from '../reducers/notificationReducer'

// Components
import Blog        from './Blog'
import BlogAddForm from './BlogAddForm'
import Togglable   from './Togglable'

// ----------------------------------------
const BlogList = ({ user }) => {
  // Redux
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogCreateFormRef = React.createRef()

  // Sort blogs By number of likes
  blogs.sort((a, b) => b.likes - a.likes)

  const handleAdd = blog => {
    (async blog => {
    // add blog
      try{
        await dispatch(addBlog(blog))
        // Notification
        await dispatch(notifyInfo(`${blog.title} by ${blog.author} added`))
        // Hide create form
        blogCreateFormRef.current.toggleVisibility()
      } catch(e) {
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    })(blog)
  }

  const handleUpdate = blog => {
    (async blog => {
      try{
        await dispatch(updateBlog(blog))
      } catch(e){
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    })(blog)
  }

  const handleLike = blog => {
    (async blog => {
      try{
        await dispatch(likeBlog(blog.id))
      } catch(e){
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    })(blog)
  }

  const handleRemove = blogToRemove => {
    (async blog => {
      try{
        await dispatch(removeBlog(blog.id))
        await dispatch(notifyInfo(`${blog.title} by ${blog.author} was removed`))
      } catch(e){
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    })(blogToRemove)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={ blogCreateFormRef }>
        <BlogAddForm addBlog={handleAdd} />
      </Togglable>
      <div id="blogList">
        { Array.isArray(blogs)
          ? blogs.map(blog => (
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              // handleUpdate={handleUpdate}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          ))
          : null }
      </div>
    </div>
  )
}

BlogList.propTypes = {
  notify: PropTypes.func.isRequired
}

export default BlogList
