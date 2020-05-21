import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
    genres
  }
}
`

// export const ADD_BOOK = gql`
// mutation {
//   addBook (
//     $title: String!
//     $author: String!
//     $published: Int!
//     $genres: [String]
//   ) {
//     title
//     author
//     published
//     genres
//   }
// }
// `

// export const EDIT_AUTHOR = gql`
// mutation {
//   editAuthor(
//     $name: String!
//     $setBornTo: Int!
//   ) {
//     name
//     born
//   }
// }
// `
