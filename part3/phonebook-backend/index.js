
const express    = require('express')
const morgan     = require('morgan')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// morgan logger
morgan.token('req-body', req => JSON.stringify(req.body))
app.use(morgan((tokens, req, res) => {
  const msg = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
  return tokens.method(req, res) === 'POST' ? msg + ' ' + tokens['req-body'](req, res) : msg
}))
// app.use(morgan('tiny'))

// data, initialized with sample in another file
let persons = [
    {
      "name": "Arto Hellas",
      "number": "050-098765",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Arturo Gonzalez",
      "number": "45-99-0024",
      "id": 5
    },
    {
      "name": "Franz Kafka",
      "number": "123-456789",
      "id": 8
    }
]


// Generate Id for new person
const generateId = (id) => {
  const generateNum = () => Math.floor(Math.random() * 9999999)
  let newId = generateNum()
  while(persons.some(p => p.id == id)) newId = generateNum()
  return newId
}

app.get('/', (req, res) => {
  res.send('<h1>Server is running.</h1>')
})

app.route('/api/persons')
  .get((req, res) => {
    res.json(persons)
  })
  .post((req, res) => {
    const name = req.body.name
    const number = req.body.number

    // Validation
    if(!name || !number){
      res.status(400).json({ error: 'incomplete information' })
    } else if(persons.some(p => p.name == name)){
      res.status(400).json( { error: 'name already exists' } )
    }

    const newPerson = { name, number, id: generateId() }
    persons = persons.concat(newPerson)
    res.status(203).json(newPerson)
  })

app.route('/api/persons/:id')
  .get((req, res) => {
    const person = persons.filter(p => p.id == req.params.id)[0]
    let newId = generateId()
    if(person){
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .delete((req, res) => {
    const person = persons.filter(p => p.id == req.params.id)[0]
    if(person){
      persons = persons.filter(p => p.id != person.id)
      res.status(203).end()
    } else {
      res.status(404).end()
    }
  })

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${ persons.length } people</p><p>${ new Date().toString() }</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
})
