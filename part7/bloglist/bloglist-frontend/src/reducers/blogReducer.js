import blogService from '../services/blogService'

const reducer = (state = [], action) => {
  const actionSwitch = {
    'BLOG_INIT': () => action.data,
    'BLOG_NEW': action => state.concat(action.data),
    'BLOG_UPDATE': action => state.map(blog => {
      return blog.id === action.data.id
        ? action.data
        : blog
    }),
    'BLOG_LIKE' : action => state.map(blog => {
      return blog.id === action.data.id
        ? { ...blog, likes: blog.likes + 1 }
        : blog
    }),
    'BLOG_REMOVE': action => state.filter(blog => blog.id !== action.data.id)
  }

  return Object.prototype
    .hasOwnProperty.call(actionSwitch, action.type)
    ? actionSwitch[action.type](action)
    : state
}

// ----------------------------------------

export const removeBlog = id => async dispatch => {
  await blogService.removeBlog(id)
  dispatch({
    type: 'BLOG_REMOVE',
    data: { id }
  })
}

export const updateBlog = blog => async dispatch => {
  await blogService.updateBlog(blog.id, blog)
  dispatch({
    type: 'BLOG_UPDATE',
    data: blog
  })
}

export const likeBlog = id => async dispatch => {
  await blogService.likeBlog(id)
  dispatch({
    type: 'BLOG_LIKE',
    data: { id }
  })
}

export const addBlog = blog => async dispatch => {
  const newBlog = await blogService.addBlog(blog)
  dispatch({
    type: 'BLOG_NEW',
    data: newBlog
  })
}

export const initializeBlogs = () => async dispatch => {
  const data = await blogService.getAll()
  dispatch({
    type: 'BLOG_INIT',
    data
  })
}

export default reducer
