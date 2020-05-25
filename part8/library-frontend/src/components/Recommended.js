import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { FIND_BOOKS } from '../queries'
import { getTokenFromLocal } from '../services/loginService'

const Recommended = (props) => {
  const [books, setBooks] = useState()
  const [genre, setGenre] = useState()
  const [getBooks, result] = useLazyQuery(
    FIND_BOOKS, {
      pollInterval: 5000
    })

  useEffect(() => {
    console.log('useEffect', result.data)
    if(result.data){
      console.log('setting books', result.data.allBooks)
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useEffect(() => {
    const token = getTokenFromLocal()
    if(token){
      getBooks({ variables: { genreToSearch: token.favoriteGenre } })
      setGenre(token.favoriteGenre)
    }
  }, [getBooks])

  if(!props.show) {
    return null
  }

  if(result.loading){
    return <div>now loading...</div>
  } else   console.log(result.data)


  return (
    <div>
      <h2>recommended books: {genre}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          { books && books.length > 0
            ? books.map(a =>
                      <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                      </tr>
                     )
            : <tr><td>No Books were found</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
