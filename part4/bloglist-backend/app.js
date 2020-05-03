
const express  = require('express')
require('express-async-errors')
const app      = express()
const cors     = require('cors')
const mongoose = require('mongoose')

const config      = require('./utils/config')
const middleware  = require('./utils/middleware')
const logger      = require('./utils/logger')
const blogsRouter = require('./controllers/blogsRouter')

// Database
logger.info(`Connecting to database ${config.MONGODB_URI} ...`)
mongoose
  .connect(
    config.MONGODB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true
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

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
