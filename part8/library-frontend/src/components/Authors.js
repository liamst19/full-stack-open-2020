import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>now loading...</div>
  }

  const handleSubmit = e => {
    e.preventDefault()

    console.log('updating author')

    editAuthor({
      variables: {
        name,
        setBornTo: Number(born)
      }
    })

    setName('')
    setBorn('')
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            type='text'
            value={name}
            onChange={ ({ target }) => setName(target.value) }
          />
        </div>
        <div>
          born:
          <input
            type='number'
            value={born}
            onChange={ ({ target }) => setBorn(Number(target.value)) }
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
