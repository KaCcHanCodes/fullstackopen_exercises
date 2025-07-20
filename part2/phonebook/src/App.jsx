import { useState, useEffect } from 'react'
import phoneService from './service/phonebook'
import axios from 'axios'

const Filter = (props) => {
  return(
  <div>
    filter shown with {props.input}
  </div>
  )
}

const PersonForm = ({form}) => <div>{form}</div>

const Persons = ({showPersons}) => {
  const removeNumber = (id) => {
    const value = showPersons.find(person => person.id === id)
    if (value) {
      confirm(`Delete ${value.name}`)
      phoneService.remove(id).catch(error => {
          alert(`the number '${value.name}' was already deleted from server`)
      })
    }
  }
  return(
    <div>
      {showPersons.map(person => 
      <div key = {person.id}>
        {person.name} {person.number} <button onClick={() => removeNumber(person.id)}>delete</button>
       </div>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
    .getAll()
    .then(initialObject => {
      setPersons(initialObject)})
  },[])
  
  const addPerson = (event) => {
    event.preventDefault()      //prevent refreshing browser

    const result = persons.find(({name}) => name === newName) /*check if newName already existed*/
    const personObject = { 
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }

    if (result) {
      return alert(`${newName} is already added to phonebook`)
    }
    {
    phoneService
      .create(personObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
        setNewName('')
        setNewNumber('')
      })
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

  // const removeNumber = (id) => {
  //   axios.delete(`http://localhost:3001/persons/${id}`)
  // }

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
