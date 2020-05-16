const logger = require('./logger')
const { getDecodedToken } = require('./token')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const token = getDecodedToken(request)
  request.token = token
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    // Get just the errors
    const validationErrorMsgs = Object.keys(error.errors).map(key => error.errors[key].message)

    return response.status(400).json({ error: validationErrorMsgs })
  }
  else if(error.name === 'JsonWebTokenError'){
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  else {
    logger.error(error.message)
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
