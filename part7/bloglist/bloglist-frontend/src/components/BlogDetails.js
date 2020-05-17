import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Actions
import {
  updateBlog,
  likeBlog,
  removeBlog
} from '../reducers/blogReducer'
import {
  notifyInfo,
  notifyError
} from '../reducers/notificationReducer'

const BlogDetails = ({ blogId }) => {
  const dispatch = useDispatch()
  const history  = useHistory()

  const blog = useSelector(state => {
    return state.blogs
      ? state.blogs.filter(blog => blog.id.toString() === blogId)[0]
      : null
  })
  const loggedInUser = useSelector(state => state.user)

  if(!loggedInUser || !blog) return null

  const handleLike = e => {
    e.preventDefault()
    const like = async blog => {
      try{
        await dispatch(likeBlog(blog.id))
      } catch(e){
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    }
    like(blog)
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

  const handleRemove = e => {
    e.preventDefault()

    const remove = async blog => {
      try{
        await dispatch(removeBlog(blog.id))
        await dispatch(notifyInfo(`${blog.title} by ${blog.author} was removed`))
        history.push('/')
      } catch(e){
        if(e.response && e.response.data && e.response.data.error){
          await dispatch(notifyError(e.response.data.error))
        }
      }
    }

    if(window.confirm(`remove ${blog.title}?`)) remove(blog)
  }

  return (
    <div>
      <h2>{`${ blog.title } by ${ blog.author }`}</h2>
      <div><a href={ blog.url }>{ blog.url }</a></div>
      <div className='blogLikes'>
        { `${blog.likes} likes` }
        <button type="button" onClick={ handleLike }>like</button>
      </div>
      <div className='blogUser'>
        { `added by ${ blog.user.name }` }
      </div>
      <div className='blogRemove'>
        <button type="button" onClick={ handleRemove }>remove</button>
      </div>
    </div>
  )
}

export default BlogDetails
