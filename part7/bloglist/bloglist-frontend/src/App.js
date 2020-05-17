import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom"

// actions
import { initializeBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'
import { getAllUsers } from './reducers/userReducer'

// Components
import BlogList     from './components/BlogList'
import BlogDetails  from './components/BlogDetails'
import UserList     from './components/UserList'
import UserDetails  from './components/UserDetails'
import Menu         from './components/Menu'
import Login        from './components/Login'
import Notification from './components/Notification'

// Stylesheet
import './App.css'

// ----------------------------------------
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogMatch = useRouteMatch('/blog/:id')
  const userMatch = useRouteMatch('/user/:id')

  // Initialize data from db and local
  useEffect(() => {
    dispatch(initUser())        // user info
    dispatch(getAllUsers())     // info of all users
    dispatch(initializeBlogs()) // all blogs
  }, [])

  return (
    <div>
      <Menu />
      <h1>Blog List App</h1>
      <Notification  />
      <Login  />
      <Switch>
        <Route path="/user/:id">
          <UserDetails userId={userMatch ? userMatch.params.id : null } />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blog/:id">
          <BlogDetails blogId={blogMatch ? blogMatch.params.id : null } />
        </Route>
        <Route path="/">
          <BlogList />
        </Route>
      </Switch>
    </div>
  )
}

export default App
