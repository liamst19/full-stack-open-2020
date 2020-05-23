
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState('')
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState('')

  const client = useApolloClient()

  const loginUser = token => {
    setToken(token)
    localStorage.setItem('library-user-token', token)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
          ? <button onClick={() => setPage('add')}>add book</button>
          : null
        }
        {
          token
          ? <button onClick={() => logout()}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Notify message={message}/>

      { token ? null :
        <LoginForm
          show={page === 'login'}
          loginUser={loginUser}
          setMessage={setMessage}
        /> }

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
