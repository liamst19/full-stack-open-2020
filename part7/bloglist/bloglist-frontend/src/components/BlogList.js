import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Actions
import { addBlog } from '../reducers/blogReducer'
import {
  notifyInfo,
  notifyError
} from '../reducers/notificationReducer'

// Components
import Blog        from './Blog'
import BlogAddForm from './BlogAddForm'
import Togglable   from './Togglable'

// ----------------------------------------
const BlogList = () => {
  // Redux
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const blogCreateFormRef = React.createRef()

  if(!loggedInUser) return null

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

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={ blogCreateFormRef }>
        <BlogAddForm addBlog={handleAdd} />
      </Togglable>
      <div id="blogList">
        { Array.isArray(blogs)
          ? blogs.map(blog => <Blog key={blog.id} blog={blog} />)
          : null }
      </div>
    </div>
  )
}

export default BlogList
