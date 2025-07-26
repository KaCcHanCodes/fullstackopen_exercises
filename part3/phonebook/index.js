require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function (request) {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', async (request, response) => {
    const currentDate = new String(Date())
    const number = await Person.countDocuments({})
    console.log(number)
    response.send(`<div>
      Phonebook has info for ${number} people
      <p>${currentDate}</p>
      </div>`)
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
    response.json(person)
  }
  else {response.status(404).end()}
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(result => {
     if (!result) {
      return response.status(404).send({
        'error': 'Number already deleted'
    })
    }
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

    const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {name, number} = request.body

  Person.findById(request.params.id).then(person => {
    if (!person) {
      return response.status(404).end()
    } else {
      person.name = name
      person.number = number

      person.save().then((updatedPerson) => response.json(updatedPerson))
    }
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
