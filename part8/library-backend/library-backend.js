const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int
  }
  type Book{
    id: ID!
    title: String!
    author: String!
    published: Int!
    genres: [String]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook (
        title: String!
        author: String!
        published: Int!
        genres: [String]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Book: root => ({
    id: root => root.id,
    title: root => root.title,
    author: root => root.name,
    published: root => root.published,
    genres: root => root.genres
  }),
  Author: root => ({
    id: root => root.id,
    name: root => root.name,
    born: root => root.born,
    bookCount: root => root.bookCount
  }),
  Query: {
    bookCount: () => books.length,
    authorCount: () =>authors.length,
    allBooks: (root, args) =>  books.filter(book =>{
        return (!args.author || (args.author && args.author === book.author))
          && (!args.genre || (args.genre && book.genres.some(genre => genre === args.genre)))
      }),
    allAuthors: () => authors.map(author => ({...author, bookCount: books.filter(book => book.author === author.name).length}))
  },
  Mutation: {
    addBook: (root, args) => {
      // Add author if it does not already exist
      if(!authors.some(author => author.name === args.author)){
        const author = {
          id: uuid(),
          name: args.author
        }
        authors = authors.concat(author)
      }
      const book = {...args,
                    genres: args.genres ? args.genres : [],
                    id: uuid()}
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.filter(author => author.name.toLowerCase() === args.name.toLowerCase())[0]
      if(!author) return null

      const updatedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(a => a.name === author.name ? updatedAuthor : author)

      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
