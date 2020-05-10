
const express  = require('express')
require('express-async-errors')
const app      = express()
const cors     = require('cors')
const mongoose = require('mongoose')

const config      = require('./utils/config')
const middleware  = require('./utils/middleware')
const logger      = require('./utils/logger')
const blogsRouter = require('./controllers/blogsRouter')
const userRouter  = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')


// Database
logger.info(`Connecting to database ${config.MONGODB_URI} ...`)
mongoose
  .connect(
    config.MONGODB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => {
    logger.info('...Connected to database')
  })
  .catch(error => {
    logger.error('...Error connecting to database:', error.message)
  })

// App middlewares
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/user', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

// Router for testing purpose: resetting and seeding
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testingRouter')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
