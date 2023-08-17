require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const personsDB = require('./modules/person')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))

var persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
]

// Main page
app.get('/info', (_, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})

// Get all
app.get('/api/persons', (_, response) => {
  console.log(persons, typeof persons)
  personsDB.queryALL()
    .then(
      persons => {
        if (persons) {
          console.log(persons, typeof persons);
          response.json(persons);
        }
        else {
          response.status(404).end()
        }
      })
    .catch(
      error => {
        response.status(500).json({ error: 'Internal server error', error });
      })
})

// Get one person
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  // const person = persons.find(person => person.id === id)
  personsDB.queryOne(id)
    .then(
      person => {
        if (person) {
          console.log(person, typeof person)
          response.json(person)
        } else {
          response.status(404).end()
        }
      }
    )
    .catch(error => {
      response.status(500).json({ error: 'Internal server error', error });
    })
})

// Update one person's number
app.put('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const number = request.body.number
  personsDB.updateRecord(id, number)
    .then(
      person => {
        if (person) {
          console.log(person, typeof person)
          response.json(person)
        } else {
          response.status(404).end()
        }
      }
    )
    .catch(error => {
      response.status(500).json({ error: 'Internal server error', error });
    })
})

// Delete one person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  personsDB.deleteRecord(id)
    .then(
      response.status(204).end()
    )
    .catch(
      error => {
        response.status(500).json({ error: 'Internal server error', error });
      })
})

// Create new person
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  personsDB.addRecord(body)
    .then(
      newPerson => {
        if (newPerson) {
          console.log(newPerson, typeof newPerson)
          persons = persons.concat(newPerson)
          response.json(newPerson)
        } else {
          response.status(404).end()
        }
      }
    )
    .catch(
      error => {
        response.status(500).json({ error: 'Internal server error', error });
      }
    )
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
