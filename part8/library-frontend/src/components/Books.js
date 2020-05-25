import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>now loading...</div>
  }

  const books = genre
        ? result.data.allBooks.filter(book =>
                                      book.genres.includes(genre))
        : result.data.allBooks

  const genres = result.data.allBooks.reduce(
    (genreArray, book) =>
      genreArray.concat(
        book.genres
          .filter(g => !genreArray.includes(g))
      ),
    [])

  console.log(genres)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tfoot>
          <tr>
            <td colSpan="3">
              <button onClick={() => setGenre('')}>all</button>
              {
                genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)
              }
            </td>
          </tr>
        </tfoot>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
