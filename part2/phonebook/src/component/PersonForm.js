import { useState } from 'react'
import personService from '../services/PersonService'

const PersonForm = ({ persons, setPersons, setErrorMessage, setSuccess }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const findPerson = persons.find(person => person.name === newName)

    if (findPerson) {
      const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replaceNumber) {
        personService.update(findPerson.id, { ...findPerson, number: newNumber })
          .then(response => {
            console.log('Update successful:', response)
            setSuccess(true)
            setErrorMessage(`Update successful: ${findPerson.name}`)
            setTimeout(() => { setErrorMessage(null) }, 5000)
            personService.getAll().then(returnedPersons => setPersons(returnedPersons))
          })
          .catch(error => {
            console.error('Update failed:', error)
            setSuccess(false)
            setErrorMessage(`Update failed: ${findPerson.name}`)
            setTimeout(() => { setErrorMessage(null) }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService.create(personObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
        })
    }

    console.log('button clicked', event.target)
  }

  const handleInputChange = (event, setStateAction) => setStateAction(event.target.value)

  return (
    <form onSubmit={addName}>
      <div>name: <input onChange={event => handleInputChange(event, setNewName)} /></div>
      <div>number: <input onChange={event => handleInputChange(event, setNewNumber)} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm 
