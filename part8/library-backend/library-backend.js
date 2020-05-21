require('dotenv').config()
const { v1: uuid } = require('uuid')

const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./gql/typedefs')
const Book = require('./models/book')
const Author = require('./models/author')

const { authors, books } = require('./models/sampledata')

const resolvers = {
  Book: root => ({
    id: root => root.id,
    title: root => root.title,
    author: root => authors.author,
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
    bookCount: () => Book.count({}),
    authorCount: () => Author.count({}),
    allBooks: (root, args) => Book.find({...args}),
    allAuthors: () => Author.find({})
  },
  Mutation: {
    addBook: (root, args) =>
      (new Book({...args, author: null})).save(),
    editAuthor: (root, args) => {
      const author = authors.filter(author => author.name.toLowerCase() === args.name.toLowerCase())[0]
      if(!author) return null

      const updatedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(a => a.name === author.name ? updatedAuthor : a)

      return updatedAuthor
    }
  }
}

// Database
console.log(`Connecting to database ${process.env.MONGODB_URI} ...`)
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    console.log('...Connected to database')
  })
  .catch(error => {
    console.log('...Error connecting to database:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
