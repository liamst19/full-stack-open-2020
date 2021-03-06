import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom"

// Components
import Menu         from './components/Menu'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Anecdote     from './components/Anecdote'
import About        from './components/About'
import Footer       from './components/Footer'
import CreateNew    from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [timeoutId, setTimeoutId] = useState()
  const timeout = 10000

  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`${anecdote.content} was added`)
    // reset notification after 10 seconds
    setTimeoutId(setTimeout(() => setNotification(''), timeout))
    history.push('/')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} setNotification={setNotification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} vote={vote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} vote={vote} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
