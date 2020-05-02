require('dotenv').config()

const express    = require('express')
const cors       = require('cors')
const morgan     = require('morgan')
const bodyParser = require('body-parser')

const Person     = require('./models/person')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

// morgan

// Exercise 3.7
// app.use(morgan('tiny'))

// Exercise 3.8
morgan.token('req-body', req => JSON.stringify(req.body))
const postLogger = (tokens, req, res) => {
  const msg = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
  return tokens.method(req, res) === 'POST' ? msg + ' ' + tokens['req-body'](req, res) : msg
}
app.use(morgan(postLogger))


// HTTP Handlers

app.get('/', (request, response) => {
  response.send('<h1>Server is running.</h1>')
})

app.route('/api/persons')
  .get((request, response, next) => {
    Person
      .find().then(persons => {
        if(persons){
          response.json(persons)
        } else {
          response.status(404)
        }
      })
      .catch(error => next(error))
  })
  .post((request, response, next) => {
    const name = request.body.name
    const number = request.body.number

    // Validation
    if(!name || !number){
      response.status(400).json({ error: 'incomplete information' })
    }

    const person = new Person({ name, number })
    console.log('saving person', person)
    person
      .save()
      .then( savedPerson => {
        response.status(203).json(savedPerson)
      })
      .catch(error => next(error))
  })

app.route('/api/persons/:id')
  .get((request, response, next) => {
    const id = request.params.id
    Person
      .findById(id)
      .then(person => {
        if(person){
          response.json(person)
        } else{
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  .put((request, response, next) => {
    const id = request.params.id
    const name = request.body.name
    const number = request.body.number

    // Validation
    if(!id || !name || !number){
      response.status(400).json({ error: 'incomplete information' })
    }

    Person
      .findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true })
      .then(result => {
        response.status(202).json(result)
      })
      .catch(error => next(error))

  })
  .delete((request, response, next) => {
    const id = request.params.id
    console.log(id)
    Person
      .findByIdAndRemove(id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

app.get('/info', (request, response, next) => {
  Person
    .find()
    .then(persons => {
      response.send(`<p>Phonebook has info for ${ persons.length } people</p><p>${ new Date().toString() }</p>`)
    })
    .catch(error => next(error))
})


// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).json({ error })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
})
