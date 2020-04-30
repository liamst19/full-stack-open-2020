
const express = require('express')
const app = express()

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

app.get('/', (req, res) => {
  res.send('<h1>Server is running.</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})