import { useState, useEffect } from 'react'
import phoneService from './service/phonebook'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

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
      if (!window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)){
        return
      }
      return (
        phoneService
        .update(result.id, personObject)
        .then(returnedObject => {
          setPersons(persons.map(person => 
            person.id === result.id ? returnedObject : person))
        })
      )
    }
    {
    phoneService
      .create(personObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => 
          {setMessage(null)}, 5000
        )
      }).catch(error => {
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      })
    }
  }

  const removeNumber = (personId) => {
    const value = showPersons.find(person => person.id === personId)
    if (value) {
      if(!window.confirm(`Delete ${value.name}`)){
        return
      }
      phoneService.remove(personId).catch(error => {
          setMessage(`the number '${value.name}' was already deleted from server`)
          setTimeout(() => {setMessage(null)}, 5000)
      })
      setPersons(persons.filter(person => person.id !== value.id ))
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
      <Notification message = {message}/>
      <Filter value = {filter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm submit={addPerson} nameValue = {newName} onChangeName={handleNameChange} 
      numberValue = {newNumber} onChangeNum={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons showPersons = {showPersons} removeNumber = {removeNumber}/>
    </div>
  )
}

export default App
