import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

// Services
import loginService from './services/loginService'

// actions
import { initializeBlogs } from './reducers/blogReducer'

// Components
import BlogList     from './components/BlogList'
import Login        from './components/Login'
import Notification from './components/Notification'

// Stylesheet
import './App.css'

// ----------------------------------------
const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState()
  const [message, setMessage] = useState()
  const [messageType, setMessageType] = useState()

  // Get user info from browser
  useEffect(() => {
    const localStorageUser = loginService.getLocalStorageUser()
    if (localStorageUser) {
      setUser(localStorageUser)
    }
  }, [])

  // Get blogs from db
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const notify = message => {
    setMessage(message.text)
    setMessageType(message.type)

    const timeout = 5000
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, timeout)
  }

  return (
    <div>
      <h1>Blog List</h1>
      <Notification message={ message } messageType={ messageType } />
      <Login user={ user } setUser={ setUser } notify={ notify } />
      { user ? <BlogList user={user} notify={ notify } /> : null }
    </div>
  )
}

export default App
