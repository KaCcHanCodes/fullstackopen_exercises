const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('body', function (request) {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const totalNumber = () => {
    const value = Math.max(...persons.map(person => person.id))
    return value
}

app.get('/info', (request, response) => {
    const currentDate = new String(Date())
    const number = totalNumber()
    response.send(`<div>
      Phonebook has info for ${number} people
      <p>${currentDate}</p>
      </div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  }
  else {
    response.status(404).json({
      'error': "number not found"
    })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = (max) => {
  return Math.floor(Math.random() * (max + 10))
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const nameExist = persons.find(person => person.name === body.name)
  if (!body.number || !body.name){
    return response.status(400).json({
      'error': 'name or number is missing'
    })
  }
  if (nameExist) {
    return response.status(400).json({
      'error': 'name must be unique'
    })
  }
  else {
    const person = {
    id: generateId(persons.length),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
  }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
