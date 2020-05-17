import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// actions
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'
import { getAllUsers } from './reducers/userReducer'

// Components
import BlogList     from './components/BlogList'
import UserList     from './components/UserList'
import Login        from './components/Login'
import Notification from './components/Notification'

// Stylesheet
import './App.css'

// ----------------------------------------
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // Initialize data from db and local
  useEffect(() => {
    dispatch(initUser())        // user info
    dispatch(getAllUsers())     // info of all users
    dispatch(initializeBlogs()) // all blogs
  }, [])

  return (
    <div>
      <h1>Blog List</h1>
      <Notification  />
      <Login  />
      { user ? <BlogList /> : null }
      <UserList />
    </div>
  )
}

export default App
