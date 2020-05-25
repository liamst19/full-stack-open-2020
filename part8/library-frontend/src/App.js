
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'

import { setTokenToLocal, resetTokenInLocal } from './services/loginService'

import Authors     from './components/Authors'
import Books       from './components/Books'
import Recommended from './components/Recommended'
import NewBook     from './components/NewBook'
import Notify      from './components/Notify'
import LoginForm   from './components/LoginForm'

const App = () => {
  const [hasToken, setHasToken] = useState('')
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState('')

  const client = useApolloClient()

  const loginUser = token => {
    setHasToken(true)
    setTokenToLocal(token)
    setPage('authors')
  }

  const logout = () => {
    setHasToken(null)
    resetTokenInLocal()
    client.resetStore()
    setPage('authors')
  }

  // resetTokenInLocal()

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          hasToken
          ? <button onClick={() => setPage('add')}>add book</button>
          : null
        }
        {
          hasToken
          ? <button onClick={() => setPage('recommended')}>recommended</button>
          : null
        }
        {
          hasToken
          ? <button onClick={() => logout()}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Notify message={message}/>

      { hasToken ? null :
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

      <Recommended
        show={page === 'recommended'}
          />

    </div>
  )
}

export default App
