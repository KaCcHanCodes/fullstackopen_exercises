import { useState } from 'react'

const Filter = (props) => {
  return(
  <div>
    filter shown with {props.input}
  </div>
  )
}

const PersonForm = ({form}) => <div>{form}</div>

const Persons = ({showPersons}) => {
  return(
    <div>
      {showPersons.map(person => 
      <div key = {person.name}>
        {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()      //prevent refreshing browser

    const result = persons.find(({ name}) => name === newName) /*check if newName already existed*/
    const personObject = { 
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (result) {
      return alert(`${newName} is already added to phonebook`)
    }
    {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showPersons = persons.filter((person) => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input = {
        <input value = {filter} onChange={handleFilterChange}/>
        }/>
      <h2>add a new</h2>
      <PersonForm form = {
        <form onSubmit={addPerson}>
          <div> 
            name: <input value = {newName} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value = {newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        }
      />
      <h2>Numbers</h2>
      <Persons showPersons = {showPersons}/>
    </div>
  )
}

export default App
