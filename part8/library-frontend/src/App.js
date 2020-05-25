
import React, { useState, useEffect } from 'react'
import { useSubscription,
         useApolloClient } from '@apollo/client'

import { BOOK_ADDED, ALL_BOOKS } from './queries'
import {
  getTokenFromLocal,
  setTokenToLocal,
  resetTokenInLocal } from './services/loginService'

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

  useEffect(() => {
    if(getTokenFromLocal()) setHasToken(true)
  }, [])

  const client = useApolloClient()

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) =>
          set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore.allBooks)
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      setMessage(`${addedBook.title} added`)
      setTimeout(() => setMessage(''), 5000)
      updateCacheWith(addedBook)
    }
  })

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
        updateCacheWith={updateCacheWith}
      />

      <Recommended
        show={page === 'recommended'}
          />

    </div>
  )
}

export default App
