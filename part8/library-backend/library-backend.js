require('dotenv').config()
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./gql/typedefs')
const Book     = require('./models/book')
const Author   = require('./models/author')
const User     = require('./models/user')

const samples  = require('./models/sampledata')

const resolvers = {
  Book: root => ({
    id:        root => root.id,
    title:     root => root.title,
    author:    root => root.author,
    published: root => root.published,
    genres:    root => root.genres
  }),
  Author:      root => ({
    id:        root => root.id,
    name:      root => root.name,
    born:      root => root.born,
    bookCount: root => root.bookCount
  }),
  Query: {
    bookCount:   () => Book.count({}),
    authorCount: () => Author.count({}),
    allBooks:    (root, args) =>{
      return Book.find({...args}).populate('author')
    },
    allAuthors:  async () => {
      /*
        This will be so much simpler if I just create 'books' field to Author
        and concat the book id when adding a book.
      */
      // Using Model.aggregate() to calculate bookCount
      const aggregate =
            await Book
            .aggregate([
              {
                $group : {
                  _id: '$author',
                  bookCount: { $sum: 1 }
                }
              },
              {
                $project: {
                  author: '$_id',
                  bookCount: 1
                }
              }
            ])
      // Formatting response to fit requirements
      return (await Author.populate(aggregate, 'author'))
            .map(a => ({
              name: a.author.name,
              born: a.author.born ? a.author.born : null,
              bookCount: a.bookCount
            }))
    },
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if(!context.currentUser){
        throw new UserInputError("unauthorized")
      }
      try{
        const author = await Author
              .findOneAndUpdate(
                {name: args.author},
                {},
                {upsert: true, new: true}
              )
        const newBook = await (new Book({...args, author: author._id})).save()
        return Author.populate(newBook, 'author')
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: (root, args, context) => {
      if(!context.currentUser){
        throw new UserInputError("unauthorized")
      }

      try{
        return Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo }
        )
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre ? args.favoriteGenre : null
      })

      try{
        return user.save()
      } catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }
  }
}

// Database Reset and Sample Seeding
const resetData = async () => {

  // Reset Data
  console.log('resetting data...')
  await Author.deleteMany({})
  await Book.deleteMany({})

  // Seed Data
  console.log('...done. seeding...')
  const authors = await Author.insertMany(
    samples.authors.map(a => ({
      name: a.name,
      born: a.born ? a.born : null
    }))
  )
  console.log('....authors inserted')

  const books = await Book.insertMany(
    samples.books.map(b => ({
      title: b.title,
      author: authors.filter(a => a.name === b.author)[0].id,
      published: b.published,
      genres: b.genres
    }))
  )

  console.log('....books inserted')
}

// Connect to Database
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
  .then(async () => {
    await resetData()
    console.log('...Connected to database')
  })
  .catch(error => {
    console.log('...Error connecting to database:', error.message)
  })

// Start Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
    return null
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
